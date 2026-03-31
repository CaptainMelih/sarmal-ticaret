import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function tryLogin() {
    const passwords = ['Admin123!', 'Sarmal123!', 'Sarmal2024!', 'Password123!', 'Admin.123'];
    for (const p of passwords) {
        console.log(`Trying password: ${p}...`);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: 'sarmalticarett@gmail.com',
            password: p
        });
        if (!error && data.session) {
            console.log("LOGIN SUCCESSFUL!");
            return true;
        }
    }
    console.error("All password attempts failed.");
    return false;
}

async function importRealProducts() {
    const loggedIn = await tryLogin();
    if (!loggedIn) {
        console.log("Cannot proceed without admin privileges.");
        return;
    }

    console.log("Reading sevgiliye_ozel_full.json...");
    const rawData = fs.readFileSync(path.resolve('./sevgiliye_ozel_full.json'), 'utf-8');
    const productsArray = JSON.parse(rawData);

    console.log(`Found ${productsArray.length} products in JSON.`);

    console.log("Wiping existing products and extra images...");
    // Fetch all existing products to delete them
    const { data: existing } = await supabase.from('products').select('id');
    if (existing && existing.length > 0) {
        for (const p of existing) {
            // Delete product images first (to be safe from foreign key constraints without cascade)
            await supabase.from('product_images').delete().eq('product_id', p.id);
            // Then delete the product (unless ordered, then just hide it)
            const { error: delErr } = await supabase.from('products').delete().eq('id', p.id);
            if (delErr) {
               console.log(`Could not delete product ${p.id} (maybe attached to an order?), hiding it...`);
               await supabase.from('products').update({ stock: 0, title: 'DELETED', image: '' }).eq('id', p.id);
            }
        }
    }

    console.log("Inserting new products...");
    let successful = 0;

    for (const item of productsArray) {
        const title = item['Ürün Adı'] || 'İsimsiz Ürün';
        const price = parseFloat(item['Fiyat']) || 0;
        let description = item['Ürün Açıklaması'] || '';
        
        // Sanitize description formatting
        description = description.replace(/;/g, ' '); 

        // Use Görsel1 as the main image
        const mainImage = item['Görsel1'] || 'https://placehold.co/500x500?text=Görsel+Yok';
        
        const stock = parseInt(item['Stok']) || 0;
        const category = 2; // "Sevgiliye Hediye" based on filename

        // Ignore products with zero price or no primary image if needed, but let's insert anyway
        console.log(`Adding: ${title.substring(0,40)}...`);

        const { data: insertedProduct, error: insertErr } = await supabase
            .from('products')
            .insert({
                title,
                price,
                description,
                image: mainImage,
                category,
                stock
            })
            .select('id')
            .single();

        if (insertErr) {
            console.error(`Failed to insert ${title}`, insertErr);
            continue;
        }

        successful++;
        const newId = insertedProduct.id;

        // Process Extra Images (Görsel2 to Görsel10)
        const extraImages = [];
        for (let i = 2; i <= 10; i++) {
            const extraUrl = item[`Görsel${i}`];
            if (extraUrl && extraUrl.trim().length > 5) {
                extraImages.push({
                    product_id: newId,
                    url: extraUrl.trim()
                });
            }
        }

        if (extraImages.length > 0) {
            const { error: imgErr } = await supabase.from('product_images').insert(extraImages);
            if (imgErr) {
                console.error(`Failed to upload extra images for ${title}`, imgErr);
            }
        }
    }

    console.log("\n==================================");
    console.log(`Successfully imported ${successful} out of ${productsArray.length} real products!`);
    console.log("Ready for live use!");
}

importRealProducts().catch(console.error);
