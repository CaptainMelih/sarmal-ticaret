import React from 'react';
import { Star, CheckCircle, Quote, ThumbsUp } from 'lucide-react';

const TESTIMONIALS = [
    {
        id: 1,
        name: 'Zeynep Aksoy',
        city: 'İstanbul',
        rating: 5,
        date: '2 gün önce',
        comment: 'Sevgililer günü için hediye sipariş etmiştim. Hediye paketlemesi ve üzerindeki özel not kartı o kadar zarifti ki! Kargo 24 saat sürmeden elimdeydi. Çok teşekkürler Sarmal Ticaret!',
        product: 'Kişiye Özel Işıklı Ahşap Çerçeve'
    },
    {
        id: 2,
        name: 'Ahmet Yılmaz',
        city: 'Ankara',
        rating: 5,
        date: '1 hafta önce',
        comment: 'Ürünün kalitesi beklentimin çok üstünde çıktı. Paslanmaz termos elime ulaştığında hemen denedim, sıcaklığı gün boyu koruyor. Paketleme son derece özenliydi.',
        product: 'Kişiye Özel Çelik Termos'
    },
    {
        id: 3,
        name: 'Elif Kaya',
        city: 'İzmir',
        rating: 5,
        date: '3 gün önce',
        comment: 'Admin ve müşteri hizmetleri anında mesajlarıma dönüş yaptı. Kargo takip süreci son derece şeffaftı. İç rahatlığıyla alışveriş yapabilirsiniz.',
        product: 'Dekoratif Batmayan Gemi Şişe'
    }
];

export function CustomerTestimonials() {
    return (
        <section style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', padding: '4rem 0', borderTop: '1px solid #e2e8f0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem auto' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#e0e7ff', color: 'var(--color-primary)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '800', marginBottom: '0.75rem' }}>
                        <Star size={16} fill="var(--color-primary)" /> 4.9 / 5.0 Müşteri Memnuniyeti
                    </div>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--color-text)', margin: '0 0 0.75rem 0' }}>
                        💬 Mutlu Müşterilerimiz Ne Diyor?
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>
                        Sarmal Ticaret'ten alışveriş yapan 10.000'den fazla mutlu müşterimizin gerçek deneyimleri.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
                    {TESTIMONIALS.map(t => (
                        <div
                            key={t.id}
                            style={{
                                background: 'white',
                                padding: '1.75rem',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid #e2e8f0',
                                boxShadow: 'var(--shadow-sm)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                position: 'relative',
                                transition: 'transform 0.2s, box-shadow 0.2s'
                            }}
                            className="testimonial-card"
                        >
                            <Quote size={40} color="#e0e7ff" style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', opacity: 0.6 }} />

                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', marginBottom: '1rem' }}>
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                                    ))}
                                </div>
                                <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '1.25rem', position: 'relative', zIndex: 2 }}>
                                    "{t.comment}"
                                </p>
                            </div>

                            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                        {t.name}
                                        <CheckCircle size={15} color="#10b981" title="Doğrulanmış Alıcı" />
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{t.city} • {t.date}</div>
                                </div>
                                <div style={{ fontSize: '0.75rem', background: '#f1f5f9', color: '#475569', padding: '0.25rem 0.5rem', borderRadius: '4px', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {t.product}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
