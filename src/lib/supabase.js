import { createClient } from '@supabase/supabase-js';

// 🔑 Supabase Project Credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ynfecvczapkbiwdekptd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_fG5hUgy0vkXUWr3LmamHrA_BagmSRCM';

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

const ALLOWED_ADMIN_EMAILS = new Set(['sarmalticarett@gmail.com', 'admin@sarmal.com']);

export function isAdminUser(email) {
    if (!email || typeof email !== 'string') return false;
    return ALLOWED_ADMIN_EMAILS.has(email.trim().toLowerCase());
}

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

// Çıkış yap
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

// Şifre sıfırlama e-postası gönder
export async function resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/reset-password` : undefined,
    });
    if (error) throw error;
}

// Mevcut oturumu al
export async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
}

// Auth durumu değişikliğini dinle
export function onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
}

// ==========================================
// 👤 PROFİL FONKSİYONLARI
// ==========================================

// Kullanıcı profilini getir
export async function getUserProfile(userId) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) throw error;
    return data;
}

export async function checkEmailExists(email) {
    if (!email || typeof email !== 'string') return false;
    try {
        const cleanEmail = email.trim().toLowerCase();
        const { data, error } = await supabase
            .from('profiles')
            .select('id')
            .eq('email', cleanEmail)
            .limit(1);

        if (!error && data && data.length > 0) {
            return true;
        }
    } catch (err) {
        console.warn("checkEmailExists failed:", err);
    }
    return false;
}

export const getProfile = getUserProfile;

export async function updateProfile(userId, updates) {
    const { data, error } = await supabase
        .from('profiles')
        .upsert({ id: userId, ...updates, updated_at: new Date().toISOString() });

    if (error) throw error;
    return data;
}

export async function getProfileCount() {
    const { count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return count || 0;
}

export async function getAllProfiles() {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

// ==========================================
// 📦 ÜRÜN FONKSİYONLARI
// ==========================================

export async function getProducts() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
            const activeProds = data.filter(p => p.is_active !== false && String(p.title || '').trim().toUpperCase() !== 'HIDDEN' && Number(p.stock || 0) > 0);
            const finalProds = activeProds.length > 0 ? activeProds : [];
            if (typeof window !== 'undefined' && window.sessionStorage) {
                window.sessionStorage.setItem('sarmal_cached_products', JSON.stringify(finalProds));
            }
            return finalProds;
        }
    } catch (err) {
        console.warn("getProducts network call failed, attempting session cache fallback:", err.message);
    }

    if (typeof window !== 'undefined' && window.sessionStorage) {
        const cached = window.sessionStorage.getItem('sarmal_cached_products');
        if (cached) {
            try { return JSON.parse(cached); } catch (e) {}
        }
    }
    return [];
}

export async function getProductById(id) {
    if (!id) return null;
    try {
        const targetIdStr = String(id);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', targetIdStr)
            .limit(1);

        if (!error && data && data.length > 0) {
            return data[0];
        }

        if (!isNaN(Number(id))) {
            const { data: numData, error: numErr } = await supabase
                .from('products')
                .select('*')
                .eq('id', Number(id))
                .limit(1);
            if (!numErr && numData && numData.length > 0) {
                return numData[0];
            }
        }
    } catch (err) {
        console.warn("getProductById failed:", err);
    }
    return null;
}

export async function purgeHiddenProducts() {
    try {
        await supabase.from('products').delete().or('title.eq.HIDDEN,is_active.eq.false');
    } catch (err) {
        console.warn("purgeHiddenProducts warning:", err.message);
    }
}

export async function getAllProductsAdmin() {
    try {
        await purgeHiddenProducts();
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            return data.filter(p => p.is_active !== false && String(p.title || '').trim().toUpperCase() !== 'HIDDEN');
        }
        return [];
    } catch (err) {
        console.warn("getAllProductsAdmin error:", err);
        return await getProducts();
    }
}

function sanitizeProductPayload(payload) {
    if (!payload || typeof payload !== 'object') return {};
    const clean = { ...payload };
    delete clean.specs;
    delete clean.reviews;
    delete clean.rating;
    delete clean.ratings;
    delete clean.favorite_count;
    return clean;
}

export async function addProduct(product) {
    const cleanPayload = sanitizeProductPayload(product);
    if (!cleanPayload.id) {
        cleanPayload.id = Date.now();
    }
    try {
        let { data, error } = await supabase
            .from('products')
            .insert([{ ...cleanPayload, is_active: true }])
            .select();

        if (!error && data && data.length > 0) {
            return data[0];
        }
        if (error) {
            console.warn("addProduct Supabase RLS / DB warning, using local fallback:", error.message);
        }
    } catch (err) {
        console.warn("addProduct exception, using local fallback:", err.message);
    }

    try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            const cached = JSON.parse(window.sessionStorage.getItem('sarmal_cached_products') || '[]');
            const updated = [cleanPayload, ...cached.filter(p => String(p.id) !== String(cleanPayload.id))];
            window.sessionStorage.setItem('sarmal_cached_products', JSON.stringify(updated));
        }
    } catch (e) {}

    return cleanPayload;
}

export async function updateProduct(productId, updates) {
    const cleanUpdates = sanitizeProductPayload(updates);
    const targetIdStr = String(productId);

    try {
        let { data, error } = await supabase
            .from('products')
            .update(cleanUpdates)
            .eq('id', targetIdStr)
            .select();

        if (error && !isNaN(Number(productId))) {
            const { data: numData, error: numErr } = await supabase
                .from('products')
                .update(cleanUpdates)
                .eq('id', Number(productId))
                .select();
            if (!numErr && numData && numData.length > 0) {
                return numData[0];
            }
        }

        if (!error && data && data.length > 0) {
            return data[0];
        }

        if (error) {
            console.warn("updateProduct Supabase RLS / DB warning, using local fallback:", error.message);
        }
    } catch (err) {
        console.warn("updateProduct exception, using local fallback:", err.message);
    }

    const updatedProduct = { id: productId, ...cleanUpdates };
    try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            const cached = JSON.parse(window.sessionStorage.getItem('sarmal_cached_products') || '[]');
            const updated = cached.map(p => String(p.id) === String(productId) ? { ...p, ...cleanUpdates } : p);
            window.sessionStorage.setItem('sarmal_cached_products', JSON.stringify(updated));
        }
    } catch (e) {}

    return updatedProduct;
}

export async function deleteProduct(productId) {
    const targetIdStr = String(productId);
    
    // 1. Try hard DELETE by string ID
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', targetIdStr);

    if (error) {
        console.warn("deleteProduct string ID failed, trying numeric ID:", error.message);
        if (!isNaN(Number(productId))) {
            const { error: numErr } = await supabase
                .from('products')
                .delete()
                .eq('id', Number(productId));
            if (numErr) {
                console.error("deleteProduct numeric ID failed, soft deleting:", numErr.message);
                await supabase.from('products').update({ is_active: false, title: 'HIDDEN' }).eq('id', Number(productId));
            }
        } else {
            console.error("deleteProduct failed, soft deleting:", error.message);
            await supabase.from('products').update({ is_active: false, title: 'HIDDEN' }).eq('id', targetIdStr);
        }
    }
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
    try {
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_items (
                    *,
                    products (title, price, image)
                )
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        const orders = data || [];
        
        // Attach profiles and addresses safely
        for (let o of orders) {
            if (o.user_id) {
                try {
                    const { data: prof } = await supabase.from('profiles').select('name, email').eq('id', o.user_id).single();
                    o.profiles = prof || null;
                } catch (e) {
                    o.profiles = { name: 'Müşteri', email: '' };
                }
            }
            if (o.address_id) {
                try {
                    const { data: addr } = await supabase.from('addresses').select('*').eq('id', o.address_id).single();
                    o.addresses = addr || null;
                } catch (e) {
                    o.addresses = null;
                }
            }
        }
        return orders;
    } catch (err) {
        console.warn("getAllOrders failed, returning safe fallback:", err.message);
        return [];
    }
}

export const getAllOrdersAdmin = getAllOrders;
export async function getAllUsersAdmin() {
    try {
        const { data, error } = await supabase.from('profiles').select('*');
        if (error) throw error;
        return data || [];
    } catch (e) {
        return [];
    }
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
            is_gift_wrap: orderData.isGiftWrap || false,
            gift_note: orderData.giftNote || '',
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

    if (itemsError) {
        console.error("Order Items Insertion Error:", itemsError);
        if (itemsError.code === '23503') {
            throw new Error("Bazı ürünler artık mevcut değil. Lütfen sepetinizi kontrol edip tekrar deneyin.");
        }
        throw itemsError;
    }

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

    if (itemsError) {
        console.error("Guest Order Items Insertion Error:", itemsError);
        if (itemsError.code === '23503') {
            throw new Error("Bazı ürünler artık mevcut değil. Lütfen sepetinizi kontrol edip tekrar deneyin.");
        }
        throw itemsError;
    }

    return order;
}

export async function updateOrderStatus(orderId, status, additionalChanges = {}) {
    const payload = {
        status,
        updated_at: new Date().toISOString(),
        ...additionalChanges
    };

    try {
        const { data, error } = await supabase
            .from('orders')
            .update(payload)
            .eq('id', orderId)
            .select();

        if (error) throw error;
        return data ? data[0] : payload;
    } catch (err) {
        console.warn("updateOrderStatus primary failed, retrying without optional columns:", err.message);
        const safeChanges = { ...additionalChanges };
        delete safeChanges.payment_status;
        delete safeChanges.transfer_sender;
        delete safeChanges.transfer_bank;

        try {
            const { data, error: retryError } = await supabase
                .from('orders')
                .update({ status, updated_at: new Date().toISOString(), ...safeChanges })
                .eq('id', orderId)
                .select();

            if (retryError) throw retryError;
            return data ? data[0] : payload;
        } catch (fallbackErr) {
            console.error("updateOrderStatus fallback error:", fallbackErr);
            return payload;
        }
    }
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

export async function getAllReviews() {
    try {
        const { data, error } = await supabase
            .from('reviews')
            .select(`
                *,
                profiles (name, email),
                products (title, image)
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (err) {
        console.warn("getAllReviews primary query failed, using safe fallback:", err.message);
        try {
            const { data: safeData, error: safeError } = await supabase
                .from('reviews')
                .select(`*, products (title, image)`)
                .order('created_at', { ascending: false });

            if (safeError) throw safeError;
            return (safeData || []).map(r => ({
                ...r,
                profiles: { name: 'Müşteri', email: '' }
            }));
        } catch (fallbackErr) {
            console.error("getAllReviews fallback error:", fallbackErr);
            return [];
        }
    }
}

export async function deleteReview(reviewId) {
    const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

    if (error) throw error;
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

export const getCouponByCode = getCoupon;

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
