import React from 'react';
import { Sparkles, Plus, Heart, Eye } from 'lucide-react';

export function ProductRecommendations({
    currentProduct,
    allProducts,
    onViewDetails,
    onAddToCart,
    onToggleFavorite,
    favorites = []
}) {
    if (!currentProduct) return null;

    // Get products from same category, excluding current product
    const recommendations = allProducts
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);

    if (recommendations.length === 0) return null;

    return (
        <div style={{
            marginTop: '2rem',
            padding: '2rem',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)',
            borderRadius: 'var(--radius-lg)'
        }}>
            <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '1.5rem',
                color: 'var(--color-secondary)',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                <Sparkles size={24} color="var(--color-accent)" />
                Bunlar da İlginizi Çekebilir
            </h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1rem'
            }}>
                {recommendations.map(product => {
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
                                e.currentTarget.style.transform = 'scale(1.02)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                            }}
                        >
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    style={{
                                        width: '100%',
                                        height: '150px',
                                        objectFit: 'cover'
                                    }}
                                    onClick={() => onViewDetails(product)}
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
                                <button
                                    onClick={() => onViewDetails(product)}
                                    style={{
                                        position: 'absolute',
                                        top: '0.5rem',
                                        left: '0.5rem',
                                        background: 'var(--color-primary)',
                                        color: 'white',
                                        padding: '0.4rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem'
                                    }}
                                >
                                    <Eye size={14} />
                                </button>
                            </div>
                            <div style={{ padding: '1rem' }}>
                                <h4 style={{
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    marginBottom: '0.5rem',
                                    color: 'var(--color-secondary)',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {product.title}
                                </h4>
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
                                            padding: '0.4rem 0.75rem',
                                            fontSize: '0.85rem'
                                        }}
                                    >
                                        <Plus size={16} />
                                        Sepete
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
