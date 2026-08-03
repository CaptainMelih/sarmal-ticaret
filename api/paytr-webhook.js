import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://ynfecvczapkbiwdekptd.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_fG5hUgy0vkXUWr3LmamHrA_BagmSRCM';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send("Method Not Allowed");
    }

    try {
        const postData = req.body || {};
        const merchant_key = process.env.PAYTR_MERCHANT_KEY || 'Tek69wJtdYinHs19';
        const merchant_salt = process.env.PAYTR_MERCHANT_SALT || '8Hzs3PCUu1UzQGkw';

        const hash_str = (postData.merchant_oid || '') + merchant_salt + (postData.status || '') + (postData.total_amount || '');
        const hash = crypto.createHmac('sha256', merchant_key).update(hash_str).digest('base64');

        if (hash !== postData.hash) {
            console.error("PayTR Webhook Hash Mismatch!");
            return res.status(400).send("PAYTR notification failed: bad hash");
        }

        if (postData.status === 'success') {
            await supabase
                .from('orders')
                .update({ status: 'preparing', payment_status: 'paid', updated_at: new Date().toISOString() })
                .eq('id', postData.merchant_oid);
        } else {
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

        res.status(200).send("OK");
    } catch (err) {
        console.error("PayTR Webhook Error:", err);
        res.status(500).send("ERROR");
    }
}
