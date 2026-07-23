import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
    {
        q: 'Siparişlerim kaç gün içerisinde kargoya teslim edilir?',
        a: 'Hafta içi saat 14:00\'e kadar verilen tüm siparişleriniz aynı gün kargoya hazırlanır. Teslimat süresi bulunduğunuz ile bağlı olarak genellikle 1-3 iş günüdür.'
    },
    {
        q: 'Hediye paketi ve hediye notu ekleme seçeneği var mıdır?',
        a: 'Evet! Sepet veya Ödeme adımında "Siparişimi Hediye Paketi Yap" seçeneğini işaretleyebilir ve hediye paketi üzerine basılacak özel notunuzu yazabilirsiniz. Bu işlem tamamen ücretsizdir.'
    },
    {
        q: 'Üye olmadan kargo takibini nasıl yapabilirim?',
        a: 'Sitemizin üst menüsünde yer alan "Sipariş Takibi" bağlantısına tıklayarak Sipariş Numaranız ve Telefon/E-posta bilginizle anlık kargo durumunu ve hareketlerini sorgulayabilirsiniz.'
    },
    {
        q: 'Hangi ödeme yöntemlerini kullanabilirim?',
        a: 'Kredi Kartı (256-bit SSL korumalı ve PayTR altyapısıyla 3D Secure), Banka Kartı ve Havale/EFT yöntemleriyle güvenle ödeme yapabilirsiniz.'
    },
    {
        q: 'İade ve değişim politikası nasıldır?',
        a: 'Siparişinizi teslim aldığınız tarihten itibaren 14 gün içerisinde orijinal ambalajı bozulmamış ürünleri ücretsiz olarak iade edebilir veya değişim talep edebilirsiniz.'
    }
];

export function FAQSection() {
    const [openIdx, setOpenIdx] = useState(0);

    const toggleFAQ = (idx) => {
        setOpenIdx(openIdx === idx ? null : idx);
    };

    return (
        <section style={{ background: 'white', padding: '4rem 0', borderTop: '1px solid #e2e8f0' }}>
            <div className="container" style={{ maxWidth: '850px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ width: '50px', height: '50px', background: '#fef3c7', color: '#b45309', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                        <HelpCircle size={28} />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--color-text)', margin: '0 0 0.5rem 0' }}>
                        ❓ Sıkça Sorulan Sorular
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
                        Aklınıza takılan soruların yanıtlarına buradan ulaşabilirsiniz.
                    </p>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    {FAQS.map((faq, idx) => {
                        const isOpen = openIdx === idx;
                        return (
                            <div
                                key={idx}
                                style={{
                                    border: '1px solid #e2e8f0',
                                    borderRadius: 'var(--radius-lg)',
                                    overflow: 'hidden',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <button
                                    onClick={() => toggleFAQ(idx)}
                                    style={{
                                        width: '100%',
                                        padding: '1.25rem 1.5rem',
                                        background: isOpen ? '#f8fafc' : 'white',
                                        border: 'none',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        fontWeight: '700',
                                        fontSize: '1rem',
                                        color: isOpen ? 'var(--color-primary)' : 'var(--color-text)'
                                    }}
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown
                                        size={20}
                                        style={{
                                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.3s ease',
                                            flexShrink: 0
                                        }}
                                    />
                                </button>
                                {isOpen && (
                                    <div style={{ padding: '1.25rem 1.5rem', background: '#ffffff', color: '#475569', lineHeight: '1.7', fontSize: '0.95rem', borderTop: '1px solid #f1f5f9' }}>
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
