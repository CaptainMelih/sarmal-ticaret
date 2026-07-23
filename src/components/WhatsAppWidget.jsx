import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export function WhatsAppWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const phoneNumber = '905423178596';
    const message = 'Merhaba Sarmal Ticaret! Ürünler ve siparişim hakkında bilgi almak istiyorum.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div style={{ position: 'fixed', bottom: '85px', right: '20px', zIndex: 1000 }}>
            {/* Pop-up message box */}
            {isOpen && (
                <div style={{
                    background: 'white',
                    padding: '1.25rem',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    marginBottom: '10px',
                    width: '280px',
                    border: '1px solid #e2e8f0',
                    animation: 'slideUp 0.3s ease'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontSize: '0.95rem', color: '#166534' }}>
                            <div style={{ width: '10px', height: '10px', background: '#22c55e', borderRadius: '50%' }}></div>
                            Sarmal Destek
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                            <X size={16} />
                        </button>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 1rem 0', lineHeight: '1.5' }}>
                        Merhaba! 👋 Size nasıl yardımcı olabiliriz? Sorularınız için 7/24 WhatsApp hattımızdan bize ulaşabilirsiniz.
                    </p>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            background: '#25D366',
                            color: 'white',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            padding: '0.65rem 1rem',
                            borderRadius: '25px',
                            fontWeight: '700',
                            fontSize: '0.88rem',
                            boxShadow: '0 4px 12px rgba(37,211,102,0.3)'
                        }}
                    >
                        <MessageCircle size={18} /> Sohbeti Başlat
                    </a>
                </div>
            )}

            {/* Floating Green Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '58px',
                    height: '58px',
                    borderRadius: '50%',
                    background: '#25D366',
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'transform 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                title="WhatsApp Canlı Destek"
            >
                <MessageCircle size={30} />
                <span style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    width: '14px',
                    height: '14px',
                    background: '#ef4444',
                    border: '2px solid white',
                    borderRadius: '50%'
                }} />
            </button>
        </div>
    );
}
