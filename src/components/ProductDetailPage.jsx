import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ShieldCheck, Truck, RotateCcw, Share2, Check, AlertCircle, ChevronLeft, ChevronRight, MessageSquare, List, Info, ArrowLeft } from 'lucide-react';
import { ProductReviews } from './ProductReviews';
import * as db from '../lib/supabase';

const categoryNames = {
    1: '🎁 Kişiye Özel',
    2: '❤️ Sevgiliye Hediye',
    3: '⌚ Saat & Aksesuar',
    4: '☕ Bardak & Termos',
    5: '👕 Tekstil',
    6: '🏠 Dekoratif'
};

export function ProductDetailPage({ products = [], onAddToCart, onToggleFavorite, isFavorite, user }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const productId = parseInt(id);

    const [product, setProduct] = useState(null);
    const [images, setImages] = useState([]);
    const [activeImgIdx, setActiveImgIdx] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'desc', 'reviews', 'shipping'
    const [specs, setSpecs] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const currentProd = products.find(p => p.id === productId);

        if (currentProd) {
            setProduct(currentProd);
            // Parse specs
            try {
                if (currentProd.specs) {
                    const parsed = typeof currentProd.specs === 'string' ? JSON.parse(currentProd.specs) : currentProd.specs;
                    setSpecs(Array.isArray(parsed) ? parsed : []);
                } else {
                    setSpecs([]);
                }
            } catch (e) {
                setSpecs([]);
            }

            fetchGalleryImages(currentProd);
            findRelatedProducts(currentProd);
            document.title = `${currentProd.title} - Sarmal Ticaret`;
        } else {
            // Fetch directly from DB if not in initial list
            db.getProducts().then(allProds => {
                const found = allProds.find(p => p.id === productId);
                if (found) {
                    setProduct(found);
                    try {
                        if (found.specs) {
                            const parsed = typeof found.specs === 'string' ? JSON.parse(found.specs) : found.specs;
                            setSpecs(Array.isArray(parsed) ? parsed : []);
                        }
                    } catch (e) { }
                    fetchGalleryImages(found);
                    findRelatedProducts(found);
                }
            }).catch(console.error);
        }
    }, [productId, products]);

    const fetchGalleryImages = async (prod) => {
        try {
            const extra = await db.getProductImages(prod.id);
            const extraUrls = extra.map(img => img.url);
            // Combine main image + extra gallery images without duplicate main image
            const allImgs = [prod.image, ...extraUrls.filter(u => u !== prod.image)];
            setImages(allImgs);
            setActiveImgIdx(0);
        } catch (err) {
            setImages([prod.image]);
        }
    };

    const findRelatedProducts = (prod) => {
        const related = products
            .filter(p => p.id !== prod.id && p.category === prod.category)
            .slice(0, 4);
        setRelatedProducts(related);
    };

    if (!product) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <p style={{ fontSize: '1.2rem', color: '#64748b' }}>Ürün yükleniyor veya bulunamadı...</p>
                <button className="btn btn-primary" onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
                    <ArrowLeft size={18} /> Ana Sayfaya Dön
                </button>
            </div>
        );
    }

    const isOutOfStock = product.stock <= 0;
    const isFav = isFavorite ? isFavorite(product.id) : false;
    const categoryName = categoryNames[product.category] || 'Ürünler';

    const handleAddToCart = () => {
        onAddToCart(product, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleShareWhatsApp = () => {
        const url = window.location.href;
        const text = `Sarmal Ticaret'te bu ürüne göz at: ${product.title} - ${product.price} TL ${url}`;
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <div style={{ background: '#f8fafc', paddingBottom: '4rem', minHeight: '85vh' }}>
            {/* Breadcrumb Navigation */}
            <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0.8rem 0' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748b' }}>
                    <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>Ana Sayfa</Link>
                    <span>/</span>
                    <Link to={`/category/${product.category}`} style={{ color: '#64748b', textDecoration: 'none' }}>{categoryName}</Link>
                    <span>/</span>
                    <span style={{ color: 'var(--color-text)', fontWeight: '600' }}>{product.title}</span>
                </div>
            </div>

            <div className="container" style={{ marginTop: '2rem' }}>
                {/* Main Detail Section */}
                <div style={{
                    background: 'white',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    border: '1px solid #e2e8f0',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(320px, 1.2fr) 1fr',
                    gap: '3rem'
                }} className="product-page-grid">
                    
                    {/* Left: Gallery & Zoom */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div
                            style={{
                                position: 'relative',
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                background: '#ffffff',
                                border: '1px solid #e2e8f0',
                                aspectRatio: '1/1',
                                cursor: 'zoom-in'
                            }}
                            onClick={() => setIsZoomed(!isZoomed)}
                        >
                            <img
                                src={images[activeImgIdx] || product.image}
                                alt={product.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transform: isZoomed ? 'scale(1.4)' : 'scale(1)',
                                    transition: 'transform 0.3s ease'
                                }}
                            />
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setActiveImgIdx(prev => prev === 0 ? images.length - 1 : prev - 1); }}
                                        style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.12)', cursor: 'pointer' }}
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setActiveImgIdx(prev => (prev + 1) % images.length); }}
                                        style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.12)', cursor: 'pointer' }}
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}
                            {product.flash_discount_rate > 0 && (
                                <div style={{ position: 'absolute', top: '15px', left: '15px', background: '#ef4444', color: 'white', fontWeight: '800', fontSize: '0.9rem', padding: '0.4rem 0.8rem', borderRadius: '20px', boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)' }}>
                                    ⚡ %{product.flash_discount_rate} İNDİRİM
                                </div>
                            )}
                        </div>

                        {/* Gallery Thumbnails */}
                        {images.length > 1 && (
                            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', padding: '0.25rem 0' }}>
                                {images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt=""
                                        onClick={() => setActiveImgIdx(idx)}
                                        style={{
                                            width: '75px',
                                            height: '75px',
                                            borderRadius: 'var(--radius-md)',
                                            objectFit: 'cover',
                                            cursor: 'pointer',
                                            border: activeImgIdx === idx ? '2px solid var(--color-primary)' : '2px solid transparent',
                                            opacity: activeImgIdx === idx ? 1 : 0.6,
                                            transition: 'all 0.2s'
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Info & Purchase Controls */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                            {categoryName}
                        </div>
                        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-text)', margin: '0 0 1rem 0', lineHeight: '1.2' }}>
                            {product.title}
                        </h1>

                        {/* Ratings & Social Proof */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', background: '#fffbeb', padding: '0.3rem 0.6rem', borderRadius: '6px', border: '1px solid #fef3c7' }}>
                                <Star size={18} fill="#f59e0b" color="#f59e0b" />
                                <span style={{ fontWeight: '800', fontSize: '0.95rem', color: '#b45309' }}>4.9</span>
                            </div>
                            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>• 100+ Başarılı Teslimat</span>
                            <span style={{ fontSize: '0.85rem', color: '#166534', fontWeight: '700', background: '#dcfce7', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>✓ Stokta Var</span>
                        </div>

                        {/* Pricing */}
                        <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem', border: '1px solid #e2e8f0' }}>
                            {product.flash_discount_rate > 0 ? (
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                                    <span style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--color-primary)' }}>
                                        {(product.price * (1 - product.flash_discount_rate / 100)).toFixed(2)} TL
                                    </span>
                                    <span style={{ fontSize: '1.2rem', textDecoration: 'line-through', color: '#94a3b8' }}>
                                        {product.price.toFixed(2)} TL
                                    </span>
                                </div>
                            ) : (
                                <div style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--color-primary)' }}>
                                    {product.price.toFixed(2)} TL
                                </div>
                            )}
                            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>KDV Dahildir • 500 TL Üzeri Ücretsiz Kargo</div>
                        </div>

                        {/* Quantity & Cart Action */}
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                            {/* Quantity Selector */}
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: 'var(--radius-md)', background: 'white' }}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    style={{ padding: '0.75rem 1rem', background: 'none', border: 'none', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }}
                                >-</button>
                                <span style={{ padding: '0 1rem', fontWeight: '700', fontSize: '1.1rem' }}>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    style={{ padding: '0.75rem 1rem', background: 'none', border: 'none', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }}
                                >+</button>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                className="btn btn-primary"
                                onClick={handleAddToCart}
                                disabled={isOutOfStock}
                                style={{
                                    flex: 1,
                                    padding: '0.9rem 1.5rem',
                                    fontSize: '1.1rem',
                                    fontWeight: '800',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    background: isAdded ? '#10b981' : 'var(--color-primary)',
                                    opacity: isOutOfStock ? 0.6 : 1
                                }}
                            >
                                {isAdded ? (
                                    <> <Check size={22} /> Sepete Eklendi! </>
                                ) : (
                                    <> <ShoppingCart size={22} /> {isOutOfStock ? 'Stokta Yok' : 'Sepete Ekle'} </>
                                )}
                            </button>

                            {/* Favorite Button */}
                            <button
                                className="btn btn-outline"
                                onClick={() => onToggleFavorite(product)}
                                style={{
                                    padding: '0.9rem',
                                    color: isFav ? '#ef4444' : 'var(--color-text)',
                                    borderColor: isFav ? '#ef4444' : '#cbd5e1'
                                }}
                                title="Favorilere Ekle"
                            >
                                <Heart size={24} fill={isFav ? '#ef4444' : 'none'} />
                            </button>
                        </div>

                        {/* WhatsApp Share Button */}
                        <button
                            onClick={handleShareWhatsApp}
                            style={{
                                background: '#25D366',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: '700',
                                fontSize: '0.9rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                cursor: 'pointer',
                                marginBottom: '2rem'
                            }}
                        >
                            <Share2 size={18} /> WhatsApp İle Ürün Linkini Paylaş
                        </button>

                        {/* Security & Support Guarantees */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: '#475569' }}>
                                <Truck size={20} color="var(--color-primary)" />
                                <span><strong>Hızlı Kargo</strong> (1-3 İş Günü)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: '#475569' }}>
                                <ShieldCheck size={20} color="#10b981" />
                                <span><strong>%100 Güvenli</strong> SSL Ödeme</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: '#475569' }}>
                                <RotateCcw size={20} color="#6366f1" />
                                <span><strong>Kolay İade</strong> (14 Gün İçinde)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: '#475569' }}>
                                <Check size={20} color="#f59e0b" />
                                <span><strong>Orijinal Ürün</strong> Garantisi</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section: Specs, Description, Reviews */}
                <div style={{ marginTop: '3rem', background: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                    {/* Tab Buttons */}
                    <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '2rem', overflowX: 'auto' }}>
                        {[
                            { id: 'specs', label: 'Teknik Özellikler', icon: List },
                            { id: 'desc', label: 'Ürün Açıklaması', icon: Info },
                            { id: 'reviews', label: 'Müşteri Yorumları', icon: MessageSquare },
                            { id: 'shipping', label: 'Kargo & İade Şartları', icon: Truck }
                        ].map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 1.25rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: 'none',
                                        background: activeTab === tab.id ? 'var(--color-primary)' : '#f8fafc',
                                        color: activeTab === tab.id ? 'white' : 'var(--color-text-light)',
                                        fontWeight: '700',
                                        fontSize: '0.95rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <Icon size={18} /> {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Specs Content */}
                    {activeTab === 'specs' && (
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.25rem', color: 'var(--color-text)' }}>📋 Teknik Özellikler Tablosu</h3>
                            {specs.length > 0 ? (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                                    {specs.map((s, idx) => (
                                        <div key={idx} style={{ background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontWeight: '700', color: '#64748b' }}>{s.key}</span>
                                            <span style={{ fontWeight: '700', color: 'var(--color-text)' }}>{s.value}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: '#64748b' }}>Bu ürün için ek teknik özellik tanımlanmamış.</p>
                            )}
                        </div>
                    )}

                    {/* Description Content */}
                    {activeTab === 'desc' && (
                        <div style={{ lineHeight: '1.8', fontSize: '1rem', color: '#334155' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem' }}>Ürün Detayları</h3>
                            <p>{product.description || 'Detaylı ürün açıklaması eklenmemiş.'}</p>
                        </div>
                    )}

                    {/* Reviews Content */}
                    {activeTab === 'reviews' && (
                        <ProductReviews productId={product.id} user={user} />
                    )}

                    {/* Shipping Content */}
                    {activeTab === 'shipping' && (
                        <div style={{ lineHeight: '1.8', fontSize: '0.95rem', color: '#334155' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem' }}>Kargo ve Teslimat</h3>
                            <p>Siparişleriniz en geç 1-3 iş günü içerisinde kargoya teslim edilmektedir. Kargo takip kodunuz e-posta ve üye panelinize iletilecektir.</p>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginTop: '1.5rem', marginBottom: '1rem' }}>İade ve Değişim</h3>
                            <p>Ürünü teslim aldığınız tarihten itibaren 14 gün içerisinde orijinal ambalajında hasarsız olarak ücretsiz iade edebilirsiniz.</p>
                        </div>
                    )}
                </div>

                {/* Related / Cross-sell Products */}
                {relatedProducts.length > 0 && (
                    <div style={{ marginTop: '4rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--color-text)' }}>
                            🛍️ Bu Ürünü Alanlar Bunları da İnceledi
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
                            {relatedProducts.map(rel => (
                                <div
                                    key={rel.id}
                                    onClick={() => navigate(`/product/${rel.id}`)}
                                    style={{
                                        background: 'white',
                                        borderRadius: 'var(--radius-lg)',
                                        overflow: 'hidden',
                                        border: '1px solid #e2e8f0',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                        boxShadow: 'var(--shadow-sm)'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                                >
                                    <img src={rel.image} alt={rel.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                                    <div style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rel.title}</div>
                                        <div style={{ fontWeight: '800', color: 'var(--color-primary)', fontSize: '1.1rem' }}>{rel.price} TL</div>
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
