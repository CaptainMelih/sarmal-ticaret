import { createClient } from '@supabase/supabase-js';

// 🔑 Supabase Project Credentials
// Bu bilgileri .env dosyasından alıyoruz
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        storageKey: 'sarmal_commerce_auth',
        // Navigator LockManager kilitlenme ve tip hatalarını (timeout & TypeError) önlemek için evrensel çözüm
        lock: (...args) => {
            const callback = args.find(arg => typeof arg === 'function');
            if (callback) return callback();
            return Promise.resolve();
        }
    }
});

// ==========================================
// 🔐 AUTH FONKSİYONLARI
// ==========================================

// Kayıt ol
export async function signUp(email, password, userData = {}) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name: userData.name || '',
                phone: userData.phone || ''
            }
        }
    });

    if (error) throw error;

    // Profil tablosuna kaydet
    if (data.user) {
        await supabase.from('profiles').upsert({
            id: data.user.id,
            name: userData.name || '',
            phone: userData.phone || '',
            email: email,
            created_at: new Date().toISOString()
        });
    }

    return data;
}

// Giriş yap
export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) throw error;
    return data;
}

// Şifre Sıfırlama
export async function resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: typeof window !== 'undefined' ? window.location.origin : '',
    });
    if (error) throw error;
}

// Çıkış yap
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

// Aktif oturumu al
export async function getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
}

// Auth durumu değişikliğini dinle
export function onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
}

// ==========================================
// 👤 PROFİL FONKSİYONLARI
// ==========================================

export async function getProfile(userId) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
}

export async function updateProfile(userId, updates) {
    const { data, error } = await supabase
        .from('profiles')
        .upsert({ id: userId, ...updates, updated_at: new Date().toISOString() });

    if (error) throw error;
    return data;
}

// ==========================================
// 📦 ÜRÜN FONKSİYONLARI
// ==========================================

export async function getProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function addProduct(product) {
    const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select();

    if (error) throw error;
    return data[0];
}

export async function updateProduct(productId, updates) {
    const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', productId)
        .select();

    if (error) throw error;
    return data[0];
}

export async function deleteProduct(productId) {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

    if (error) throw error;
}

// ==========================================
// 🛒 SİPARİŞ FONKSİYONLARI
// ==========================================

