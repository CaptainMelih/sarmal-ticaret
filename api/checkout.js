import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://ynfecvczapkbiwdekptd.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_fG5hUgy0vkXUWr3LmamHrA_BagmSRCM';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ status: 'failure', errorMessage: 'Method not allowed' });
    }

    try {
        const { basketId, buyer, price, basketItems } = req.body || {};

        if (!basketId) {
            return res.status(400).json({ status: 'failure', errorMessage: 'Sipariş ID (basketId) gereklidir.' });
        }

        const merchant_id = process.env.PAYTR_MERCHANT_ID || '681525';
        const merchant_key = process.env.PAYTR_MERCHANT_KEY || 'Tek69wJtdYinHs19';
        const merchant_salt = process.env.PAYTR_MERCHANT_SALT || '8Hzs3PCUu1UzQGkw';
        const test_mode = process.env.PAYTR_TEST_MODE || '0';

        // Prepare user basket for PayTR
        let user_basket = [];
        if (Array.isArray(basketItems) && basketItems.length > 0) {
            user_basket = basketItems.map(item => [
                (item.name || 'Ürün').substring(0, 50),
                Number(item.price || 10).toFixed(2),
                item.quantity || 1
            ]);
        } else {
            user_basket = [['Sipariş #' + basketId, Number(price || 100).toFixed(2), 1]];
        }

        const user_basket_encoded = Buffer.from(JSON.stringify(user_basket)).toString('base64');
        const user_ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket?.remoteAddress || '1.1.1.1';
        const email = buyer?.email || 'musteri@sarmalticaret.com';
        const payment_amount = Math.round(Number(price || 100) * 100).toString();
        const merchant_oid = basketId.toString();

        const no_installment = 0;
        const max_installment = 12;
        const currency = 'TL';
        const timeout_limit = 30;

        const hash_str = merchant_id + user_ip + merchant_oid + email + payment_amount + user_basket_encoded + no_installment + max_installment + currency + test_mode;
        const paytr_token = crypto.createHmac('sha256', merchant_key).update(hash_str + merchant_salt).digest('base64');

        const protocol = req.headers['x-forwarded-proto'] || 'https';
        const host = req.headers['host'] || 'www.sarmalticaret.com';
        const baseUrl = process.env.BASE_URL || `${protocol}://${host}`;

        const params = new URLSearchParams({
            merchant_id,
            user_ip,
            merchant_oid,
            email,
            payment_amount,
            paytr_token,
            user_basket: user_basket_encoded,
            debug_on: '1',
            no_installment,
            max_installment,
            user_name: (buyer?.name || 'Müşteri') + ' ' + (buyer?.surname || ''),
            user_address: buyer?.registrationAddress || 'Adres',
            user_phone: buyer?.gsmNumber || '05555555555',
            merchant_ok_url: `${baseUrl}/api/callback?status=success`,
            merchant_fail_url: `${baseUrl}/api/callback?status=fail`,
            timeout_limit,
            currency,
            test_mode
        });

        const paytrRes = await fetch('https://www.paytr.com/odeme/api/get-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        const result = await paytrRes.json();

        if (result.status === 'success' && result.token) {
            return res.status(200).json({
                status: 'success',
                token: result.token,
                paymentPageUrl: `https://www.paytr.com/odeme/guvenli/${result.token}`
            });
        } else {
            console.error("PayTR API Token Error:", result);
            return res.status(500).json({
                status: 'failure',
                errorMessage: result.reason || 'PayTR token oluşturulamadı'
            });
        }
    } catch (err) {
        console.error("PayTR Serverless Exception:", err);
        return res.status(500).json({ status: 'failure', errorMessage: err.message });
    }
}
