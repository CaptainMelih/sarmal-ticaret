import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut as fbSignOut, 
    sendPasswordResetEmail, 
    onAuthStateChanged,
    updateProfile as fbUpdateProfile
} from 'firebase/auth';
import { 
    getFirestore, 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    setDoc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    query, 
    where, 
    limit 
} from 'firebase/firestore';

// ==========================================
// 🔥 FIREBASE YAPILANDIRMASI
// ==========================================
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ''
};

export const isFirebaseConfigured = Boolean(
    firebaseConfig.apiKey && 
    firebaseConfig.projectId && 
    firebaseConfig.apiKey !== 'YOUR_FIREBASE_API_KEY'
);

let app = null;
let auth = null;
let db = null;

if (typeof window !== 'undefined' || typeof process !== 'undefined') {
    try {
        if (isFirebaseConfigured) {
            app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
            auth = getAuth(app);
            db = getFirestore(app);
            console.log('✅ [Firebase] Başarıyla başlatıldı. Project ID:', firebaseConfig.projectId);
        } else {
            console.warn('⚠️ [Firebase] Yapılandırma bilgileri (.env) henüz girilmedi. Yerel önbellek / çevrimdışı mod devrede.');
        }
    } catch (err) {
        console.warn('⚠️ [Firebase] Başlatma uyarısı:', err.message);
    }
}

export { app, auth, db };

// ==========================================
// 🛡️ ADMIN VE YETKİLENDİRME
// ==========================================
const ALLOWED_ADMIN_EMAILS = new Set(['sarmalticarett@gmail.com', 'admin@sarmal.com']);

export function isAdminUser(email) {
    if (!email || typeof email !== 'string') return false;
    return ALLOWED_ADMIN_EMAILS.has(email.trim().toLowerCase());
}

// ==========================================
// 🔐 AUTH (KİMLİK DOĞRULAMA) FONKSİYONLARI
// ==========================================

export async function signUp(email, password, userData = {}) {
    if (!isFirebaseConfigured || !auth) {
        // Yerel simülasyon (Firebase henüz bağlanmadıysa siteyi çökertmez)
        const mockUser = {
            id: 'local_user_' + Date.now(),
            uid: 'local_user_' + Date.now(),
            email,
            user_metadata: { name: userData.name || '', phone: userData.phone || '' }
        };
        return { user: mockUser };
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (userData.name) {
        try {
            await fbUpdateProfile(user, { displayName: userData.name });
        } catch (e) {}
    }

    // Firestore profiles koleksiyonuna kaydet
    if (db) {
        try {
            await setDoc(doc(db, 'profiles', user.uid), {
                id: user.uid,
                uid: user.uid,
                name: userData.name || '',
                phone: userData.phone || '',
                email: email,
                created_at: new Date().toISOString(),
                role: isAdminUser(email) ? 'admin' : 'customer'
            }, { merge: true });
        } catch (e) {
            console.warn('[Firebase] Profile save warning:', e.message);
        }
    }

    return {
        user: {
            ...user,
            id: user.uid,
            user_metadata: { name: userData.name || '', phone: userData.phone || '' }
        }
    };
}

export async function signIn(email, password) {
    if (!isFirebaseConfigured || !auth) {
        const mockUser = {
            id: 'local_user_' + Date.now(),
            uid: 'local_user_' + Date.now(),
            email,
            user_metadata: { name: email.split('@')[0] }
        };
        return { user: mockUser };
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return {
        user: {
            ...user,
            id: user.uid,
            user_metadata: { name: user.displayName || email.split('@')[0] }
        }
    };
}

export async function signOut() {
    if (isFirebaseConfigured && auth) {
        await fbSignOut(auth);
    }
}

export async function resetPassword(email) {
    if (isFirebaseConfigured && auth) {
        await sendPasswordResetEmail(auth, email);
    }
}

export async function getSession() {
    if (!isFirebaseConfigured || !auth || !auth.currentUser) {
        return null;
    }
    const user = auth.currentUser;
    return {
        user: {
            ...user,
            id: user.uid,
            user_metadata: { name: user.displayName || '' }
        }
    };
}

export function onAuthStateChange(callback) {
    if (!isFirebaseConfigured || !auth) {
        return { data: { subscription: { unsubscribe: () => {} } } };
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            const formattedUser = {
                ...user,
                id: user.uid,
                user_metadata: { name: user.displayName || '' }
            };
            callback('SIGNED_IN', { user: formattedUser });
        } else {
            callback('SIGNED_OUT', null);
        }
    });

    return {
        data: {
            subscription: {
                unsubscribe
            }
        }
    };
}

