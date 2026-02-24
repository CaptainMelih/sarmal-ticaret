import fs from 'node:fs/promises'
import express from 'express'

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
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/api/checkout', async (req, res) => {
    try {
        const { price, basketId, buyer, basketItems } = req.body;

        // PayTR expects amount in cents/kurus (e.g. 10.50 TL -> 1050)
        const payment_amount = Math.round(parseFloat(price) * 100).toString();

        const user_basket = basketItems.map(item => [
            item.name.substring(0, 50), // Name
            item.price.toString(),      // Price format (e.g. 10.50)
            1                           // Quantity
        ]);

        const requestData = {
            user_ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '1.1.1.1',
            merchant_oid: basketId,
            email: buyer.email,
            payment_amount: payment_amount,
            user_basket: user_basket,
            user_name: buyer.name + ' ' + buyer.surname,
            user_address: buyer.registrationAddress || 'Test Adres',
            user_phone: buyer.gsmNumber || '05555555555',
            merchant_ok_url: `http://localhost:${port}/api/callback?status=success`,
            merchant_fail_url: `http://localhost:${port}/api/callback?status=fail`
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
        res.redirect('/checkout?success=true');
    } else {
        res.redirect('/checkout?error=payment_failed');
    }
});

// PayTR Server-to-Server Webhook (Asenkron bildirim)
app.post('/api/paytr-webhook', (req, res) => {
    const postData = req.body;

    if (!verifyPaytrCallback(postData)) {
        return res.status(400).send("PAYTR notification failed: bad hash");
    }

    if (postData.status === 'success') {
        // Update database order status to paid based on postData.merchant_oid
        console.log("Ödeme Onaylandı:", postData.merchant_oid);
    } else {
        console.log("Ödeme Hatalı:", postData.merchant_oid, postData.failed_reason_msg);
    }

    // PayTR expects exactly this string to be returned to acknowledge receipt
    res.send("OK");
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
