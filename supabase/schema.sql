-- ============================================
-- 🗄️ SARMAL TİCARET - SUPABASE VERİTABANI ŞEMASI
-- ============================================
-- Bu SQL kodlarını Supabase Dashboard > SQL Editor'da çalıştırın
-- ============================================

-- ============================================
-- 1. PROFILES TABLOSU (Kullanıcı Profilleri)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    phone TEXT DEFAULT '',
    avatar_url TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profil için RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Herkes profilleri görebilir
CREATE POLICY "Profiller herkese açık" ON profiles
    FOR SELECT USING (true);

-- Kullanıcılar sadece kendi profilini düzenleyebilir
CREATE POLICY "Kullanıcılar kendi profilini düzenleyebilir" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Kullanıcılar kendi profilini oluşturabilir
CREATE POLICY "Kullanıcılar kendi profilini oluşturabilir" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Yeni kullanıcı kaydında otomatik profil oluşturma trigger'ı
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, name, email, phone)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', ''),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'phone', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: auth.users'a yeni kayıt olduğunda profiles'a ekle
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- ============================================
-- 2. PRODUCTS TABLOSU (Ürünler)
-- ============================================
CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    image TEXT DEFAULT '',
    category INTEGER NOT NULL DEFAULT 1,
    stock INTEGER DEFAULT 100,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Herkes ürünleri görebilir
CREATE POLICY "Ürünler herkese açık" ON products
    FOR SELECT USING (true);

-- Sadece auth olan kullanıcılar ürün ekleyebilir (gerçek uygulamada admin kontrolü ekleyin)
CREATE POLICY "Auth kullanıcılar ürün ekleyebilir" ON products
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Auth kullanıcılar ürün güncelleyebilir" ON products
    FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Auth kullanıcılar ürün silebilir" ON products
    FOR DELETE USING (auth.uid() IS NOT NULL);


-- ============================================
-- 3. ORDERS TABLOSU (Siparişler)
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    address_id BIGINT,
    payment_method TEXT DEFAULT 'credit',
    note TEXT DEFAULT '',
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
    discount DECIMAL(10,2) DEFAULT 0,
    coupon_code TEXT,
    shipping DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL DEFAULT 0,
    status TEXT DEFAULT 'preparing' CHECK (status IN ('preparing', 'shipping', 'delivered', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Kullanıcılar veya misafirler kendi siparişlerini görebilir
CREATE POLICY "Kullanıcılar kendi siparişlerini görebilir" ON orders
    FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

-- Kullanıcılar veya misafirler sipariş oluşturabilir
CREATE POLICY "Kullanıcılar sipariş oluşturabilir" ON orders
    FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);


-- ============================================
-- 4. ORDER_ITEMS TABLOSU (Sipariş Kalemleri)
-- ============================================
CREATE TABLE IF NOT EXISTS order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
    product_id BIGINT REFERENCES products(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Kullanıcılar veya misafirler sipariş kalemlerini görebilir
CREATE POLICY "Kullanıcılar kendi sipariş kalemlerini görebilir" ON order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND (orders.user_id = auth.uid() OR orders.user_id IS NULL)
        )
    );

-- Kullanıcılar ve misafirler sipariş kalemi ekleyebilir
CREATE POLICY "Kullanıcılar sipariş kalemi ekleyebilir" ON order_items
    FOR INSERT WITH CHECK (true);

-- Sipariş kalemi ekleme
CREATE POLICY "Kullanıcılar sipariş kalemi ekleyebilir" ON order_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
        )
    );


