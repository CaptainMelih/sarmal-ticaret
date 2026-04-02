import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    // Login as Admin to bypass RLS modifications
    const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
        email: 'sarmalticarett@gmail.com',
        password: 'sArmal2026!'
    });

    if (authErr || !authData.session) {
        console.error("Login failed:", authErr);
        return;
    }
    console.log("Admin logged in successfully to categorize and fix stock.");

    // Fetch all products
    const { data: products, error: fetchErr } = await supabase.from('products').select('*');
    if (fetchErr) {
        console.error("Error fetching products:", fetchErr);
        return;
    }

    console.log(`Found ${products.length} products to evaluate.`);

    for (const p of products) {
        // We skip hidden/deleted items from previous runs
        if (p.title === 'HIDDEN' || p.title === 'DELETED') continue;

        let newCategory = 2; // Default: Sevgiliye Hediye
        const titleL = p.title.toLowerCase();

        // Categorization rules:
        // 6 - Dekoratif (Küre, Lamba, Akvaryum, Çiçek, Saksı, Müzik Kutusu, Kum Saati, Pano)
        if (titleL.includes('küre') || titleL.includes('lamba') || titleL.includes('akvaryum') ||
            titleL.includes('dekoratif') || titleL.includes('çiçek') || titleL.includes('gül') ||
            titleL.includes('müzik kutusu') || titleL.includes('kum saati') || titleL.includes('pano')) {
            newCategory = 6;
        }

        // 3 - Saat & Aksesuar (Kolye, Küpe, Saat, Yüzük, Bileklik, Taş, İnci)
        if (titleL.includes('kolye') || titleL.includes('inci') || titleL.includes('yüzük') ||
            titleL.includes('takı') || titleL.includes('bileklik') || titleL.includes('saat')) {
            newCategory = 3;
        }

        // 4 - Bardak & Termos (Kupa, Bardak, Termos)
        if (titleL.includes('kupa') || titleL.includes('bardak') || titleL.includes('termos')) {
            newCategory = 4;
        }

        // 1 - Kişiye Özel
        if (titleL.includes('kişiye özel') || titleL.includes('isimli')) {
            newCategory = 1;
        }

        // 5 - Tekstil
        if (titleL.includes('tişört') || titleL.includes('kazak') || titleL.includes('çanta') || titleL.includes('giyim')) {
            newCategory = 5;
        }

        // Fix stock issue (if it's 0 or empty, make it 50)
        let newStock = p.stock;
        if (!newStock || newStock <= 0) {
            newStock = 50;
        }

        // Only update if there's a variation to save API calls
        if (newStock !== p.stock || newCategory !== p.category) {
            console.log(`Updating [${p.id}] ${p.title.substring(0, 30)} - Cat: ${newCategory}, Stock: ${newStock}`);
            const { error: updErr } = await supabase.from('products').update({
                category: newCategory,
                stock: newStock
            }).eq('id', p.id);

            if (updErr) console.error("Error updating:", p.id, updErr);
        }
    }
    console.log("Successfully fixed stocks and categories!");
}

run().catch(console.error);
