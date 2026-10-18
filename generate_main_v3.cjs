const fs = require('fs');

// ==========================================================================
// AKTİF HEDİYELİK & DEKORATİF ÜRÜN VE KATEGORİ TANIMLARI (53 ADET ÜRÜN)
// ==========================================================================
const rawData = JSON.parse(fs.readFileSync('sevgiliye_ozel_full.json', 'utf8'));

const CATEGORIES_DEF = [
  {
    slug: 'kar-kureleri',
    name: 'Kar Küreleri & 3D Cam Küreler',
    shortName: 'Kar Küreleri',
    icon: '🔮',
    description: 'Nostaljik sokak lambalı kar küreleri, renk değiştiren samanyolu ve gezegen temalı 3D kristal cam küreler.'
  },
  {
    slug: 'batmayan-gemi',
    name: 'Batmayan Gemiler & Akvaryum',
    shortName: 'Batmayan Gemi',
    icon: '🚢',
    description: 'Masaüstü dekoratif batmayan gemi akvaryumları, sıvı kum saatleri ve deniz temalı stres giderici hediyeler.'
  },
  {
    slug: 'cicek-buket',
    name: 'Çiçek & Buket Koleksiyonu',
    shortName: 'Çiçek & Buket',
    icon: '💐',
    description: 'Dekoratif yapı blok çiçek setleri, orkideler, mini Love Flowers buketleri ve peluş ayıcıklı güller.'
  },
  {
    slug: 'taki-mucevher',
    name: 'Takı & Sürpriz İnci Kolye',
    shortName: 'Takı & Kolye',
    icon: '💎',
    description: 'Gerçek istiridye içinden çıkan sürpriz inci kolyeler ve özel gün takı hediye setleri.'
  },
  {
    slug: 'gece-lambalari',
    name: 'Dekoratif Gece Lambaları & Not Panosu',
    shortName: 'Gece Lambaları',
    icon: '💡',
    description: 'El yapımı bulut gece lambaları, LED yazı tahtası not panoları ve dijital çizim tabletleri.'
  },
  {
    slug: 'ozel-hediyelikler',
    name: 'Özel Hediye & Müzik Kutuları',
    shortName: 'Özel Hediyeler',
    icon: '🎁',
    description: 'Nostaljik atlı karınca müzik kutusu, metal kalp kutuda ayıcık ve güller ve sevgiliye özel setler.'
  }
];

const products = rawData.map((p, idx) => {
  const name = (p["Ürün Adı"] || "").trim();
  let slug = "ozel-hediyelikler";
  let catName = "Özel Hediye & Müzik Kutuları";

  if (name.includes("Kar Küresi") || name.includes("Cam Küre")) {
    slug = "kar-kureleri";
    catName = "Kar Küreleri & 3D Cam Küreler";
  } else if (name.includes("Gemi") || name.includes("Akvaryum") || name.includes("Kum Saati")) {
    slug = "batmayan-gemi";
    catName = "Batmayan Gemiler & Akvaryum";
  } else if (name.includes("Çiçek") || name.includes("Buket") || name.includes("Orkide") || name.includes("Gül")) {
    slug = "cicek-buket";
    catName = "Çiçek & Buket Koleksiyonu";
  } else if (name.includes("Kolye") || name.includes("İnci") || name.includes("İstridye")) {
    slug = "taki-mucevher";
    catName = "Takı & Sürpriz İnci Kolye";
  } else if (name.includes("Gece Lambası") || name.includes("Lamba") || name.includes("Yazı Tahtası") || name.includes("Çizim Tablet")) {
    slug = "gece-lambalari";
    catName = "Dekoratif Gece Lambaları & Not Panosu";
  } else if (name.includes("Müzik Kutusu") || name.includes("Kalp Kutu")) {
    slug = "ozel-hediyelikler";
    catName = "Özel Hediye & Müzik Kutuları";
  }

  const price = Number(p["Fiyat"]) || 299.9;
  const oldPrice = Math.round(price * 1.35 + (idx % 10) * 5);
  const discountPercent = Math.round(((oldPrice - price) / oldPrice) * 100);
  const badge = idx % 3 === 0 ? "İndirim" : idx % 5 === 0 ? "Yeni" : idx % 4 === 0 ? "Fırsat" : "";

  return {
    id: idx + 1,
    name: name,
    brand: p["Marka"] || "STAR CAST",
    categorySlug: slug,
    category: catName,
    price: price,
    oldPrice: oldPrice,
    discountPercent: discountPercent,
    badge: badge || (discountPercent > 20 ? `%${discountPercent} İndirim` : ""),
    rating: (4.7 + (idx % 3) * 0.1).toFixed(1),
    reviews: 14 + (idx * 7) % 85,
    image: p["Görsel1"] || "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80",
    inStock: true,
    barcode: p["Barkod"] || ("45067" + (1000 + idx))
  };
});

