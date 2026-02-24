import crypto from 'crypto';

export async function getPaytrToken(orderData) {
    // PayTR'den alınan mağaza bilgileri (Canlıda .env'den gelecek)
    const merchant_id = process.env.PAYTR_MERCHANT_ID || '123456';
    const merchant_key = process.env.PAYTR_MERCHANT_KEY || 'test1';
    const merchant_salt = process.env.PAYTR_MERCHANT_SALT || 'test2';

    // Test ortamında iken 1, canlıya alırken 0 yapacağız
    const test_mode = process.env.PAYTR_TEST_MODE || '1';
    const debug_on = 1;

    const {
        merchant_ok_url,
        merchant_fail_url,
        user_ip,
        merchant_oid, // Benzersiz sipariş no
        email,
        payment_amount, // Örn 100.50 TL -> 10050 formatına çevrilmesi lazım
        user_basket,
        user_name,
        user_address,
        user_phone
    } = orderData;

    const no_installment = 0; // Taksit yapılabilsin mi? (0: Evet, 1: Hayır)
    const max_installment = 12; // Maksimum taksit sayısı
    const currency = 'TL';
    const timeout_limit = 30; // Sayfada kalma süresi (dk)

    // Sepet detayını Base64 formatına çevir
    const user_basket_encoded = Buffer.from(JSON.stringify(user_basket)).toString('base64');

    // PayTR için hash (token) oluşturma (HMAC SHA256)
    const hash_str = merchant_id + user_ip + merchant_oid + email + payment_amount + user_basket_encoded + no_installment + max_installment + currency + test_mode;
    const paytr_token = crypto.createHmac('sha256', merchant_key).update(hash_str + merchant_salt).digest('base64');

    // İstek parametrelerini URL Encoded formata dönüştür
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

    // PayTR API'sine POST isteği at
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

// Güvenli CallBack doğrulaması için eklendi (Ödeme onaylandığında çalışır)
export function verifyPaytrCallback(postData) {
    const merchant_key = process.env.PAYTR_MERCHANT_KEY || 'test1';
    const merchant_salt = process.env.PAYTR_MERCHANT_SALT || 'test2';

    const hash_str = postData.merchant_oid + merchant_salt + postData.status + postData.total_amount;
    const hash = crypto.createHmac('sha256', merchant_key).update(hash_str).digest('base64');

    return hash === postData.hash;
}