export async function getOrders(userId) {
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            order_items (
                *,
                products (title, price, image)
            )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function getAllOrders() {
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            addresses (*),
            order_items (
                *,
                products (title, price, image)
            )
        `)
        .order('created_at', { ascending: false });

    if (error) throw error;
    const orders = data || [];
    
    // Attach profiles manually to bypass missing foreign key constraint
    for (let o of orders) {
        if (o.user_id) {
            const { data: prof } = await supabase.from('profiles').select('name, email').eq('id', o.user_id).single();
            o.profiles = prof || null;
        }
    }
    return orders;
}

export async function createOrder(orderData) {
    // Sipariş oluştur
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
            user_id: orderData.userId,
            address_id: orderData.addressId,
            payment_method: orderData.paymentMethod,
            note: orderData.note || '',
            subtotal: orderData.subtotal,
            discount: orderData.discount || 0,
            coupon_code: orderData.couponCode || null,
            shipping: orderData.shipping || 0,
            total: orderData.total,
            status: 'preparing'
        }])
        .select()
        .single();

    if (orderError) throw orderError;

    // Sipariş öğelerini ekle
    const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
    }));

    const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

    if (itemsError) throw itemsError;

    return order;
}

export async function createGuestOrder(orderData, guestAddress) {
    // Adres oluştur
    const { data: address, error: addressError } = await supabase
        .from('addresses')
        .insert([{
            full_address: guestAddress.fullAddress,
            city: guestAddress.city,
            district: guestAddress.district,
            title: 'Misafir',
            phone: guestAddress.phone,
            user_id: null
        }])
        .select()
        .single();

    if (addressError) throw addressError;

    // Sipariş oluştur
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
            user_id: null,
            address_id: address.id,
            payment_method: orderData.paymentMethod,
            note: orderData.note || '',
            subtotal: orderData.subtotal,
            discount: orderData.discount || 0,
            coupon_code: orderData.couponCode || null,
            shipping: orderData.shipping || 0,
            total: orderData.total,
            status: 'preparing'
        }])
        .select()
        .single();

    if (orderError) throw orderError;

    // Sipariş öğelerini ekle
    const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
    }));

    const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

    if (itemsError) throw itemsError;

    return order;
}

export async function updateOrderStatus(orderId, status, additionalChanges = {}) {
    const { data, error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString(), ...additionalChanges })
        .eq('id', orderId)
        .select();

    if (error) throw error;
    return data[0];
}

// ==========================================
// 📍 ADRES FONKSİYONLARI
// ==========================================

export async function getAddresses(userId) {
    const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function addAddress(userId, address) {
    const { data, error } = await supabase
        .from('addresses')
        .insert([{ user_id: userId, ...address }])
        .select();

    if (error) throw error;
    return data[0];
}

export async function deleteAddress(addressId) {
    const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', addressId);

    if (error) throw error;
}

// ==========================================
// ❤️ FAVORİ FONKSİYONLARI
// ==========================================

export async function getFavorites(userId) {
    const { data, error } = await supabase
        .from('favorites')
        .select('product_id')
        .eq('user_id', userId);

    if (error) throw error;
    return (data || []).map(f => f.product_id);
}

export async function addFavorite(userId, productId) {
    const { error } = await supabase
        .from('favorites')
        .upsert({ user_id: userId, product_id: productId });

    if (error) throw error;
}

export async function removeFavorite(userId, productId) {
    const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

    if (error) throw error;
}

// ==========================================
// ⭐ YORUM FONKSİYONLARI
// ==========================================

export async function getProductReviews(productId) {
    const { data, error } = await supabase
        .from('reviews')
        .select(`
            *,
            profiles (name)
        `)
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function addReview(review) {
    const { data, error } = await supabase
        .from('reviews')
        .insert([review])
        .select();

    if (error) throw error;
    return data[0];
}

export async function getProductAverageRating(productId) {
    const { data, error } = await supabase
        .from('reviews')
        .select('rating')
        .eq('product_id', productId);

    if (error) throw error;

    if (!data || data.length === 0) return { average: 0, count: 0 };

    const sum = data.reduce((acc, r) => acc + r.rating, 0);
    return { average: sum / data.length, count: data.length };
}

// ==========================================
// 🎟️ KUPON FONKSİYONLARI
// ==========================================

export async function getCoupon(code) {
    const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', code.toUpperCase())
        .eq('is_active', true)
        .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (!data) return null;

    // Geçerlilik süresi kontrolü
    if (data.valid_until && new Date(data.valid_until) < new Date()) {
        return null;
    }

    // Kullanım limiti kontrolü
    if (data.usage_limit && data.times_used >= data.usage_limit) {
        return null;
    }

    return data;
}

export async function getCoupons() {
    const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function addCoupon(coupon) {
    const { data, error } = await supabase
        .from('coupons')
        .insert([{ ...coupon, code: coupon.code.toUpperCase() }])
        .select();

    if (error) throw error;
    return data[0];
}

export async function updateCoupon(couponId, updates) {
    const { data, error } = await supabase
        .from('coupons')
        .update(updates)
        .eq('id', couponId)
        .select();

    if (error) throw error;
    return data[0];
}

export async function deleteCoupon(couponId) {
    const { error } = await supabase
        .from('coupons')
        .delete()
        .eq('id', couponId);

    if (error) throw error;
}

export async function useCoupon(couponId) {
    const { data, error } = await supabase.rpc('increment_coupon_usage', { coupon_id: couponId });
    // Not: increment_coupon_usage RPC fonksiyonu veritabanında tanımlanmalı
    // Veya basitçe update ile:
    const { data: coupon } = await supabase.from('coupons').select('times_used').eq('id', couponId).single();
    await supabase.from('coupons').update({ times_used: (coupon?.times_used || 0) + 1 }).eq('id', couponId);
}

// ==========================================
// 🖼️ ÜRÜN RESİMLERİ (Çoklu Fotoğraf)
// ==========================================

export async function getProductImages(productId) {
    const { data, error } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', productId)
        .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
}

export async function addProductImage(productId, url, order = 0) {
    const { data, error } = await supabase
        .from('product_images')
        .insert([{ product_id: productId, url, display_order: order }])
        .select();

    if (error) throw error;
    return data[0];
}

export async function deleteProductImage(imageId) {
    const { error } = await supabase
        .from('product_images')
        .delete()
        .eq('id', imageId);

    if (error) throw error;
}

export async function deleteProductImagesByProduct(productId) {
    const { error } = await supabase
        .from('product_images')
        .delete()
        .eq('product_id', productId);

    if (error) throw error;
}
