import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export function CartPage({ cartItems, onRemoveFromCart, onUpdateQuantity }) {
    const navigate = useNavigate();

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
        <div style={{ background: '#f8fafc', minHeight: 'calc(100vh - 120px)', padding: '2rem 0 4rem' }}>
            <div className="container">
                {/* Breadcrumb Navigation */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>
                    <Link to="/" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <ArrowLeft size={16} /> Ana Sayfa
                    </Link>
                    <span>/</span>
                    <span style={{ fontWeight: '700', color: '#1e293b' }}>Sepetim</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0 }}>
                        <ShoppingBag size={32} color="var(--color-primary)" /> Sepetim ({groupedItems.reduce((sum, item) => sum + item.quantity, 0)} Ürün)
                    </h1>
                </div>

                {groupedItems.length === 0 ? (
                    /* Empty Cart State */
                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '4rem 2rem',
                        textAlign: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                        maxWidth: '600px',
                        margin: '0 auto',
                        border: '1px solid #f1f5f9'
                    }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            background: '#e0e7ff',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            color: '#4f46e5'
                        }}>
                            <ShoppingBag size={48} />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem' }}>
                            Sepetinizde Henüz Ürün Bulunmuyor
                        </h2>
                        <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
                            Fırsat dolu ürünlerimizi hemen keşfetmeye başlayın ve beğendiklerinizi sepetinize ekleyin!
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="btn btn-primary"
                            style={{
                                padding: '0.85rem 2rem',
                                borderRadius: '30px',
                                fontSize: '1.05rem',
                                fontWeight: '700',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)'
                            }}
                        >
                            Alışverişe Başla <ArrowRight size={20} />
                        </button>
                    </div>
                ) : (
                    /* Cart Content Grid */
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }} className="cart-grid-layout">
                        <style>{`
                            @media (min-width: 992px) {
                                .cart-grid-layout {
                                    grid-template-columns: 1fr 380px !important;
                                }
                            }
                        `}</style>

                        {/* Cart Items List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {/* Free Shipping Progress Card */}
                            <div style={{
                                background: 'white',
                                padding: '1.25rem 1.5rem',
                                borderRadius: '16px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                            }}>
                                <div style={{ fontSize: '0.95rem', fontWeight: '700', color: subtotal >= 500 ? '#166534' : 'var(--color-primary)', marginBottom: '0.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Truck size={20} />
                                        {subtotal >= 500 ? '🎉 Tebrikler! Kargonuz Ücretsiz!' : `🚚 Ücretsiz Kargo (100 TL tasarruf) için ${(500 - subtotal).toFixed(2)} TL kaldı`}
                                    </span>
                                    <span style={{ fontWeight: '800' }}>%{Math.min(100, Math.round((subtotal / 500) * 100))}</span>
                                </div>
                                <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '6px', overflow: 'hidden' }}>
                                    <div style={{
                                        height: '100%',
                                        background: subtotal >= 500 ? '#22c55e' : 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
                                        width: `${Math.min(100, (subtotal / 500) * 100)}%`,
                                        transition: 'width 0.4s ease',
                                        borderRadius: '6px'
                                    }} />
                                </div>
                            </div>

                            {/* Products Box */}
                            <div style={{
                                background: 'white',
                                borderRadius: '16px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                                overflow: 'hidden'
                            }}>
                                {groupedItems.map((item, index) => (
                                    <div key={item.id || index} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '1.25rem 1.5rem',
                                        borderBottom: index < groupedItems.length - 1 ? '1px solid #f1f5f9' : 'none',
                                        gap: '1.25rem',
                                        flexWrap: 'wrap'
                                    }}>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            style={{
                                                width: '90px',
                                                height: '90px',
                                                objectFit: 'cover',
                                                borderRadius: '12px',
                                                border: '1px solid #f1f5f9',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => navigate(`/product/${item.id}`)}
                                        />

                                        <div style={{ flex: '1 1 200px' }}>
                                            <h3
                                                onClick={() => navigate(`/product/${item.id}`)}
                                                style={{ fontSize: '1.05rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.4rem', cursor: 'pointer', lineHeight: '1.4' }}
                                            >
                                                {item.title}
                                            </h3>
                                            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                                Birim Fiyat: <strong style={{ color: '#1e293b' }}>{Number(item.price).toFixed(2)} TL</strong>
                                            </div>
                                        </div>

                                        {/* Quantity Selector */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            background: '#f8fafc',
                                            padding: '0.35rem 0.6rem',
                                            borderRadius: '10px',
                                            border: '1px solid #cbd5e1'
                                        }}>
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, -1)}
                                                style={{
                                                    background: 'white',
                                                    width: '28px',
                                                    height: '28px',
                                                    borderRadius: '6px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: '1px solid #cbd5e1',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span style={{ minWidth: '2.2rem', textAlign: 'center', fontWeight: '800', fontSize: '1rem', color: '#1e293b' }}>
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, 1)}
                                                style={{
                                                    background: 'white',
                                                    width: '28px',
                                                    height: '28px',
                                                    borderRadius: '6px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: '1px solid #cbd5e1',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        {/* Item Total & Remove */}
                                        <div style={{ textAlign: 'right', minWidth: '110px' }}>
                                            <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--color-primary)' }}>
                                                {(Number(item.price || 0) * item.quantity).toFixed(2)} TL
                                            </div>
                                            <button
                                                onClick={() => onRemoveFromCart(item.id)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: '#ef4444',
                                                    fontSize: '0.85rem',
                                                    cursor: 'pointer',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.2rem',
                                                    marginTop: '0.4rem',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                <Trash2 size={15} /> Sil
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Trust badges */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                gap: '1rem',
                                marginTop: '0.5rem'
                            }}>
                                <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <ShieldCheck size={28} color="#4f46e5" />
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>%100 Güvenli Alışveriş</div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>256-Bit SSL Koruması</div>
                                    </div>
                                </div>
                                <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Truck size={28} color="#4f46e5" />
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>Hızlı Kargo</div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Ertesi gün kargoya verilir</div>
                                    </div>
                                </div>
                                <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <RefreshCw size={28} color="#4f46e5" />
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>Kolay İade</div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>14 gün içinde koşulsuz iade</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{
                                background: 'white',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                                position: 'sticky',
                                top: '100px'
                            }}>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                                    Sipariş Özeti
                                </h2>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.95rem', color: '#475569' }}>
                                    <span>Ürün Toplamı ({groupedItems.reduce((sum, item) => sum + item.quantity, 0)} Adet):</span>
                                    <span style={{ fontWeight: '700', color: '#1e293b' }}>{subtotal.toFixed(2)} TL</span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.95rem', color: '#475569' }}>
                                    <span>Kargo Ücreti:</span>
                                    {shippingFee === 0 ? (
                                        <span style={{ color: '#166534', fontWeight: '800' }}>ÜCRETSİZ</span>
                                    ) : (
                                        <span style={{ color: '#ef4444', fontWeight: '700' }}>100.00 TL</span>
                                    )}
                                </div>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    paddingTop: '1rem',
                                    marginTop: '1rem',
                                    borderTop: '2px dashed #e2e8f0',
                                    marginBottom: '1.5rem'
                                }}>
                                    <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1e293b' }}>
                                        Genel Toplam:
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--color-primary)' }}>
                                            {grandTotal.toFixed(2)} TL
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>KDV Dahil</div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="btn btn-primary"
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        fontSize: '1.1rem',
                                        fontWeight: '800',
                                        boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)'
                                    }}
                                >
                                    Alışverişi Tamamla <ArrowRight size={20} />
                                </button>

                                <button
                                    onClick={() => navigate('/')}
                                    style={{
                                        width: '100%',
                                        background: 'none',
                                        border: 'none',
                                        color: '#64748b',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        marginTop: '1rem',
                                        textAlign: 'center'
                                    }}
                                >
                                    &larr; Alışverişe Devam Et
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
