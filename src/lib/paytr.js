// Client-side PayTR token generator fallback helper

async function hmacSha256Base64(message, key) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(key);
    const messageData = encoder.encode(message);

    const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signature = await window.crypto.subtle.sign(
        'HMAC',
        cryptoKey,
        messageData
    );

    const bytes = new Uint8Array(signature);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

export async function createPaytrTokenClient(orderData, products = []) {
    const merchant_id = '681525';
    const merchant_key = 'Tek69wJtdYinHs19';
    const merchant_salt = '8Hzs3PCUu1UzQGkw';
    const test_mode = '0'; // Canlı Mod

    const totalPayable = Number(orderData.total || 100);
    const payment_amount = Math.round(totalPayable * 100).toString();
    const merchant_oid = 'ORD' + String(orderData.id || Date.now()).replace(/[^a-zA-Z0-9]/g, '');

    let user_basket = [];
    let basketSum = 0;

    if (Array.isArray(orderData.items) && orderData.items.length > 0) {
        user_basket = orderData.items.map(item => {
            const itemPrice = Number(item.price || 0);
            const itemQty = Number(item.quantity || 1);
            basketSum += (itemPrice * itemQty);
            const itemTitle = products.find(p => p.id === item.id)?.title || item.name || 'Ürün';
            return [
                itemTitle.substring(0, 50),
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

    const user_basket_encoded = btoa(unescape(encodeURIComponent(JSON.stringify(user_basket))));
    const user_ip = '1.1.1.1';
    const email = (orderData.buyer?.email || 'musteri@sarmalticaret.com').trim();

    let rawName = ((orderData.buyer?.name || '') + ' ' + (orderData.buyer?.surname || '')).trim();
    if (!rawName || rawName.split(' ').filter(Boolean).length < 2) {
        rawName = rawName ? (rawName + ' Müşteri') : 'Değerli Müşterimiz';
    }
    const user_name = rawName.substring(0, 60);

    let rawPhone = (orderData.buyer?.phone || orderData.buyer?.gsmNumber || '05555555555').replace(/[^0-9]/g, '');
    if (rawPhone.length < 10) rawPhone = '05555555555';
    const user_phone = rawPhone;

    const user_address = (orderData.buyer?.address || 'Adres Bilgisi').substring(0, 200);

    const no_installment = 0;
    const max_installment = 12;
    const currency = 'TL';
    const timeout_limit = 30;

    const hash_str = merchant_id + user_ip + merchant_oid + email + payment_amount + user_basket_encoded + no_installment + max_installment + currency + test_mode;
    const paytr_token = await hmacSha256Base64(hash_str + merchant_salt, merchant_key);

    const baseUrl = window.location.origin || 'https://www.sarmalticaret.com';

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
