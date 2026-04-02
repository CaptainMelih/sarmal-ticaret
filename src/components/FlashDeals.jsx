import React, { useState, useEffect } from 'react';
import { X, Zap, ShoppingCart, Clock } from 'lucide-react';

export function FlashDeals({ isOpen, onClose, products, onAddToCart, onProductClick }) {
    const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

    useEffect(() => {
        if (!isOpen) return;

        const timer = setInterval(() => {
            const now = new Date();
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);

            const diff = endOfDay - now;
            if (diff <= 0) {
                setTimeLeft({ h: 0, m: 0, s: 0 });
                return;
            }

            setTimeLeft({
                h: Math.floor((diff / (1000 * 60 * 60)) % 24),
                m: Math.floor((diff / 1000 / 60) % 60),
                s: Math.floor((diff / 1000) % 60)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isOpen]);

    if (!isOpen) return null;

    // Dynamically filter flash deals from DB flag
    const flashProducts = products.filter(p => p.flash_discount_rate > 0);

    return (
        <div className="modal-overlay" onClick={onClose} style={{ zIndex: 2000 }}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                style={{
                    maxWidth: '900px',
                    width: '95%',
                    background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Decorative Elements */}
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: '#fee2e2', borderRadius: '50%', zIndex: 0, opacity: 0.5 }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ background: '#ef4444', color: 'white', padding: '0.5rem', borderRadius: 'var(--radius-md)', animation: 'pulse 2s infinite' }}>
                                <Zap size={24} />
                            </div>
                            <div>
                                <h2 style={{ margin: 0, color: '#991b1b' }}>Flaş Fırsatlar</h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontWeight: '700', fontSize: '1.1rem' }}>
                                    <Clock size={18} />
                                    <span>
                                        {String(timeLeft.h).padStart(2, '0')}:
                                        {String(timeLeft.m).padStart(2, '0')}:
                                        {String(timeLeft.s).padStart(2, '0')}
                                    </span>
                                    <span style={{ fontSize: '0.8rem', color: '#b91c1c', fontWeight: '400' }}>sonra bitiyor!</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={onClose} style={{ background: 'white', border: '1px solid #fee2e2', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X /></button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', maxHeight: '60vh', overflowY: 'auto', padding: '0.5rem' }}>
                        {flashProducts.length === 0 ? (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--color-text-light)' }}>
                                <Zap size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
                                <h3>Şu an aktif bir flaş fırsat bulunmuyor.</h3>
                                <p>Fırsatlar başladığında burada yerini alacak!</p>
                            </div>
                        ) : flashProducts.map(product => {
                            const originalPrice = product.price / (1 - (product.flash_discount_rate / 100));
                            
                            return (
                            <div
                                key={product.id}
                                className="product-card"
                                style={{ background: 'white', cursor: 'pointer', transition: 'transform 0.2s' }}
                                onClick={() => onProductClick(product)}
                            >
                                <div style={{ position: 'relative' }}>
                                    <img src={product.image} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} />
                                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#ef4444', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontWeight: '800', fontSize: '0.8rem' }}>
                                        -%{product.flash_discount_rate}
                                    </div>
                                </div>
                                <div style={{ padding: '1rem' }}>
                                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.title}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                        <span style={{ color: '#ef4444', fontWeight: '800', fontSize: '1.25rem' }}>{product.price} TL</span>
                                        <span style={{ color: 'var(--color-text-light)', textDecoration: 'line-through', fontSize: '0.9rem' }}>{originalPrice.toFixed(0)} TL</span>
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        style={{ width: '100%', background: '#ef4444' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onAddToCart(product);
                                        }}
                                    >
                                        <ShoppingCart size={18} />
                                        Hemen Kap!
                                    </button>
                                </div>
                            </div>
                        )})}
                    </div>
                </div>

                <style>{`
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                        100% { transform: scale(1); }
                    }
                `}</style>
            </div>
        </div>
    );
}
