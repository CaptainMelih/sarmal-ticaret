import React from 'react';
import { Zap, Gift, Star, Truck, Sparkles, Instagram } from 'lucide-react';

const STORIES = [
    {
        id: 1,
        title: 'Flaş Fırsat',
        icon: Zap,
        color: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)',
        action: 'flash'
    },
    {
        id: 2,
        title: 'Hediye Rehberi',
        icon: Gift,
        color: 'linear-gradient(135deg, #a855f7 0%, #c084fc 100%)',
        action: 'gift'
    },
    {
        id: 3,
        title: 'Yorumlar',
        icon: Star,
        color: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
        action: 'reviews'
    },
    {
        id: 4,
        title: 'Ertesi Gün Kargo',
        icon: Truck,
        color: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        action: 'cargo'
    },
    {
        id: 5,
        title: 'Öne Çıkanlar',
        icon: Sparkles,
        color: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
        action: 'featured'
    },
    {
        id: 6,
        title: 'Instagram',
        icon: Instagram,
        color: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
        action: 'instagram',
        url: 'https://www.instagram.com/sarmalticaret/'
    }
];

export function InstagramStories({ onOpenFlashDeals, onCategorySelect }) {
    const handleStoryClick = (story) => {
        if (story.url) {
            window.open(story.url, '_blank');
        } else if (story.action === 'flash') {
            onOpenFlashDeals();
        } else if (story.action === 'gift') {
            onCategorySelect(1);
        } else if (story.action === 'reviews' || story.action === 'featured' || story.action === 'cargo') {
            const anchor = document.getElementById('product-section-anchor');
            if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div style={{ background: 'white', padding: '1.25rem 0', borderBottom: '1px solid #f1f5f9' }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    gap: '1.5rem',
                    overflowX: 'auto',
                    paddingBottom: '0.5rem',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}>
                    {STORIES.map(story => {
                        const Icon = story.icon;
                        return (
                            <div
                                key={story.id}
                                onClick={() => handleStoryClick(story)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    cursor: 'pointer',
                                    flexShrink: 0
                                }}
                            >
                                <div style={{
                                    width: '68px',
                                    height: '68px',
                                    borderRadius: '50%',
                                    padding: '3px',
                                    background: story.color,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                    transition: 'transform 0.2s ease'
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '50%',
                                        background: 'white',
                                        padding: '2px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '50%',
                                            background: story.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}>
                                            <Icon size={26} />
                                        </div>
                                    </div>
                                </div>
                                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#334155', textAlign: 'center', maxWidth: '75px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {story.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
