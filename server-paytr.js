import crypto from 'crypto';

export async function getPaytrToken(orderData) {
    const merchant_id = process.env.PAYTR_MERCHANT_ID || '681525';
    const merchant_key = process.env.PAYTR_MERCHANT_KEY || 'Tek69wJtdYinHs19';
    const merchant_salt = process.env.PAYTR_MERCHANT_SALT || '8Hzs3PCUu1UzQGkw';
    const test_mode = process.env.PAYTR_TEST_MODE || '0';
    const debug_on = 0;

    const {
        merchant_ok_url,
        merchant_fail_url,
        user_ip,
        merchant_oid: rawOid,
        email,
        payment_amount,
        user_basket,
        user_name: rawName,
        user_address,
        user_phone: rawPhone
    } = orderData;

    // Strict Alphanumeric merchant_oid
    const merchant_oid = 'ORD' + String(rawOid).replace(/[^a-zA-Z0-9]/g, '');

    // Strict 2 words user_name
    let user_name = (rawName || '').trim();
    if (!user_name || user_name.split(' ').filter(Boolean).length < 2) {
        user_name = user_name ? (user_name + ' Müşteri') : 'Değerli Müşterimiz';
    }

    // Strict numeric user_phone
    let user_phone = (rawPhone || '05555555555').replace(/[^0-9]/g, '');
    if (user_phone.length < 10) user_phone = '05555555555';

    const no_installment = 0;
    const max_installment = 12;
    const currency = 'TL';
    const timeout_limit = 30;

    const user_basket_encoded = Buffer.from(JSON.stringify(user_basket)).toString('base64');
    const hash_str = merchant_id + user_ip + merchant_oid + email + payment_amount + user_basket_encoded + no_installment + max_installment + currency + test_mode;
    const paytr_token = crypto.createHmac('sha256', merchant_key).update(hash_str + merchant_salt).digest('base64');

    const params = new URLSearchParams({
        merchant_id,
        user_ip,
        merchant_oid,
        email,
        payment_amount,
        paytr_token,
        user_basket: user_basket_encoded,
        debug_on,
        no_installment,
        max_installment,
        user_name,
        user_address,
        user_phone,
        merchant_ok_url,
        merchant_fail_url,
        timeout_limit,
        currency,
        test_mode
    });

    const response = await fetch('https://www.paytr.com/odeme/api/get-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    });

    const result = await response.json();
    return result;
}

export function verifyPaytrCallback(postData) {
    const merchant_key = process.env.PAYTR_MERCHANT_KEY || 'Tek69wJtdYinHs19';
    const merchant_salt = process.env.PAYTR_MERCHANT_SALT || '8Hzs3PCUu1UzQGkw';

    const hash_str = (postData.merchant_oid || '') + merchant_salt + (postData.status || '') + (postData.total_amount || '');
    const hash = crypto.createHmac('sha256', merchant_key).update(hash_str).digest('base64');

    return hash === postData.hash;
}
