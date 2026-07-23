import React, { useState } from 'react';
import { X } from 'lucide-react';

export function WhatsAppWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const phoneNumber = '905423178596';
    const message = 'Merhaba Sarmal Ticaret! Ürünleriniz ve siparişim hakkında bilgi almak istiyorum.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div style={{ position: 'fixed', bottom: '85px', right: '20px', zIndex: 1000 }}>
            {/* Pop-up Chat Window */}
            {isOpen && (
                <div style={{
                    background: 'white',
                    padding: '1.25rem',
                    borderRadius: '18px',
                    boxShadow: '0 12px 35px rgba(0,0,0,0.18)',
                    marginBottom: '12px',
                    width: '300px',
                    border: '1px solid #e2e8f0',
                    animation: 'slideUp 0.3s ease-out'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', fontSize: '0.95rem', color: '#15803d' }}>
                            <div style={{ width: '10px', height: '10px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e' }}></div>
                            Sarmal Canlı Destek
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '0.2rem' }}>
                            <X size={18} />
                        </button>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#334155', margin: '0 0 1.1rem 0', lineHeight: '1.5', background: '#f0fdf4', padding: '0.75rem', borderRadius: '10px', border: '1px solid #dcfce7' }}>
                        Merhaba! 👋 Sarmal Ticaret müşteri hizmetlerine hoş geldiniz. Size nasıl yardımcı olabiliriz?
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
                            gap: '0.6rem',
                            padding: '0.75rem 1rem',
                            borderRadius: '30px',
                            fontWeight: '800',
                            fontSize: '0.9rem',
                            boxShadow: '0 4px 15px rgba(37,211,102,0.4)',
                            transition: 'background 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#1da851'}
                        onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
                    >
                        {/* Authentic WhatsApp SVG Logo */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                        WhatsApp İle Yazın
                    </a>
                </div>
            )}

            {/* Floating Green WhatsApp Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#25D366',
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 8px 25px rgba(37, 211, 102, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.08)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(37, 211, 102, 0.6)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.45)';
                }}
                title="WhatsApp Canlı Destek"
            >
                <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16 2C8.268 2 2 8.268 2 16c0 2.82.83 5.44 2.26 7.64L2.05 29.35a1 1 0 0 0 1.22 1.22l5.71-2.21C11.18 29.77 13.52 30.6 16 30.6c7.732 0 14-6.268 14-14S23.732 2 16 2zm-1.5 20.5c-3.5 0-6.75-1.75-8.65-4.65l.35-.35c.7-.7 1.8-.7 2.5 0l1.4 1.4c.4.4.4 1 0 1.4l-.4.4c.9 1.4 2.2 2.7 3.6 3.6l.4-.4c.4-.4 1-.4 1.4 0l1.4 1.4c.7.7.7 1.8 0 2.5l-.35.35c-1.15 1.15-2.7 1.75-4.25 1.75z" fill="white"/>
                    <path d="M19.05 20.95c-.3.3-.7.45-1.1.45-1.6 0-3.6-1.1-5.4-2.9s-2.9-3.8-2.9-5.4c0-.4.15-.8.45-1.1l.9-.9c.4-.4 1.05-.4 1.45 0l1.2 1.2c.4.4.4 1.05 0 1.45l-.45.45c.85 1.3 2 2.45 3.3 3.3l.45-.45c.4-.4 1.05-.4 1.45 0l1.2 1.2c.4.4.4 1.05 0 1.45l-.9.9z" fill="white"/>
                </svg>
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
