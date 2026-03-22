import 'dotenv/config'
import fs from 'node:fs/promises'
import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
    ? await fs.readFile('./dist/client/index.html', 'utf-8')
    : ''

// Create http server
const app = express()

// Add Vite or respective production middlewares
let vite
if (!isProduction) {
    const { createServer } = await import('vite')
    vite = await createServer({
        server: { middlewareMode: true },
        appType: 'custom',
        base
    })
    app.use(vite.middlewares)
} else {
    const compression = (await import('compression')).default
    const sirv = (await import('sirv')).default
    app.use(compression())
    app.use(base, sirv('./dist/client', { extensions: [] }))
}

import { getPaytrToken, verifyPaytrCallback } from './server-paytr.js'

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Vite uses inline scripts heavily in dev
    crossOriginEmbedderPolicy: false
}));

// Rate limiting for API endpoints
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', apiLimiter);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/api/checkout', async (req, res) => {
    try {
        const { basketId, buyer, basketItems } = req.body;

        // Securely fetch order items and recalculate real price
        const { data: orderItemsData, error: itemsError } = await supabase
            .from('order_items')
            .select('product_id, quantity')
            .eq('order_id', basketId);

        if (itemsError || !orderItemsData || orderItemsData.length === 0) {
            console.error("Supabase Order Items Error:", itemsError);
            return res.status(400).json({ status: 'failure', errorMessage: 'Sipariş detayları bulunamadı veya geçersiz.' });
        }

        // Fetch all legitimate product prices
        const productIds = orderItemsData.map(item => item.product_id);
        const { data: productsData, error: productsError } = await supabase
            .from('products')
            .select('id, price, title')
            .in('id', productIds);

        if (productsError || !productsData) {
            console.error("Supabase Products Error:", productsError);
            return res.status(500).json({ status: 'failure', errorMessage: 'Ürün fiyatları doğrulanamadı.' });
        }

        // Calculate real total amount
        let realTotal = 0;
        const validUserBasket = [];

        for (const item of orderItemsData) {
            const product = productsData.find(p => p.id === item.product_id);
            if (product) {
                realTotal += (product.price * item.quantity);
                validUserBasket.push([
                    product.title.substring(0, 50),
                    product.price.toString(),
                    item.quantity
                ]);
            }
        }

        // (We are omitting shipping/discount recalculation here for brevity, 
        // assuming standard price. If discounts apply, they'd need backend validation too).

        // Update the order in the database with the verified total to wipe any frontend manipulation
        await supabase
            .from('orders')
            .update({ total_amount: realTotal })
            .eq('id', basketId);

        // PayTR expects amount in cents/kurus (e.g. 10.50 TL -> 1050)
        const payment_amount = Math.round(parseFloat(realTotal) * 100).toString();

        const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
        const requestData = {
            user_ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '1.1.1.1',
            merchant_oid: basketId,
            email: buyer.email,
            payment_amount: payment_amount,
            user_basket: validUserBasket,
            user_name: buyer.name + ' ' + buyer.surname,
            user_address: buyer.registrationAddress || 'Test Adres',
            user_phone: buyer.gsmNumber || '05555555555',
            merchant_ok_url: `${baseUrl}/api/callback?status=success`,
            merchant_fail_url: `${baseUrl}/api/callback?status=fail`
        };

        const result = await getPaytrToken(requestData);

        if (result.status === 'success') {
            res.json({ status: 'success', paymentPageUrl: `https://www.paytr.com/odeme/guvenli/${result.token}` });
        } else {
            console.error("PayTR Token Error:", result);
            res.status(500).json({ status: 'failure', errorMessage: result.reason || 'PayTR token oluşturulamadı' });
        }
    } catch (error) {
        console.error("PayTR Request Error:", error);
        res.status(500).json({ status: 'failure', errorMessage: error.message });
    }
});

// PayTR returns the user back to these URLs (Client redirection)
app.get('/api/callback', (req, res) => {
    if (req.query.status === 'success') {
        res.redirect('/?success=true');
    } else {
        res.redirect('/?error=payment_failed');
    }
});

// PayTR Server-to-Server Webhook (Asenkron bildirim)
app.post('/api/paytr-webhook', async (req, res) => {
    const postData = req.body;

    if (!verifyPaytrCallback(postData)) {
        return res.status(400).send("PAYTR notification failed: bad hash");
    }

    try {
        if (postData.status === 'success') {
            // Update database order status to paid based on postData.merchant_oid
            console.log("Ödeme Onaylandı:", postData.merchant_oid);
            await supabase
                .from('orders')
                .update({ status: 'completed', payment_status: 'paid', updated_at: new Date().toISOString() })
                .eq('id', postData.merchant_oid);
        } else {
            console.log("Ödeme Hatalı:", postData.merchant_oid, postData.failed_reason_msg);
            await supabase
                .from('orders')
                .update({ 
                    status: 'failed',
                    payment_status: 'failed',
                    note: (postData.failed_reason_msg || 'Payment failed'),
                    updated_at: new Date().toISOString()
                })
                .eq('id', postData.merchant_oid);
        }

        // PayTR expects exactly this string to be returned to acknowledge receipt
        res.send("OK");
    } catch (error) {
        console.error("Webhook process error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Serve HTML
app.use(/.*/, async (req, res) => {
    try {
        const url = req.originalUrl.replace(base, '')

        let template
        let render
        let context = {}

        if (!isProduction) {
            // Always read fresh template in development
            template = await fs.readFile('./index.html', 'utf-8')
            template = await vite.transformIndexHtml(url, template)
            render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
        } else {
            template = templateHtml
            render = (await import('./dist/server/entry-server.js')).render
        }

        const { html: appHtml } = await render(url, context)

        let html = template
            .replace(`<!--app-html-->`, appHtml)

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
        vite?.ssrFixStacktrace(e)
        console.log(e.stack)
        res.status(500).end(e.stack)
    }
})

// Start http server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})
