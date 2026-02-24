import React from 'react';
import { Gift, Heart, Watch, Coffee, Shirt, Home } from 'lucide-react';

const categories = [
    { id: 1, name: '🎁 Kişiye Özel', icon: Gift, color: '#667eea' },
    { id: 2, name: '❤️ Sevgiliye Hediye', icon: Heart, color: '#f093fb' },
    { id: 3, name: '⌚ Saat & Aksesuar', icon: Watch, color: '#4facfe' },
    { id: 4, name: '☕ Bardak & Termos', icon: Coffee, color: '#f59e0b' },
    { id: 5, name: '👕 Tekstil', icon: Shirt, color: '#10b981' },
    { id: 6, name: '🏠 Dekoratif', icon: Home, color: '#ec4899' }
];

export function Categories({ onCategorySelect, selectedCategory }) {
    return (
        <div style={{ marginBottom: '3rem' }}>
            <h2 style={{
                textAlign: 'center',
                fontSize: '2rem',
                marginBottom: '2rem',
                color: 'var(--color-secondary)',
                fontWeight: '700'
            }}>
                Popüler Kategoriler
            </h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1.5rem',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.id;
                    return (
                        <button
                            key={category.id}
                            onClick={() => onCategorySelect(category.id)}
                            style={{
                                background: isSelected ? category.color : 'white',
                                color: isSelected ? 'white' : 'var(--color-text)',
                                padding: '1.5rem 1rem',
                                borderRadius: 'var(--radius-lg)',
                                border: isSelected ? 'none' : '2px solid #e2e8f0',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                boxShadow: isSelected ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.75rem',
                                transform: isSelected ? 'translateY(-4px)' : 'translateY(0)'
                            }}
                            onMouseEnter={(e) => {
                                if (!isSelected) {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                    e.currentTarget.style.borderColor = category.color;
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isSelected) {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                }
                            }}
                        >
                            <Icon size={32} color={isSelected ? 'white' : category.color} />
                            <span style={{
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                textAlign: 'center'
                            }}>
                                {category.name}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
