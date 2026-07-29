import React, { useState, useEffect } from 'react';
import { ShoppingCart, Check } from 'lucide-react';

export function StickyMobileBuyBar({ product, onAddToCart }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 350) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!product || !isVisible) return null;

    const isOutOfStock = product.stock <= 0;

    const handleAdd = () => {
        onAddToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div
            className="sticky-mobile-buy-bar"
            style={{
                position: 'fixed',
                bottom: '62px',
                left: 0,
                right: 0,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid #e2e8f0',
                padding: '0.65rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
                zIndex: 980,
                animation: 'fadeInUp 0.3s ease-out'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0 }}>
                <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #e2e8f0', flexShrink: 0 }}
                />
                <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--color-text)' }}>
                        {product.title}
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '900', color: 'var(--color-primary)' }}>
                        {Number(product.price || 0).toFixed(2)} TL
                    </div>
                </div>
            </div>

            <button
                className="btn btn-primary"
                disabled={isOutOfStock}
                onClick={handleAdd}
                style={{
                    padding: '0.55rem 1.1rem',
                    fontSize: '0.85rem',
                    borderRadius: '25px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    background: isAdded ? '#10b981' : isOutOfStock ? '#94a3b8' : 'var(--color-primary)',
                    boxShadow: isAdded ? '0 4px 12px rgba(16,185,129,0.3)' : '0 4px 12px rgba(79,70,229,0.3)'
                }}
            >
                {isAdded ? (
                    <>
                        <Check size={16} /> Eklendi!
                    </>
                ) : isOutOfStock ? (
                    'Tükendi'
                ) : (
                    <>
                        <ShoppingCart size={16} /> Sepete Ekle
                    </>
                )}
            </button>
        </div>
    );
}