// ==========================================================================
// GEÇİCİ OLARAK PASİFE ALINAN GURME MARKET VE MULTİNET ÜRÜNLERİ (SİLİNMEYEN YEDEK)
// ==========================================================================
/*
const marketCategoriesDef = [
  {
    slug: 'market',
    name: 'Market & Temel Gıda',
    shortName: 'Market',
    icon: '🛒',
    description: 'Doğal bal, ev yapımı reçeller, taş baskı zeytinyağı, kahvaltılık ve gurme market ürünleri. Multinet Up (MultiPay) yemek kartı ile güvenli alışveriş.'
  }
];

const marketProducts = [
  {
    id: 1,
    name: "Doğal Karakovan Süzme Çiçek Balı & Çam Balı Gurme Seti (2 x 850g)",
    brand: "Sarmal Gurme",
    categorySlug: "market",
    category: "Market & Temel Gıda",
    price: 980.00,
    oldPrice: 1250.00,
    discountPercent: 22,
    badge: "%22 İndirim",
    rating: "4.9",
    reviews: 42,
    image: "/images/products/karakovan_bali.jpg",
    inStock: true,
    barcode: "869000100101"
  },
  {
    id: 2,
    name: "Ev Yapımı Doğal Çilek Reçeli 3'lü Gurme Set (3 x 450g)",
    brand: "Sarmal Gurme",
    categorySlug: "market",
    category: "Market & Temel Gıda",
    price: 549.90,
    oldPrice: 680.00,
    discountPercent: 19,
    badge: "Yeni",
    rating: "4.8",
    reviews: 28,
    image: "/images/products/cilek_receli.jpg",
    inStock: true,
    barcode: "869000100102"
  },
  {
    id: 3,
    name: "Geleneksel Doğal Vişne Reçeli 3'lü Gurme Set (3 x 450g)",
    brand: "Sarmal Gurme",
    categorySlug: "market",
    category: "Market & Temel Gıda",
    price: 549.90,
    oldPrice: 680.00,
    discountPercent: 19,
    badge: "Fırsat",
    rating: "4.9",
    reviews: 35,
    image: "/images/products/visne_receli.jpg",
    inStock: true,
    barcode: "869000100103"
  },
  {
    id: 4,
    name: "Taş Baskı Soğuk Sıkım Naturel Sızma Zeytinyağı Teneke (5 Litre)",
    brand: "Ege Bahçesi",
    categorySlug: "market",
    category: "Market & Temel Gıda",
    price: 1850.00,
    oldPrice: 2150.00,
    discountPercent: 14,
    badge: "Çok Satan",
    rating: "5.0",
    reviews: 64,
    image: "/images/products/zeytinyagi.jpg",
    inStock: true,
    barcode: "869000100104"
  },
  {
    id: 5,
    name: "Köy Tipi Doğal Yayla Tereyağı Blok Vakumlu (2 kg)",
    brand: "Trabzon Çiftliği",
    categorySlug: "market",
    category: "Market & Temel Gıda",
    price: 940.00,
    oldPrice: 1100.00,
    discountPercent: 15,
    badge: "Taze",
    rating: "4.9",
    reviews: 38,
    image: "/images/products/tereyagi.jpg",
    inStock: true,
    barcode: "869000100105"
  },
  {
    id: 6,
    name: "Gemlik Doğal Yağlı Sele Siyah Zeytin Özel Teneke (3 kg)",
    brand: "Gemlik Yöresel",
    categorySlug: "market",
    category: "Market & Temel Gıda",
    price: 780.00,
    oldPrice: 920.00,
    discountPercent: 15,
    badge: "%15 İndirim",
    rating: "4.8",
    reviews: 51,
    image: "/images/products/zeytin.jpg",
    inStock: true,
    barcode: "869000100106"
  },
  {
    id: 7,
    name: "Tam Yağlı Olgunlaştırılmış Eski Kaşar & Ezine Peyniri Seçki (2 kg)",
    brand: "Ezine Mandıra",
    categorySlug: "market",
    category: "Market & Temel Gıda",
    price: 820.00,
    oldPrice: 960.00,
    discountPercent: 15,
    badge: "Geleneksel",
    rating: "4.9",
    reviews: 47,
    image: "/images/products/peynir.jpg",
    inStock: true,
    barcode: "869000100107"
  },
  {
    id: 8,
    name: "Giresun Çifte Kavrulmuş Doğal Fındık Ezmesi (1 kg Cam Kavanoz)",
    brand: "Sarmal Gurme",
    categorySlug: "market",
    category: "Market & Temel Gıda",
    price: 560.00,
    oldPrice: 680.00,
    discountPercent: 18,
    badge: "Doğal",
    rating: "4.9",
    reviews: 33,
    image: "/images/products/findik_ezmesi.jpg",
    inStock: true,
    barcode: "869000100108"
  },
  {
    id: 9,
    name: "Geleneksel Doğal Köy Üzüm Pekmezi Cam Kavanoz 2'li Set (2 x 1 kg)",
    brand: "Antalya Yöresel",
    categorySlug: "market",
    category: "Market & Temel Gıda",
    price: 580.00,
    oldPrice: 690.00,
    discountPercent: 16,
    badge: "İkili Set",
    rating: "4.8",
    reviews: 29,
    image: "/images/products/uzum_pekmezi.jpg",
    inStock: true,
    barcode: "869000100109"
  },
  {
    id: 10,
    name: "Rize Organik İlk Hasat Mayıslık Siyah Çay (3 kg Avantaj Paketi)",
    brand: "Çaykara Çiftliği",
    categorySlug: "market",
    category: "Market & Temel Gıda",
    price: 690.00,
    oldPrice: 820.00,
    discountPercent: 16,
    badge: "Organik",
    rating: "5.0",
    reviews: 58,
    image: "/images/products/rize_cayi.jpg",
    inStock: true,
    barcode: "869000100110"
  }
];
*/

