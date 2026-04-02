import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Banner } from './components/Banner';
import { Categories } from './components/Categories';
import { ProductList } from './components/ProductList';
import { AddProduct } from './components/AddProduct';
import { Cart } from './components/Cart';
import { Toast } from './components/Toast';
import { ProductDetail } from './components/ProductDetail';
import { Favorites } from './components/Favorites';
import { Auth } from './components/Auth';
import { UserProfile } from './components/UserProfile';
import { Checkout } from './components/Checkout';
import { DarkModeToggle } from './components/DarkModeToggle';
import { LiveSupport } from './components/LiveSupport';
import { SocialProof } from './components/SocialProof';
import { DistanceSellingContract, RefundPolicy, PrivacyPolicy } from './components/LegalPages';
import { BackToTop } from './components/BackToTop';
import { ProductFilters } from './components/ProductFilters';
import { RecentlyViewed } from './components/RecentlyViewed';
import { ProductRecommendations } from './components/ProductRecommendations';
import { Newsletter } from './components/Newsletter';
import { AdminPanel } from './components/AdminPanel';
import { FlashDeals } from './components/FlashDeals';
import { CategoryDrawer } from './components/CategoryDrawer';
import * as db from './lib/supabase';


const INITIAL_PRODUCTS = [
  { id: 1, title: "Fjallraven Günlük Sırt Çantası", price: 1099, description: "Günlük kullanım için laptop bölmeli, suya dayanıklı ve geniş iç hacimli dayanıklı kumaş sırt çantası.", image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", category: 1 },
  { id: 2, title: "Premium Casual Erkek Tişört", price: 250, description: "Yaz ayları için ideal, %100 pamuklu, nefes alan ve slim fit kesim kaliteli erkek tişörtü.", image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", category: 1 },
  { id: 3, title: "Erkek Ceket Uzun Kollu", price: 850, description: "Sonbahar ve ilkbahar geçişleri için tasarlanmış şık astarlı ince ceket.", image: "https://fakestoreapi.com/img/71li-ujtlAL._AC_UX679_.jpg", category: 1 },
  { id: 4, title: "Erkek Slim Fit Klasik Gömlek", price: 400, description: "Ofis ve günlük şıklık için ütü gerektirmeyen slim fit tasarımlı gömlek.", image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg", category: 1 },
  { id: 5, title: "Gümüş Ejderha Tasarımlı Bileklik", price: 2300, description: "Kadınlar için özel seri, efsanevi ejderha detaylarına sahip altın ve gümüş zincir bileklik.", image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3.jpg", category: 3 },
  { id: 6, title: "Solid Altın İnce Yüzük", price: 1680, description: "Zarif ince pırlanta taşlarla süslenmiş saf altın kaplama premium yüzük.", image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3.jpg", category: 3 },
  { id: 7, title: "Prenses Kesim Gümüş Yüzük", price: 950, description: "Beyaz altın kaplama, özel gün hediyesi prenses kesim beyaz taşlı göz alıcı yüzük.", image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3.jpg", category: 3 },
  { id: 8, title: "Paslanmaz Çelik Çift Halka Küpe", price: 300, description: "Gül kurusu altın (rose gold) renginde alerji yapmayan ve renk atmayan halka çelik küpe.", image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3.jpg", category: 3 },
  { id: 9, title: "WD 2TB Taşınabilir Harici Disk", price: 1950, description: "WD Elements teknolojili, geniş depolama alanına sahip 2 Terabayt veri kapasiteli harici sabit disk.", image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg", category: 5 },
  { id: 10, title: "SanDisk SSD PLUS 1TB SSD Disk", price: 1450, description: "Bilgisayarınızı hızlandıran yüksek okuma/yazma devirli 1 Terabayt dahili SSD bellek.", image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg", category: 5 }
];

function getLocalStorage(key, initialValue) {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return initialValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    return initialValue;
  }
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  // Product state
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Cart state
  const [cart, setCart] = useState(() => getLocalStorage('sarmal_cart', []));

  // Favorites state
  const [favorites, setFavorites] = useState([]);

  // User state
  const [user, setUser] = useState(null);

  // Addresses state
  const [addresses, setAddresses] = useState([]);

  // Orders state
  const [orders, setOrders] = useState([]);

  // Modal states
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isFlashDealsOpen, setIsFlashDealsOpen] = useState(false);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);

  // Other states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success', isVisible: false });
  const [selectedProduct, setSelectedProduct] = useState(null);

  // New premium features states
  const [isDarkMode, setIsDarkMode] = useState(() => getLocalStorage('sarmal_darkMode', false));
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [viewedProducts, setViewedProducts] = useState(() => getLocalStorage('sarmal_viewed', []));
  const [isAdmin, setIsAdmin] = useState(false);

  // Supabase sync
  useEffect(() => {
    // 1. Initial Data Fetch
    // Check for payment result
    const params = new URLSearchParams(location.search);
    if (params.get('success') === 'true') {
      showToast('Ödemeniz başarıyla alındı! Siparişiniz hazırlanıyor 🎉', 'success');
      setCart([]);
      navigate('/', { replace: true });
    } else if (params.get('error')) {
      showToast('Ödeme işlemi tamamlanamadı veya iptal edildi.', 'error');
      navigate('/checkout', { replace: true });
    }

    const init = async () => {
      // 1. Products Load with Timeout Protection
      try {
        // Timeout protection for initial fetch
        const productFetch = db.getProducts();
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Product fetch timeout')), 5000)
        );

        const productsData = await Promise.race([productFetch, timeoutPromise]);

        if (productsData && productsData.length > 0) {
          setProducts(productsData);
        }
      } catch (err) {
        console.error('App init: product load failed or timed out:', err);
        // Fallback happened automatically since state remains INITIAL_PRODUCTS
      } finally {
        setIsLoading(false);
      }

      // 2. Background Auth Sync
      try {
        const session = await db.getSession();
        if (session?.user) {
          const profile = await db.getProfile(session.user.id);
          setUser({ ...session.user, ...profile });

          if (session.user.email === 'admin@sarmal.com') {
            setIsAdmin(true);
          }

          // Fetch user-specific data in parallel
          Promise.all([
            db.getFavorites(session.user.id),
            db.getAddresses(session.user.id),
            db.getOrders(session.user.id)
          ]).then(([favs, addrs, ords]) => {
            setFavorites(favs);
            setAddresses(addrs);
            setOrders(ords);
          }).catch(err => {
            console.error('App init: background data sync failed:', err);
          });
        }
      } catch (err) {
        console.error('App init: auth check failed:', err);
      }
    };

    init();

    // 2. Sync category state with URL
    const match = location.pathname.match(/\/category\/(\d+)/);
    if (match) {
      setSelectedCategory(parseInt(match[1]));
    } else if (location.pathname === '/') {
      setSelectedCategory(null);
    }

    // 3. Auth State Listener
    const { data: { subscription } } = db.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await db.getProfile(session.user.id);
        setUser({ ...session.user, ...profile });

        if (session.user.email === 'sarmalticarett@gmail.com') {
          setIsAdmin(true);
        }

        // Sync user-specific data
        const userFavs = await db.getFavorites(session.user.id);
        setFavorites(userFavs);

        const userAddresses = await db.getAddresses(session.user.id);
        setAddresses(userAddresses);

        const userOrders = await db.getOrders(session.user.id);
        setOrders(userOrders);
      } else {
        setUser(null);
        setIsAdmin(false);
        setFavorites([]);
        setAddresses([]);
        setOrders([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch fresh products from database on load
  useEffect(() => {
    async function loadProducts() {
      try {
        const freshProducts = await db.getProducts();
        if (freshProducts && freshProducts.length > 0) {
          setProducts(freshProducts);
        }
      } catch (err) {
        console.error('Failed to load products from DB', err);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      window.localStorage.setItem('sarmal_cart', JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      window.localStorage.setItem('sarmal_darkMode', JSON.stringify(isDarkMode));
    }
    if (isDarkMode) {
      document.documentElement.style.setProperty('--color-bg', '#1e293b');
      document.documentElement.style.setProperty('--color-card', '#334155');
      document.documentElement.style.setProperty('--color-text', '#f1f5f9');
      document.documentElement.style.setProperty('--color-secondary', '#e2e8f0');
      document.body.style.background = '#0f172a';
    } else {
      document.documentElement.style.setProperty('--color-bg', '#f8fafc');
      document.documentElement.style.setProperty('--color-card', '#ffffff');
      document.documentElement.style.setProperty('--color-text', '#1e293b');
      document.documentElement.style.setProperty('--color-secondary', '#1e293b');
      document.body.style.background = 'white';
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      window.localStorage.setItem('sarmal_viewed', JSON.stringify(viewedProducts));
    }
  }, [viewedProducts]);

  // Toast helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type, isVisible: true });
  };

  // Auth handlers
  const handleLogin = async (credentials) => {
    try {
      await db.signIn(credentials.email, credentials.password);
      setIsAuthOpen(false);
      showToast('Giriş başarılı! 👋', 'success');
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      showToast('Giriş başarısız: ' + err.message, 'error');
    }
  };

  const handleRegister = async (userData) => {
    try {
      await db.signUp(userData.email, userData.password, {
        name: userData.name,
        phone: userData.phone
      });
      setIsAuthOpen(false);
      showToast('Hesabınız oluşturuldu! 🎉', 'success');
      navigate('/');
    } catch (err) {
      console.error('Register error:', err);
      showToast('Kayıt başarısız: ' + err.message, 'error');
    }
  };

  const handleResetPassword = async (email) => {
    try {
      await db.resetPassword(email);
      setIsAuthOpen(false);
      showToast('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.', 'info');
    } catch (err) {
      console.error('Reset error:', err);
      showToast('Hata: ' + err.message, 'error');
    }
  };

  const handleLogout = async () => {
    try {
      await db.signOut();
      setUser(null);
      setIsAdmin(false);
      setFavorites([]);
      setAddresses([]);
      setOrders([]);
      setIsProfileOpen(false);
      showToast('Başarıyla çıkış yaptınız', 'info');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Product handlers
  const handleAddProduct = async (productData) => {
    try {
      const { extraImages, ...cleanData } = productData;
      let targetProduct;

      if (productData.id) {
        // Edit mode
        targetProduct = await db.updateProduct(productData.id, cleanData);
        setProducts(products.map(p => p.id === targetProduct.id ? targetProduct : p));

        // Handle images update (clear and replace for simplicity)
        await db.deleteProductImagesByProduct(targetProduct.id);
        if (extraImages && extraImages.length > 0) {
          for (let i = 0; i < extraImages.length; i++) {
            await db.addProductImage(targetProduct.id, extraImages[i].url, i);
          }
        }
        showToast('Ürün başarıyla güncellendi! ✏️', 'success');
      } else {
        // Add mode
        targetProduct = await db.addProduct(cleanData);
        if (extraImages && extraImages.length > 0) {
          for (let i = 0; i < extraImages.length; i++) {
            await db.addProductImage(targetProduct.id, extraImages[i].url, i);
          }
        }
        setProducts([targetProduct, ...products]);
        showToast('Ürün başarıyla eklendi! 🎉', 'success');
      }
      setIsAddProductOpen(false);
      setEditingProduct(null);
    } catch (err) {
      console.error('Save product error:', err);
      showToast('İşlem başarısız: ' + err.message, 'error');
    }
  };

  // Cart handlers
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    showToast(`${product.title} sepete eklendi! 🛒`, 'success');
  };

  const handleRemoveFromCart = (productId) => {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
      showToast('Ürün sepetten çıkarıldı', 'info');
    }
  };

  const handleUpdateQuantity = (productId, change) => {
    if (change > 0) {
      const product = products.find(p => p.id === productId);
      if (product) {
        setCart([...cart, product]);
      }
    } else {
      handleRemoveFromCart(productId);
    }
  };

  // Favorite handlers
  const handleToggleFavorite = async (productId) => {
    if (!user) {
      showToast('Favorilere eklemek için giriş yapın', 'info');
      setIsAuthOpen(true);
      return;
    }

    try {
      if (favorites.includes(productId)) {
        await db.removeFavorite(user.id, productId);
        setFavorites(favorites.filter(id => id !== productId));
        showToast('Favorilerden çıkarıldı', 'info');
      } else {
        await db.addFavorite(user.id, productId);
        setFavorites([...favorites, productId]);
        showToast('Favorilere eklendi! ❤️', 'success');
      }
    } catch (err) {
      console.error('Toggle favorite error:', err);
      showToast('Hata: ' + err.message, 'error');
    }
  };

  // Address handlers
  const handleAddAddress = async (address) => {
    if (!user) return;
    try {
      const added = await db.addAddress(user.id, address);
      setAddresses([added, ...addresses]);
      showToast('Adres eklendi! 📍', 'success');
    } catch (err) {
      console.error('Add address error:', err);
      showToast('Adres eklenemedi: ' + err.message, 'error');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await db.deleteAddress(addressId);
      setAddresses(addresses.filter(a => a.id !== addressId));
      showToast('Adres silindi', 'info');
    } catch (err) {
      console.error('Delete address error:', err);
      showToast('Adres silinemedi', 'error');
    }
  };

  // Checkout handlers
  const handleInitiateCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCompleteOrder = async (orderData) => {
    try {
      // 1. Create Order
      let created;
      if (user) {
        created = await db.createOrder({
          userId: user.id,
          ...orderData
        });
      } else {
        created = await db.createGuestOrder(orderData, orderData.guestAddress);
      }

      // 2. Update Stock in Supabase
      for (const item of orderData.items) {
        const product = products.find(p => p.id === item.id);
        if (product) {
          const newStock = Math.max(0, product.stock - item.quantity);
          await db.updateProduct(product.id, { stock: newStock });
        }
      }

      // 3. Update Coupon Usage if any
      if (orderData.couponCode) {
        const coupon = await db.getCoupon(orderData.couponCode);
        if (coupon) {
          await db.useCoupon(coupon.id);
        }
      }

      let orderAddress;
      if (orderData.guestAddress) {
        orderAddress = orderData.guestAddress;
      } else if (orderData.addressId) {
        orderAddress = addresses.find(a => a.id === orderData.addressId) || {};
      }

      const checkoutRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: orderData.total,
          paidPrice: orderData.total,
          basketId: created.id.toString(),
          buyer: {
            id: user ? user.id : 'guest',
            name: user ? user.name : 'Misafir',
            surname: user ? user.name : 'Kullanici',
            identityNumber: '11111111111',
            email: user ? user.email : 'guest@sarmalticaret.com',
            gsmNumber: user ? user.phone : '+905555555555',
            registrationAddress: orderAddress?.full_address || orderAddress?.fullAddress || 'Test Address',
            city: orderAddress?.city || 'Istanbul',
            country: 'Turkey'
          },
          billingAddress: {
            address: orderAddress?.full_address || orderAddress?.fullAddress || 'Test Address',
            contactName: user ? user.name : 'Misafir',
            city: orderAddress?.city || 'Istanbul',
            country: 'Turkey'
          },
          basketItems: orderData.items.map(i => ({
            id: i.id,
            name: products.find(p => p.id === i.id)?.title || 'Urun',
            price: i.price
          }))
        })
      });

      const checkoutResponseData = await checkoutRes.json();

      if (checkoutResponseData.status === 'success' && checkoutResponseData.paymentPageUrl) {
        window.location.href = checkoutResponseData.paymentPageUrl;
        return; // Interrupted for payment redirect
      } else {
        throw new Error(checkoutResponseData.errorMessage || 'Ödeme başlatılamadı');
      }

      // 4. Refresh data (this will run for test cases when URL isn't returned)
      const updatedProducts = await db.getProducts();

      if (user) {
        const updatedOrders = await db.getOrders(user.id);
        setOrders(updatedOrders);
      }

      setProducts(updatedProducts);
      setCart([]);
      setIsCheckoutOpen(false);
      showToast('Siparişiniz alındı! Teşekkür ederiz 🎉', 'success');
    } catch (err) {
      console.error('Order creation error:', err);
      showToast('Sipariş oluşturulamadı: ' + err.message, 'error');
    }
  };

  // Category handler
  const handleCategorySelect = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      navigate('/');
    } else {
      setSelectedCategory(categoryId);
      navigate(`/category/${categoryId}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Track product view
  const handleViewProductDetails = (product) => {
    setSelectedProduct(product);
    if (!viewedProducts.includes(product.id)) {
      setViewedProducts([...viewedProducts, product.id]);
    }
  };

  // Filter and sort products
  let filteredProducts = products;

  // Search filter
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Category filter
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }

  // Price range filter
  filteredProducts = filteredProducts.filter(p =>
    p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return b.id - a.id;
      case 'rating':
        return 0; // Would use actual ratings if available
      case 'popular':
      default:
        return a.id - b.id;
    }
  });

  return (
    <div className="App">
      <Header
        cartCount={cart.length}
        favoriteCount={favorites.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        products={products}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        isAdmin={isAdmin}
        onOpenAdmin={() => { navigate('/admin'); window.scrollTo(0, 0); }}
        onOpenCategories={() => setIsCategoryDrawerOpen(true)}
      />

      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero
                onAddProduct={() => setIsAddProductOpen(true)}
                isAdmin={isAdmin}
              />
              <div className="container">
                <Banner
                  onOpenFlashDeals={() => setIsFlashDealsOpen(true)}
                  onCategorySelect={handleCategorySelect}
                />
                <Categories
                  onCategorySelect={handleCategorySelect}
                  selectedCategory={selectedCategory}
                />
              </div>

              <div className="container" id="product-section-anchor">
                <div style={{ marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-secondary)', fontWeight: '700' }}>Öne Çıkanlar</h2>
                </div>
                <ProductFilters
                  onSortChange={setSortBy}
                  currentSort={sortBy}
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                  minPrice={0}
                  maxPrice={1000}
                />
              </div>

              <ProductList
                products={sortedProducts}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
                favorites={favorites}
                onViewDetails={handleViewProductDetails}
                isLoading={isLoading}
                title={searchQuery ? `🔍 Arama Sonuçları: "${searchQuery}"` : "Sizin İçin Seçtiklerimiz"}
              />

              <RecentlyViewed
                viewedProductIds={viewedProducts}
                allProducts={products}
                onViewDetails={handleViewProductDetails}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
                favorites={favorites}
              />
              <Newsletter />
            </>
          } />

          <Route path="/category/:id" element={
            <div style={{ paddingTop: '2rem' }}>
              <div className="container">
                <button
                  onClick={() => navigate('/')}
                  style={{ background: 'none', color: 'var(--color-primary)', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  &larr; Ana Sayfaya Dön
                </button>
                <ProductFilters
                  onSortChange={setSortBy}
                  currentSort={sortBy}
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                  minPrice={0}
                  maxPrice={1000}
                />
              </div>

              <ProductList
                products={sortedProducts}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
                favorites={favorites}
                onViewDetails={handleViewProductDetails}
                isLoading={isLoading}
                title={`Kategori Ürünleri (${sortedProducts.length} ürün)`}
              />
              <Newsletter />
            </div>
          } />

          {/* Admin Page */}
          <Route path="/admin" element={
            isAdmin ? (
              <AdminPanel
                onRefreshProducts={async () => {
                  const updated = await db.getProducts();
                  setProducts(updated);
                }}
                onEditProduct={(p) => {
                  setEditingProduct(p);
                  setIsAddProductOpen(true);
                }}
              />
            ) : (
              <Navigate to="/" replace />
            )
          } />

          {/* Legal Pages */}
          <Route path="/mesafeli-satis-sozlesmesi" element={<DistanceSellingContract />} />
          <Route path="/iade-kosullari" element={<RefundPolicy />} />
          <Route path="/gizlilik-politikasi" element={<PrivacyPolicy />} />
        </Routes>
      </main>

      {/* Modals */}
      <button
        id="add-product-trigger"
        style={{ display: 'none' }}
        onClick={() => setIsAddProductOpen(true)}
      />
      <AddProduct
        isOpen={isAddProductOpen}
        onClose={() => {
          setIsAddProductOpen(false);
          setEditingProduct(null);
        }}
        onAdd={handleAddProduct}
        editProduct={editingProduct}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleInitiateCheckout}
      />

      <Favorites
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        products={products}
        onRemoveFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
        onViewDetails={setSelectedProduct}
      />

      <ProductDetail
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        user={user}
      >
        {selectedProduct && (
          <ProductRecommendations
            currentProduct={selectedProduct}
            allProducts={products}
            onViewDetails={handleViewProductDetails}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
          />
        )}
      </ProductDetail>

      <Auth
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onResetPassword={handleResetPassword}
      />

      <UserProfile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onLogout={handleLogout}
        addresses={addresses}
        onAddAddress={handleAddAddress}
        onDeleteAddress={handleDeleteAddress}
        orders={orders}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        addresses={addresses}
        onCompleteOrder={handleCompleteOrder}
        onAddAddress={() => {
          setIsCheckoutOpen(false);
          setIsAuthOpen(true);
        }}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />

      {/* Premium Widgets */}
      <DarkModeToggle
        isDark={isDarkMode}
        onToggle={() => setIsDarkMode(!isDarkMode)}
      />
      <LiveSupport />
      <SocialProof />
      <BackToTop />

      <footer style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '3rem 0 2rem',
        marginTop: '4rem'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <h3 style={{ marginBottom: '1rem', fontWeight: '700' }}>Sarmal Ticaret</h3>
              <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>
                Kalitenin ve zarafetin buluştuğu adres.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '1rem', fontWeight: '600' }}>Kategoriler</h4>
              <ul style={{ opacity: 0.9, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li onClick={() => handleCategorySelect(1)} style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}>Kişiye Özel Ürünler</li>
                <li onClick={() => handleCategorySelect(6)} style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}>Dekoratif Eşyalar</li>
                <li onClick={() => handleCategorySelect(3)} style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}>Aksesuar & Saat</li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '1rem', fontWeight: '600' }}>Yasal Bilgiler</h4>
              <ul style={{ opacity: 0.9, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><button onClick={() => { navigate('/mesafeli-satis-sozlesmesi'); window.scrollTo(0, 0); }} style={{ background: 'none', padding: 0, color: 'inherit', cursor: 'pointer', transition: 'opacity 0.2s', textAlign: 'left' }}>Mesafeli Satış Sözleşmesi</button></li>
                <li><button onClick={() => { navigate('/iade-kosullari'); window.scrollTo(0, 0); }} style={{ background: 'none', padding: 0, color: 'inherit', cursor: 'pointer', transition: 'opacity 0.2s', textAlign: 'left' }}>İptal ve İade Koşulları</button></li>
                <li><button onClick={() => { navigate('/gizlilik-politikasi'); window.scrollTo(0, 0); }} style={{ background: 'none', padding: 0, color: 'inherit', cursor: 'pointer', transition: 'opacity 0.2s', textAlign: 'left' }}>Gizlilik Politikası</button></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '1rem', fontWeight: '600' }}>İletişim</h4>
              <ul style={{ opacity: 0.9, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>📧 sarmalticarett@gmail.com</li>
                <li>📞 0542 317 85 96</li>
                <li style={{ lineHeight: '1.4' }}>📍 100.Yıl Mahallesi 1006.Cadde Yıldız Life B Blok Daire:31 Merkez/Karabük</li>
              </ul>
            </div>
          </div>
          <div style={{
            textAlign: 'center',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.2)',
            opacity: 0.8,
            fontSize: '0.9rem'
          }}>
            &copy; 2026 Sarmal Ticaret. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>

      <FlashDeals
        isOpen={isFlashDealsOpen}
        onClose={() => setIsFlashDealsOpen(false)}
        products={products}
        onAddToCart={handleAddToCart}
        onProductClick={(p) => setSelectedProduct(p)}
      />

      <CategoryDrawer
        isOpen={isCategoryDrawerOpen}
        onClose={() => setIsCategoryDrawerOpen(false)}
        onCategorySelect={handleCategorySelect}
      />
    </div>
  );
}

export default App;
