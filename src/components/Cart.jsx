import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export function Cart({ isOpen, onClose, cartItems, onRemoveFromCart, onUpdateQuantity, onCheckout }) {
    React.useEffect(() => {
        if (isOpen) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // Group items by product id and sum quantities
    const groupedItems = cartItems.reduce((acc, item) => {
        const existing = acc.find(i => i.id === item.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            acc.push({ ...item, quantity: 1 });
        }
        return acc;
    }, []);

    const subtotal = groupedItems.reduce((sum, item) => sum + (Number(item.price || 0) * item.quantity), 0);
    const shippingFee = subtotal >= 500 ? 0 : 100;
    const grandTotal = subtotal + shippingFee;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ShoppingBag size={24} />
                        Sepetim
                    </h2>
                    <button onClick={onClose} style={{ background: 'none' }}><X /></button>
                </div>

                {groupedItems.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                        <ShoppingBag size={64} color="var(--color-text-light)" style={{ opacity: 0.3, margin: '0 auto 1rem' }} />
                        <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem' }}>
                            Sepetiniz boş.
                        </p>
                        <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                            Hemen alışverişe başlayın! 🛍️
                        </p>
                    </div>
                ) : (
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {groupedItems.map((item, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem',
                                borderBottom: '1px solid #e2e8f0',
                                gap: '1rem'
                            }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1 }}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            objectFit: 'cover',
                                            borderRadius: 'var(--radius-md)'
                                        }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{item.title}</div>
                                        <div style={{ color: 'var(--color-primary)', fontWeight: '700' }}>
                                            {item.price} TL
                                        </div>
                                    </div>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: 'var(--color-bg)',
                                    padding: '0.25rem',
                                    borderRadius: 'var(--radius-md)'
                                }}>
                                    <button
                                        onClick={() => onUpdateQuantity(item.id, -1)}
                                        style={{
                                            background: 'white',
                                            padding: '0.25rem',
                                            borderRadius: 'var(--radius-sm)',
                                            display: 'flex',
                                            border: '1px solid #e2e8f0'
                                        }}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span style={{
                                        minWidth: '2rem',
                                        textAlign: 'center',
                                        fontWeight: '600'
                                    }}>
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => onUpdateQuantity(item.id, 1)}
                                        style={{
                                            background: 'white',
                                            padding: '0.25rem',
                                            borderRadius: 'var(--radius-sm)',
                                            display: 'flex',
                                            border: '1px solid #e2e8f0'
                                        }}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <button
                                    className="remove-btn"
                                    onClick={() => onRemoveFromCart(item.id)}
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {groupedItems.length > 0 && (
                    <div style={{
                        marginTop: '1.5rem',
                        borderTop: '2px solid #e2e8f0',
                        paddingTop: '1rem'
                    }}>
                        {/* Free Shipping Progress Bar */}
                        <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: subtotal >= 500 ? '#166534' : 'var(--color-primary)', marginBottom: '0.4rem', display: 'flex', justifyContent: 'space-between' }}>
                                <span>{subtotal >= 500 ? '🎉 Tebrikler! Kargo Ücretsiz!' : `🚚 Ücretsiz Kargo (100 TL tasarruf) için ${(500 - subtotal).toFixed(2)} TL kaldı`}</span>
                                <span>{Math.min(100, Math.round((subtotal / 500) * 100))}%</span>
                            </div>
                            <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{
                                    height: '100%',
                                    background: subtotal >= 500 ? '#22c55e' : 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
                                    width: `${Math.min(100, (subtotal / 500) * 100)}%`,
                                    transition: 'width 0.4s ease'
                                }} />
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '0.6rem',
                            fontSize: '0.9rem',
                            color: 'var(--color-text-light)'
                        }}>
                            <span>Ara Toplam:</span>
                            <span>{subtotal.toFixed(2)} TL</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '0.6rem',
                            fontSize: '0.9rem',
                            color: 'var(--color-text-light)'
                        }}>
                            <span>Kargo Ücreti:</span>
                            {shippingFee === 0 ? (
                                <span style={{ color: 'var(--color-success)', fontWeight: '700' }}>Ücretsiz</span>
                            ) : (
                                <span style={{ color: '#ef4444', fontWeight: '700' }}>100.00 TL</span>
                            )}
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingTop: '0.75rem',
                            borderTop: '1px solid #e2e8f0',
                            marginBottom: '1rem'
                        }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                Toplam:
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                {grandTotal.toFixed(2)} TL
                            </div>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={onCheckout}
                            style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
                        >
                            Siparişi Tamamla
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

