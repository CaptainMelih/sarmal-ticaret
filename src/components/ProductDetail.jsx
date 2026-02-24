import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Star, Heart, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductReviews } from './ProductReviews';
import * as db from '../lib/supabase';

export function ProductDetail({ product, isOpen, onClose, onAddToCart, onToggleFavorite, isFavorite, user, children }) {
    const [images, setImages] = useState([]);
    const [activeImageIdx, setActiveImageIdx] = useState(0);

    useEffect(() => {
        if (isOpen && product) {
            fetchProductImages();
            setActiveImageIdx(0);
            document.title = `${product.title} - Sarmal Ticaret`;

            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', product.description.substring(0, 160));
            }
        } else {
            document.title = 'Sarmal Ticaret';
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', 'Sarmal Ticaret - En kaliteli el yapımı ve hediyelik ürünler.');
            }
        }
    }, [isOpen, product]);

    const fetchProductImages = async () => {
        try {
            const data = await db.getProductImages(product.id);
            // Include the main image as the first image
            setImages([product.image, ...data.map(img => img.url)]);
        } catch (err) {
            console.error('Fetch product images error:', err);
            setImages([product.image]);
        }
    };

    if (!isOpen || !product) return null;

    const isOutOfStock = product.stock <= 0;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                style={{ maxWidth: '1000px', width: '95%', maxHeight: '90vh', overflow: 'auto' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                    <h2 style={{ margin: 0 }}>Ürün Detayı</h2>
                    <button onClick={onClose} style={{ background: 'none' }}>
                        <X />
                    </button>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(300px, 1.2fr) 1fr',
                    gap: '2.5rem',
                }} className="product-detail-grid">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: '#f8fafc', aspectRatio: '1/1' }}>
                            <img
                                src={images[activeImageIdx]}
                                alt={product.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease'
                                }}
                            />
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setActiveImageIdx(prev => prev === 0 ? images.length - 1 : prev - 1)}
                                        style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={() => setActiveImageIdx(prev => (prev + 1) % images.length)}
                                        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}
                        </div>

                        {images.length > 1 && (
                            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', padding: '0.5rem 0' }}>
                                {images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        onClick={() => setActiveImageIdx(idx)}
                                        style={{
                                            width: '70px',
                                            height: '70px',
                                            borderRadius: 'var(--radius-md)',
                                            objectFit: 'cover',
                                            cursor: 'pointer',
                                            border: activeImageIdx === idx ? '2px solid var(--color-primary)' : '2px solid transparent',
                                            padding: '2px',
                                            transition: 'all 0.2s'
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.4rem 0.8rem',
                                borderRadius: 'var(--radius-md)',
                                background: isOutOfStock ? '#fee2e2' : (product.stock <= 5 ? '#ffedd5' : '#dcfce7'),
                                color: isOutOfStock ? '#ef4444' : (product.stock <= 5 ? '#f97316' : '#10b981'),
                                fontSize: '0.8rem',
                                fontWeight: '700',
                                marginBottom: '0.75rem'
                            }}>
                                {isOutOfStock ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />}
                                {isOutOfStock ? 'Stokta Yok' : (product.stock <= 5 ? `Son ${product.stock} Ürün!` : `Stokta Var`)}
                            </div>
                            <h3 style={{ fontSize: '2rem', fontWeight: '800', lineHeight: '1.2' }}>{product.title}</h3>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', gap: '0.1rem' }}>
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill={i < 4 ? 'var(--color-accent)' : 'none'}
                                        color={i < 4 ? 'var(--color-accent)' : '#cbd5e1'}
                                    />
                                ))}
                            </div>
                            <span style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', fontWeight: '600' }}>
                                4.8 (124 Değerlendirme)
                            </span>
                        </div>

                        <p style={{ color: 'var(--color-text-light)', lineHeight: '1.7', fontSize: '1rem' }}>
                            {product.description}
                        </p>

                        <div style={{
                            background: '#f8fafc',
                            padding: '1.25rem',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid #e2e8f0'
                        }}>
                            <h4 style={{ marginBottom: '0.75rem', fontSize: '1rem' }}>Öne Çıkan Özellikler:</h4>
                            <ul style={{
                                color: 'var(--color-text)',
                                fontSize: '0.9rem',
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '0.75rem',
                                padding: 0,
                                listStyle: 'none'
                            }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✅ Ücretsiz Kargo</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🎁 Hediye Paketi</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>💎 Premium Kalite</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🚚 Hızlı Teslimat</li>
                            </ul>
                        </div>

                        <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>Birim Fiyat</div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--color-primary)' }}>
                                        {product.price} <span style={{ fontSize: '1.2rem' }}>TL</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    className="btn btn-primary"
                                    disabled={isOutOfStock}
                                    onClick={() => {
                                        onAddToCart(product);
                                        onClose();
                                    }}
                                    style={{ flex: 1, padding: '1rem', fontSize: '1.1rem', borderRadius: 'var(--radius-lg)', opacity: isOutOfStock ? 0.6 : 1, cursor: isOutOfStock ? 'not-allowed' : 'pointer', boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)' }}
                                >
                                    <ShoppingCart size={22} />
                                    {isOutOfStock ? 'Tükendi' : 'Sepete Ekle'}
                                </button>
                                <button
                                    className="btn btn-outline"
                                    onClick={() => onToggleFavorite(product.id)}
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 'var(--radius-lg)',
                                        background: isFavorite ? '#fff1f2' : 'transparent',
                                        color: isFavorite ? '#e11d48' : 'var(--color-text)',
                                        borderColor: isFavorite ? '#fda4af' : '#e2e8f0'
                                    }}
                                >
                                    <Heart
                                        size={28}
                                        fill={isFavorite ? '#e11d48' : 'none'}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <ProductReviews productId={product.id} user={user} />

                {/* Recommendations */}
                {children}
            </div>
        </div>
    );
}
