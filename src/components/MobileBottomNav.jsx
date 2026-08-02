import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingBag, Heart, User } from 'lucide-react';

export function MobileBottomNav({
    cartCount = 0,
    favoriteCount = 0,
    onOpenCart,
    onOpenFavorites,
    onOpenCategories,
    onOpenProfile,
    onOpenAuth,
    user
}) {
    const location = useLocation();

    return (
        <div className="mobile-bottom-nav">
            <Link
                to="/"
                className={`mobile-nav-item ${location.pathname === '/' ? 'active' : ''}`}
            >
                <Home size={22} />
                <span>Ana Sayfa</span>
            </Link>

            <button
                className="mobile-nav-item"
                onClick={onOpenCategories}
            >
                <Grid size={22} />
                <span>Kategoriler</span>
            </button>

            <Link
                to="/sepet"
                className={`mobile-nav-item ${location.pathname === '/sepet' ? 'active' : ''}`}
                style={{ position: 'relative', textDecoration: 'none' }}
            >
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                    <span className="mobile-nav-badge">{cartCount}</span>
                )}
                <span>Sepetim</span>
            </Link>

            <button
                className="mobile-nav-item"
                onClick={onOpenFavorites}
                style={{ position: 'relative' }}
            >
                <Heart size={22} />
                {favoriteCount > 0 && (
                    <span className="mobile-nav-badge">{favoriteCount}</span>
                )}
                <span>Favoriler</span>
            </button>

            {user ? (
                <button
                    className="mobile-nav-item"
                    onClick={onOpenProfile}
                >
                    <User size={22} />
                    <span>Hesabım</span>
                </button>
            ) : (
                <Link
                    to="/giris-yap"
                    className={`mobile-nav-item ${location.pathname === '/giris-yap' || location.pathname === '/uye-ol' ? 'active' : ''}`}
                    style={{ textDecoration: 'none' }}
                >
                    <User size={22} />
                    <span>Giriş</span>
                </Link>
            )}
        </div>
    );
}
