import React from 'react';
import { TrendingUp, Star, DollarSign, Clock } from 'lucide-react';

const SORT_OPTIONS = [
    { id: 'popular', label: 'Popülerlik', icon: TrendingUp },
    { id: 'price-low', label: 'Fiyat: Düşük → Yüksek', icon: DollarSign },
    { id: 'price-high', label: 'Fiyat: Yüksek → Düşük', icon: DollarSign },
    { id: 'newest', label: 'En Yeni', icon: Clock },
    { id: 'rating', label: 'En Yüksek Puan', icon: Star }
];

export function ProductFilters({
    onSortChange,
    currentSort,
    priceRange,
    onPriceRangeChange,
    minPrice = 0,
    maxPrice = 1000
}) {
    return (
        <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '2rem'
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem'
            }}>
                {/* Sort Dropdown */}
                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        color: 'var(--color-secondary)'
                    }}>
                        Sıralama
                    </label>
                    <select
                        value={currentSort}
                        onChange={(e) => onSortChange(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #cbd5e1',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.9rem',
                            background: 'white',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                    >
                        {SORT_OPTIONS.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price Range */}
                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        color: 'var(--color-secondary)'
                    }}>
                        Fiyat Aralığı: {priceRange[0]} - {priceRange[1]} TL
                    </label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={priceRange[0]}
                            onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                            style={{
                                flex: 1,
                                accentColor: 'var(--color-primary)'
                            }}
                        />
                        <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={priceRange[1]}
                            onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                            style={{
                                flex: 1,
                                accentColor: 'var(--color-primary)'
                            }}
                        />
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '0.5rem',
                        fontSize: '0.85rem',
                        color: 'var(--color-text-light)'
                    }}>
                        <span>{minPrice} TL</span>
                        <span>{maxPrice} TL</span>
                    </div>
                </div>

                {/* Quick Filters */}
                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        color: 'var(--color-secondary)'
                    }}>
                        Hızlı Filtreler
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => onPriceRangeChange([0, 200])}
                            style={{
                                padding: '0.5rem 0.75rem',
                                background: priceRange[0] === 0 && priceRange[1] === 200 ? 'var(--color-primary)' : 'var(--color-bg)',
                                color: priceRange[0] === 0 && priceRange[1] === 200 ? 'white' : 'var(--color-text)',
                                border: 'none',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            0-200 TL
                        </button>
                        <button
                            onClick={() => onPriceRangeChange([200, 500])}
                            style={{
                                padding: '0.5rem 0.75rem',
                                background: priceRange[0] === 200 && priceRange[1] === 500 ? 'var(--color-primary)' : 'var(--color-bg)',
                                color: priceRange[0] === 200 && priceRange[1] === 500 ? 'white' : 'var(--color-text)',
                                border: 'none',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            200-500 TL
                        </button>
                        <button
                            onClick={() => onPriceRangeChange([500, 1000])}
                            style={{
                                padding: '0.5rem 0.75rem',
                                background: priceRange[0] === 500 && priceRange[1] === 1000 ? 'var(--color-primary)' : 'var(--color-bg)',
                                color: priceRange[0] === 500 && priceRange[1] === 1000 ? 'white' : 'var(--color-text)',
                                border: 'none',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            500+ TL
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
