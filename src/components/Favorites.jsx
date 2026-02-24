import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';

export function Favorites({ isOpen, onClose, favorites, products, onRemoveFavorite, onAddToCart, onViewDetails }) {
    if (!isOpen) return null;

    const favoriteProducts = products.filter(p => favorites.includes(p.id));

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" style={{ maxWidth: '700px' }} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Heart size={24} fill="var(--color-accent-2)" color="var(--color-accent-2)" />
                        Favorilerim
                    </h2>
                    <button onClick={onClose} style={{ background: 'none' }}><X /></button>
                </div>

                {favoriteProducts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                        <Heart size={64} color="var(--color-text-light)" style={{ opacity: 0.3, margin: '0 auto 1rem' }} />
                        <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem' }}>
                            Henüz favori ürününüz yok.
                        </p>
                        <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                            Beğendiğiniz ürünleri favorilere ekleyin! ❤️
                        </p>
                    </div>
                ) : (
                    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {favoriteProducts.map((product) => (
                                <div
                                    key={product.id}
                                    style={{
                                        display: 'flex',
                                        gap: '1rem',
                                        padding: '1rem',
                                        background: 'var(--color-bg)',
                                        borderRadius: 'var(--radius-lg)',
                                        transition: 'transform 0.2s',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        onClick={() => onViewDetails(product)}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover',
                                            borderRadius: 'var(--radius-md)',
                                            cursor: 'pointer'
                                        }}
                                    />
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <h3
                                            onClick={() => onViewDetails(product)}
                                            style={{
                                                fontSize: '1.1rem',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                color: 'var(--color-secondary)'
                                            }}
                                        >
                                            {product.title}
                                        </h3>
                                        <p style={{
                                            fontSize: '0.9rem',
                                            color: 'var(--color-text-light)',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical'
                                        }}>
                                            {product.description}
                                        </p>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginTop: 'auto'
                                        }}>
                                            <span style={{
                                                fontSize: '1.25rem',
                                                fontWeight: '700',
                                                color: 'var(--color-primary)'
                                            }}>
                                                {product.price} TL
                                            </span>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => onAddToCart(product)}
                                                    style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                                                >
                                                    <ShoppingCart size={16} />
                                                    Sepete Ekle
                                                </button>
                                                <button
                                                    onClick={() => onRemoveFavorite(product.id)}
                                                    style={{
                                                        background: 'white',
                                                        padding: '0.5rem',
                                                        borderRadius: 'var(--radius-md)',
                                                        border: '1px solid #e2e8f0',
                                                        color: 'var(--color-danger)',
                                                        display: 'flex'
                                                    }}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