-- ============================================
-- 5. ADDRESSES TABLOSU (Adresler)
-- ============================================
CREATE TABLE IF NOT EXISTS addresses (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Ev',
    full_address TEXT NOT NULL DEFAULT '',
    city TEXT NOT NULL DEFAULT '',
    district TEXT DEFAULT '',
    zip_code TEXT DEFAULT '',
    phone TEXT DEFAULT '',
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kullanıcılar kendi adreslerini görebilir" ON addresses
    FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Kullanıcılar adres ekleyebilir" ON addresses
    FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Kullanıcılar kendi adreslerini silebilir" ON addresses
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar kendi adreslerini güncelleyebilir" ON addresses
    FOR UPDATE USING (auth.uid() = user_id);


-- ============================================
-- 6. FAVORITES TABLOSU (Favoriler)
-- ============================================
CREATE TABLE IF NOT EXISTS favorites (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kullanıcılar kendi favorilerini görebilir" ON favorites
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar favori ekleyebilir" ON favorites
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar favori silebilir" ON favorites
    FOR DELETE USING (auth.uid() = user_id);


-- ============================================
-- 7. REVIEWS TABLOSU (Yorumlar & Puanlar)
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Herkes yorumları görebilir
CREATE POLICY "Yorumlar herkese açık" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Kullanıcılar yorum yazabilir" ON reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar kendi yorumlarını silebilir" ON reviews
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar kendi yorumlarını güncelleyebilir" ON reviews
    FOR UPDATE USING (auth.uid() = user_id);


-- ============================================
-- 8. NEWSLETTER_SUBSCRIBERS TABLOSU
-- ============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id BIGSERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Herkes abone olabilir
CREATE POLICY "Herkes newsletter'a abone olabilir" ON newsletter_subscribers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Kendi aboneliğini görebilir" ON newsletter_subscribers
    FOR SELECT USING (true);


-- ============================================
-- 9. ÖRNEK ÜRÜNLER YÜKLE
-- ============================================
INSERT INTO products (title, description, price, image, category) VALUES
    ('Lüx Çakmak ve Saat Kombini', 'Kişiye özel isim yazılabilir, şık erkek seti.', 350, 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=500&q=80', 1),
    ('Cam Fanus İçinde Solmayan Gül', 'Sevdiklerinize özel romantik hediye.', 450, 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&w=500&q=80', 2),
    ('Kişiye Özel İsimli Termos', '500ml paslanmaz çelik termos, isim yazılır.', 250, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80', 4),
    ('Çelik Erkek Bileklik', 'İsim yazılabilir unisex bileklik.', 180, 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=500&q=80', 3),
    ('Dekoratif Sihirli Ayna', 'LED ışıklı fotoğraf çerçeveli masa aynası.', 320, 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=500&q=80', 6),
    ('Lüks Kupa Bardak Seti', 'Kişiye özel 2li kupa bardak seti.', 220, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=500&q=80', 4),
    ('Deri Cüzdan', '%100 hakiki deri, isim baskılı cüzdan.', 290, 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=80', 1),
    ('Romantik Mum Seti', 'Özel kutulu aromaterapi mum seti.', 150, 'https://images.unsplash.com/photo-1602874801006-c2dea7a3f3d7?auto=format&fit=crop&w=500&q=80', 2),
    ('Akıllı Saat Erkek', 'Su geçirmez, çok fonksiyonlu akıllı saat.', 890, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80', 3),
    ('Premium Kalem Seti', 'İsimli lüks tükenmez kalem ve dolma kalem seti.', 340, 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=500&q=80', 1),
    ('Sevgililer Günü Kutusu', 'Çikolata, çiçek ve özel mesajlı kart kombini.', 520, 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=500&q=80', 2),
    ('Gümüş Kolye Kadın', '925 ayar gümüş, isimli kolye.', 680, 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80', 3),
    ('Bambu Kahve Fincan Seti', 'Çevre dostu, 4lü kahve fincan takımı.', 280, 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=500&q=80', 4),
    ('Kişiye Özel Bornoz', 'Premium pamuklu, isim nakışlı bornoz.', 420, 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=500&q=80', 5),
    ('LED Strip Işıklı Tablo', 'Modern tasarım, renkli LED ışıklı duvar tablosu.', 550, 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?auto=format&fit=crop&w=500&q=80', 6),
    ('Çift Yüzükleri Seti', 'İsim kazılı, 925 ayar gümüş çift yüzükleri.', 750, 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=80', 2)
ON CONFLICT DO NOTHING;


-- ============================================
-- 🔧 INDEXLER (Performans İçin)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_product_id ON favorites(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);


-- ============================================
-- 10. COUPONS TABLOSU (Kuponlar)
-- ============================================
CREATE TABLE IF NOT EXISTS coupons (
    id BIGSERIAL PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_amount DECIMAL(10,2) NOT NULL,
    min_purchase DECIMAL(10,2) DEFAULT 0,
    valid_until TIMESTAMPTZ,
    usage_limit INTEGER DEFAULT NULL,
    times_used INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- Herkes kuponları görebilir (veya sadece auth olanlar kontrol edebilir)
CREATE POLICY "Kuponlar herkese açık" ON coupons
    FOR SELECT USING (true);

-- Admin ekleyebilir/güncelleyebilir
CREATE POLICY "Admin kupon yönetebilir" ON coupons
    FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE email = 'sarmalticarett@gmail.com'));


-- ============================================
-- 11. PRODUCT_IMAGES TABLOSU (Çoklu Fotoğraf)
-- ============================================
CREATE TABLE IF NOT EXISTS product_images (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ürün resimleri herkese açık" ON product_images
    FOR SELECT USING (true);

CREATE POLICY "Admin ürün resimlerini yönetebilir" ON product_images
    FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE email = 'sarmalticarett@gmail.com'));

-- Indexler
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
