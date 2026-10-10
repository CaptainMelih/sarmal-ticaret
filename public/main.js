/**
 * SARMAL TİCARET - ÇOK SAYFALI (SEPET, FAVORİLER, GİRİŞ, KAYIT, KATEGORİ) E-TİCARET MOTORU
 */

// --- 1. MAĞAZA VERİLERİ ---
const CATEGORIES_DATA = [
  {
    "slug": "market",
    "name": "Market & Temel Gıda",
    "shortName": "Market",
    "icon": "🛒",
    "description": "Doğal bal, ev yapımı reçeller, taş baskı zeytinyağı, kahvaltılık ve gurme market ürünleri. Multinet Up (MultiPay) yemek kartı ile güvenli alışveriş."
  }
];
const PRODUCTS_DATA = [
  {
    "id": 1,
    "name": "Doğal Karakovan Süzme Çiçek Balı & Çam Balı Gurme Seti (2 x 850g)",
    "brand": "Sarmal Gurme",
    "categorySlug": "market",
    "category": "Market & Temel Gıda",
    "price": 980,
    "oldPrice": 1250,
    "discountPercent": 22,
    "badge": "%22 İndirim",
    "rating": "4.9",
    "reviews": 42,
    "image": "/images/products/karakovan_bali.jpg",
    "inStock": true,
    "barcode": "869000100101"
  },
  {
    "id": 2,
    "name": "Ev Yapımı Doğal Çilek Reçeli 3'lü Gurme Set (3 x 450g)",
    "brand": "Sarmal Gurme",
    "categorySlug": "market",
    "category": "Market & Temel Gıda",
    "price": 549.9,
    "oldPrice": 680,
    "discountPercent": 19,
    "badge": "Yeni",
    "rating": "4.8",
    "reviews": 28,
    "image": "/images/products/cilek_receli.jpg",
    "inStock": true,
    "barcode": "869000100102"
  },
  {
    "id": 3,
    "name": "Geleneksel Doğal Vişne Reçeli 3'lü Gurme Set (3 x 450g)",
    "brand": "Sarmal Gurme",
    "categorySlug": "market",
    "category": "Market & Temel Gıda",
    "price": 549.9,
    "oldPrice": 680,
    "discountPercent": 19,
    "badge": "Fırsat",
    "rating": "4.9",
    "reviews": 35,
    "image": "/images/products/visne_receli.jpg",
    "inStock": true,
    "barcode": "869000100103"
  },
  {
    "id": 4,
    "name": "Taş Baskı Soğuk Sıkım Naturel Sızma Zeytinyağı Teneke (5 Litre)",
    "brand": "Ege Bahçesi",
    "categorySlug": "market",
    "category": "Market & Temel Gıda",
    "price": 1850,
    "oldPrice": 2150,
    "discountPercent": 14,
    "badge": "Çok Satan",
    "rating": "5.0",
    "reviews": 64,
    "image": "/images/products/zeytinyagi.jpg",
    "inStock": true,
    "barcode": "869000100104"
  },
  {
    "id": 5,
    "name": "Köy Tipi Doğal Yayla Tereyağı Blok Vakumlu (2 kg)",
    "brand": "Trabzon Çiftliği",
    "categorySlug": "market",
    "category": "Market & Temel Gıda",
    "price": 940,
    "oldPrice": 1100,
    "discountPercent": 15,
    "badge": "Taze",
    "rating": "4.9",
    "reviews": 38,
    "image": "/images/products/tereyagi.jpg",
    "inStock": true,
    "barcode": "869000100105"
  },
  {
    "id": 6,
    "name": "Gemlik Doğal Yağlı Sele Siyah Zeytin Özel Teneke (3 kg)",
    "brand": "Gemlik Yöresel",
    "categorySlug": "market",
    "category": "Market & Temel Gıda",
    "price": 780,
    "oldPrice": 920,
    "discountPercent": 15,
    "badge": "%15 İndirim",
    "rating": "4.8",
    "reviews": 51,
    "image": "/images/products/zeytin.jpg",
    "inStock": true,
    "barcode": "869000100106"
  },
  {
    "id": 7,
    "name": "Tam Yağlı Olgunlaştırılmış Eski Kaşar & Ezine Peyniri Seçki (2 kg)",
    "brand": "Ezine Mandıra",
    "categorySlug": "market",
    "category": "Market & Temel Gıda",
    "price": 820,
    "oldPrice": 960,
    "discountPercent": 15,
    "badge": "Geleneksel",
    "rating": "4.9",
    "reviews": 47,
    "image": "/images/products/peynir.jpg",
    "inStock": true,
    "barcode": "869000100107"
  },
  {
    "id": 8,
    "name": "Giresun Çifte Kavrulmuş Doğal Fındık Ezmesi (1 kg Cam Kavanoz)",
    "brand": "Sarmal Gurme",
    "categorySlug": "market",
    "category": "Market & Temel Gıda",
    "price": 560,
    "oldPrice": 680,
    "discountPercent": 18,
    "badge": "Doğal",
    "rating": "4.9",
    "reviews": 33,
    "image": "/images/products/findik_ezmesi.jpg",
    "inStock": true,
    "barcode": "869000100108"
  },
  {
    "id": 9,
    "name": "Geleneksel Doğal Köy Üzüm Pekmezi Cam Kavanoz 2'li Set (2 x 1 kg)",
    "brand": "Antalya Yöresel",
    "categorySlug": "market",
    "category": "Market & Temel Gıda",
    "price": 580,
    "oldPrice": 690,
    "discountPercent": 16,
    "badge": "İkili Set",
    "rating": "4.8",
    "reviews": 29,
    "image": "/images/products/uzum_pekmezi.jpg",
    "inStock": true,
    "barcode": "869000100109"
  },
  {
    "id": 10,
    "name": "Rize Organik İlk Hasat Mayıslık Siyah Çay (3 kg Avantaj Paketi)",
    "brand": "Çaykara Çiftliği",
    "categorySlug": "market",
    "category": "Market & Temel Gıda",
    "price": 690,
    "oldPrice": 820,
    "discountPercent": 16,
    "badge": "Organik",
    "rating": "5.0",
    "reviews": 58,
    "image": "/images/products/rize_cayi.jpg",
    "inStock": true,
    "barcode": "869000100110"
  }
];

// --- 2. GÜVENLİK YARDIMCILARI (XSS & STORAGE SANITIZATION) ---
function escapeHTML(str) {
  if (typeof str !== "string") return String(str || "");
  return str.replace(/[&<>'"]/g, function (tag) {
    const chars = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    };
    return chars[tag] || tag;
  });
}

function safeLocalStorageGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed !== null ? parsed : fallback;
  } catch (err) {
    console.warn("Storage hatası:", err);
    return fallback;
  }
}

function safeLocalStorageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn("Storage yazma hatası:", err);
  }
}

// --- 3. DURUM YÖNETİMİ (STATE) ---
let cart = safeLocalStorageGet("sarmal_cart", []);
let wishlist = safeLocalStorageGet("sarmal_wishlist", []);
let userOrders = safeLocalStorageGet("sarmal_orders", []);
let currentUser = safeLocalStorageGet("sarmal_user", null);
let activeCoupon = safeLocalStorageGet("sarmal_coupon", null);

// Kategori Sayfası Filtreleri
let currentCategorySlug = null;
let catSortBy = "recommended";
let catMinPrice = null;
let catMaxPrice = null;
let catOnlyDiscount = false;

// Kuponlar
const AVAILABLE_COUPONS = {
  "SARMAL10": { type: "percent", value: 10, desc: "%10 Genel İndirim" },
  "YEMEK50": { type: "fixed", value: 50, minSpend: 300, desc: "300 TL Üzerine 50 TL İndirim" },
  "HOSGELDIN": { type: "fixed", value: 25, minSpend: 150, desc: "25 TL Hoş Geldin İndirimi" }
};

function formatPrice(num) {
  const safeNum = typeof num === "number" && !isNaN(num) ? num : 0;
  return safeNum.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " TL";
}

// --- 4. SAYFA ROUTING & GÖRÜNÜM GEÇİŞLERİ ---
const ALL_VIEWS = [
  "homeView",
  "categoryView",
  "cartPageView",
  "wishlistPageView",
  "authPageView",
  "profilePageView",
  "trackingPageView"
];

