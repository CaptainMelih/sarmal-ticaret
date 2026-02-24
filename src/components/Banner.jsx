import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
    {
        id: 1,
        title: '🎁 Kişiye Özel Hediyeler',
        subtitle: 'Sevdiklerinize özel tasarımlar',
        bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        categoryId: 1
    },
    {
        id: 2,
        title: '⚡ Flaş İndirimler',
        subtitle: 'Sınırlı süre için büyük fırsatlar',
        bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        isFlash: true
    },
    {
        id: 3,
        title: '🎨 Dekoratif Ürünler',
        subtitle: 'Evinize şıklık katın',
        bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        categoryId: 6
    }
];

export function Banner({ onOpenFlashDeals, onCategorySelect }) {
    const [currentSlide, setCurrentSlide] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    };

    return (
        <div style={{
            position: 'relative',
            height: '400px',
            overflow: 'hidden',
            marginBottom: '3rem',
            borderRadius: '1rem'
        }}>
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: banner.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        color: 'white',
                        opacity: currentSlide === index ? 1 : 0,
                        transition: 'opacity 0.5s ease-in-out',
                        pointerEvents: currentSlide === index ? 'auto' : 'none',
                        textAlign: 'center',
                        padding: '0 2rem'
                    }}
                >
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem', fontWeight: '900', letterSpacing: '-1px' }}>
                        {banner.title}
                    </h2>
                    <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', opacity: 0.9, marginBottom: '2rem' }}>{banner.subtitle}</p>
                    <button
                        onClick={() => {
                            if (banner.isFlash) {
                                onOpenFlashDeals();
                            } else if (banner.categoryId) {
                                onCategorySelect(banner.categoryId);
                            }
                        }}
                        style={{
                            padding: '1rem 2.5rem',
                            borderRadius: '30px',
                            border: 'none',
                            background: 'white',
                            color: 'black',
                            fontWeight: '700',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                        }}
                    >
                        {banner.isFlash ? 'Hemen İncele' : 'Fırsatı Yakala'}
                    </button>
                </div>
            ))}

            <button
                onClick={prevSlide}
                style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.3)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '3rem',
                    height: '3rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            >
                <ChevronLeft color="white" size={24} />
            </button>

            <button
                onClick={nextSlide}
                style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.3)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '3rem',
                    height: '3rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            >
                <ChevronRight color="white" size={24} />
            </button>

            <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '0.5rem'
            }}>
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        style={{
                            width: currentSlide === index ? '2rem' : '0.5rem',
                            height: '0.5rem',
                            borderRadius: '0.25rem',
                            border: 'none',
                            background: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            opacity: currentSlide === index ? 1 : 0.5
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
