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

            <button
                className="mobile-nav-item"
                onClick={onOpenCart}
                style={{ position: 'relative' }}
            >
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                    <span className="mobile-nav-badge">{cartCount}</span>
                )}
                <span>Sepetim</span>
            </button>

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

            <button
                className="mobile-nav-item"
                onClick={user ? onOpenProfile : onOpenAuth}
            >
                <User size={22} />
                <span>{user ? 'Hesabım' : 'Giriş'}</span>
            </button>
        </div>
    );
}
