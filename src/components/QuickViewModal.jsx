import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Heart, Star, CheckCircle, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function QuickViewModal({ product, isOpen, onClose, onAddToCart, onToggleFavorite, isFavorite }) {
    const [quantity, setQuantity] = useState(1);
    const [activeImageIdx, setActiveImageIdx] = useState(0);

    // ESC key listener to close modal on Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen || !product) return null;

    const isFav = isFavorite ? isFavorite(product.id) : false;

    // Parse specs if string
    let parsedSpecs = [];
    try {
        if (typeof product.specs === 'string') {
            parsedSpecs = JSON.parse(product.specs);
        } else if (Array.isArray(product.specs)) {
            parsedSpecs = product.specs;
        }
    } catch (e) {
        parsedSpecs = [];
    }

    const galleryImages = [
        product.image,
        ...(product.images ? product.images.map(img => img.url) : [])
    ].filter(Boolean);

    const handleAdd = () => {
        for (let i = 0; i < quantity; i++) {
            onAddToCart(product);
        }
        onClose();
    };

    return (
        <div className="modal-overlay" style={{ zIndex: 1100 }} onClick={onClose}>
            <div
                className="modal-content"
                onClick={e => e.stopPropagation()}
                style={{
                    maxWidth: '850px',
                    width: '92%',
                    padding: 0,
                    overflow: 'hidden',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
            >
                <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            zIndex: 10,
                            background: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                        }}
                    >
                        <X size={18} />
                    </button>

                    {/* Left Image Gallery */}
                    <div style={{ background: '#f8fafc', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                            src={galleryImages[activeImageIdx] || product.image}
                            alt={product.title}
                            style={{
                                width: '100%',
                                maxHeight: '320px',
                                objectFit: 'contain',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: '1rem',
                                transition: 'all 0.3s ease'
                            }}
                        />

                        {galleryImages.length > 1 && (
                            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', maxWidth: '100%', paddingBottom: '0.5rem' }}>
                                {galleryImages.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt=""
                                        onClick={() => setActiveImageIdx(idx)}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            objectFit: 'cover',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            border: activeImageIdx === idx ? '2px solid var(--color-primary)' : '1px solid #e2e8f0',
                                            opacity: activeImageIdx === idx ? 1 : 0.7
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Details */}
                    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: '800', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                                Sarmal Ticaret
                            </div>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.75rem', color: 'var(--color-text)', lineHeight: '1.3' }}>
                                {product.title}
                            </h2>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', color: '#f59e0b' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                                    ))}
                                </div>
                                <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>4.9 (24 Değerlendirme)</span>
                            </div>

                            {/* Price Box */}
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <span style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--color-primary)' }}>
                                    {product.price} TL
                                </span>
                                {product.flash_discount_rate > 0 && (
                                    <span style={{ background: '#ef4444', color: 'white', fontSize: '0.75rem', fontWeight: '800', padding: '0.2rem 0.5rem', borderRadius: '12px' }}>
                                        -%{product.flash_discount_rate} Fırsat
                                    </span>
                                )}
                            </div>

                            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {product.description}
                            </p>

                            {/* Key Specs */}
                            {parsedSpecs.length > 0 && (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.8rem' }}>
                                    {parsedSpecs.slice(0, 4).map((spec, idx) => (
                                        <div key={idx}>
                                            <span style={{ color: '#64748b' }}>{spec.key}: </span>
                                            <strong style={{ color: '#1e293b' }}>{spec.value}</strong>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Quantity & Add to Cart Controls */}
                        <div>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        style={{ padding: '0.5rem 0.8rem', background: '#f1f5f9', border: 'none', cursor: 'pointer', fontWeight: '700' }}
                                    >
                                        -
                                    </button>
                                    <span style={{ padding: '0.5rem 1rem', fontWeight: '800', minWidth: '40px', textAlign: 'center' }}>
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        style={{ padding: '0.5rem 0.8rem', background: '#f1f5f9', border: 'none', cursor: 'pointer', fontWeight: '700' }}
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    className="btn btn-primary"
                                    onClick={handleAdd}
                                    style={{ flex: 1, justifyContent: 'center', padding: '0.75rem', fontWeight: '800', fontSize: '0.95rem' }}
                                >
                                    <ShoppingCart size={18} /> Sepete Ekle
                                </button>

                                <button
                                    onClick={() => onToggleFavorite(product.id)}
                                    style={{
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid #e2e8f0',
                                        background: isFav ? '#fef2f2' : 'white',
                                        color: isFav ? '#ef4444' : '#64748b',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Heart size={20} fill={isFav ? '#ef4444' : 'none'} />
                                </button>
                            </div>

                            <Link
                                to={`/product/${product.id}`}
                                onClick={onClose}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: '700', textDecoration: 'none' }}
                            >
                                Tüm Detayları Gör <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
