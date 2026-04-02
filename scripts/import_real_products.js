import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function tryLogin() {
    console.log(`Trying password: sArmal2026!...`);
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'sarmalticarett@gmail.com',
        password: 'sArmal2026!'
    });
    if (!error && data.session) {
        console.log("LOGIN SUCCESSFUL!");
        return true;
    }
    console.error("Login failed.", error);
    return false;
}

// Yeni json dosyanızın adı buraya yazılmalı:
const JSON_FILENAME = 'sevgiliye_ozel_full.json'; 

async function importRealProducts() {
    const loggedIn = await tryLogin();
    if (!loggedIn) {
        console.log("Cannot proceed without admin privileges.");
        return;
    }

    console.log(`Reading ${JSON_FILENAME}...`);
    let rawData;
    try {
        rawData = fs.readFileSync(path.resolve(`./${JSON_FILENAME}`), 'utf-8');
    } catch (e) {
        console.error(`Could not find ${JSON_FILENAME} - Please make sure the file exists.`);
        return;
    }
    
    const productsArray = JSON.parse(rawData);
    console.log(`Found ${productsArray.length} products in JSON.`);

    console.log("Wiping existing products and extra images...");
    const { data: existing } = await supabase.from('products').select('id');
    if (existing && existing.length > 0) {
        for (const p of existing) {
            await supabase.from('product_images').delete().eq('product_id', p.id);
            const { error: delErr } = await supabase.from('products').delete().eq('id', p.id);
            if (delErr) {
               await supabase.from('products').update({ stock: 0, title: 'HIDDEN', image: '', is_active: false }).eq('id', p.id);
            }
        }
    }

    console.log("Inserting new products...");
    let successful = 0;

    for (const item of productsArray) {
        const title = item['Ürün Adı'] || 'İsimsiz Ürün';
        const price = parseFloat(item['Fiyat']) || 0;
        let description = item['Ürün Açıklaması'] || '';
        description = description.replace(/;/g, ' '); 
        const mainImage = item['Görsel1'] || 'https://placehold.co/500x500?text=Görsel+Yok';
        
        let newStock = parseInt(item['Stok']) || 50;
        if (newStock <= 0) newStock = 50; 

        // Kategori sistemi: 
        let category = 2; 
        const titleL = title.toLowerCase();
        if (titleL.includes('küre') || titleL.includes('lamba') || titleL.includes('akvaryum') || titleL.includes('dekoratif') || titleL.includes('müzik') || titleL.includes('gül')) category = 6;
        if (titleL.includes('kolye') || titleL.includes('inci') || titleL.includes('yüzük') || titleL.includes('saat')) category = 3;
        if (titleL.includes('kupa') || titleL.includes('bardak') || titleL.includes('termos')) category = 4;
        if (titleL.includes('kişiye özel') || titleL.includes('isimli')) category = 1;

        console.log(`Adding: ${title.substring(0,40)}...`);

        const { data: insertedProduct, error: insertErr } = await supabase
            .from('products')
            .insert({ title, price, description, image: mainImage, category, stock: newStock })
            .select('id').single();

        if (insertErr) continue;

        successful++;
        const newId = insertedProduct.id;

        const extraImages = [];
        for (let i = 2; i <= 10; i++) {
            const extraUrl = item[`Görsel${i}`];
            if (extraUrl && extraUrl.trim().length > 5) extraImages.push({ product_id: newId, url: extraUrl.trim() });
        }
        if (extraImages.length > 0) await supabase.from('product_images').insert(extraImages);
    }

    console.log("\n==================================");
    console.log(`Successfully imported ${successful} out of ${productsArray.length} real products!`);
}

importRealProducts().catch(console.error);
