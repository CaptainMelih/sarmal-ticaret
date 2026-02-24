import React from 'react';
import { Eye, Star, Plus, Heart } from 'lucide-react';

export function RecentlyViewed({
    products,
    viewedProductIds,
    allProducts,
    onViewDetails,
    onAddToCart,
    onToggleFavorite,
    favorites = []
}) {
    if (!viewedProductIds || viewedProductIds.length === 0) return null;

    const recentProducts = viewedProductIds
        .slice(-5)
        .reverse()
        .map(id => allProducts.find(p => p.id === id))
        .filter(Boolean);

    if (recentProducts.length === 0) return null;

    return (
        <div className="container" style={{ marginTop: '3rem', marginBottom: '2rem' }}>
            <h2 style={{
                fontSize: '1.75rem',
                marginBottom: '1.5rem',
                color: 'var(--color-secondary)',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                <Eye size={28} color="var(--color-primary)" />
                Son Görüntülenen Ürünler
            </h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1.5rem'
            }}>
                {recentProducts.map(product => {
                    const isFavorite = favorites.includes(product.id);
                    return (
                        <div
                            key={product.id}
                            style={{
                                background: 'white',
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-sm)',
                                transition: 'all 0.2s',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                            }}
                        >
                            <div style={{ position: 'relative' }} onClick={() => onViewDetails(product)}>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    style={{
                                        width: '100%',
                                        height: '150px',
                                        objectFit: 'cover'
                                    }}
                                />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onToggleFavorite(product.id);
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: '0.5rem',
                                        right: '0.5rem',
                                        background: 'white',
                                        padding: '0.4rem',
                                        borderRadius: '50%',
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxShadow: 'var(--shadow-md)',
                                        display: 'flex'
                                    }}
                                >
                                    <Heart
                                        size={16}
                                        fill={isFavorite ? 'var(--color-accent-2)' : 'none'}
                                        color={isFavorite ? 'var(--color-accent-2)' : 'var(--color-text-light)'}
                                    />
                                </button>
                            </div>
                            <div style={{ padding: '1rem' }}>
                                <h3 style={{
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    marginBottom: '0.5rem',
                                    color: 'var(--color-secondary)',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {product.title}
                                </h3>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '700',
                                        color: 'var(--color-primary)'
                                    }}>
                                        {product.price} TL
                                    </span>
                                    <button
                                        className="btn btn-primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onAddToCart(product);
                                        }}
                                        style={{
                                            padding: '0.4rem',
                                            fontSize: '0.85rem'
                                        }}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
