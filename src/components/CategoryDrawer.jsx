import React from 'react';
import { X, Gift, Heart, Watch, Coffee, Shirt, Home, ChevronRight, LayoutGrid } from 'lucide-react';

const categories = [
    { id: 1, name: 'Kişiye Özel', icon: Gift, color: '#f472b6' },
    { id: 2, name: 'Sevgiliye Hediye', icon: Heart, color: '#fb7185' },
    { id: 3, name: 'Saat & Aksesuar', icon: Watch, color: '#60a5fa' },
    { id: 4, name: 'Bardak & Termos', icon: Coffee, color: '#fbbf24' },
    { id: 5, name: 'Tekstil', icon: Shirt, color: '#818cf8' },
    { id: 6, name: 'Dekoratif Ürünler', icon: Home, color: '#34d399' }
];

export function CategoryDrawer({ isOpen, onClose, onCategorySelect, products = [] }) {
    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
            style={{
                zIndex: 2100,
                justifyContent: 'flex-start',
                background: 'rgba(0,0,0,0.3)'
            }}
        >
            <div
                className="drawer-content"
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '320px',
                    height: '100%',
                    background: 'white',
                    padding: '2rem',
                    boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
                    animation: 'slideIn 0.3s ease-out',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <LayoutGrid size={24} color="var(--color-primary)" />
                        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Kategoriler</h2>
                    </div>
                    <button onClick={onClose} style={{ background: 'none' }}><X /></button>
                </div>

                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    onCategorySelect(cat.id);
                                    onClose();
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem',
                                    border: '1px solid #f1f5f9',
                                    borderRadius: 'var(--radius-lg)',
                                    background: 'white',
                                    width: '100%',
                                    textAlign: 'left',
                                    transition: 'all 0.2s',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = cat.color;
                                    e.currentTarget.style.background = `${cat.color}10`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#f1f5f9';
                                    e.currentTarget.style.background = 'white';
                                }}
                            >
                                <div style={{
                                    background: cat.color,
                                    color: 'white',
                                    padding: '0.5rem',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex'
                                }}>
                                    <Icon size={20} />
                                </div>
                                <span style={{ flex: 1, fontWeight: '600' }}>{cat.name}</span>
                                <ChevronRight size={18} color="#94a3b8" />
                            </button>
                        );
                    })}
                </div>

                <div style={{ marginTop: 'auto', padding: '1.5rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                        Toplam {categories.length} ana kategori ve <br /> {products.length || 0}+ ürün sizi bekliyor!
                    </p>
                </div>

                <style>{`
                    @keyframes slideIn {
                        from { transform: translateX(-100%); }
                        to { transform: translateX(0); }
                    }
                `}</style>
            </div>
        </div>
    );
}
