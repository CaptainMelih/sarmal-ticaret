import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Package, Search, Heart, User, LogIn, LayoutDashboard, LayoutGrid, X, Truck, Instagram } from 'lucide-react';

export function Header({
  cartCount,
  onOpenCart,
  onSearch,
  searchQuery,
  favoriteCount,
  onOpenFavorites,
  user,
  onOpenAuth,
  onOpenProfile,
  isAdmin,
  onOpenAdmin,
  onOpenCategories,
  onOpenWheel,
  products = []
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset || 0;
      setIsScrolled(currentScrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, products]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'white', boxShadow: 'var(--shadow-sm)', transition: 'all 0.3s ease' }}>
      {/* Top Announcement Bar */}
      <div className="top-announcement-bar" style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        color: 'white',
        fontSize: '0.75rem',
        fontWeight: '600',
        padding: '0.35rem 0.75rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        letterSpacing: '0.3px'
      }}>
        <div className="marquee-wrapper" style={{ flex: 1, overflow: 'hidden', whiteSpace: 'nowrap', position: 'relative' }}>
          <div className="marquee-text">
            🚚 500 TL Üzeri Ücretsiz Kargo &nbsp;•&nbsp; ⚡ Ertesi Gün Hızlı Kargo &nbsp;•&nbsp; 🔒 %100 Güvenli Ödeme &nbsp;•&nbsp; 🎁 Sürpriz Hediyeler &nbsp;•&nbsp; 🚚 500 TL Üzeri Ücretsiz Kargo &nbsp;•&nbsp; ⚡ Ertesi Gün Hızlı Kargo &nbsp;•&nbsp; 🔒 %100 Güvenli Ödeme
          </div>
        </div>
        <div className="announcement-buttons" style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexShrink: 0 }}>
          <a
            href="https://www.instagram.com/sarmalticaret/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.7rem', textDecoration: 'none', background: 'rgba(255,255,255,0.2)', padding: '0.15rem 0.5rem', borderRadius: '12px', whiteSpace: 'nowrap' }}
          >
            <Instagram size={12} /> Instagram
          </a>
        </div>
      </div>

      <div className="container header-content" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        minHeight: '3.8rem',
        height: 'auto',
        padding: '0.4rem 0.75rem'
      }}>
        <Link to="/" className="logo" style={{ cursor: 'pointer', textDecoration: 'none', flexShrink: 0, whiteSpace: 'nowrap' }}>
          <Package size={26} />
          <span>Sarmal Ticaret</span>
        </Link>

        <div className="header-middle" ref={searchRef}>
          <button
            className="icon-btn category-btn"
            onClick={onOpenCategories}
            style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: 'var(--radius-md)',
              padding: '0.5rem 0.6rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              flexShrink: 0
            }}
            title="Kategoriler"
          >
            <LayoutGrid size={22} color="var(--color-primary)" />
            <span style={{ fontSize: '0.85rem', fontWeight: '600' }} className="category-text">Kategoriler</span>
          </button>

          <div className="search-bar" style={{ margin: 0, flex: 1 }}>
            <Search size={18} color="var(--color-text-light)" />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
            />
            {searchQuery && (
              <button onClick={() => onSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <X size={16} color="var(--color-text-light)" />
              </button>
            )}
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              right: '0',
              background: 'white',
              borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 1000,
              marginTop: '5px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden'
            }}>
              {suggestions.map(product => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSearch(product.title);
                    setShowSuggestions(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    borderBottom: '1px solid #f1f5f9'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = 'white'}
                >
                  <img src={product.image} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{product.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-primary)' }}>{product.price} TL</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="nav-links">
          <Link
            to="/siparis-takip"
            className="tracking-link"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              color: 'var(--color-text)',
              textDecoration: 'none',
              fontSize: '0.8rem',
              fontWeight: '700',
              padding: '0.4rem 0.65rem',
              borderRadius: 'var(--radius-md)',
              background: '#f1f5f9',
              whiteSpace: 'nowrap'
            }}
          >
            <Truck size={16} color="var(--color-primary)" />
            <span className="tracking-text">Sipariş Takibi</span>
          </Link>

          {isAdmin && (
            <button
              className="btn btn-primary"
              onClick={onOpenAdmin}
              style={{ padding: '0.4rem 0.7rem', fontSize: '0.8rem', background: '#334155', whiteSpace: 'nowrap' }}
            >
              <LayoutDashboard size={16} />
              <span className="admin-text">Yönetim</span>
            </button>
          )}

          <button className="icon-btn desktop-only-btn" onClick={onOpenFavorites}>
            <Heart size={22} />
            {favoriteCount > 0 && <span className="cart-badge">{favoriteCount}</span>}
          </button>
          <Link to="/sepet" className="cart-btn desktop-only-btn" style={{ textDecoration: 'none' }}>
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {user ? (
            <button
              className="icon-btn desktop-only-btn"
              onClick={onOpenProfile}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '0.85rem'
              }}
              title={user.name || user.email}
            >
              {(user.name || user.email || 'U').charAt(0).toUpperCase()}
            </button>
          ) : (
            <Link
              to="/giris-yap"
              className="btn btn-primary desktop-only-btn"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', textDecoration: 'none' }}
            >
              <LogIn size={16} />
              Giriş
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
