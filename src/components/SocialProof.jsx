import React, { useState, useEffect } from 'react';
import { ShoppingBag, X } from 'lucide-react';

const NAMES = ['Melih', 'Ayşe', 'Mehmet', 'Fatma', 'Can', 'Elif', 'Burak', 'Zeynep', 'Emre', 'Selin'];
const PRODUCTS = [
    'Kişiye Özel Termos',
    'Cam Fanus Solmayan Gül',
    'Çelik Erkek Bileklik',
    'Lüx Çakmak ve Saat Kombini',
    'Kupa Bardak',
    'Dekoratif Masa Lambası'
];

export function SocialProof() {
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const showNotification = () => {
            const name = NAMES[Math.floor(Math.random() * NAMES.length)];
            const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
            const time = Math.floor(Math.random() * 50) + 2;

            setNotification({ name, product, time });

            // Auto hide after 5 seconds
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        };

        // Show first notification after 10 seconds, then every 25-40 seconds
        const initialTimer = setTimeout(showNotification, 8000);

        const interval = setInterval(() => {
            showNotification();
        }, Math.random() * 15000 + 25000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    if (!notification) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '2rem',
            left: '2rem',
            background: 'white',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            zIndex: 1000,
            animation: 'slideUp 0.5s ease-out',
            border: '1px solid #f1f5f9',
            maxWidth: '320px'
        }}>
            <div style={{
                background: 'var(--color-primary)',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <ShoppingBag size={20} />
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>
                    {notification.name} az önce satın aldı!
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                    {notification.product}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#6366f1', marginTop: '0.2rem' }}>
                    {notification.time} dakika önce
                </div>
            </div>
            <button onClick={() => setNotification(null)} style={{ background: 'none', color: '#94a3b8' }}>
                <X size={16} />
            </button>

            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(100px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