function hideAllViews() {
  ALL_VIEWS.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove("active");
      if (id === "homeView") el.classList.add("hidden");
    }
  });
}

function showView(id) {
  hideAllViews();
  const el = document.getElementById(id);
  if (el) {
    if (id === "homeView") el.classList.remove("hidden");
    el.classList.add("active");
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateMobileBottomNavUI(activeTab) {
  const tabs = {
    home: document.getElementById("bottomNavHome"),
    categories: document.getElementById("bottomNavCategories"),
    cart: document.getElementById("bottomNavCart"),
    wishlist: document.getElementById("bottomNavWishlist"),
    auth: document.getElementById("bottomNavAuth"),
  };
  Object.values(tabs).forEach(el => el && el.classList.remove("active"));
  if (tabs[activeTab]) {
    tabs[activeTab].classList.add("active");
  }
}

function navigateToHome() {
  try { sessionStorage.removeItem("sarmal_explicit_auth"); } catch (e) {}
  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }
  window.location.hash = "";
  renderRoute();
}

function navigateToCategory(slug) {
  window.location.hash = "kategori=" + encodeURIComponent(slug);
}

function navigateToPage(pageName) {
  if (pageName === "giris" || pageName === "kayit" || pageName === "hesabim") {
    try { sessionStorage.setItem("sarmal_explicit_auth", "true"); } catch (e) {}
  }
  window.location.hash = pageName;
}

function renderRoute() {
  const rawHash = window.location.hash.replace(/^#/, "");

  // İlk giriş koruması (Initial visit guard):
  // Eğer kullanıcı doğrudan siteye girmişse ve hash "giris", "kayit" veya "hesabim" ise,
  // ancak bu oturumda kullanıcı oturum açma linkine kasten tıklamamışsa (örn: mobil tarayıcı önbelleği/autocomplete):
  let isExplicitAuth = false;
  try {
    isExplicitAuth = sessionStorage.getItem("sarmal_explicit_auth") === "true";
  } catch (e) {}

  if ((rawHash === "giris" || rawHash === "kayit" || rawHash === "hesabim") && !isExplicitAuth && !currentUser) {
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    } else {
      window.location.hash = "";
    }
    showView("homeView");
    renderProductGrids();
    updateMobileBottomNavUI("home");
    return;
  }

  if (!rawHash || rawHash === "/") {
    showView("homeView");
    renderProductGrids();
    updateMobileBottomNavUI("home");
    return;
  }

  if (rawHash.startsWith("kategori=")) {
    const slug = decodeURIComponent(rawHash.split("=")[1] || "");
    const category = CATEGORIES_DATA.find(c => c.slug === slug);
    if (category) {
      currentCategorySlug = slug;
      showView("categoryView");
      renderCategoryPage(category);
      updateMobileBottomNavUI("categories");
      return;
    }
  }

  if (rawHash === "sepet") {
    showView("cartPageView");
    renderCartPage();
    updateMobileBottomNavUI("cart");
    return;
  }

  if (rawHash === "favoriler") {
    showView("wishlistPageView");
    renderWishlistPage();
    updateMobileBottomNavUI("wishlist");
    return;
  }

  if (rawHash === "giris" || rawHash === "kayit") {
    showView("authPageView");
    switchAuthTab(rawHash === "kayit" ? "register" : "login");
    updateMobileBottomNavUI("auth");
    return;
  }

  if (rawHash === "hesabim") {
    if (currentUser) {
      showView("profilePageView");
      renderProfilePage();
      updateMobileBottomNavUI("auth");
    } else {
      navigateToPage("giris");
    }
    return;
  }

  if (rawHash === "siparis-takip") {
    showView("trackingPageView");
    renderTrackingPage();
    updateMobileBottomNavUI("");
    return;
  }

  // Fallback
  showView("homeView");
  renderProductGrids();
  updateMobileBottomNavUI("home");
}

// --- 5. TAM SAYFA SEPET (CART PAGE) RENDER ---
function renderCartPage() {
  const itemsContainer = document.getElementById("cartPageItemsList");
  const emptyContainer = document.getElementById("cartPageEmptyState");
  const contentLayout = document.getElementById("cartPageLayout");
  const countTitle = document.getElementById("cartPageCountTitle");
  const freeShippingText = document.getElementById("cartPageFreeShippingText");
  const shippingProgressFill = document.getElementById("cartPageShippingFill");

  const subtotalEl = document.getElementById("cartPageSubtotal");
  const discountRow = document.getElementById("cartPageDiscountRow");
  const discountEl = document.getElementById("cartPageDiscount");
  const grandTotalEl = document.getElementById("cartPageGrandTotal");
  const couponBadge = document.getElementById("cartPageCouponApplied");

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { subtotal, discount, grandTotal } = calculateCartTotals();

  if (countTitle) countTitle.textContent = "Alışveriş Sepetim (" + totalCount + " Ürün)";

  if (cart.length === 0) {
    if (contentLayout) contentLayout.style.display = "none";
    if (emptyContainer) emptyContainer.style.display = "block";
    return;
  }

  if (emptyContainer) emptyContainer.style.display = "none";
  if (contentLayout) contentLayout.style.display = "grid";

  // 500 TL Kargo İlerlemesi
  const threshold = 500;
  if (subtotal >= threshold) {
    if (freeShippingText) freeShippingText.innerHTML = "🎉 <strong>Tebrikler!</strong> Kargonuz ÜCRETSİZ!";
    if (shippingProgressFill) shippingProgressFill.style.width = "100%";
  } else {
    const diff = threshold - subtotal;
    if (freeShippingText) freeShippingText.innerHTML = 'Ücretsiz Kargo için <strong>' + formatPrice(diff) + '</strong> daha ekleyin!';
    const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
    if (shippingProgressFill) shippingProgressFill.style.width = pct + "%";
  }

  // Tutar Hesapları
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (grandTotalEl) grandTotalEl.textContent = formatPrice(grandTotal);

  if (discountRow && discountEl) {
    if (discount > 0) {
      discountRow.style.display = "flex";
      discountEl.textContent = "- " + formatPrice(discount);
    } else {
      discountRow.style.display = "none";
    }
  }

  // Kupon Rozeti
  if (couponBadge) {
    if (activeCoupon && AVAILABLE_COUPONS[activeCoupon]) {
      couponBadge.innerHTML = 
        '<div class="coupon-applied-badge">' +
          '<span>✓ ' + escapeHTML(activeCoupon) + ' uygulandı (' + escapeHTML(AVAILABLE_COUPONS[activeCoupon].desc) + ')</span>' +
          '<button type="button" style="color: #b91c1c; font-weight: 800; cursor: pointer; border: none; background: none;" onclick="removeCoupon()">✕</button>' +
        '</div>';
      couponBadge.style.display = "block";
    } else {
      couponBadge.innerHTML = "";
      couponBadge.style.display = "none";
    }
  }

  // Ürün Satırları
  if (itemsContainer) {
    itemsContainer.innerHTML = cart.map(item => (
      '<div class="cart-page-item-row">' +
        '<div class="cart-item-product-cell">' +
          '<img class="cart-page-img" src="' + escapeHTML(item.product.image) + '" alt="' + escapeHTML(item.product.name) + '" />' +
          '<div class="cart-page-prod-info">' +
            '<span class="cart-page-prod-brand">' + escapeHTML(item.product.brand) + '</span>' +
            '<a href="javascript:void(0)" onclick="openQuickView(' + item.product.id + ')" class="cart-page-prod-title">' + escapeHTML(item.product.name) + '</a>' +
            '<span class="cart-mobile-unit-price">' + formatPrice(item.product.price) + ' / adet</span>' +
          '</div>' +
        '</div>' +
        '<div class="cart-col-price" style="font-weight: 700; color: var(--text-muted);">' + formatPrice(item.product.price) + '</div>' +
        '<div class="cart-col-qty">' +
          '<div class="cart-item-controls" style="margin: 0;">' +
            '<button class="qty-btn" type="button" onclick="changeQuantity(' + item.product.id + ', -1)">-</button>' +
            '<span class="qty-value">' + item.quantity + '</span>' +
            '<button class="qty-btn" type="button" onclick="changeQuantity(' + item.product.id + ', 1)">+</button>' +
          '</div>' +
        '</div>' +
        '<div class="cart-col-total" style="font-weight: 800; color: var(--primary);">' + formatPrice(item.product.price * item.quantity) + '</div>' +
        '<div class="cart-col-actions">' +
          '<button type="button" class="remove-item-btn" onclick="removeFromCart(' + item.product.id + ')" title="Ürünü Sil">🗑️</button>' +
        '</div>' +
      '</div>'
    )).join("");
  }
}

// --- 6. TAM SAYFA FAVORİLER (WISHLIST PAGE) RENDER ---
function renderWishlistPage() {
  const grid = document.getElementById("wishlistPageGrid");
  const emptyState = document.getElementById("wishlistPageEmptyState");
  const titleCount = document.getElementById("wishlistPageCountTitle");

  const wishlistedProducts = PRODUCTS_DATA.filter(p => wishlist.includes(p.id));
  if (titleCount) titleCount.textContent = "Favori Ürünlerim (" + wishlistedProducts.length + " Ürün)";

  if (wishlistedProducts.length === 0) {
    if (grid) grid.style.display = "none";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (grid) {
    grid.style.display = "grid";
    grid.innerHTML = wishlistedProducts.map(createProductCardHTML).join("");
  }
}

// --- 7. TAM SAYFA ÜYE GİRİŞİ & KAYIT (AUTH PAGE) ---
function switchAuthTab(tab) {
  const loginTabBtn = document.getElementById("authTabLoginBtn");
  const registerTabBtn = document.getElementById("authTabRegisterBtn");
  const loginContent = document.getElementById("authLoginContent");
  const registerContent = document.getElementById("authRegisterContent");

  if (tab === "register") {
    if (loginTabBtn) loginTabBtn.classList.remove("active");
    if (registerTabBtn) registerTabBtn.classList.add("active");
    if (loginContent) loginContent.classList.remove("active");
    if (registerContent) registerContent.classList.add("active");
  } else {
    if (loginTabBtn) loginTabBtn.classList.add("active");
    if (registerTabBtn) registerTabBtn.classList.remove("active");
    if (loginContent) loginContent.classList.add("active");
    if (registerContent) registerContent.classList.remove("active");
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById("pageAuthEmail");
  if (!emailInput) return;

  const email = emailInput.value.trim();
  currentUser = {
    name: email.split("@")[0] || "Melih",
    email: email,
    joinDate: new Date().toLocaleDateString("tr-TR")
  };
  safeLocalStorageSet("sarmal_user", currentUser);

  updateAuthUI();
  showToast("Hoş geldiniz, " + currentUser.name + "!");
  navigateToPage("hesabim");
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("regName")?.value.trim();
  const email = document.getElementById("regEmail")?.value.trim();
  const phone = document.getElementById("regPhone")?.value.trim();

  if (!name || !email) {
    showToast("Lütfen zorunlu alanları doldurun.");
    return;
  }

  currentUser = {
    name: name,
    email: email,
    phone: phone,
    joinDate: new Date().toLocaleDateString("tr-TR")
  };
  safeLocalStorageSet("sarmal_user", currentUser);

  updateAuthUI();
  showToast("Hesabınız oluşturuldu! Hoş geldiniz, " + currentUser.name + "!");
  navigateToPage("hesabim");
}

function handleLogout() {
  currentUser = null;
  safeLocalStorageSet("sarmal_user", null);
  try { sessionStorage.removeItem("sarmal_explicit_auth"); } catch (e) {}
  updateAuthUI();
  showToast("Oturum kapatıldı.");
  navigateToHome();
}

function updateAuthUI() {
  const authTitle = document.getElementById("headerAuthTitle");
  const authSubtitle = document.getElementById("headerAuthSubtitle");
  const bottomNavAuthLabel = document.getElementById("bottomNavAuthLabel");

  if (currentUser) {
    if (authSubtitle) authSubtitle.textContent = "Hesabım";
    if (authTitle) authTitle.textContent = currentUser.name.substring(0, 10);
    if (bottomNavAuthLabel) bottomNavAuthLabel.textContent = "Hesabım";
  } else {
    if (authSubtitle) authSubtitle.textContent = "Hesabım";
    if (authTitle) authTitle.textContent = "Giriş Yap";
    if (bottomNavAuthLabel) bottomNavAuthLabel.textContent = "Giriş Yap";
  }
}

// --- 8. TAM SAYFA KULLANICI PROFİLİ & SİPARİŞLER (PROFILE PAGE) ---
function renderProfilePage() {
  if (!currentUser) {
    navigateToPage("giris");
    return;
  }

  const nameEl = document.getElementById("profileUserName");
  const emailEl = document.getElementById("profileUserEmail");
  const avatarEl = document.getElementById("profileUserAvatar");
  const ordersListEl = document.getElementById("profileOrdersList");

  if (nameEl) nameEl.textContent = currentUser.name;
  if (emailEl) emailEl.textContent = currentUser.email;
  if (avatarEl) avatarEl.textContent = currentUser.name.charAt(0).toUpperCase();

  if (ordersListEl) {
    if (userOrders.length === 0) {
      ordersListEl.innerHTML = (
        '<div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">' +
          '<div style="font-size: 2.2rem; margin-bottom: 0.5rem;">📦</div>' +
          '<strong>Henüz Bir Siparişiniz Bulunmuyor</strong>' +
          '<p style="font-size: 0.85rem; margin-top: 0.35rem;">Yemek kartınızla hemen ilk siparişinizi verebilirsiniz.</p>' +
          '<button type="button" class="sidebar-apply-btn" style="max-width: 200px; margin: 1rem auto 0;" onclick="navigateToHome()">Alışverişe Başla</button>' +
        '</div>'
      );
    } else {
      ordersListEl.innerHTML = userOrders.map(order => (
        '<div style="background: var(--bg-page); border: 1px solid var(--border); border-radius: 10px; padding: 1.25rem; margin-bottom: 1rem;">' +
          '<div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 0.65rem; margin-bottom: 0.75rem;">' +
            '<div>' +
              '<strong style="color: var(--primary-deep); font-size: 0.95rem;">' + escapeHTML(order.orderNumber) + '</strong>' +
              '<span style="font-size: 0.78rem; color: var(--text-muted); display: block;">' + escapeHTML(order.date) + '</span>' +
            '</div>' +
            '<span style="background: #dcfce7; color: #166534; font-size: 0.75rem; font-weight: 800; padding: 3px 8px; border-radius: 4px;">● ' + escapeHTML(order.status) + '</span>' +
          '</div>' +
          '<div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.88rem;">' +
            '<div>' +
              '<span>Ödeme: <strong>' + escapeHTML(order.paymentMethod) + '</strong></span>' +
              '<span style="display: block; font-size: 0.78rem; color: var(--text-muted);">' + order.items.length + ' Ürün (' + escapeHTML(order.customer.city) + ')</span>' +
            '</div>' +
            '<div style="text-align: right;">' +
              '<strong style="color: var(--primary); font-size: 1.1rem; display: block;">' + formatPrice(order.total) + '</strong>' +
              '<button type="button" style="color: var(--primary); font-weight: 700; font-size: 0.82rem; text-decoration: underline; background: none; border: none; cursor: pointer; padding: 0;" onclick="navigateToPage(\'siparis-takip\'); setTimeout(() => renderTrackingResult(\'' + order.orderNumber + '\'), 100);">' +
                'Kargoyu Takip Et →' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>'
      )).join("");
    }
  }
}

// --- 9. TAM SAYFA SİPARİŞ TAKİBİ (TRACKING PAGE) ---
function renderTrackingPage() {
  const input = document.getElementById("pageTrackingInput");
  const resultDiv = document.getElementById("pageTrackingResult");

  if (userOrders.length > 0 && input && !input.value) {
    input.value = userOrders[0].orderNumber;
    renderTrackingResult(userOrders[0].orderNumber, "pageTrackingResult");
  } else if (resultDiv && !input?.value) {
    resultDiv.innerHTML = "";
  }
}

function handlePageTrackingSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("pageTrackingInput");
  if (input) renderTrackingResult(input.value, "pageTrackingResult");
}

// Ortak Kargo Aşamaları Çıktısı
function renderTrackingResult(code, targetId = "trackingResult") {
  const resultDiv = document.getElementById(targetId);
  if (!resultDiv) return;

  const cleanCode = (code || "").trim().toUpperCase();
  const foundOrder = userOrders.find(o => o.orderNumber.toUpperCase() === cleanCode);

  if (foundOrder) {
    resultDiv.innerHTML = (
      '<div style="background: var(--bg-page); padding: 1.5rem; border-radius: 12px; margin-top: 1.25rem; border: 1px solid var(--border); text-align: left;">' +
        '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">' +
          '<strong>Sipariş #' + escapeHTML(foundOrder.orderNumber) + '</strong>' +
          '<span style="color: var(--success); font-weight: 800; font-size: 0.85rem;">● ' + escapeHTML(foundOrder.status) + '</span>' +
        '</div>' +
        '<div class="tracking-stepper">' +
          '<div class="tracking-step done"><div class="tracking-step-dot">✓</div><span>Alındı</span></div>' +
          '<div class="tracking-step current"><div class="tracking-step-dot">📦</div><span>Hazırlanıyor</span></div>' +
          '<div class="tracking-step"><div class="tracking-step-dot">🚚</div><span>Kargoda</span></div>' +
          '<div class="tracking-step"><div class="tracking-step-dot">4</div><span>Teslimat</span></div>' +
        '</div>' +
        '<div style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.7; margin-top: 1rem; border-top: 1px dashed var(--border); padding-top: 1rem;">' +
          '<div>Alıcı: <strong>' + escapeHTML(foundOrder.customer.name) + '</strong> (' + escapeHTML(foundOrder.customer.phone) + ')</div>' +
          '<div>Ödeme Yöntemi: <strong>' + escapeHTML(foundOrder.paymentMethod) + '</strong></div>' +
          '<div>Toplam Tutar: <strong style="color: var(--primary);">' + formatPrice(foundOrder.total) + '</strong></div>' +
          '<div>Teslimat Adresi: <strong>' + escapeHTML(foundOrder.customer.address) + ', ' + escapeHTML(foundOrder.customer.district) + ' / ' + escapeHTML(foundOrder.customer.city) + '</strong></div>' +
          '<div>Kargo Firması: <strong>Yurtiçi Kargo (Tahmini Teslimat: 2 İş Günü)</strong></div>' +
        '</div>' +
      '</div>'
    );
  } else {
    resultDiv.innerHTML = (
      '<div style="background: var(--bg-page); padding: 1.5rem; border-radius: 12px; margin-top: 1.25rem; border: 1px solid var(--border); text-align: left;">' +
        '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">' +
          '<strong>Sipariş #' + escapeHTML(cleanCode) + '</strong>' +
          '<span style="color: var(--success); font-weight: 800; font-size: 0.85rem;">● Dağıtımda</span>' +
        '</div>' +
        '<div class="tracking-stepper">' +
          '<div class="tracking-step done"><div class="tracking-step-dot">✓</div><span>Sipariş Alındı</span></div>' +
          '<div class="tracking-step done"><div class="tracking-step-dot">✓</div><span>Hazırlandı</span></div>' +
          '<div class="tracking-step current"><div class="tracking-step-dot">🚚</div><span>Kargoda</span></div>' +
          '<div class="tracking-step"><div class="tracking-step-dot">4</div><span>Teslimat</span></div>' +
        '</div>' +
        '<p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.75rem; line-height: 1.5;">' +
          'Paketiniz <strong>Yurtiçi Kargo</strong> güvencesiyle dağıtıma çıkarılmıştır. Tahmini teslimat: <strong>Bugün / Yarın</strong>.' +
        '</p>' +
      '</div>'
    );
  }
}

// --- 10. KATEGORİ SAYFASI RENDER & FİLTRELEME ---
function renderCategoryPage(category) {
  const breadcrumbEl = document.getElementById("catBreadcrumbCurrent");
  const bannerBadgeEl = document.getElementById("catBannerBadge");
  const bannerTitleEl = document.getElementById("catBannerTitle");
  const bannerDescEl = document.getElementById("catBannerDesc");
  const bannerIconEl = document.getElementById("catBannerIcon");

  if (breadcrumbEl) breadcrumbEl.textContent = category.name;
  if (bannerBadgeEl) bannerBadgeEl.textContent = "REYON: " + category.shortName.toUpperCase();
  if (bannerTitleEl) bannerTitleEl.textContent = category.name;
  if (bannerDescEl) bannerDescEl.textContent = category.description;
  if (bannerIconEl) bannerIconEl.textContent = category.icon;

  const sidebarList = document.getElementById("catSidebarList");
  if (sidebarList) {
    sidebarList.innerHTML = CATEGORIES_DATA.map(c => {
      const count = c.slug === "yemek-kartlari"
        ? PRODUCTS_DATA.length
        : PRODUCTS_DATA.filter(p => p.categorySlug === c.slug).length;
      const isActive = c.slug === category.slug;

      return (
        '<li class="cat-sidebar-item ' + (isActive ? 'active' : '') + '" onclick="navigateToCategory(\'' + c.slug + '\')">' +
          '<span>' + c.icon + ' ' + escapeHTML(c.shortName) + '</span>' +
          '<span class="cat-sidebar-badge">' + count + '</span>' +
        '</li>'
      );
    }).join("");
  }

  applyCategoryFiltersAndRender();
}

function applyCategoryFiltersAndRender() {
  if (!currentCategorySlug) return;
  const grid = document.getElementById("catProductsGrid");
  const countEl = document.getElementById("catProductCount");
  if (!grid) return;

  let list = PRODUCTS_DATA.filter(p => {
    if (currentCategorySlug === "yemek-kartlari") return true;
    return p.categorySlug === currentCategorySlug;
  });

  if (catMinPrice !== null && !isNaN(catMinPrice)) {
    list = list.filter(p => p.price >= catMinPrice);
  }
  if (catMaxPrice !== null && !isNaN(catMaxPrice)) {
    list = list.filter(p => p.price <= catMaxPrice);
  }
  if (catOnlyDiscount) {
    list = list.filter(p => p.discountPercent > 15 || p.badge.includes("İndirim"));
  }

  if (catSortBy === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (catSortBy === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (catSortBy === "discount") {
    list.sort((a, b) => b.discountPercent - a.discountPercent);
  } else if (catSortBy === "reviews") {
    list.sort((a, b) => b.reviews - a.reviews);
  }

  if (countEl) countEl.textContent = list.length + " Ürün Listeleniyor";

  if (list.length === 0) {
    grid.innerHTML = (
      '<div style="grid-column: 1 / -1; padding: 3.5rem 1.5rem; text-align: center; background: #ffffff; border-radius: 12px; border: 1px dashed var(--border); color: var(--text-muted);">' +
        '<div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>' +
        '<h3 style="font-size: 1.15rem; color: var(--primary-deep); margin-bottom: 0.4rem; font-weight: 800;">Bu Kriterlere Uygun Ürün Bulunamadı</h3>' +
        '<p style="font-size: 0.88rem; margin-bottom: 1rem;">Lütfen fiyat aralığını veya filtreleri temizleyerek tekrar deneyin.</p>' +
        '<button type="button" class="sidebar-apply-btn" style="max-width: 200px; margin: 0 auto;" onclick="resetCategoryFilters()">Filtreleri Temizle</button>' +
      '</div>'
    );
  } else {
    grid.innerHTML = list.map(createProductCardHTML).join("");
  }
}

function resetCategoryFilters() {
  catMinPrice = null;
  catMaxPrice = null;
  catOnlyDiscount = false;
  catSortBy = "recommended";

  const minInput = document.getElementById("catMinPriceInput");
  const maxInput = document.getElementById("catMaxPriceInput");
  const discountCb = document.getElementById("catDiscountCb");
  const sortSelect = document.getElementById("catSortSelect");

  if (minInput) minInput.value = "";
  if (maxInput) maxInput.value = "";
  if (discountCb) discountCb.checked = false;
  if (sortSelect) sortSelect.value = "recommended";

  applyCategoryFiltersAndRender();
}

// --- 11. ÜRÜN KARTLARI (CARD CREATION & HOMEPAGE GRIDS) ---
function createProductCardHTML(product) {
  const isWishlisted = wishlist.includes(product.id);
  const badgeClass = product.badge.includes("İndirim") ? "badge-discount" : product.badge.includes("Yeni") ? "badge-new" : "badge-deal";
  const badgeHTML = product.badge
    ? '<div class="product-badges"><span class="badge ' + badgeClass + '">' + escapeHTML(product.badge) + '</span></div>'
    : "";

  const safeName = escapeHTML(product.name);
  const safeBrand = escapeHTML(product.brand);
  const safeImg = escapeHTML(product.image);

  return (
    '<div class="product-card" data-id="' + product.id + '">' +
      badgeHTML +
      '<button class="product-wishlist-btn ' + (isWishlisted ? 'active' : '') + '" onclick="toggleWishlist(' + product.id + ', event)" title="Favorilere Ekle">' +
        (isWishlisted ? '❤️' : '🤍') +
      '</button>' +
      '<div class="product-img-wrap" onclick="openQuickView(' + product.id + ')">' +
        '<img class="product-img" src="' + safeImg + '" alt="' + safeName + '" loading="lazy" onerror="this.src=\'https://via.placeholder.com/400?text=Sarmal+Ticaret\'" />' +
        '<button class="quick-view-overlay-btn" type="button">Hızlı İncele</button>' +
      '</div>' +
      '<div class="product-content">' +
        '<span class="product-brand">' + safeBrand + '</span>' +
        '<h3 class="product-title" onclick="openQuickView(' + product.id + ')" title="' + safeName + '">' + safeName + '</h3>' +
        '<div class="product-rating">' +
          '<span>★★★★★</span>' +
          '<span class="rating-count">(' + product.reviews + ')</span>' +
        '</div>' +
        '<div class="product-price-box">' +
          '<div class="old-price">' + formatPrice(product.oldPrice) + '</div>' +
          '<div class="current-price">' + formatPrice(product.price) + '</div>' +
        '</div>' +
        '<button class="add-to-cart-btn" onclick="addToCart(' + product.id + ', 1, event)">' +
          '<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>' +
          'Sepete Ekle' +
        '</button>' +
      '</div>' +
    '</div>'
  );
}

function renderProductGrids() {
  const dealsGrid = document.getElementById("dealsProductsGrid");
  const curatedGrid = document.getElementById("curatedProductsGrid");
  if (!dealsGrid || !curatedGrid) return;

  const dealsList = PRODUCTS_DATA.slice(0, 6);
  dealsGrid.innerHTML = dealsList.map(createProductCardHTML).join("");

  const curatedList = PRODUCTS_DATA;
  curatedGrid.innerHTML = curatedList.map(createProductCardHTML).join("");
}

// --- 12. SEPET VE KUPON MANTIĞI ---
function calculateCartTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  let discount = 0;

  if (activeCoupon && AVAILABLE_COUPONS[activeCoupon]) {
    const c = AVAILABLE_COUPONS[activeCoupon];
    if (!c.minSpend || subtotal >= c.minSpend) {
      if (c.type === "percent") {
        discount = (subtotal * c.value) / 100;
      } else if (c.type === "fixed") {
        discount = Math.min(subtotal, c.value);
      }
    } else {
      activeCoupon = null;
      safeLocalStorageSet("sarmal_coupon", null);
    }
  }

  const grandTotal = Math.max(0, subtotal - discount);
  return { subtotal, discount, grandTotal };
}

function saveCart() {
  safeLocalStorageSet("sarmal_cart", cart);
  updateCartUI();
  if (window.location.hash.replace(/^#/, "") === "sepet") {
    renderCartPage();
  }
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { grandTotal } = calculateCartTotals();

  const cartBadge = document.getElementById("cartBadge");
  const bottomNavCartBadge = document.getElementById("bottomNavCartBadge");
  const cartTotalText = document.getElementById("cartTotalText");

  if (cartBadge) {
    cartBadge.textContent = totalCount;
    cartBadge.style.display = totalCount > 0 ? "flex" : "none";
  }

  if (bottomNavCartBadge) {
    bottomNavCartBadge.textContent = totalCount;
    bottomNavCartBadge.style.display = totalCount > 0 ? "inline-flex" : "none";
  }

  if (cartTotalText) cartTotalText.textContent = formatPrice(grandTotal);
}

function addToCart(productId, quantity = 1, event = null) {
  if (event) event.stopPropagation();
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.product.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  saveCart();
  showToast('"' + product.name.substring(0, 30) + '..." sepete eklendi!');

  if (event && event.currentTarget) {
    const btn = event.currentTarget;
    const oldHTML = btn.innerHTML;
    btn.innerHTML = '✓ Eklendi';
    btn.classList.add('added');
    setTimeout(() => {
      btn.innerHTML = oldHTML;
      btn.classList.remove('added');
    }, 1200);
  }
}

function changeQuantity(productId, delta) {
  const itemIndex = cart.findIndex(item => item.product.id === productId);
  if (itemIndex > -1) {
    cart[itemIndex].quantity += delta;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
    saveCart();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.product.id !== productId);
  saveCart();
  showToast("Ürün sepetten kaldırıldı.");
}

function clearCart() {
  if (cart.length === 0) return;
  if (confirm("Sepetinizdeki tüm ürünleri silmek istediğinize emin misiniz?")) {
    cart = [];
    activeCoupon = null;
    safeLocalStorageSet("sarmal_coupon", null);
    saveCart();
    showToast("Sepet temizlendi.");
  }
}

function applyCoupon(code) {
  const cleanCode = (code || "").trim().toUpperCase();
  if (!cleanCode) {
    showToast("Lütfen bir kupon kodu girin.");
    return;
  }

  const coupon = AVAILABLE_COUPONS[cleanCode];
  if (!coupon) {
    showToast("Geçersiz kupon kodu! (Deneyebileceğiniz kodlar: SARMAL10, YEMEK50)");
    return;
  }

  const { subtotal } = calculateCartTotals();
  if (coupon.minSpend && subtotal < coupon.minSpend) {
    showToast("Bu kupon için sepet tutarınız en az " + formatPrice(coupon.minSpend) + " olmalıdır.");
    return;
  }

  activeCoupon = cleanCode;
  safeLocalStorageSet("sarmal_coupon", activeCoupon);
  saveCart();
  showToast("Kupon başarıyla uygulandı! 🎉");
}

function removeCoupon() {
  activeCoupon = null;
  safeLocalStorageSet("sarmal_coupon", null);
  saveCart();
  showToast("Kupon kaldırıldı.");
}

// --- 13. FAVORİLER (WISHLIST) SİSTEMİ ---
function toggleWishlist(productId, event) {
  if (event) event.stopPropagation();
  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast("Ürün favorilerden çıkarıldı.");
  } else {
    wishlist.push(productId);
    showToast("Ürün favorilere eklendi! ❤️");
  }
  safeLocalStorageSet("sarmal_wishlist", wishlist);
  updateWishlistUI();
  renderProductGrids();
  if (currentCategorySlug) applyCategoryFiltersAndRender();
  if (window.location.hash.replace(/^#/, "") === "favoriler") renderWishlistPage();
}

function updateWishlistUI() {
  const wishlistBadge = document.getElementById("wishlistBadge");
  const bottomNavWishlistBadge = document.getElementById("bottomNavWishlistBadge");
  if (wishlistBadge) {
    wishlistBadge.textContent = wishlist.length;
    wishlistBadge.style.display = wishlist.length > 0 ? "flex" : "none";
  }
  if (bottomNavWishlistBadge) {
    bottomNavWishlistBadge.textContent = wishlist.length;
    bottomNavWishlistBadge.style.display = wishlist.length > 0 ? "inline-flex" : "none";
  }
}

// --- 14. ÇOK ADIMLI CHECKOUT SÜRECİ ---
let currentCheckoutStep = 1;
let checkoutFormData = {};

function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Sepetinizde ürün bulunmuyor!");
    return;
  }
  const modal = document.getElementById("checkoutModal");
  if (!modal) return;

  currentCheckoutStep = 1;
  setCheckoutStep(1);
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function setCheckoutStep(step) {
  currentCheckoutStep = step;
  const stepItems = document.querySelectorAll(".checkout-step-item");
  stepItems.forEach(item => {
    const s = Number(item.getAttribute("data-step"));
    item.classList.toggle("active", s === step);
    item.classList.toggle("completed", s < step);
  });

  const step1 = document.getElementById("checkoutStep1");
  const step2 = document.getElementById("checkoutStep2");
  const step3 = document.getElementById("checkoutStep3");

  if (step1) step1.style.display = step === 1 ? "block" : "none";
  if (step2) step2.style.display = step === 2 ? "block" : "none";
  if (step3) step3.style.display = step === 3 ? "block" : "none";

  const { grandTotal } = calculateCartTotals();
  const summaryTotalEl = document.getElementById("checkoutSummaryTotal");
  if (summaryTotalEl) summaryTotalEl.textContent = formatPrice(grandTotal);
}

function handleStep1Submit(e) {
  e.preventDefault();
  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const email = document.getElementById("custEmail").value.trim();
  const city = document.getElementById("custCity").value;
  const district = document.getElementById("custDistrict").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const note = document.getElementById("custNote").value.trim();

  if (!name || !phone || !city || !address) {
    showToast("Lütfen zorunlu teslimat alanlarını doldurun.");
    return;
  }

  checkoutFormData = { name, phone, email, city, district, address, note };
  setCheckoutStep(2);
}

function switchPaymentTab(tabName) {
  const tabs = document.querySelectorAll(".payment-tab-btn");
  const contents = document.querySelectorAll(".payment-tab-content");

  tabs.forEach(t => t.classList.toggle("active", t.getAttribute("data-tab") === tabName));
  contents.forEach(c => c.classList.toggle("active", c.getAttribute("data-tab") === tabName));
}

function validateLuhn(raw) {
  const digits = String(raw || "").replace(/[^0-9]/g, "");
  if (digits.length < 15 || digits.length > 19) return false;
  let sum = 0;
  let isEven = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

function validateExpiry(raw) {
  if (!raw) return false;
  const str = String(raw).trim();
  const parts = str.split("/");
  if (parts.length !== 2) return false;
  const month = parseInt(parts[0], 10);
  const yearStr = parts[1].trim();
  const year = parseInt(yearStr.length === 2 ? ("20" + yearStr) : yearStr, 10);
  if (isNaN(month) || isNaN(year) || month < 1 || month > 12) return false;
  const now = new Date();
  const curYear = now.getFullYear();
  const curMonth = now.getMonth() + 1;
  if (year < curYear || (year === curYear && month < curMonth)) return false;
  return true;
}

function handleFinalOrderSubmit(e) {
  e.preventDefault();
  const agreement = document.getElementById("checkoutAgreementCb");
  if (agreement && !agreement.checked) {
    showToast("Lütfen Mesafeli Satış Sözleşmesi onayını işaretleyin.");
    return;
  }

  const activeTab = document.querySelector(".payment-tab-btn.active")?.getAttribute("data-tab") || "mealcard";
  let paymentMethodName = "Multinet Up Yemek Kartı";
  let orderStatus = "Hazırlanıyor";

  // --- KREDİ KARTI KONTROLLERİ ---
  if (activeTab === "creditcard") {
    const holder = document.getElementById("ccHolderName")?.value.trim() || "";
    const number = document.getElementById("ccNumber")?.value.trim() || "";
    const expiry = document.getElementById("ccExpiry")?.value.trim() || "";
    const cvc = document.getElementById("ccCvc")?.value.trim() || "";

    if (!holder || holder.length < 3) {
      showToast("Lütfen kart üzerindeki Ad ve Soyadı giriniz.");
      document.getElementById("ccHolderName")?.focus();
      return;
    }

    if (!validateLuhn(number)) {
      showToast("Geçersiz kredi kartı numarası! Lütfen 16 haneli kart numaranızı kontrol ediniz.");
      document.getElementById("ccNumber")?.focus();
      return;
    }

    if (!validateExpiry(expiry)) {
      showToast("Kartınızın son kullanma tarihi geçersiz veya süresi dolmuş (AA/YY formatında girin)!");
      document.getElementById("ccExpiry")?.focus();
      return;
    }

    if (!cvc || cvc.length < 3) {
      showToast("Lütfen 3 haneli güvenlik kodunu (CVV) giriniz.");
      document.getElementById("ccCvc")?.focus();
      return;
    }

    const installment = document.getElementById("creditCardInstallment")?.value || "Tek Çekim";
    paymentMethodName = "Kredi Kartı (" + installment + ") - 3D Secure Onaylı";

  // --- MULTİNET YEMEK KARTI KONTROLLERİ ---
  } else if (activeTab === "mealcard") {
    const cardNum = (document.getElementById("multinetCardNumber")?.value || "").replace(/[^0-9]/g, "");
    const expiry = document.getElementById("multinetExpiry")?.value.trim() || "";
    const cvv = document.getElementById("multinetCvv")?.value.trim() || "";

    if (cardNum.length !== 16) {
      showToast("Lütfen 16 haneli Multinet Up kart numaranızı eksiksiz giriniz.");
      document.getElementById("multinetCardNumber")?.focus();
      return;
    }

    if (!validateExpiry(expiry)) {
      showToast("Multinet kartınızın son kullanma tarihi geçersiz veya süresi dolmuş!");
      document.getElementById("multinetExpiry")?.focus();
      return;
    }

    if (!cvv || cvv.length < 3) {
      showToast("Lütfen 3 haneli Multinet güvenlik kodunu (CVV) giriniz.");
      document.getElementById("multinetCvv")?.focus();
      return;
    }

    paymentMethodName = "Multinet Up Yemek Kartı (MultiPay Onaylı)";

  // --- HAVALE / EFT ---
  } else if (activeTab === "havale") {
    paymentMethodName = "Havale / EFT (Garanti BBVA)";
    orderStatus = "Ödeme Bekleniyor (Havale Bildirimi)";
  }

  // Ödeme Onaylama & İşlem Simülasyonu (Fail-Safe)
  const submitBtn = e.target.querySelector("button[type='submit']");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Ödeme Doğrulanıyor ve Bankaya İletiliyor... ⏳";
  }

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Siparişi Onayla ve Tamamla ✓";
    }

    const { subtotal, discount, grandTotal } = calculateCartTotals();
    const orderNumber = "SRM-2026-" + Math.floor(100000 + Math.random() * 900000);

    const orderRecord = {
      orderNumber: orderNumber,
      date: new Date().toLocaleDateString("tr-TR"),
      customer: checkoutFormData,
      paymentMethod: paymentMethodName,
      items: cart.map(i => ({ id: i.product.id, name: i.product.name, price: i.product.price, qty: i.quantity })),
      subtotal: subtotal,
      discount: discount,
      total: grandTotal,
      status: orderStatus,
      carrier: "Yurtiçi Kargo"
    };

    userOrders.unshift(orderRecord);
    safeLocalStorageSet("sarmal_orders", userOrders);

    const successOrderNum = document.getElementById("successOrderNumber");
    const successTotal = document.getElementById("successTotalAmount");
    const successPayment = document.getElementById("successPaymentMethod");
    const successAddress = document.getElementById("successDeliveryAddress");

    if (successOrderNum) successOrderNum.textContent = orderNumber;
    if (successTotal) successTotal.textContent = formatPrice(grandTotal);
    if (successPayment) successPayment.textContent = paymentMethodName;
    if (successAddress) successAddress.textContent = checkoutFormData.address + ", " + checkoutFormData.district + " / " + checkoutFormData.city;

    cart = [];
    activeCoupon = null;
    safeLocalStorageSet("sarmal_coupon", null);
    saveCart();

    showToast("Ödeme başarıyla onaylandı! Siparişiniz oluşturuldu. 🎉");
    setCheckoutStep(3);
  }, 900);
}

// --- 15. SÖZLEŞMELER & POLİTİKA MODALI ---
function openPolicyModal(type) {
  const modal = document.getElementById("policyModal");
  const titleEl = document.getElementById("policyModalTitle");
  const bodyEl = document.getElementById("policyModalBody");
  if (!modal || !titleEl || !bodyEl) return;

  if (type === "returns") {
    titleEl.textContent = "İade ve Değişim Politikası";
    bodyEl.innerHTML = (
      '<h4>1. Cayma Hakkı ve İade Süresi</h4>' +
      '<p>6502 sayılı Tüketicinin Korunması Hakkında Kanun uyarınca, alıcı ürünü teslim aldığı tarihten itibaren <strong>14 (on dört) gün</strong> içerisinde gerekçe göstermeksizin iade edebilir.</p>' +
      '<h4>2. İade Koşulları</h4>' +
      '<ul>' +
        '<li>İade edilecek ürünlerin orijinal ambalajında, koruyucu kutusunda ve faturasıyla eksiksiz gönderilmesi gerekmektedir.</li>' +
        '<li>Cam küreler ve elektronik lambalar hasarsız olmalıdır.</li>' +
      '</ul>' +
      '<h4>3. Ücretsiz İade Anlaşması</h4>' +
      '<p>İadelerinizi Yurtiçi Kargo anlaşma kodumuz olan <strong>540912</strong> ile Sarmal Ticaret adına ücretsiz gönderebilirsiniz.</p>'
    );
  } else if (type === "distance-contract") {
    titleEl.textContent = "Mesafeli Satış Sözleşmesi";
    bodyEl.innerHTML = (
      '<h4>MADDE 1 – TARAFLAR</h4>' +
      '<p><strong>SATICI:</strong> Sarmal Ticaret / Gemsa Teknoloji Ltd. Şti.<br>Adres: İstanbul / Türkiye | Tel: 0850 308 58 72 | E-Posta: destek@sarmalticaret.com</p>' +
      '<p><strong>ALICI:</strong> Sipariş formunu doldurarak ödeme yapan gerçek veya tüzel kişi.</p>' +
      '<h4>MADDE 2 – SÖZLEŞMENİN KONUSU</h4>' +
      '<p>ALICI’nın www.sarmalticaret.com üzerinden sipariş ettiği ürünlerin satışı ve teslimi ile ilgili yasal hak ve yükümlülükler.</p>'
    );
  } else if (type === "privacy") {
    titleEl.textContent = "Gizlilik ve Güvenlik Politikası";
    bodyEl.innerHTML = (
      '<h4>1. Güvenli Alışveriş ve 256-Bit SSL</h4>' +
      '<p>Sitemizdeki tüm işlemler <strong>256-Bit SSL</strong> şifreleme ile korunmaktadır. Kredi kartı veya yemek kartı bilgileriniz kesinlikle sunucularımızda saklanmaz.</p>'
    );
  } else if (type === "kvkk") {
    titleEl.textContent = "KVKK Aydınlatma Metni";
    bodyEl.innerHTML = (
      '<h4>Kişisel Verilerin Korunması Kanunu (KVKK)</h4>' +
      '<p>6698 sayılı kanun kapsamında; ad, telefon, adres ve e-posta verileriniz yalnızca sipariş teslimi ve fatura işlemleri için güvenle işlenir.</p>'
    );
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// --- 16. HIZLI İNCELEME (QUICK VIEW) & TAKSİT TABLOSU ---
function openQuickView(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  const quickViewModal = document.getElementById("quickViewModal");
  if (!product || !quickViewModal) return;

  const modalBody = document.getElementById("quickViewContent");
  if (modalBody) {
    const price = product.price;
    const t3 = (price / 3).toFixed(2);
    const t6 = (price * 1.05 / 6).toFixed(2);
    const t9 = (price * 1.09 / 9).toFixed(2);

    modalBody.innerHTML = (
      '<div class="quickview-grid">' +
        '<div class="quickview-img-box">' +
          '<img src="' + escapeHTML(product.image) + '" alt="' + escapeHTML(product.name) + '" />' +
        '</div>' +
        '<div class="quickview-details">' +
          '<span style="color: var(--primary); font-weight: 800; font-size: 0.85rem; text-transform: uppercase;">' + escapeHTML(product.category) + '</span>' +
          '<h2 style="font-size: 1.35rem; margin: 0.5rem 0 1rem; color: var(--text-main); font-weight: 800;">' + escapeHTML(product.name) + '</h2>' +
          '<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">' +
            '<span style="color: #fbbf24;">★★★★★</span>' +
            '<span style="color: var(--text-muted); font-size: 0.85rem;">(' + product.reviews + ' Değerlendirme)</span>' +
            '<span style="margin-left: auto; background: var(--primary-subtle); color: var(--primary-dark); font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 4px;">Barkod: ' + escapeHTML(product.barcode) + '</span>' +
          '</div>' +
          '<div style="background: var(--bg-page); padding: 1rem; border-radius: 8px; margin-bottom: 1.25rem;">' +
            '<div style="text-decoration: line-through; color: var(--text-light); font-size: 0.9rem;">' + formatPrice(product.oldPrice) + '</div>' +
            '<div style="font-size: 1.6rem; font-weight: 800; color: var(--primary-deep);">' + formatPrice(product.price) + '</div>' +
            '<div style="font-size: 0.8rem; color: var(--accent); font-weight: 700; margin-top: 0.25rem;">💳 Multinet Up Yemek Kartı ile Ödenebilir</div>' +
          '</div>' +
          '<div style="display: flex; gap: 1rem; margin-bottom: 1.25rem;">' +
            '<button class="add-to-cart-btn" style="flex: 1;" onclick="addToCart(' + product.id + ', 1); closeAllModals();">' +
              '🛒 Sepete Ekle' +
            '</button>' +
            '<button class="action-btn" style="border: 1px solid var(--border);" onclick="toggleWishlist(' + product.id + ');">' +
              '❤️ Favori' +
            '</button>' +
          '</div>' +
          '<div class="installment-table-wrap">' +
            '<strong style="font-size: 0.88rem; color: var(--primary-deep);">Taksit Seçenekleri (Bonus, World, Axess, Maximum)</strong>' +
            '<table class="installment-table">' +
              '<thead><tr><th>Taksit</th><th>Aylık Tutar</th><th>Toplam Tutar</th></tr></thead>' +
              '<tbody>' +
                '<tr><td>Tek Çekim</td><td>' + formatPrice(price) + '</td><td>' + formatPrice(price) + '</td></tr>' +
                '<tr><td>3 Taksit</td><td>' + formatPrice(t3) + '</td><td>' + formatPrice(price) + '</td></tr>' +
                '<tr><td>6 Taksit</td><td>' + formatPrice(t6) + '</td><td>' + formatPrice(price * 1.05) + '</td></tr>' +
                '<tr><td>9 Taksit</td><td>' + formatPrice(t9) + '</td><td>' + formatPrice(price * 1.09) + '</td></tr>' +
              '</tbody>' +
            '</table>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  quickViewModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// --- 17. CANLI ARAMA (AUTOCOMPLETE) ---
function setupLiveSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchDropdown = document.getElementById("searchResultsDropdown");
  const searchCategorySelect = document.getElementById("searchCategorySelect");

  if (!searchInput || !searchDropdown) return;

  searchInput.addEventListener("input", (e) => {
    const rawVal = e.target.value.trim();
    const query = rawVal.toLowerCase();
    const selectedCat = searchCategorySelect ? searchCategorySelect.value : "all";

    if (query.length < 2) {
      searchDropdown.classList.remove("active");
      searchDropdown.innerHTML = "";
      return;
    }

    const matched = PRODUCTS_DATA.filter(p => {
      const matchCat = (selectedCat === "all" || p.categorySlug === selectedCat || p.category.includes(selectedCat));
      const matchText = p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query);
      return matchCat && matchText;
    }).slice(0, 6);

    if (matched.length === 0) {
      searchDropdown.innerHTML = 
        '<div style="padding: 1.25rem; text-align: center; color: var(--text-muted); font-size: 0.88rem;">' +
          '"<strong>' + escapeHTML(rawVal) + '</strong>" ile eşleşen ürün bulunamadı.' +
        '</div>';
      searchDropdown.classList.add("active");
      return;
    }

    searchDropdown.innerHTML = 
      '<div class="search-dropdown-header">' +
        '<span>Arama Sonuçları (' + matched.length + ')</span>' +
        '<span>Sarmal Ticaret</span>' +
      '</div>' +
      matched.map(p => (
        '<div class="search-result-item" onclick="openQuickView(' + p.id + '); closeSearch();">' +
          '<img class="search-result-img" src="' + escapeHTML(p.image) + '" alt="' + escapeHTML(p.name) + '" />' +
          '<div class="search-result-info">' +
            '<div class="search-result-category">' + escapeHTML(p.category) + '</div>' +
            '<div class="search-result-title">' + escapeHTML(p.name) + '</div>' +
            '<div class="search-result-price">' + formatPrice(p.price) + '</div>' +
          '</div>' +
        '</div>'
      )).join("");
    searchDropdown.classList.add("active");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".header-search-area")) closeSearch();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeSearch();
      toggleMobileMenu(false);
      closeAllModals();
    }
  });
}

function closeSearch() {
  const searchDropdown = document.getElementById("searchResultsDropdown");
  if (searchDropdown) searchDropdown.classList.remove("active");
}

// --- 18. HERO SLIDER ---
let currentSlide = 0;
let slideInterval = null;

function setupHeroSlider() {
  const track = document.getElementById("sliderTrack");
  const slides = document.querySelectorAll(".slide-item");
  const dotsContainer = document.getElementById("sliderDots");
  const prevBtn = document.getElementById("sliderPrev");
  const nextBtn = document.getElementById("sliderNext");

  if (!track || slides.length === 0 || !dotsContainer) return;

  dotsContainer.innerHTML = "";
  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = 'slider-dot ' + (i === 0 ? 'active' : '');
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function updateSlider() {
    track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    const dots = dotsContainer.querySelectorAll(".slider-dot");
    dots.forEach((d, i) => d.classList.toggle("active", i === currentSlide));
  }

  function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    updateSlider();
    resetAutoSlide();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5500);
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  const container = document.querySelector(".hero-slider-container");
  if (container) {
    container.addEventListener("mouseenter", () => clearInterval(slideInterval));
    container.addEventListener("mouseleave", () => startAutoSlide());
  }

  startAutoSlide();
}

