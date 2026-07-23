import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, AlertCircle, ArrowLeft, ExternalLink, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as db from '../lib/supabase';

export function OrderTrackingPage() {
    const [orderId, setOrderId] = useState('');
    const [contact, setContact] = useState('');
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!orderId.trim()) return;

        setIsLoading(true);
        setSearched(true);
        try {
            const allOrders = await db.getAllOrders();
            const cleanId = parseInt(orderId.replace(/\D/g, '')) || parseInt(orderId);
            const found = allOrders.find(o => o.id === cleanId || String(o.id) === orderId.trim());

            setOrder(found || null);
        } catch (err) {
            console.error('Order tracking fetch error:', err);
            setOrder(null);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusStep = (status) => {
        switch (status) {
            case 'preparing':
            case 'completed':
                return 1;
            case 'shipping':
                return 2;
            case 'delivered':
                return 3;
            default:
                return 0;
        }
    };

    const currentStep = order ? getStatusStep(order.status) : 0;

    return (
        <div style={{ background: '#f8fafc', padding: '3rem 0 5rem 0', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: '700', textDecoration: 'none', marginBottom: '1.5rem' }}>
                    <ArrowLeft size={18} /> Ana Sayfaya Dön
                </Link>

                <div style={{ background: 'white', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-md)', textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ width: '60px', height: '60px', background: '#e0e7ff', color: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                        <Truck size={32} />
                    </div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '0 0 0.5rem 0', color: 'var(--color-text)' }}>
                        Sipariş Takibi
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '0 0 1.5rem 0' }}>
                        Sipariş numaranızı girerek kargonuzun nerede olduğunu anlık olarak takip edebilirsiniz.
                    </p>

                    {/* How it works 3-step guide */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', marginBottom: '1.5rem', textAlign: 'left', fontSize: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ background: 'var(--color-primary)', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.75rem', flexShrink: 0 }}>1</span>
                            <span><strong>Sipariş No Girin:</strong> SMS veya e-postanızdaki numarayı yazın.</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ background: 'var(--color-primary)', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.75rem', flexShrink: 0 }}>2</span>
                            <span><strong>Sorgulayın:</strong> "Siparişi Sorgula" butonuna basın.</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ background: 'var(--color-primary)', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.75rem', flexShrink: 0 }}>3</span>
                            <span><strong>Canlı İzleyin:</strong> Kargo durumunu anlık görüntüleyin.</span>
                        </div>
                    </div>

                    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <input
                            type="text"
                            value={orderId}
                            onChange={e => setOrderId(e.target.value)}
                            placeholder="Sipariş No (Örn: #81 veya 81)"
                            required
                            style={{ flex: 1, minWidth: '220px', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                        />
                        <input
                            type="text"
                            value={contact}
                            onChange={e => setContact(e.target.value)}
                            placeholder="Telefon veya E-posta (Opsiyonel)"
                            style={{ flex: 1, minWidth: '220px', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                        />
                        <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Search size={20} /> {isLoading ? 'Sorgulanıyor...' : 'Sorgula'}
                        </button>
                    </form>
                </div>

                {/* Results Section */}
                {searched && (
                    order ? (
                        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <div>
                                    <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>Sipariş #{order.id}</h2>
                                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                                        Tarih: {new Date(order.created_at).toLocaleDateString('tr-TR')} • Toplam: <strong>{order.total} TL</strong>
                                    </div>
                                </div>
                                <div style={{
                                    background: order.status === 'delivered' ? '#dcfce7' : order.status === 'shipping' ? '#dbeafe' : '#fff7ed',
                                    color: order.status === 'delivered' ? '#166534' : order.status === 'shipping' ? '#1e40af' : '#c2410c',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    fontWeight: '800',
                                    fontSize: '0.9rem'
                                }}>
                                    {order.status === 'preparing' || order.status === 'completed' ? '⏳ Siparişiniz Hazırlanıyor' : order.status === 'shipping' ? '🚚 Kargoda' : order.status === 'delivered' ? '✅ Teslim Edildi' : 'İptal Edildi'}
                                </div>
                            </div>

                            {/* Timeline Tracker */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', margin: '2.5rem 1rem' }}>
                                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '4px', background: '#e2e8f0', zIndex: 1, transform: 'translateY(-50%)' }}></div>
                                <div style={{ position: 'absolute', top: '50%', left: 0, width: currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : currentStep === 3 ? '100%' : '0%', height: '4px', background: 'var(--color-primary)', zIndex: 1, transform: 'translateY(-50%)', transition: 'width 0.4s ease' }}></div>

                                {[
                                    { title: 'Alındı', icon: Package, step: 0 },
                                    { title: 'Hazırlanıyor', icon: Clock, step: 1 },
                                    { title: 'Kargoda', icon: Truck, step: 2 },
                                    { title: 'Teslim Edildi', icon: CheckCircle2, step: 3 }
                                ].map((item, idx) => {
                                    const Icon = item.icon;
                                    const isActive = currentStep >= item.step;
                                    return (
                                        <div key={idx} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{
                                                width: '44px',
                                                height: '44px',
                                                borderRadius: '50%',
                                                background: isActive ? 'var(--color-primary)' : 'white',
                                                color: isActive ? 'white' : '#94a3b8',
                                                border: isActive ? 'none' : '2px solid #cbd5e1',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: isActive ? '0 4px 10px rgba(79, 70, 229, 0.3)' : 'none'
                                            }}>
                                                <Icon size={20} />
                                            </div>
                                            <span style={{ fontSize: '0.8rem', fontWeight: isActive ? '800' : '600', color: isActive ? 'var(--color-text)' : '#94a3b8' }}>
                                                {item.title}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Gift Note Badge if Present */}
                            {order.is_gift_wrap && (
                                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <Gift size={22} color="#ef4444" style={{ flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontWeight: '700', color: '#991b1b', fontSize: '0.9rem' }}>🎁 Hediye Paketi Talebi Mevcut</div>
                                        {order.gift_note && (
                                            <div style={{ fontSize: '0.85rem', color: '#7f1d1d', fontStyle: 'italic', marginTop: '0.25rem' }}>
                                                Hediye Notu: "{order.gift_note}"
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Cargo Tracking Info */}
                            {order.cargo_company && order.tracking_code && (
                                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', color: '#1e40af' }}>Kargo Firması: <strong>{order.cargo_company}</strong></div>
                                        <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1e3a8a', marginTop: '0.2rem' }}>Takip Kodu: {order.tracking_code}</div>
                                    </div>
                                    <a
                                        href={`https://www.google.com/search?q=${encodeURIComponent(order.cargo_company + ' kargo takip ' + order.tracking_code)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-primary"
                                        style={{ fontSize: '0.85rem', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                                    >
                                        <ExternalLink size={16} /> Kargo Takip Et
                                    </a>
                                </div>
                            )}

                            {/* Order Items List */}
                            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>Sipariş Edilen Ürünler ({order.order_items?.length || 0})</h3>
                            <div style={{ display: 'grid', gap: '0.75rem' }}>
                                {order.order_items?.map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#f8fafc', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                                        {item.products?.image && (
                                            <img src={item.products.image} alt="" style={{ width: '50px', height: '50px', borderRadius: '6px', objectFit: 'cover' }} />
                                        )}
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{item.products?.title || 'Ürün'}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Adet: {item.quantity} x {item.price} TL</div>
                                        </div>
                                        <div style={{ fontWeight: '800', color: 'var(--color-primary)' }}>
                                            {(item.quantity * item.price).toFixed(2)} TL
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div style={{ background: 'white', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0', textAlign: 'center', color: '#64748b' }}>
                            <AlertCircle size={40} color="#ef4444" style={{ marginBottom: '0.5rem' }} />
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text)', margin: '0 0 0.5rem 0' }}>Sipariş Bulunamadı</h3>
                            <p style={{ margin: 0 }}>Girdiğiniz sipariş numarasıyla eşleşen bir kayıt bulunamadı. Lütfen numarayı kontrol edip tekrar deneyin.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
