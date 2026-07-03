-- ==============================================================
-- 🛡️ SARMAL TİCARET - SUPABASE GÜNCELLEME & RLS DÜZELTME BİLDİRİSİ
-- ==============================================================
-- Bu SQL komutlarını Supabase Dashboard > SQL Editor içinde 
-- yeni bir sorgu (New Query) açıp yapıştırarak çalıştırın (Run).
-- ==============================================================

-- 📦 ADIM 1: HAVALE / EFT BİLDİRİMİ İÇİN YENİ KOLONLARIN EKLENMESİ
-- --------------------------------------------------------------
ALTER TABLE orders ADD COLUMN IF NOT EXISTS transfer_sender VARCHAR(255);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS transfer_bank VARCHAR(100);

-- 🛡️ ADIM 2: RLS (Satır Bazlı Güvenlik) DÜZELTİLMESİ
-- 🚀 SEÇENEK A (EN KOLAY & TAVSİYE EDİLEN ÇÖZÜM):
-- Siparişler ve Sipariş Kalemleri tablolarında RLS kuralını tamamen devre dışı bırakır.
-- Sunucunun (PayTR webhook, checkout ve havale onaylama) sorunsuzca
-- sipariş bilgilerini okuyabilmesi ve güncelleyebilmesi için en pratik yöntemdir.
-- --------------------------------------------------------------
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------------
-- 💡 SEÇENEK B (ALTERNATİF GÜVENLİK MODELİ):
-- Eğer RLS'i açık tutmak istiyorsanız, A seçeneği yerine aşağıdaki
-- komutları çalıştırarak seçme (SELECT), ekleme (INSERT) ve güncelleme (UPDATE) 
-- yetkilerini sunucunun ve misafirlerin erişebileceği şekilde açabilirsiniz.
-- --------------------------------------------------------------
/*
-- 1. Orders tablosundaki eski SELECT politikalarını temizle ve herkese aç
DROP POLICY IF EXISTS "Kullanıcılar kendi siparişlerini görebilir" ON orders;
CREATE POLICY "Siparişler herkese açık seçilebilir" ON orders 
    FOR SELECT USING (true);

-- 2. Orders tablosuna güncelleme (UPDATE) politikası ekle
DROP POLICY IF EXISTS "Siparişler güncellenebilir" ON orders;
CREATE POLICY "Siparişler güncellenebilir" ON orders 
    FOR UPDATE USING (true);

-- 3. Order Items tablosundaki eski SELECT politikalarını temizle ve herkese aç
DROP POLICY IF EXISTS "Kullanıcılar kendi sipariş kalemlerini görebilir" ON order_items;
CREATE POLICY "Sipariş kalemleri herkese açık seçilebilir" ON order_items 
    FOR SELECT USING (true);

-- 4. Order Items tablosuna ekleme (INSERT) politikasını herkese aç
DROP POLICY IF EXISTS "Kullanıcılar sipariş kalemi ekleyebilir" ON order_items;
CREATE POLICY "Sipariş kalemleri eklenebilir" ON order_items 
    FOR INSERT WITH CHECK (true);
*/
