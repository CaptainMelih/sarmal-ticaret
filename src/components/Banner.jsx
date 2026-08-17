import React from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Tag, ArrowRight } from 'lucide-react';

const defaultBanners = [
    {
        id: 'default-1',
        title: '🎁 Kişiye Özel Hediyeler',
        subtitle: 'Sevdiklerinize özel tasarımlar ve unutulmaz anılar',
        bg: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        categoryId: 1
    },
    {
        id: 'default-2',
        title: '⚡ Flaş İndirimler',
        subtitle: 'Sınırlı süre için kaçırılmayacak fırsatlar',
        bg: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
        isFlash: true
    },
    {
        id: 'default-3',
        title: '🏠 Dekoratif Yaşam Alanları',
        subtitle: 'Evinize şıklık ve zarafet katacak özel ürünler',
        bg: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
        categoryId: 6
    }
];

export function Banner({ products = [], onSelectProduct, onOpenFlashDeals, onCategorySelect }) {
    const [currentSlide, setCurrentSlide] = React.useState(0);

    // Filter admin-selected featured & flash products
    const featuredItems = (products || []).filter(p => p && p.is_active !== false && (p.is_featured || Number(p.flash_discount_rate) > 0));

    // Combine admin featured products with default fallback slides if needed
    const slides = featuredItems.length > 0
        ? featuredItems.map((p, idx) => ({
            id: p.id,
            isProduct: true,
            product: p,
            title: p.title,
            subtitle: p.description ? (p.description.length > 90 ? p.description.slice(0, 90) + '...' : p.description) : 'Özel tasarım hediyelik koleksiyonu',
            price: p.price,
            flashRate: p.flash_discount_rate || 0,
            image: p.image,
            bg: idx % 3 === 0 
                ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' 
                : idx % 3 === 1 
                ? 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)' 
                : 'linear-gradient(135deg, #0284c7 0%, #0f766e 100%)'
        }))
        : defaultBanners;

    React.useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div style={{
            position: 'relative',
            minHeight: '380px',
            borderRadius: '1.25rem',
            overflow: 'hidden',
            marginBottom: '2.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.12)'
        }}>
            {slides.map((slide, index) => {
                const isCurrent = currentSlide === index;
                const isProd = slide.isProduct;
                const origPrice = slide.price;
                const discountRate = slide.flashRate || 0;
                const finalPrice = discountRate > 0 ? (origPrice * (100 - discountRate) / 100).toFixed(2) : origPrice;

                return (
                    <div
                        key={slide.id}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: slide.bg,
                            opacity: isCurrent ? 1 : 0,
                            transition: 'opacity 0.6s ease-in-out',
                            pointerEvents: isCurrent ? 'auto' : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '2.5rem 3.5rem',
                            gap: '2rem'
                        }}
                    >
                        {/* Slide Content */}
                        <div style={{
                            flex: 1,
                            color: 'white',
                            textAlign: isProd && slide.image ? 'left' : 'center',
                            zIndex: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: isProd && slide.image ? 'flex-start' : 'center',
                            justifyContent: 'center',
                            margin: isProd && slide.image ? '0' : '0 auto',
                            maxWidth: isProd && slide.image ? '600px' : '750px'
                        }}>
                            {isProd && (
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    backdropFilter: 'blur(8px)',
                                    padding: '0.35rem 0.85rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: '700',
                                    marginBottom: '1rem',
                                    letterSpacing: '0.5px'
                                }}>
                                    <Sparkles size={14} color="#fde047" />
                                    {discountRate > 0 ? `⚡ %${discountRate} FLAŞ İNDİRİM` : '🌟 ÖNE ÇIKAN SEÇİM'}
                                </div>
                            )}

                            <h2 style={{
                                fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
                                fontWeight: '900',
                                lineHeight: '1.25',
                                marginBottom: '1rem',
                                textAlign: isProd && slide.image ? 'left' : 'center',
                                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                            }}>
                                {slide.title}
                            </h2>

                            <p style={{
                                fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
                                opacity: 0.92,
                                marginBottom: '1.75rem',
                                maxWidth: '650px',
                                textAlign: isProd && slide.image ? 'left' : 'center',
                                lineHeight: '1.5'
                            }}>
                                {slide.subtitle}
                            </p>

                            {isProd && (
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.75rem' }}>
                                    <span style={{ fontSize: '2rem', fontWeight: '900', color: '#ffffff' }}>
                                        {finalPrice} TL
                                    </span>
                                    {discountRate > 0 && (
                                        <span style={{ fontSize: '1.2rem', textDecoration: 'line-through', opacity: 0.65 }}>
                                            {origPrice} TL
                                        </span>
                                    )}
                                </div>
                            )}

                            <button
                                onClick={() => {
                                    if (isProd && onSelectProduct) {
                                        onSelectProduct(slide.product);
                                    } else if (slide.isFlash && onOpenFlashDeals) {
                                        onOpenFlashDeals();
                                    } else if (slide.categoryId && onCategorySelect) {
                                        onCategorySelect(slide.categoryId);
                                    }
                                }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    padding: '0.85rem 2.2rem',
                                    borderRadius: '30px',
                                    border: 'none',
                                    background: 'white',
                                    color: '#0f172a',
                                    fontWeight: '800',
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                }}
                            >
                                Hemen İncele <ArrowRight size={18} />
                            </button>
                        </div>

                        {/* Slide Image Right (If Product) */}
                        {isProd && slide.image && (
                            <div style={{
                                width: '280px',
                                height: '280px',
                                flexShrink: 0,
                                borderRadius: '1.25rem',
                                overflow: 'hidden',
                                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                                border: '4px solid rgba(255,255,255,0.3)',
                                transform: isCurrent ? 'scale(1) rotate(0deg)' : 'scale(0.9) rotate(-3deg)',
                                transition: 'transform 0.6s ease-out'
                            }}>
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Navigation Arrows */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        style={{
                            position: 'absolute',
                            left: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(255, 255, 255, 0.25)',
                            backdropFilter: 'blur(10px)',
                            border: 'none',
                            color: 'white',
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 10,
                            transition: 'background 0.2s'
                        }}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        style={{
                            position: 'absolute',
                            right: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(255, 255, 255, 0.25)',
                            backdropFilter: 'blur(10px)',
                            border: 'none',
                            color: 'white',
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 10,
                            transition: 'background 0.2s'
                        }}
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            {/* Pagination Indicators */}
            {slides.length > 1 && (
                <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '0.5rem',
                    zIndex: 10
                }}>
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            style={{
                                width: currentSlide === index ? '28px' : '9px',
                                height: '9px',
                                borderRadius: '5px',
                                border: 'none',
                                background: currentSlide === index ? 'white' : 'rgba(255, 255, 255, 0.4)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