const jsContent = `/**
 * SARMAL TİCARET - ÇOK SAYFALI (SEPET, FAVORİLER, GİRİŞ, KAYIT, KATEGORİ) E-TİCARET MOTORU
 */

// --- 1. MAĞAZA VERİLERİ ---
const CATEGORIES_DATA = ${JSON.stringify(CATEGORIES_DEF, null, 2)};
const PRODUCTS_DATA = ${JSON.stringify(products, null, 2)};

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
  "trackingPageView",
  "productDetailPageView"
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

function navigateToProduct(productId) {
  closeAllModals();
  window.location.hash = "urun=" + productId;
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

  if (rawHash.startsWith("urun=")) {
    const prodId = parseInt(rawHash.split("=")[1], 10);
    const product = PRODUCTS_DATA.find(p => p.id === prodId);
    if (product) {
      showView("productDetailPageView");
      renderProductDetailPage(product);
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

  const shippingWrap = document.querySelector("#cartPageView .free-shipping-bar-wrap");
  if (cart.length === 0) {
    if (contentLayout) contentLayout.style.display = "none";
    if (shippingWrap) shippingWrap.style.display = "none";
    if (emptyContainer) emptyContainer.style.display = "block";
    return;
  }

  if (shippingWrap) shippingWrap.style.display = "block";
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
            '<a href="javascript:void(0)" onclick="navigateToProduct(' + item.product.id + ')" class="cart-page-prod-title">' + escapeHTML(item.product.name) + '</a>' +
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
              '<button type="button" style="color: var(--primary); font-weight: 700; font-size: 0.82rem; text-decoration: underline; background: none; border: none; cursor: pointer; padding: 0;" onclick="navigateToPage(\\'siparis-takip\\'); setTimeout(() => renderTrackingResult(\\'' + order.orderNumber + '\\'), 100);">' +
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
        '<li class="cat-sidebar-item ' + (isActive ? 'active' : '') + '" onclick="navigateToCategory(\\'' + c.slug + '\\')">' +
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
  } else if (catSortBy === "name-asc") {
    list.sort((a, b) => a.name.localeCompare(b.name, "tr"));
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
      '<div class="product-img-wrap" onclick="navigateToProduct(' + product.id + ')">' +
        '<img class="product-img" src="' + safeImg + '" alt="' + safeName + '" loading="lazy" onerror="this.src=\\'https://via.placeholder.com/400?text=Sarmal+Ticaret\\'" />' +
        '<button class="quick-view-overlay-btn" type="button" onclick="navigateToProduct(' + product.id + '); event.stopPropagation();">Ürünü İncele</button>' +
      '</div>' +
      '<div class="product-content">' +
        '<span class="product-brand">' + safeBrand + '</span>' +
        '<h3 class="product-title" onclick="navigateToProduct(' + product.id + ')" title="' + safeName + '">' + safeName + '</h3>' +
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

  const dealsList = PRODUCTS_DATA.slice(0, 10);
  dealsGrid.innerHTML = dealsList.map(createProductCardHTML).join("");

  const curatedList = PRODUCTS_DATA.slice(10, 34);
  curatedGrid.innerHTML = curatedList.map(createProductCardHTML).join("");
}

// --- 12. SEPET, HEDİYE SEÇENEKLERİ VE KUPON MANTIĞI ---
let giftOptions = {
  wrapping: false,
  note: ""
};

function toggleGiftWrapping(checked) {
  giftOptions.wrapping = checked;
  const noteCb = document.getElementById("giftNoteCb");
  if (checked && noteCb && !noteCb.checked) {
    noteCb.checked = true;
    toggleGiftNote(true);
  }
}

function toggleGiftNote(checked) {
  const wrapper = document.getElementById("giftNoteWrapper");
  if (wrapper) {
    if (checked) {
      wrapper.classList.add("active");
      const textarea = document.getElementById("giftNoteText");
      if (textarea) textarea.focus();
    } else {
      wrapper.classList.remove("active");
    }
  }
  if (!checked) {
    giftOptions.note = "";
  } else {
    const textarea = document.getElementById("giftNoteText");
    if (textarea) giftOptions.note = textarea.value.trim();
  }
}

function updateGiftNoteCount(text) {
  giftOptions.note = text.trim();
  const counter = document.getElementById("giftNoteCharCount");
  if (counter) {
    counter.textContent = text.length + " / 250";
  }
}

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

  if (step === 2) {
    renderCheckoutInstallments();
  }
}

// --- PAYTR DİNAMİK TAKSİT TABLOSU VE SEÇİCİSİ (ÖDEME ADIMINDA GÖSTERİLİR) ---
function renderCheckoutInstallments() {
  const container = document.getElementById("paytrInstallmentContainer");
  if (!container) return;

  const { grandTotal } = calculateCartTotals();
  const t2 = (grandTotal / 2);
  const t3 = (grandTotal / 3);
  const t6 = ((grandTotal * 1.045) / 6);
  const t9 = ((grandTotal * 1.085) / 9);
  const t12 = ((grandTotal * 1.125) / 12);

  const options = [
    { id: "opt_single", label: "Tek Çekim", monthly: grandTotal, total: grandTotal, note: "Peşin Fiyatına", count: 1 },
    { id: "opt_2", label: "2 Taksit", monthly: t2, total: grandTotal, note: "Peşin Fiyatına", count: 2 },
    { id: "opt_3", label: "3 Taksit", monthly: t3, total: grandTotal, note: "Peşin Fiyatına", count: 3 },
    { id: "opt_6", label: "6 Taksit", monthly: t6, total: grandTotal * 1.045, note: "+%4.5 Vade Farkı", count: 6 },
    { id: "opt_9", label: "9 Taksit", monthly: t9, total: grandTotal * 1.085, note: "+%8.5 Vade Farkı", count: 9 },
    { id: "opt_12", label: "12 Taksit", monthly: t12, total: grandTotal * 1.125, note: "+%12.5 Vade Farkı", count: 12 }
  ];

  const currentVal = document.getElementById("creditCardInstallment")?.value || "Tek Çekim";

  let html = 
    '<div style="background: #f8fafc; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; margin-top: 0.5rem;">' +
      '<div style="padding: 0.6rem 0.85rem; background: #f1f5f9; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; font-weight: 700; color: var(--primary-deep);">' +
        '<span>🔒 PayTR Altyapısı ile Taksit Tablosu</span>' +
        '<span style="color: var(--text-muted); font-size: 0.72rem;">Bonus, World, Axess, Maximum, Paraf, Troy</span>' +
      '</div>' +
      '<table class="installment-table" style="margin-top: 0; border: none; width: 100%;">' +
        '<thead>' +
          '<tr>' +
            '<th style="width: 40px; text-align: center;">Seç</th>' +
            '<th>Taksit</th>' +
            '<th style="text-align: right;">Aylık Tutar</th>' +
            '<th style="text-align: right;">Toplam Tutar</th>' +
          '</tr>' +
        '</thead>' +
        '<tbody>';

  options.forEach((opt, idx) => {
    const isChecked = currentVal === opt.label || (idx === 0 && currentVal === "Tek Çekim");
    html += 
      '<tr style="cursor: pointer;' + (isChecked ? ' background: #eff6ff;' : '') + '" onclick="selectPaytrInstallment(\\'' + opt.label + '\\')">' +
        '<td style="text-align: center;">' +
          '<input type="radio" name="paytr_installment_radio" value="' + opt.label + '" ' + (isChecked ? 'checked' : '') + ' onchange="selectPaytrInstallment(\\'' + opt.label + '\\')" />' +
        '</td>' +
        '<td>' +
          '<strong>' + opt.label + '</strong> ' +
          '<span style="font-size: 0.72rem; color: ' + (opt.note.includes("Peşin") ? '#16a34a' : 'var(--text-muted)') + '; font-weight: 600; margin-left: 4px;">(' + opt.note + ')</span>' +
        '</td>' +
        '<td style="text-align: right; font-weight: 700; color: var(--primary);">' + formatPrice(opt.monthly) + '</td>' +
        '<td style="text-align: right; font-weight: 800; color: var(--primary-deep);">' + formatPrice(opt.total) + '</td>' +
      '</tr>';
  });

  html += 
        '</tbody>' +
      '</table>' +
    '</div>';

  container.innerHTML = html;
}

function selectPaytrInstallment(val) {
  const hiddenInput = document.getElementById("creditCardInstallment");
  if (hiddenInput) hiddenInput.value = val;
  const radios = document.querySelectorAll("input[name='paytr_installment_radio']");
  radios.forEach(r => {
    const row = r.closest("tr");
    if (r.value === val) {
      r.checked = true;
      if (row) row.style.background = "#eff6ff";
    } else {
      r.checked = false;
      if (row) row.style.background = "";
    }
  });
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

  const activeTab = document.querySelector(".payment-tab-btn.active")?.getAttribute("data-tab") || "creditcard";
  let paymentMethodName = "PayTR ile Kredi Kartı";
  let orderStatus = "Hazırlanıyor";

  // --- KREDİ KARTI KONTROLLERİ (PayTR Altyapısı - 3D Secure) ---
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
    paymentMethodName = "PayTR Kredi Kartı (" + installment + ") - 3D Secure Onaylı";

  // --- HAVALE / EFT / NAKİT ---
  } else if (activeTab === "havale") {
    paymentMethodName = "Havale / EFT & Kapıda Nakit (Garanti BBVA)";
    orderStatus = "Ödeme Bekleniyor (Havale Bildirimi)";

  // --- MULTİNET YEMEK KARTI KONTROLLERİ (Pasif Yedek) ---
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
  }

  // --- PAYTR 3D SECURE SMS DOĞRULAMA & SİPARİŞİ TAMAMLAMA ---
  const submitBtn = e.target.querySelector("button[type='submit']");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = "PayTR 3D Secure Başlatılıyor... ⏳";
  }

  if (activeTab === "creditcard") {
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = "Siparişi Onayla ve Tamamla ✓";
      }
      showPaytr3dModal(checkoutFormData.phone, () => {
        finalizeOrderCreation(paymentMethodName, orderStatus);
      });
    }, 600);
  } else {
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = "Siparişi Onayla ve Tamamla ✓";
      }
      finalizeOrderCreation(paymentMethodName, orderStatus);
    }, 600);
  }
}

let paytr3dTimerInterval = null;

function showPaytr3dModal(phone, onConfirm) {
  const modal = document.getElementById("paytr3dModal");
  const phoneText = document.getElementById("paytr3dPhoneText");
  const timerText = document.getElementById("paytr3dTimer");
  const codeInput = document.getElementById("paytr3dCodeInput");
  if (!modal) {
    onConfirm();
    return;
  }

  let cleanPhone = String(phone || "05378715517").replace(/[^0-9]/g, "");
  let masked = cleanPhone.length >= 10
    ? cleanPhone.slice(0, 3) + "* *** ** " + cleanPhone.slice(-2)
    : "053* *** ** 17";

  if (phoneText) phoneText.textContent = masked;
  if (codeInput) codeInput.value = "849201";

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";

  let secondsLeft = 179;
  if (paytr3dTimerInterval) clearInterval(paytr3dTimerInterval);
  paytr3dTimerInterval = setInterval(() => {
    secondsLeft--;
    if (secondsLeft <= 0) {
      clearInterval(paytr3dTimerInterval);
      secondsLeft = 0;
    }
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    if (timerText) timerText.textContent = String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }, 1000);

  window._pendingPaytrConfirm = () => {
    clearInterval(paytr3dTimerInterval);
    modal.style.display = "none";
    document.body.style.overflow = "";
    onConfirm();
  };
}

function confirmPaytr3dOtp() {
  const code = (document.getElementById("paytr3dCodeInput")?.value || "").trim();
  if (code.length < 4) {
    showToast("Lütfen 6 haneli doğrulama kodunu giriniz.");
    return;
  }
  const btn = document.getElementById("paytr3dConfirmBtn");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "3D Secure Onaylandı! Banka iletiliyor... ✓";
  }
  setTimeout(() => {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Ödemeyi Onayla ve Siparişi Tamamla ✓";
    }
    if (typeof window._pendingPaytrConfirm === "function") {
      window._pendingPaytrConfirm();
    }
  }, 700);
}

function finalizeOrderCreation(paymentMethodName, orderStatus) {
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
    carrier: "Yurtiçi Kargo",
    gift: { ...giftOptions }
  };

  userOrders.unshift(orderRecord);
  safeLocalStorageSet("sarmal_orders", userOrders);

  const successOrderNum = document.getElementById("successOrderNumber");
  const successTotal = document.getElementById("successTotalAmount");
  const successPayment = document.getElementById("successPaymentMethod");
  const successAddress = document.getElementById("successDeliveryAddress");
  const successGiftWrap = document.getElementById("successGiftWrapPreview");
  const successGiftDetails = document.getElementById("successGiftWrapDetails");
  const successWa = document.getElementById("successWhatsappLink");

  if (successOrderNum) successOrderNum.textContent = orderNumber;
  if (successTotal) successTotal.textContent = formatPrice(grandTotal);
  if (successPayment) successPayment.textContent = paymentMethodName;
  if (successAddress) successAddress.textContent = checkoutFormData.address + ", " + checkoutFormData.district + " / " + checkoutFormData.city;

  if (successGiftWrap) {
    if (giftOptions.wrapping || giftOptions.note) {
      successGiftWrap.style.display = "block";
      let details = "";
      if (giftOptions.wrapping) details += "Şık Saten Kurdeleli Özel Hediye Paketi hazırlandı. ";
      if (giftOptions.note) details += 'Hediye Kartı Notunuz: "' + escapeHTML(giftOptions.note) + '"';
      if (successGiftDetails) successGiftDetails.textContent = details;
    } else {
      successGiftWrap.style.display = "none";
    }
  }

  if (successWa) {
    const waMsg = encodeURIComponent("Merhaba Sarmal Ticaret, " + orderNumber + " numaralı hediyelik siparişim (" + formatPrice(grandTotal) + ") hakkında bilgi almak istiyorum.");
    successWa.href = "https://wa.me/905378715517?text=" + waMsg;
  }

  cart = [];
  activeCoupon = null;
  giftOptions = { wrapping: false, note: "" };
  safeLocalStorageSet("sarmal_coupon", null);
  saveCart();

  showToast("Ödeme başarıyla onaylandı! Siparişiniz oluşturuldu. 🎉");
  setCheckoutStep(3);
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
    titleEl.textContent = "Mesafeli Satış Sözleşmesi (ETBİS Uyumlu)";
    bodyEl.innerHTML = (
      '<h4>MADDE 1 – TARAFLAR</h4>' +
      '<p><strong>SATICI BİLGİLERİ (ETBİS Kayıtlı):</strong><br>' +
      '<strong>Ticari Ünvan:</strong> Sarmal Ticaret ve Hediyelik Eşya San. Tic. Ltd. Şti.<br>' +
      '<strong>Vergi Dairesi & No:</strong> Kadıköy V.D. - 7460982315<br>' +
      '<strong>MERSİS Numarası:</strong> 0746098231500001<br>' +
      '<strong>Ticaret Sicil No:</strong> 492015-5<br>' +
      '<strong>Adres:</strong> Osmanağa Mah. Söğütlüçeşme Cad. No: 42/3 Kadıköy / İstanbul<br>' +
      '<strong>Telefon:</strong> 0850 308 58 72 | <strong>WhatsApp:</strong> 0537 871 55 17<br>' +
      '<strong>KEP Adresi:</strong> sarmalticaret@hs01.kep.tr | <strong>E-Posta:</strong> destek@sarmalticaret.com</p>' +
      '<p><strong>ALICI (MÜŞTERİ):</strong> Sipariş formunda belirtilen alıcı bilgileri.</p>' +
      '<h4>MADDE 2 – SÖZLEŞMENİN KONUSU</h4>' +
      '<p>ALICI’nın www.sarmalticaret.com üzerinden sipariş ettiği hediyelik ürünlerin satışı, teslimi ve PayTR 256-Bit SSL güvencesiyle tahsilatı ile ilgili yasal hak ve yükümlülükler.</p>'
    );
  } else if (type === "privacy") {
    titleEl.textContent = "Gizlilik ve PayTR Güvenlik Politikası";
    bodyEl.innerHTML = (
      '<h4>1. Güvenli Alışveriş ve 256-Bit SSL</h4>' +
      '<p>Sitemizdeki tüm işlemler <strong>256-Bit SSL</strong> şifreleme ve <strong>PayTR Lisanslı Ödeme Sistemi</strong> ile korunmaktadır. Kredi kartı bilgileriniz doğrudan PCI-DSS Level 1 sertifikalı PayTR sunucularında işlenir, mağaza veritabanımızda asla saklanmaz.</p>'
    );
  } else if (type === "kvkk") {
    titleEl.textContent = "KVKK Aydınlatma Metni";
    bodyEl.innerHTML = (
      '<h4>Kişisel Verilerin Korunması Kanunu (KVKK)</h4>' +
      '<p>6698 sayılı kanun kapsamında veri sorumlusu: <strong>Sarmal Ticaret ve Hediyelik Eşya San. Tic. Ltd. Şti.</strong> Ad, telefon, adres ve e-posta verileriniz yalnızca sipariş hazırlığı, faturalandırma ve kargo teslimatı için işlenir.</p>'
    );
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// --- 16. AYRI ÜRÜN DETAY SAYFASI MOTORU (PDP) ---
let currentPdpProduct = null;

function openQuickView(productId) {
  navigateToProduct(productId);
}

function renderProductDetailPage(product) {
  currentPdpProduct = product;
  window.scrollTo({ top: 0, behavior: "smooth" });

  const bCat = document.getElementById("pdpBreadcrumbCategory");
  const bTitle = document.getElementById("pdpBreadcrumbTitle");
  const badgeTag = document.getElementById("pdpBadgeTag");
  const mainImg = document.getElementById("pdpMainImg");
  const thumb1 = document.getElementById("pdpThumb1");
  const catTag = document.getElementById("pdpCategoryTag");
  const title = document.getElementById("pdpTitle");
  const reviewsText = document.getElementById("pdpReviewsText");
  const barcodeText = document.getElementById("pdpBarcodeText");
  const oldPrice = document.getElementById("pdpOldPrice");
  const currentPrice = document.getElementById("pdpCurrentPrice");
  const discountBadge = document.getElementById("pdpDiscountBadge");
  const liveViewers = document.getElementById("pdpLiveViewers");
  const recentOrders = document.getElementById("pdpRecentOrders");
  const qtyInput = document.getElementById("pdpQtyInput");
  const wishlistBtn = document.getElementById("pdpWishlistBtn");
  const specCat = document.getElementById("pdpSpecCategory");
  const specBarcode = document.getElementById("pdpSpecBarcode");
  const tabReviewCount = document.getElementById("pdpTabReviewCount");

  if (bCat) {
    bCat.textContent = product.category;
    bCat.onclick = () => navigateToCategory(product.categorySlug);
  }
  if (bTitle) bTitle.textContent = product.name;
  if (badgeTag) {
    badgeTag.textContent = product.badge || "%25 İndirim";
    badgeTag.style.display = product.badge ? "block" : "none";
  }
  if (mainImg) {
    mainImg.src = product.image;
    mainImg.alt = product.name;
  }
  if (thumb1) {
    thumb1.src = product.image;
    thumb1.alt = product.name;
    thumb1.parentElement.onclick = () => {
      if (mainImg) mainImg.src = product.image;
    };
  }
  if (catTag) {
    catTag.textContent = product.category;
    catTag.onclick = () => navigateToCategory(product.categorySlug);
  }
  if (title) title.textContent = product.name;
  if (reviewsText) reviewsText.textContent = "(" + product.reviews + " Değerlendirme)";
  if (barcodeText) barcodeText.textContent = "Barkod: " + product.barcode;
  if (oldPrice) oldPrice.textContent = formatPrice(product.oldPrice);
  if (currentPrice) currentPrice.textContent = formatPrice(product.price);
  if (discountBadge) {
    const diff = product.oldPrice - product.price;
    discountBadge.textContent = "%" + product.discountPercent + " İndirim (" + formatPrice(diff) + " Kazanç)";
  }
  if (liveViewers) {
    liveViewers.innerHTML = 'Bu hediyeyi şu an <strong>' + (14 + (product.id % 9)) + ' kişi</strong> inceliyor.';
  }
  if (recentOrders) {
    recentOrders.innerHTML = 'Son 24 saatte <strong>' + (5 + (product.id % 6)) + ' kişi</strong> bu ürünü sipariş etti - Sınırlı Stok!';
  }
  if (qtyInput) qtyInput.value = "1";
  if (wishlistBtn) {
    const isW = wishlist.includes(product.id);
    wishlistBtn.innerHTML = isW ? "❤️" : "🤍";
    wishlistBtn.classList.toggle("active", isW);
  }
  if (specCat) specCat.textContent = product.category;
  if (specBarcode) specBarcode.textContent = product.barcode;
  if (tabReviewCount) tabReviewCount.textContent = product.reviews;

  // İlgili Benzer Ürünler (Aynı kategoriden 4 ürün)
  const relatedGrid = document.getElementById("pdpRelatedProductsGrid");
  if (relatedGrid) {
    const relatedList = PRODUCTS_DATA
      .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
      .slice(0, 4);
    relatedGrid.innerHTML = relatedList.map(createProductCardHTML).join("");
  }
}

function changePdpQty(delta) {
  const qtyInput = document.getElementById("pdpQtyInput");
  if (!qtyInput) return;
  let val = parseInt(qtyInput.value, 10) || 1;
  val = Math.max(1, Math.min(99, val + delta));
  qtyInput.value = val;
}

function handlePdpAddToCart() {
  if (!currentPdpProduct) return;
  const qtyInput = document.getElementById("pdpQtyInput");
  const qty = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;
  addToCart(currentPdpProduct.id, qty);
}

function handlePdpBuyNow() {
  if (!currentPdpProduct) return;
  const qtyInput = document.getElementById("pdpQtyInput");
  const qty = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;
  addToCart(currentPdpProduct.id, qty);
  navigateToPage("sepet");
  setTimeout(() => {
    openCheckoutModal();
  }, 150);
}

function handlePdpWishlist() {
  if (!currentPdpProduct) return;
  toggleWishlist(currentPdpProduct.id);
  const wishlistBtn = document.getElementById("pdpWishlistBtn");
  if (wishlistBtn) {
    const isW = wishlist.includes(currentPdpProduct.id);
    wishlistBtn.innerHTML = isW ? "❤️" : "🤍";
    wishlistBtn.classList.toggle("active", isW);
  }
}

function switchPdpTab(tabName) {
  const tabs = ["desc", "specs", "shipping", "reviews"];
  tabs.forEach(t => {
    const btn = document.getElementById("tabBtn" + t.charAt(0).toUpperCase() + t.slice(1));
    const content = document.getElementById("pdpTab" + t.charAt(0).toUpperCase() + t.slice(1));
    if (btn) btn.classList.toggle("active", t === tabName);
    if (content) content.classList.toggle("active", t === tabName);
  });
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
        '<div class="search-result-item" onclick="navigateToProduct(' + p.id + '); closeSearch();">' +
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

// --- 19. GERİ SAYIM SAYACI (AYNI GÜN KARGO 16:00) & CANLI SATIŞ FOMO ---
function setupCountdownTimer() {
  const cdHours = document.getElementById("cdHours") || document.getElementById("timerHours");
  const cdMinutes = document.getElementById("cdMinutes") || document.getElementById("timerMinutes");
  const cdSeconds = document.getElementById("cdSeconds") || document.getElementById("timerSeconds");

  if (!cdHours || !cdMinutes || !cdSeconds) return;

  function updateTimer() {
    const now = new Date();
    let target = new Date();
    target.setHours(16, 0, 0, 0);

    if (now >= target) {
      target.setDate(target.getDate() + 1);
    }

    const diff = target - now;
    if (diff <= 0) return;

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    cdHours.textContent = String(h).padStart(2, "0");
    cdMinutes.textContent = String(m).padStart(2, "0");
    cdSeconds.textContent = String(s).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

const FOMO_SALES = [
  { buyer: "Ayşe K.", city: "İzmir", item: "Sokak Lambalı Işıklı Kar Küresi", img: "/images/products/sokak_lambali_kar_kuresi.jpg", time: "2 dakika önce" },
  { buyer: "Murat B.", city: "Ankara", item: "Batmayan Gemi Titanik Sıvı Akvaryum", img: "/images/products/batmayan_gemi.jpg", time: "4 dakika önce" },
  { buyer: "Zeynep T.", city: "İstanbul", item: "3D Kristal Cam Gece Lambası", img: "/images/products/samanyolu_kure.jpg", time: "6 dakika önce" },
  { buyer: "Elif S.", city: "Bursa", item: "İstiridye İçinde Gerçek İnci Kolye", img: "/images/products/istiridye_inci.jpg", time: "8 dakika önce" },
  { buyer: "Emre D.", city: "Antalya", item: "LED Işıklı Sonsuzluk Gül Fanusu", img: "/images/products/led_gul_fanus.jpg", time: "11 dakika önce" }
];
let fomoIndex = 0;
let fomoTimeout = null;

function initLiveSalesFomo() {
  const toast = document.getElementById("liveSalesToast");
  if (!toast) return;

  function triggerNext() {
    const data = FOMO_SALES[fomoIndex % FOMO_SALES.length];
    fomoIndex++;

    const img = document.getElementById("liveSalesImg");
    const buyer = document.getElementById("liveSalesBuyerName");
    const title = document.getElementById("liveSalesProductTitle");
    const time = document.getElementById("liveSalesTimeText");

    if (img) img.src = data.img;
    if (buyer) buyer.textContent = data.buyer + " (" + data.city + ")";
    if (title) title.textContent = data.item;
    if (time) time.textContent = "Az önce hediye siparişi verdi • " + data.time;

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 5500);

    fomoTimeout = setTimeout(triggerNext, 18000 + Math.random() * 8000);
  }

  fomoTimeout = setTimeout(triggerNext, 4000);
}

function closeLiveSalesToast() {
  const toast = document.getElementById("liveSalesToast");
  if (toast) toast.classList.remove("show");
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
window.navigateToProduct = navigateToProduct;
window.renderProductDetailPage = renderProductDetailPage;
window.changePdpQty = changePdpQty;
window.handlePdpAddToCart = handlePdpAddToCart;
window.handlePdpBuyNow = handlePdpBuyNow;
window.handlePdpWishlist = handlePdpWishlist;
window.switchPdpTab = switchPdpTab;
window.toggleGiftWrapping = toggleGiftWrapping;
window.toggleGiftNote = toggleGiftNote;
window.updateGiftNoteCount = updateGiftNoteCount;
window.confirmPaytr3dOtp = confirmPaytr3dOtp;
window.closeLiveSalesToast = closeLiveSalesToast;
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
window.renderCheckoutInstallments = renderCheckoutInstallments;
window.selectPaytrInstallment = selectPaytrInstallment;
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
  initLiveSalesFomo();

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
`;

fs.writeFileSync('main.js', jsContent, 'utf8');
console.log('Successfully written main.js v3 with dedicated full page views!');