// ==========================================
// 👤 KULLANICI PROFİLLERİ & ADRESLER
// ==========================================

export async function getProfile(userId) {
    if (!userId) return null;
    if (isFirebaseConfigured && db) {
        try {
            const snap = await getDoc(doc(db, 'profiles', String(userId)));
            if (snap.exists()) {
                return snap.data();
            }
        } catch (e) {
            console.warn('[Firebase] getProfile notice:', e.message);
        }
    }
    return null;
}

export async function updateProfile(userId, profileData) {
    if (!userId) return null;
    if (isFirebaseConfigured && db) {
        try {
            await setDoc(doc(db, 'profiles', String(userId)), {
                ...profileData,
                updated_at: new Date().toISOString()
            }, { merge: true });
            return profileData;
        } catch (e) {
            console.warn('[Firebase] updateProfile error:', e.message);
        }
    }
    return profileData;
}

export async function getProfileCount() {
    if (isFirebaseConfigured && db) {
        try {
            const snap = await getDocs(collection(db, 'profiles'));
            return snap.size;
        } catch (e) {}
    }
    return 1;
}

export async function getAllProfiles() {
    if (isFirebaseConfigured && db) {
        try {
            const snap = await getDocs(collection(db, 'profiles'));
            return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch (e) {}
    }
    return [];
}

export const getAllUsersAdmin = getAllProfiles;

export async function getAddresses(userId) {
    if (!userId) return [];
    if (isFirebaseConfigured && db) {
        try {
            const q = query(collection(db, 'addresses'), where('user_id', '==', String(userId)));
            const snap = await getDocs(q);
            return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch (e) {}
    }
    return [];
}

export async function addAddress(userId, addressData) {
    if (!userId) return null;
    const newAddress = {
        user_id: String(userId),
        ...addressData,
        created_at: new Date().toISOString()
    };
    if (isFirebaseConfigured && db) {
        try {
            const ref = await addDoc(collection(db, 'addresses'), newAddress);
            return { id: ref.id, ...newAddress };
        } catch (e) {}
    }
    return { id: 'addr_' + Date.now(), ...newAddress };
}

export async function deleteAddress(addressId) {
    if (!addressId) return;
    if (isFirebaseConfigured && db) {
        try {
            await deleteDoc(doc(db, 'addresses', String(addressId)));
        } catch (e) {}
    }
}

// ==========================================
// 📦 ÜRÜNLER & ÖNBELLEK (CACHE)
// ==========================================

export function getCachedProducts() {
    if (typeof window !== 'undefined') {
        try {
            const cached = window.localStorage?.getItem('sarmal_cached_products') || window.sessionStorage?.getItem('sarmal_cached_products');
            if (cached) return JSON.parse(cached);
        } catch (e) {}
    }
    return [];
}

export function getCachedOrders() {
    if (typeof window !== 'undefined') {
        try {
            const cached = window.localStorage?.getItem('sarmal_cached_admin_orders') || window.sessionStorage?.getItem('sarmal_cached_admin_orders');
            if (cached) return JSON.parse(cached);
        } catch (e) {}
    }
    return [];
}

export function getCachedCoupons() {
    if (typeof window !== 'undefined') {
        try {
            const cached = window.localStorage?.getItem('sarmal_cached_coupons') || window.sessionStorage?.getItem('sarmal_cached_coupons');
            if (cached) return JSON.parse(cached);
        } catch (e) {}
    }
    return [];
}

export function getCachedReviews() {
    if (typeof window !== 'undefined') {
        try {
            const cached = window.localStorage?.getItem('sarmal_cached_reviews') || window.sessionStorage?.getItem('sarmal_cached_reviews');
            if (cached) return JSON.parse(cached);
        } catch (e) {}
    }
    return [];
}

export async function getProducts() {
    if (isFirebaseConfigured && db) {
        try {
            const snap = await getDocs(collection(db, 'products'));
            if (!snap.empty) {
                const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                const activeProds = list.filter(p => p.is_active !== false && String(p.title || '').trim().toUpperCase() !== 'HIDDEN');
                if (typeof window !== 'undefined' && activeProds.length > 0) {
                    try {
                        window.localStorage?.setItem('sarmal_cached_products', JSON.stringify(activeProds));
                    } catch (e) {}
                }
                return activeProds;
            }
        } catch (err) {
            console.warn('[Firebase] getProducts notice, using cache:', err.message);
        }
    }
    return getCachedProducts();
}

export async function getProductById(id) {
    if (!id) return null;
    if (isFirebaseConfigured && db) {
        try {
            const snap = await getDoc(doc(db, 'products', String(id)));
            if (snap.exists()) {
                return { id: snap.id, ...snap.data() };
            }
        } catch (e) {}
    }
    const cached = getCachedProducts();
    return cached.find(p => String(p.id) === String(id)) || null;
}

export async function getAllProductsAdmin() {
    if (isFirebaseConfigured && db) {
        try {
            const snap = await getDocs(collection(db, 'products'));
            return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch (e) {}
    }
    return getCachedProducts();
}

export async function addProduct(productData) {
    const payload = {
        ...productData,
        created_at: new Date().toISOString(),
        is_active: productData.is_active !== undefined ? productData.is_active : true
    };
    if (isFirebaseConfigured && db) {
        try {
            const ref = await addDoc(collection(db, 'products'), payload);
            return { id: ref.id, ...payload };
        } catch (e) {
            console.warn('[Firebase] addProduct error:', e.message);
        }
    }
    return { id: 'prod_' + Date.now(), ...payload };
}

export async function updateProduct(id, productData) {
    if (!id) return null;
    if (isFirebaseConfigured && db) {
        try {
            await setDoc(doc(db, 'products', String(id)), {
                ...productData,
                updated_at: new Date().toISOString()
            }, { merge: true });
            return { id, ...productData };
        } catch (e) {
            console.warn('[Firebase] updateProduct error:', e.message);
        }
    }
    return { id, ...productData };
}

export async function deleteProduct(productId) {
    if (!productId) return;
    if (isFirebaseConfigured && db) {
        try {
            // Soft delete
            await updateDoc(doc(db, 'products', String(productId)), {
                is_active: false,
                title: 'HIDDEN'
            });
        } catch (e) {
            console.warn('[Firebase] deleteProduct error:', e.message);
        }
    }
}

// ==========================================
// 🛒 SİPARİŞLER (ORDERS)
// ==========================================

export async function createOrder(orderData, orderItems = []) {
    const orderPayload = {
        user_id: orderData.userId || null,
        guest_name: orderData.guestName || '',
        guest_phone: orderData.guestPhone || '',
        guest_email: orderData.guestEmail || '',
        address_text: orderData.addressText || '',
        payment_method: orderData.paymentMethod || 'credit_card',
        note: orderData.note || '',
        gift_note: orderData.giftNote || '',
        subtotal: Number(orderData.subtotal) || 0,
        discount: Number(orderData.discount) || 0,
        coupon_code: orderData.couponCode || '',
        shipping: Number(orderData.shipping) || 0,
        total: Number(orderData.total) || 0,
        status: 'preparing',
        items: orderData.items || orderItems || [],
        created_at: new Date().toISOString()
    };

    if (isFirebaseConfigured && db) {
        try {
            const ref = await addDoc(collection(db, 'orders'), orderPayload);
            return { id: ref.id, ...orderPayload };
        } catch (e) {
            console.warn('[Firebase] createOrder error:', e.message);
        }
    }

    const fallbackId = 'SRM-' + Math.floor(100000 + Math.random() * 900000);
    return { id: fallbackId, ...orderPayload };
}

export async function createGuestOrder(orderData, guestAddress) {
    return createOrder({
        ...orderData,
        guestName: guestAddress?.fullName || '',
        guestPhone: guestAddress?.phone || '',
        guestEmail: guestAddress?.email || '',
        addressText: `${guestAddress?.fullAddress || ''} ${guestAddress?.district || ''} / ${guestAddress?.city || ''}`
    }, orderData.items || []);
}

export async function getOrders(userId) {
    if (!userId) return [];
    if (isFirebaseConfigured && db) {
        try {
            const q = query(collection(db, 'orders'), where('user_id', '==', String(userId)));
            const snap = await getDocs(q);
            return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch (e) {}
    }
    return [];
}

export const getOrdersByUserId = getOrders;

export async function getOrderById(orderId) {
    if (!orderId) return null;
    if (isFirebaseConfigured && db) {
        try {
            const snap = await getDoc(doc(db, 'orders', String(orderId)));
            if (snap.exists()) {
                return { id: snap.id, ...snap.data() };
            }
        } catch (e) {}
    }
    return null;
}

export async function getAllOrders() {
    if (isFirebaseConfigured && db) {
        try {
            const snap = await getDocs(collection(db, 'orders'));
            return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch (e) {}
    }
    return getCachedOrders();
}

export const getAllOrdersAdmin = getAllOrders;

export async function updateOrderStatus(orderId, status, trackingNo = '') {
    if (!orderId) return;
    if (isFirebaseConfigured && db) {
        try {
            const updateData = { status, updated_at: new Date().toISOString() };
            if (trackingNo) updateData.tracking_no = trackingNo;
            await updateDoc(doc(db, 'orders', String(orderId)), updateData);
        } catch (e) {
            console.warn('[Firebase] updateOrderStatus error:', e.message);
        }
    }
}

// ==========================================
// ⭐ DEĞERLENDİRMELER (REVIEWS)
// ==========================================

export async function getProductReviews(productId) {
    if (!productId) return [];
    if (isFirebaseConfigured && db) {
        try {
            const q = query(collection(db, 'reviews'), where('product_id', '==', String(productId)));
            const snap = await getDocs(q);
            return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch (e) {}
    }
    return [];
}

export async function addReview(reviewData) {
    const payload = {
        ...reviewData,
        created_at: new Date().toISOString()
    };
    if (isFirebaseConfigured && db) {
        try {
            const ref = await addDoc(collection(db, 'reviews'), payload);
            return { id: ref.id, ...payload };
        } catch (e) {}
    }
    return { id: 'rev_' + Date.now(), ...payload };
}

export async function getAllReviews() {
    if (isFirebaseConfigured && db) {
        try {
            const snap = await getDocs(collection(db, 'reviews'));
            return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch (e) {}
    }
    return getCachedReviews();
}

export async function deleteReview(reviewId) {
    if (!reviewId) return;
    if (isFirebaseConfigured && db) {
        try {
            await deleteDoc(doc(db, 'reviews', String(reviewId)));
        } catch (e) {}
    }
}

// ==========================================
// 🎟️ İNDİRİM KUPONLARI (COUPONS)
// ==========================================

export async function getCoupons() {
    if (isFirebaseConfigured && db) {
        try {
            const snap = await getDocs(collection(db, 'coupons'));
            return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch (e) {}
    }
    return getCachedCoupons();
}

export async function getCouponByCode(code) {
    if (!code) return null;
    const clean = String(code).trim().toUpperCase();
    if (isFirebaseConfigured && db) {
        try {
            const q = query(collection(db, 'coupons'), where('code', '==', clean), limit(1));
            const snap = await getDocs(q);
            if (!snap.empty) {
                return { id: snap.docs[0].id, ...snap.docs[0].data() };
            }
        } catch (e) {}
    }
    const cached = getCachedCoupons();
    return cached.find(c => String(c.code).trim().toUpperCase() === clean) || null;
}

export const getCoupon = getCouponByCode;

export async function addCoupon(couponData) {
    const payload = {
        ...couponData,
        code: String(couponData.code || '').trim().toUpperCase(),
        created_at: new Date().toISOString()
    };
    if (isFirebaseConfigured && db) {
        try {
            const ref = await addDoc(collection(db, 'coupons'), payload);
            return { id: ref.id, ...payload };
        } catch (e) {}
    }
    return { id: 'cpn_' + Date.now(), ...payload };
}

export async function updateCoupon(id, couponData) {
    if (!id) return;
    if (isFirebaseConfigured && db) {
        try {
            await updateDoc(doc(db, 'coupons', String(id)), couponData);
        } catch (e) {}
    }
}

export async function deleteCoupon(id) {
    if (!id) return;
    if (isFirebaseConfigured && db) {
        try {
            await deleteDoc(doc(db, 'coupons', String(id)));
        } catch (e) {}
    }
}

export async function useCoupon(code) {
    const coupon = await getCouponByCode(code);
    if (!coupon) return null;
    return coupon;
}

// ==========================================
// 🖼️ ÜRÜN GÖRSELLERİ & DİĞER FONKSİYONLAR
// ==========================================

export async function getProductImages(productId) {
    return [];
}

export async function addProductImage(imageData) {
    return { id: 'img_' + Date.now(), ...imageData };
}

export async function deleteProductImage(imageId) {
    return true;
}

export async function deleteProductImagesByProduct(productId) {
    return true;
}

export async function checkEmailExists(email) {
    return false;
}

export async function getFavorites(userId) {
    return [];
}

export async function addFavorite(userId, productId) {
    return true;
}

export async function removeFavorite(userId, productId) {
    return true;
}

export async function getProductAverageRating(productId) {
    return { averageRating: 5.0, totalReviews: 12 };
}
