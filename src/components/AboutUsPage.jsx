import React from 'react';
import { Sparkles, ShieldCheck, Heart, Award, Users, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AboutUsPage() {
    return (
        <div style={{ background: '#f8fafc', padding: '3rem 0 5rem 0', minHeight: '85vh' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: '700', textDecoration: 'none', marginBottom: '1.5rem' }}>
                    <ArrowLeft size={18} /> Ana Sayfaya Dön
                </Link>

                {/* Hero Header */}
                <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: 'white', padding: '3.5rem 2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', marginBottom: '3rem', boxShadow: 'var(--shadow-md)' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.2)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '1rem' }}>
                        <Sparkles size={18} color="#fde047" /> Biz Kimiz?
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 1rem 0', letterSpacing: '-0.5px' }}>
                        Sarmal Ticaret'in Hikayesi
                    </h1>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
                        Kaliteyi, özgün tasarımı ve zarafeti yaşam alanlarınıza ve sevdiklerinizin yüzündeki tebessüme dönüştürüyoruz.
                    </p>
                </div>

                {/* Core Values Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <div style={{ background: 'white', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ width: '48px', height: '48px', background: '#e0e7ff', color: 'var(--color-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            <Heart size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--color-text)' }}>Tutku & İşçilik</h3>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                            Her bir ürünümüzü özenle seçiyor, kişiye özel tasarımlarımızda en yüksek el işçiliği standartlarını uyguluyoruz.
                        </p>
                    </div>

                    <div style={{ background: 'white', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ width: '48px', height: '48px', background: '#dcfce7', color: '#166534', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            <ShieldCheck size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--color-text)' }}>%100 Güvenilirlik</h3>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                            256-bit SSL güvenlik protokolleri, hızlı kargo operasyonu ve koşulsuz 14 gün iade garantimizle yanınızdayız.
                        </p>
                    </div>

                    <div style={{ background: 'white', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ width: '48px', height: '48px', background: '#fef3c7', color: '#b45309', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            <Award size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--color-text)' }}>Üstün Müşteri Deneyimi</h3>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                            10.000'den fazla mutlu müşterimizle Türkiye'nin dört bir yanına mutluluk taşıyoruz.
                        </p>
                    </div>
                </div>

                {/* About Content Text */}
                <div style={{ background: 'white', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)', lineHeight: '1.8', color: '#334155' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--color-text)' }}>
                        Misyonumuz ve Vizyonumuz
                    </h2>
                    <p style={{ marginBottom: '1.25rem' }}>
                        Sarmal Ticaret olarak, sıradan hediyelik eşyaların ötesine geçerek duyguları ve anıları ölümsüzleştiren tasarımlar sunmayı amaçlıyoruz. Günümüz hızlı tüketim dünyasında kalitesiyle öne çıkan, özenle paketlenen ve her detayında hassasiyet barındıran koleksiyonlar hazırlıyoruz.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                            <CheckCircle2 size={20} /> Orijinal Ürün Garantisi
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                            <CheckCircle2 size={20} /> Özenli Hediye Paketleme
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                            <CheckCircle2 size={20} /> Kesintisiz Canlı Destek
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