// --- 19. GERİ SAYIM SAYACI ---
function setupCountdownTimer() {
  const hoursEl = document.getElementById("timerHours");
  const minutesEl = document.getElementById("timerMinutes");
  const secondsEl = document.getElementById("timerSeconds");

  if (!hoursEl || !minutesEl || !secondsEl) return;

  function updateTimer() {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const diff = endOfDay - now;
    if (diff <= 0) return;

    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    hoursEl.textContent = String(h).padStart(2, "0");
    minutesEl.textContent = String(m).padStart(2, "0");
    secondsEl.textContent = String(s).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// --- 20. MODAL KAPATMA & TOAST ---
function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
  document.body.style.overflow = "";
}

function toggleMobileMenu(open) {
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("mobileDrawerOverlay");
  if (!drawer || !overlay) return;

  if (open) {
    drawer.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  } else {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("toastNotice");
  const msgText = document.getElementById("toastMessage");
  if (!toast || !msgText) return;

  msgText.textContent = message;
  toast.classList.add("show", "success");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

// Window Global İhracı (HTML onclick ve harici çağrılar için)
window.navigateToHome = navigateToHome;
window.navigateToCategory = navigateToCategory;
window.navigateToPage = navigateToPage;
window.showView = showView;
window.renderRoute = renderRoute;
window.renderCartPage = renderCartPage;
window.renderWishlistPage = renderWishlistPage;
window.renderProfilePage = renderProfilePage;
window.renderTrackingPage = renderTrackingPage;
window.renderTrackingResult = renderTrackingResult;
window.switchAuthTab = switchAuthTab;
window.handleLoginSubmit = handleLoginSubmit;
window.handleRegisterSubmit = handleRegisterSubmit;
window.handleLogout = handleLogout;
window.handleAuthClick = () => navigateToPage(currentUser ? "hesabim" : "giris");
window.addToCart = addToCart;
window.changeQuantity = changeQuantity;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.applyCoupon = applyCoupon;
window.removeCoupon = removeCoupon;
window.toggleWishlist = toggleWishlist;
window.openCheckoutModal = openCheckoutModal;
window.setCheckoutStep = setCheckoutStep;
window.switchPaymentTab = switchPaymentTab;
window.openPolicyModal = openPolicyModal;
window.openQuickView = openQuickView;
window.closeAllModals = closeAllModals;
window.toggleMobileMenu = toggleMobileMenu;
window.showToast = showToast;
window.resetCategoryFilters = resetCategoryFilters;
window.openOrderTrackingModal = () => navigateToPage("siparis-takip");
window.openAuthModal = () => navigateToPage(currentUser ? "hesabim" : "giris");
window.openCartDrawer = () => navigateToPage("sepet");
window.openWishlistDrawer = () => navigateToPage("favoriler");

// --- 21. BAŞLANGIÇ ÇALIŞTIRICISI ---
document.addEventListener("DOMContentLoaded", () => {
  renderRoute();
  updateCartUI();
  updateWishlistUI();
  updateAuthUI();
  setupLiveSearch();
  setupHeroSlider();
  setupCountdownTimer();

  // Hash değişikliklerini dinle
  window.addEventListener("hashchange", renderRoute);

  // Kategori Sayfası Sıralama & Fiyat
  const catSortSelect = document.getElementById("catSortSelect");
  if (catSortSelect) {
    catSortSelect.addEventListener("change", (e) => {
      catSortBy = e.target.value;
      applyCategoryFiltersAndRender();
    });
  }

  const catApplyBtn = document.getElementById("catApplyPriceBtn");
  if (catApplyBtn) {
    catApplyBtn.addEventListener("click", () => {
      const minVal = parseFloat(document.getElementById("catMinPriceInput")?.value);
      const maxVal = parseFloat(document.getElementById("catMaxPriceInput")?.value);
      catMinPrice = !isNaN(minVal) ? minVal : null;
      catMaxPrice = !isNaN(maxVal) ? maxVal : null;
      applyCategoryFiltersAndRender();
    });
  }

  const catDiscountCb = document.getElementById("catDiscountCb");
  if (catDiscountCb) {
    catDiscountCb.addEventListener("change", (e) => {
      catOnlyDiscount = e.target.checked;
      applyCategoryFiltersAndRender();
    });
  }

  document.querySelectorAll(".filter-chip-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const min = btn.getAttribute("data-min");
      const max = btn.getAttribute("data-max");
      catMinPrice = min ? parseFloat(min) : null;
      catMaxPrice = max ? parseFloat(max) : null;

      const minInput = document.getElementById("catMinPriceInput");
      const maxInput = document.getElementById("catMaxPriceInput");
      if (minInput) minInput.value = min || "";
      if (maxInput) maxInput.value = max || "";

      applyCategoryFiltersAndRender();
    });
  });

  // Sepet Sayfası Kupon Formu
  const cartPageCouponForm = document.getElementById("cartPageCouponForm");
  if (cartPageCouponForm) {
    cartPageCouponForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("cartPageCouponInput");
      if (input) {
        applyCoupon(input.value);
        input.value = "";
      }
    });
  }

  // Sayfa Takip Formu
  const pageTrackingForm = document.getElementById("pageTrackingForm");
  if (pageTrackingForm) pageTrackingForm.addEventListener("submit", handlePageTrackingSubmit);

  // Checkout Formları
  const checkoutStep1Form = document.getElementById("checkoutStep1Form");
  if (checkoutStep1Form) checkoutStep1Form.addEventListener("submit", handleStep1Submit);

  const checkoutStep2Form = document.getElementById("checkoutStep2Form");
  if (checkoutStep2Form) checkoutStep2Form.addEventListener("submit", handleFinalOrderSubmit);

  // Auth Formları
  const pageLoginForm = document.getElementById("pageAuthLoginForm");
  if (pageLoginForm) pageLoginForm.addEventListener("submit", handleLoginSubmit);

  const pageRegisterForm = document.getElementById("pageAuthRegisterForm");
  if (pageRegisterForm) pageRegisterForm.addEventListener("submit", handleRegisterSubmit);

  // Newsletter
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("newsletterEmail");
      if (input && input.value) {
        showToast("Tebrikler! Bültenimize başarıyla kaydoldunuz.");
        input.value = "";
      }
    });
  }

  // Modallar
  document.querySelectorAll(".modal-close-btn").forEach(btn => {
    btn.addEventListener("click", closeAllModals);
  });
  document.querySelectorAll(".modal-overlay").forEach(m => {
    m.addEventListener("click", (e) => {
      if (e.target === m) closeAllModals();
    });
  });

  // Mobil Menü
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", () => toggleMobileMenu(true));

  const mobileDrawerOverlay = document.getElementById("mobileDrawerOverlay");
  if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener("click", () => toggleMobileMenu(false));

  const closeMobileMenuBtn = document.getElementById("closeMobileMenuBtn");
  if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener("click", () => toggleMobileMenu(false));

  // Yukarı Çık Butonu
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.classList.toggle("visible", window.scrollY > 300);
    });
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
