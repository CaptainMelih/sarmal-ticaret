import crypto from 'crypto';

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

        // 1. Strict Alphanumeric merchant_oid (No special characters allowed by PayTR)
        const merchant_oid = 'ORD' + String(basketId).replace(/[^a-zA-Z0-9]/g, '');

        const totalPayable = Number(price || 100);
        const payment_amount = Math.round(totalPayable * 100).toString();

        // 2. Build user_basket ensuring item sum matches payment_amount / 100
        let user_basket = [];
        let basketSum = 0;

        if (Array.isArray(basketItems) && basketItems.length > 0) {
            user_basket = basketItems.map(item => {
                const itemPrice = Number(item.price || 0);
                const itemQty = Number(item.quantity || 1);
                basketSum += (itemPrice * itemQty);
                return [
                    (item.name || 'Ürün').substring(0, 50),
                    itemPrice.toFixed(2),
                    itemQty
                ];
            });
        }

        const diff = Number((totalPayable - basketSum).toFixed(2));
        if (Math.abs(diff) >= 0.01) {
            if (diff > 0) {
                user_basket.push(['Kargo / Servis Bedeli', diff.toFixed(2), 1]);
            } else {
                user_basket = [['Sipariş Hizmeti', totalPayable.toFixed(2), 1]];
            }
        }

        if (user_basket.length === 0) {
            user_basket = [['Sipariş Hizmeti', totalPayable.toFixed(2), 1]];
        }

        const user_basket_encoded = Buffer.from(JSON.stringify(user_basket)).toString('base64');
        const user_ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.headers['x-real-ip'] || req.socket?.remoteAddress || '1.1.1.1';
        const email = (buyer?.email || 'musteri@sarmalticaret.com').trim();

        // 3. User Name must have at least 2 words
        let rawName = ((buyer?.name || '') + ' ' + (buyer?.surname || '')).trim();
        if (!rawName || rawName.split(' ').filter(Boolean).length < 2) {
            rawName = rawName ? (rawName + ' Müşteri') : 'Değerli Müşterimiz';
        }
        const user_name = rawName.substring(0, 60);

        // 4. User Phone must be digits
        let rawPhone = (buyer?.gsmNumber || buyer?.phone || '05555555555').replace(/[^0-9]/g, '');
        if (rawPhone.length < 10) rawPhone = '05555555555';
        const user_phone = rawPhone;

        const user_address = (buyer?.registrationAddress || buyer?.fullAddress || 'Adres Bilgisi').substring(0, 200);

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
            debug_on: '0',
            no_installment,
            max_installment,
            user_name,
            user_address,
            user_phone,
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
