import React from 'react';
import { Sparkles, Truck, ShieldCheck, Gift, Headphones, ArrowRight } from 'lucide-react';

export function Hero({ onAddProduct, isAdmin }) {
    return (
        <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6366f1 100%)', color: 'white', padding: '3.5rem 0 3.5rem 0', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
            {/* Decorative background glow circles */}
            <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '350px', height: '350px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '300px', height: '300px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%', pointerEvents: 'none' }} />

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)', padding: '0.5rem 1.25rem', borderRadius: '30px', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.25)' }}>
                        <Sparkles size={20} color="#fde047" />
                        <span style={{ fontSize: '0.95rem', fontWeight: '700', letterSpacing: '0.5px' }}>Sarmal Ticaret • Özel Tasarım & Hediyelik Dünyası</span>
                    </div>

                    <h1 style={{ fontSize: '3rem', fontWeight: '900', lineHeight: '1.15', marginBottom: '1.25rem', letterSpacing: '-0.5px' }}>
                        Zarafetin ve Kalitenin Buluştuğu Adres
                    </h1>

                    <p style={{ fontSize: '1.2rem', opacity: 0.9, lineHeight: '1.6', marginBottom: '2.5rem', maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
                        Sevdiklerinize unutulmaz sürprizler, özel tasarım hediyeler ve yaşam alanınıza şıklık katacak koleksiyonlar Sarmal Ticaret güvencesiyle kapınızda.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
                        <button
                            className="btn"
                            onClick={() => {
                                const section = document.getElementById('product-section-anchor');
                                if (section) section.scrollIntoView({ behavior: 'smooth' });
                                else window.scrollTo({ top: 750, behavior: 'smooth' });
                            }}
                            style={{
                                background: 'white',
                                color: '#4f46e5',
                                fontSize: '1.1rem',
                                fontWeight: '800',
                                padding: '0.9rem 2.2rem',
                                borderRadius: '30px',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Ürünleri Keşfet <ArrowRight size={20} />
                        </button>
                        {isAdmin && (
                            <button
                                className="btn btn-outline"
                                onClick={onAddProduct}
                                style={{
                                    color: 'white',
                                    borderColor: 'rgba(255,255,255,0.6)',
                                    fontSize: '1rem',
                                    fontWeight: '700',
                                    padding: '0.9rem 1.8rem',
                                    borderRadius: '30px'
                                }}
                            >
                                + Yeni Ürün Ekle (Admin)
                            </button>
                        )}
                    </div>
                </div>

                {/* 4 Value Proposition Cards Row */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1.25rem',
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(12px)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Truck size={24} color="#ffffff" />
                        </div>
                        <div>
                            <div style={{ fontWeight: '800', fontSize: '0.95rem' }}>Ertesi Gün Kargo</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.85 }}>Hızlı ve güvenli teslimat</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ShieldCheck size={24} color="#ffffff" />
                        </div>
                        <div>
                            <div style={{ fontWeight: '800', fontSize: '0.95rem' }}>%100 Güvenli Ödeme</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.85 }}>256-Bit SSL Koruma</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Gift size={24} color="#ffffff" />
                        </div>
                        <div>
                            <div style={{ fontWeight: '800', fontSize: '0.95rem' }}>Özel Hediye Paketi</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.85 }}>Şık not kartı seçeneğiyle</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Headphones size={24} color="#ffffff" />
                        </div>
                        <div>
                            <div style={{ fontWeight: '800', fontSize: '0.95rem' }}>7/24 Canlı Destek</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.85 }}>Kesintisiz iletişim desteği</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

