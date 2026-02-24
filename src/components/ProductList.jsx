import React, { useState, useEffect } from 'react';
import { Plus, Star, Heart, Eye, ShoppingCart } from 'lucide-react';

export function ProductList({
    products,
    onAddToCart,
    title = 'Tüm Ürünler',
    onToggleFavorite,
    favorites = [],
    onViewDetails,
    isLoading = false,
    itemsPerPage = 12
}) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [products.length, title]);

    if (isLoading) {
        return (
            <div className="container">
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--color-secondary)', fontWeight: '700', textAlign: 'center' }}>{title}</h2>
                <div className="product-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="product-card">
                            <div className="skeleton" style={{ height: '200px', width: '100%' }}></div>
                            <div className="product-info">
                                <div className="skeleton skeleton-title"></div>
                                <div className="skeleton skeleton-text"></div>
                                <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
                                <div className="product-footer">
                                    <div className="skeleton skeleton-price"></div>
                                    <div className="skeleton" style={{ height: '2.5rem', width: '4rem' }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>Henüz ürün eklenmemiş.</p>
            </div>
        );
    }

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="container">
            <h2 style={{
                fontSize: '2rem',
                marginBottom: '2rem',
                color: 'var(--color-secondary)',
                fontWeight: '700',
                textAlign: 'center'
            }}>
                {title}
            </h2>
            <div className="product-grid">
                {currentProducts.map((product, index) => {
                    const isFavorite = favorites.includes(product.id);
                    const isOutOfStock = product.stock <= 0;
                    return (
                        <div key={product.id} className="product-card" style={{ opacity: isOutOfStock ? 0.8 : 1 }}>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="product-image"
                                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Sarmal+Ticaret'; }}
                                    style={{ filter: isOutOfStock ? 'grayscale(0.5)' : 'none' }}
                                />
                                {isOutOfStock && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        background: 'rgba(239, 68, 68, 0.9)',
                                        color: 'white',
                                        padding: '0.5rem 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        fontWeight: '700',
                                        fontSize: '0.9rem',
                                        zIndex: 2,
                                        boxShadow: 'var(--shadow-lg)'
                                    }}>
                                        TÜKENDİ
                                    </div>
                                )}
                                {index < 3 && !isOutOfStock && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '0.5rem',
                                        left: '0.5rem',
                                        background: 'var(--color-accent)',
                                        color: 'white',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem'
                                    }}>
                                        <Star size={12} fill="white" />
                                        Popüler
                                    </div>
                                )}
                                <button
                                    onClick={() => onToggleFavorite(product.id)}
                                    style={{
                                        position: 'absolute',
                                        top: '0.5rem',
                                        right: '0.5rem',
                                        background: 'white',
                                        padding: '0.5rem',
                                        borderRadius: '50%',
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxShadow: 'var(--shadow-md)',
                                        display: 'flex',
                                        transition: 'transform 0.2s',
                                        zIndex: 3
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <Heart
                                        size={18}
                                        fill={isFavorite ? 'var(--color-accent-2)' : 'none'}
                                        color={isFavorite ? 'var(--color-accent-2)' : 'var(--color-text-light)'}
                                    />
                                </button>
                                {!isOutOfStock && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onAddToCart(product);
                                        }}
                                        className="quick-add-btn"
                                        style={{
                                            position: 'absolute',
                                            top: '3.5rem',
                                            right: '0.5rem',
                                            background: 'var(--color-primary)',
                                            color: 'white',
                                            padding: '0.5rem',
                                            borderRadius: '50%',
                                            border: 'none',
                                            cursor: 'pointer',
                                            boxShadow: 'var(--shadow-md)',
                                            display: 'flex',
                                            transition: 'all 0.2s',
                                            zIndex: 3,
                                            opacity: 0,
                                            transform: 'translateX(20px)'
                                        }}
                                        title="Hızlı Ekle"
                                    >
                                        <Plus size={20} />
                                    </button>
                                )}
                                <button
                                    onClick={() => onViewDetails(product)}
                                    className="quick-view-btn"
                                    style={{
                                        position: 'absolute',
                                        bottom: '0.5rem',
                                        right: '0.5rem',
                                        background: 'rgba(0,0,0,0.7)',
                                        color: 'white',
                                        padding: '0.5rem 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.85rem',
                                        fontWeight: '500',
                                        opacity: 0,
                                        transition: 'opacity 0.3s',
                                        zIndex: 3
                                    }}
                                >
                                    <Eye size={16} />
                                    Detay
                                </button>
                            </div>
                            <div className="product-info">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                                    <h3 className="product-title" style={{ margin: 0 }}>{product.title}</h3>
                                    {!isOutOfStock && product.stock <= 5 && (
                                        <span style={{
                                            fontSize: '0.7rem',
                                            color: '#f59e0b',
                                            background: '#fef3c7',
                                            padding: '0.1rem 0.4rem',
                                            borderRadius: '4px',
                                            fontWeight: '700',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            Son {product.stock} ürün!
                                        </span>
                                    )}
                                </div>
                                <p className="product-desc">{product.description}</p>
                                <div className="product-footer">
                                    <span className="product-price">{product.price} TL</span>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => onAddToCart(product)}
                                        disabled={isOutOfStock}
                                        style={{
                                            opacity: isOutOfStock ? 0.6 : 1,
                                            cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                                            padding: '0.4rem 0.8rem',
                                            fontSize: '0.85rem'
                                        }}
                                    >
                                        <Plus size={16} /> {isOutOfStock ? 'Tükendi' : 'Ekle'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', gap: '0.5rem' }}>
                    <button
                        className="btn btn-outline"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        style={{ padding: '0.5rem 1rem' }}
                    >
                        Önceki
                    </button>
                    {Array.from({ length: totalPages }).map((_, idx) => (
                        <button
                            key={idx}
                            className={`btn ${currentPage === idx + 1 ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setCurrentPage(idx + 1)}
                            style={{ padding: '0.5rem 1rem', width: '40px' }}
                        >
                            {idx + 1}
                        </button>
                    ))}
                    <button
                        className="btn btn-outline"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        style={{ padding: '0.5rem 1rem' }}
                    >
                        Sonraki
                    </button>
                </div>
            )}

            <style>{`
                .product-card:hover .quick-view-btn,
                .product-card:hover .quick-add-btn {
                    opacity: 1;
                    transform: translateX(0) !important;
                }
            `}</style>
        </div>
    );
}
