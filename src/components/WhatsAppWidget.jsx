import React, { useState } from 'react';
import { X } from 'lucide-react';

export function WhatsAppWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const phoneNumber = '905423178596';
    const message = 'Merhaba Sarmal Ticaret! Ürünleriniz ve siparişim hakkında bilgi almak istiyorum.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="whatsapp-widget-container" style={{ position: 'fixed', bottom: '85px', right: '20px', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            {/* Pop-up Chat Window */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    bottom: '72px',
                    right: '0',
                    width: '300px',
                    background: 'white',
                    padding: '1.25rem',
                    borderRadius: '20px',
                    boxShadow: '0 15px 40px -5px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)',
                    border: '1px solid #e2e8f0',
                    animation: 'waSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: 10001
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', fontSize: '0.95rem', color: '#0f766e' }}>
                            <div style={{ width: '9px', height: '9px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e' }}></div>
                            Sarmal Canlı Destek
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
                            <X size={15} />
                        </button>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#334155', margin: '0 0 1rem 0', lineHeight: '1.5', background: '#f0fdf4', padding: '0.75rem 0.9rem', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                        Merhaba! 👋 Sarmal Ticaret'e hoş geldiniz. Size nasıl yardımcı olabiliriz?
                    </p>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                            color: 'white',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.6rem',
                            padding: '0.75rem 1.25rem',
                            borderRadius: '30px',
                            fontWeight: '700',
                            fontSize: '0.9rem',
                            boxShadow: '0 6px 20px rgba(37,211,102,0.4)',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.073-2.02-.475-1.503-.623-2.483-2.138-2.559-2.239-.074-.1-1.025-1.365-1.025-2.604 0-1.24.649-1.85.88-2.103.232-.253.506-.316.674-.316.168 0 .337.002.485.01.157.007.368-.059.576.441.213.511.728 1.776.792 1.906.064.13.106.283.019.456-.086.173-.13.281-.257.433-.128.152-.27.34-.385.457-.13.131-.265.274-.114.533.151.258.672 1.107 1.442 1.792.991.882 1.826 1.156 2.084 1.285.259.13.409.108.56-.065.151-.173.647-.753.82-1.012.173-.259.346-.216.577-.13.232.086 1.467.691 1.719.817.253.126.421.189.483.295.061.106.061.614-.083 1.019z"/>
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.526 3.66 1.444 5.176L2 22l4.981-1.306A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.697 0-3.272-.51-4.593-1.385l-.329-.219-2.962.777.791-2.888-.237-.377A8.125 8.125 0 013.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z"/>
                        </svg>
                        WhatsApp İle Yazın
                    </a>
                </div>
            )}

            {/* Floating WhatsApp Button with Breathing Pulse Glow */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                {!isOpen && (
                    <div
                        onClick={() => setIsOpen(true)}
                        style={{
                            background: 'white',
                            color: '#1f2937',
                            padding: '0.45rem 0.85rem',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.12)',
                            border: '1px solid #e2e8f0',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            animation: 'waFadeIn 0.3s ease-out',
                            userSelect: 'none'
                        }}
                    >
                        <span>WhatsApp Destek</span>
                        <div style={{ width: '7px', height: '7px', background: '#22c55e', borderRadius: '50%' }}></div>
                    </div>
                )}

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="wa-floating-btn"
                    style={{
                        width: '58px',
                        height: '58px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                        color: 'white',
                        border: 'none',
                        boxShadow: '0 8px 25px rgba(37, 211, 102, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                        position: 'relative',
                        transition: 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                    title="WhatsApp Canlı Destek"
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.073-2.02-.475-1.503-.623-2.483-2.138-2.559-2.239-.074-.1-1.025-1.365-1.025-2.604 0-1.24.649-1.85.88-2.103.232-.253.506-.316.674-.316.168 0 .337.002.485.01.157.007.368-.059.576.441.213.511.728 1.776.792 1.906.064.13.106.283.019.456-.086.173-.13.281-.257.433-.128.152-.27.34-.385.457-.13.131-.265.274-.114.533.151.258.672 1.107 1.442 1.792.991.882 1.826 1.156 2.084 1.285.259.13.409.108.56-.065.151-.173.647-.753.82-1.012.173-.259.346-.216.577-.13.232.086 1.467.691 1.719.817.253.126.421.189.483.295.061.106.061.614-.083 1.019z"/>
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.526 3.66 1.444 5.176L2 22l4.981-1.306A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.697 0-3.272-.51-4.593-1.385l-.329-.219-2.962.777.791-2.888-.237-.377A8.125 8.125 0 013.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z"/>
                    </svg>
                </button>
            </div>

            <style>{`
                @keyframes waPulse {
                    0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
                    70% { box-shadow: 0 0 0 14px rgba(37, 211, 102, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
                }
                @keyframes waSlideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes waFadeIn {
                    from { opacity: 0; transform: translateX(10px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .wa-floating-btn {
                    animation: waPulse 2.5s infinite;
                }
                .wa-floating-btn:hover {
                    transform: scale(1.1) !important;
                }
            `}</style>
        </div>
    );
}
