import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Package, Search, Heart, User, LogIn, LayoutDashboard, LayoutGrid, X } from 'lucide-react';

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
  products = []
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

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
    <header>
      <div className="container header-content">
        <Link to="/" className="logo" style={{ cursor: 'pointer', textDecoration: 'none' }}>
          <Package size={28} />
          <span>Sarmal Ticaret</span>
        </Link>

        <div className="header-middle" ref={searchRef}>
          <button
            className="icon-btn"
            onClick={onOpenCategories}
            style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: 'var(--radius-md)',
              padding: '0.6rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            title="Kategoriler"
          >
            <LayoutGrid size={24} color="var(--color-primary)" />
            <span style={{ fontSize: '0.85rem', fontWeight: '600' }} className="category-text">Kategoriler</span>
          </button>

          <div className="search-bar" style={{ margin: 0, flex: 1 }}>
            <Search size={20} color="var(--color-text-light)" />
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
              <div
                onClick={() => setShowSuggestions(false)}
                style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-light)', background: '#f8fafc' }}
              >
                Daha fazla sonuç için entera basın veya aramaya devam edin
              </div>
            </div>
          )}
        </div>

        <div className="nav-links">
          {isAdmin && (
            <button
              className="btn btn-primary"
              onClick={onOpenAdmin}
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', background: '#334155' }}
            >
              <LayoutDashboard size={18} />
              Yönetim
            </button>
          )}
          <button className="icon-btn" onClick={onOpenFavorites}>
            <Heart size={24} />
            {favoriteCount > 0 && <span className="cart-badge">{favoriteCount}</span>}
          </button>
          <button className="cart-btn" onClick={onOpenCart}>
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          {user ? (
            <button
              className="icon-btn"
              onClick={onOpenProfile}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}
              title={user.name || user.email}
            >
              {(user.name || user.email || 'U').charAt(0).toUpperCase()}
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={onOpenAuth}
              style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
            >
              <LogIn size={18} />
              Giriş
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
