import React, { useState, useEffect } from 'react';
import { X, LayoutDashboard, ShoppingBag, Package, Trash2, Edit2, CheckCircle, Clock, Truck, TrendingUp, AlertCircle, MapPin, Phone, Mail, FileText, Ticket, Star, Image as ImageIcon, Plus, Percent, Users, MessageSquare, Gift } from 'lucide-react';
import * as db from '../lib/supabase';

export function AdminPanel({ onRefreshProducts, onEditProduct }) {
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isAddingCoupon, setIsAddingCoupon] = useState(false);
    const [trackingInfo, setTrackingInfo] = useState({ carrier: '', tracking_code: '' });
    const [isShippingDialogOpen, setIsShippingDialogOpen] = useState(false);
    const [newCoupon, setNewCoupon] = useState({
        code: '',
        discount_type: 'percentage',
        discount_amount: '',
        min_purchase: 0,
        usage_limit: ''
    });

    const [stats, setStats] = useState({
        totalSales: 0,
        orderCount: 0,
        outOfStock: 0,
        activeUsers: 0
    });

    const statusNext = {
        'preparing': 'shipping',
        'completed': 'shipping',
        'shipping': 'delivered',
        'delivered': 'delivered'
    };

    const statusLabels = {
        'preparing': 'Hazırlanıyor',
        'completed': 'Hazırlanıyor',
        'shipping': 'Kargoda',
        'delivered': 'Teslim Edildi',
        'cancelled': 'İptal Edildi'
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    useEffect(() => {
        if (activeTab === 'coupons') fetchCoupons();
        if (activeTab === 'reviews') fetchReviews();
    }, [activeTab]);

    const fetchReviews = async () => {
        try {
            const data = await db.getAllReviews();
            setReviews(data);
        } catch (err) {
            console.error('Fetch admin reviews error:', err);
        }
    };

    const fetchAdminData = async () => {
        setIsLoading(true);
        try {
            const [allOrdersResult, allProductsResult, profileCountResult, allProfilesResult] = await Promise.allSettled([
                db.getAllOrders(),
                db.getProducts(),
                db.getProfileCount(),
                db.getAllProfiles()
            ]);
            
            const allOrders = allOrdersResult.status === 'fulfilled' ? allOrdersResult.value : [];
            const allProducts = allProductsResult.status === 'fulfilled' ? allProductsResult.value : [];
            const activeUsersCount = profileCountResult.status === 'fulfilled' ? profileCountResult.value : 0;
            const allProfiles = allProfilesResult.status === 'fulfilled' ? allProfilesResult.value : [];
            
            if (allOrdersResult.status === 'rejected') console.error('Orders failed:', allOrdersResult.reason);
            if (allProductsResult.status === 'rejected') console.error('Products failed:', allProductsResult.reason);
            if (allProfilesResult.status === 'rejected') console.error('Profiles failed:', allProfilesResult.reason);

            setOrders(allOrders);
            setProducts(allProducts);
            setCustomers(allProfiles);

            const total = allOrders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? Number(o.total) : 0), 0);
            const lowStock = allProducts.filter(p => p.stock <= 0).length;

            setStats({
                totalSales: total,
                orderCount: allOrders.length,
                outOfStock: lowStock,
                activeUsers: activeUsersCount
            });
        } catch (err) {
            console.error('Admin data fetch error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCoupons = async () => {
        try {
            const data = await db.getCoupons();
            setCoupons(data);
        } catch (err) {
            console.error('Coupons fetch error:', err);
        }
    };

    const handleUpdateStatus = async (orderId, newStatus, additionalChanges = {}) => {
        try {
            await db.updateOrderStatus(orderId, newStatus, additionalChanges);
            setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus, ...additionalChanges } : o));
            if (selectedOrder && selectedOrder.id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus, ...additionalChanges });
            }
        } catch (err) {
            alert('Durum güncellenemedi: ' + err.message);
        }
    };

    const handleAdvanceStatus = async (order) => {
        if (order.status === 'preparing') {
            setTrackingInfo({ carrier: '', tracking_code: '' });
            setIsShippingDialogOpen(true);
            return;
        }

        const next = statusNext[order.status];
        if (next && next !== order.status) {
            await handleUpdateStatus(order.id, next);
        }
    };

    const submitShippingInfo = async () => {
        if (!selectedOrder) return;
        await handleUpdateStatus(selectedOrder.id, 'shipping', {
            tracking_code: trackingInfo.tracking_code,
            cargo_company: trackingInfo.carrier
        });
        setIsShippingDialogOpen(false);
    };

    const handleDeleteProduct = async (productId) => {
        if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
        try {
            await db.deleteProduct(productId);
            setProducts(products.filter(p => p.id !== productId));
            onRefreshProducts();
        } catch (err) {
            alert('Ürün silinemedi: ' + err.message);
        }
    };

    const handleAddCoupon = async (e) => {
        e.preventDefault();
        try {
            await db.addCoupon({
                ...newCoupon,
                discount_amount: Number(newCoupon.discount_amount),
                min_purchase: Number(newCoupon.min_purchase),
                usage_limit: newCoupon.usage_limit ? Number(newCoupon.usage_limit) : null
            });
            setIsAddingCoupon(false);
            setNewCoupon({ code: '', discount_type: 'percentage', discount_amount: '', min_purchase: 0, usage_limit: '' });
            fetchCoupons();
        } catch (err) {
            alert('Kupon eklenemedi: ' + err.message);
        }
    };

    const toggleCouponStatus = async (couponId, currentStatus) => {
        try {
            await db.updateCoupon(couponId, { is_active: !currentStatus });
            fetchCoupons();
        } catch (err) {
            alert('Durum güncellenemedi');
        }
    };

    function StatCard({ title, value, icon, trend }) {
        return (
            <div style={{ background: 'white', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: '#f8fafc' }}>{icon}</div>
                <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>{title}</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{value}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 0', minHeight: '70vh' }}>
            <div
                style={{ 
                    background: 'var(--color-surface)', 
                    borderRadius: 'var(--radius-lg)', 
                    boxShadow: 'var(--shadow-md)', 
                    padding: '2rem', 
                    display: 'flex', 
                    flexDirection: 'column' 
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ background: 'var(--color-primary)', color: 'white', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
                            <LayoutDashboard size={24} />
                        </div>
                        <h2 style={{ margin: 0 }}>Yönetim Paneli</h2>
                    </div>
                </div>

                <div style={{ display: 'flex', flexShrink: 0, gap: '0.5rem', marginBottom: '2rem', background: 'var(--color-bg)', padding: '0.5rem', borderRadius: 'var(--radius-lg)', overflowX: 'auto' }}>
                    {[
                        { id: 'dashboard', label: 'Genel Bakış', icon: TrendingUp },
                        { id: 'orders', label: 'Siparişler', icon: ShoppingBag },
                        { id: 'products', label: 'Ürünler', icon: Package },
                        { id: 'coupons', label: 'Kuponlar', icon: Ticket },
                        { id: 'customers', label: 'Müşteriler', icon: Users },
                        { id: 'reviews', label: 'Yorumlar', icon: MessageSquare }
                    ].map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    flex: 1,
                                    minWidth: '120px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-md)',
                                    background: activeTab === tab.id ? 'white' : 'transparent',
                                    color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-light)',
                                    boxShadow: activeTab === tab.id ? 'var(--shadow-sm)' : 'none',
                                    border: 'none',
                                    fontWeight: '600',
                                    transition: 'all 0.2s',
                                    cursor: 'pointer'
                                }}
                            >
                                <Icon size={18} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
                    {activeTab === 'dashboard' && (
                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                                <StatCard title="Toplam Satış" value={stats.totalSales.toFixed(2) + ' TL'} icon={<TrendingUp color="#10b981" />} />
                                <StatCard title="Toplam Sipariş" value={stats.orderCount} icon={<ShoppingBag color="#6366f1" />} />
                                <StatCard title="Stokta Kalmayan" value={stats.outOfStock} icon={<AlertCircle color="#ef4444" />} trend="danger" />
                                <StatCard title="Aktif Müşteri" value={stats.activeUsers} icon={<Package color="#f59e0b" />} />
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444' }}>
                                    <AlertCircle size={20} /> Kritik Stok Uyarıları
                                </h3>
                                <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                                    {products.filter(p => p.stock < 5).length === 0 ? (
                                        <p style={{ color: 'var(--color-text-light)' }}>Şu an kritik stokta ürün bulunmuyor.</p>
                                    ) : (
                                        products.filter(p => p.stock < 5).map(p => (
                                            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: 'var(--radius-lg)' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <img src={p.image} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                                                    <div>
                                                        <div style={{ fontWeight: '600' }}>{p.title}</div>
                                                        <div style={{ fontSize: '0.8rem', color: '#b91c1c' }}>Sadece {p.stock} adet kaldı!</div>
                                                    </div>
                                                </div>
                                                <button className="btn btn-outline" style={{ fontSize: '0.8rem' }} onClick={() => onEditProduct(p)}>Stok Güncelle</button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                                    <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-text)' }}>🔥 En Çok Satan Ürünler</h3>
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        {(() => {
                                            const counts = {};
                                            orders.forEach(order => {
                                                if (order.status !== 'cancelled' && order.order_items) {
                                                    order.order_items.forEach(item => {
                                                        const pId = item.product_id;
                                                        const pTitle = item.products?.title || 'Bilinmeyen Ürün';
                                                        const pImage = item.products?.image;
                                                        if (!counts[pId]) {
                                                            counts[pId] = { title: pTitle, image: pImage, count: 0, totalSales: 0 };
                                                        }
                                                        counts[pId].count += item.quantity;
                                                        counts[pId].totalSales += (item.quantity * item.price);
                                                    });
                                                }
                                            });
                                            const topSelling = Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 5);

                                            if (topSelling.length === 0) {
                                                return <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>Henüz yeterli satış verisi bulunmuyor.</p>;
                                            }

                                            const maxCount = Math.max(...topSelling.map(item => item.count)) || 1;
                                            return topSelling.map((p, idx) => {
                                                const pct = (p.count / maxCount) * 100;
                                                return (
                                                    <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                                        {p.image && <img src={p.image} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />}
                                                        <div style={{ flex: 1 }}>
                                                            <div style={{ fontSize: '0.85rem', fontWeight: '600', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '200px' }} title={p.title}>{p.title}</div>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                                                                <div style={{ flex: 1, height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                                                                    <div style={{ width: `${pct}%`, height: '100%', background: 'var(--color-primary)', borderRadius: '3px' }}></div>
                                                                </div>
                                                                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-text-light)', minWidth: '45px', textAlign: 'right' }}>{p.count} adet</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            });
                                        })()}
                                    </div>
                                </div>

                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                                    <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-text)' }}>📊 Aylık Satış Dağılımı</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '160px', paddingTop: '1rem', borderBottom: '2px solid #e2e8f0' }}>
                                        {(() => {
                                            const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
                                            const monthlySales = Array(12).fill(0);
                                            orders.forEach(o => {
                                                if (o.status !== 'cancelled') {
                                                    const m = new Date(o.created_at).getMonth();
                                                    monthlySales[m] += Number(o.total);
                                                }
                                            });
                                            const maxSales = Math.max(...monthlySales) || 1;
                                            const currentMonth = new Date().getMonth();
                                            const showMonths = [];
                                            for (let i = 5; i >= 0; i--) {
                                                const mIdx = (currentMonth - i + 12) % 12;
                                                showMonths.push({ name: months[mIdx], value: monthlySales[mIdx] });
                                            }

                                            return showMonths.map((m, idx) => {
                                                const pct = (m.value / maxSales) * 80 + 5;
                                                return (
                                                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '0.5rem' }}>
                                                        <div style={{ fontSize: '0.65rem', fontWeight: '700', color: 'var(--color-primary)' }}>{m.value > 0 ? `${Math.round(m.value)}₺` : ''}</div>
                                                        <div style={{
                                                            width: '24px',
                                                            height: `${m.value > 0 ? pct : 2}px`,
                                                            background: m.value > 0 ? 'linear-gradient(to top, var(--color-primary), #818cf8)' : '#e2e8f0',
                                                            borderRadius: '4px 4px 0 0',
                                                            transition: 'height 0.3s ease'
                                                        }} title={`${m.name}: ${m.value.toFixed(2)} TL`}></div>
                                                        <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-text-light)' }}>{m.name}</div>
                                                    </div>
                                                );
                                            });
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {isLoading ? <p>Yükleniyor...</p> : orders.length === 0 ? <p>Sipariş bulunmuyor.</p> : orders.map(order => (
                                <div key={order.id} style={{ border: '1px solid #e2e8f0', borderRadius: 'var(--radius-lg)', padding: '1.25rem', background: 'white', transition: 'all 0.2s' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                                        <div>
                                            <div style={{ fontWeight: '700', fontSize: '1rem' }}>Sipariş #{order.id.toString().slice(0, 8)}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                                                {new Date(order.created_at).toLocaleString('tr-TR')} • {order.profiles?.name}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="btn btn-outline"
                                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                                            >
                                                Detaylar
                                            </button>
                                            {order.status !== 'delivered' && order.status !== 'cancelled' && (
                                                <button
                                                    onClick={() => handleAdvanceStatus(order)}
                                                    className="btn btn-primary"
                                                    style={{
                                                        padding: '0.4rem 0.8rem',
                                                        fontSize: '0.85rem',
                                                        background: order.status === 'preparing' ? '#3b82f6' : '#10b981'
                                                    }}
                                                >
                                                    {order.status === 'preparing' ? 'Kargoya Ver' : 'Teslim Et'}
                                                </button>
                                            )}
                                            {order.payment_method === 'transfer' && order.payment_status !== 'paid' && (
                                                <button
                                                    onClick={async () => {
                                                        if (confirm('Bu siparişin Havale/EFT ödemesini onaylıyor musunuz?')) {
                                                            await handleUpdateStatus(order.id, 'preparing', { payment_status: 'paid' });
                                                        }
                                                    }}
                                                    className="btn"
                                                    style={{
                                                        padding: '0.4rem 0.8rem',
                                                        fontSize: '0.85rem',
                                                        background: '#10b981',
                                                        color: 'white',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        borderRadius: 'var(--radius-md)',
                                                        fontWeight: '600'
                                                    }}
                                                >
                                                    Ödemeyi Onayla
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <div style={{
                                                fontSize: '0.75rem',
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '20px',
                                                background: order.status === 'delivered' ? '#dcfce7' : order.status === 'shipping' ? '#dbeafe' : '#fef3c7',
                                                color: order.status === 'delivered' ? '#166534' : order.status === 'shipping' ? '#1e40af' : '#92400e',
                                                fontWeight: '700'
                                            }}>
                                                {statusLabels[order.status]}
                                            </div>
                                            <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{Number(order.total).toFixed(2)} TL</div>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                                            {order.order_items?.length} Ürün {order.coupon_code && <span style={{ color: 'var(--color-primary)' }}>🏷️ {order.coupon_code}</span>}
                                        </div>
                                    </div>

                                    {/* Wire Transfer Details on List */}
                                    {order.payment_method === 'transfer' && (
                                        <div style={{
                                            marginTop: '0.75rem',
                                            padding: '0.75rem',
                                            background: '#f8fafc',
                                            border: '1px dashed #cbd5e1',
                                            borderRadius: 'var(--radius-md)',
                                            fontSize: '0.85rem'
                                        }}>
                                            <strong>💰 Havale Ödemesi: </strong>
                                            {order.payment_status === 'paid' ? (
                                                <span style={{ color: '#10b981', fontWeight: 'bold' }}>Ödeme Onaylandı ✅</span>
                                            ) : order.payment_status === 'notification_sent' ? (
                                                <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>
                                                    Bildirim Geldi! ⚠️ (Gönderen: {order.transfer_sender} - {order.transfer_bank})
                                                </span>
                                            ) : (
                                                <span style={{ color: '#f59e0b' }}>Ödeme Bekleniyor ⏳</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ margin: 0 }}>Ürün Yönetimi ({products.length})</h3>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => document.getElementById('add-product-trigger')?.click()}
                                    style={{ padding: '0.5rem 1rem' }}
                                >
                                    <Package size={18} /> Yeni Ürün Ekle
                                </button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
                                {products.map(product => (
                                    <div key={product.id} style={{ display: 'flex', gap: '1rem', background: 'white', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0', position: 'relative' }}>
                                        {product.stock < 5 && (
                                            <div title="Düşük Stok!" style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: 'white', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', zIndex: 1 }}>!</div>
                                        )}
                                        <img src={product.image} style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ margin: 0, fontSize: '1rem', marginBottom: '0.5rem' }}>{product.title}</h4>
                                            
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                                                <span style={{ fontSize: '0.85rem', width: '35px' }}>Fiyat:</span>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    defaultValue={product.price}
                                                    onBlur={async (e) => {
                                                        const newPrice = parseFloat(e.target.value);
                                                        if (newPrice !== product.price && !isNaN(newPrice)) {
                                                            try {
                                                                await db.updateProduct(product.id, { price: newPrice });
                                                                onRefreshProducts();
                                                            } catch (err) {
                                                                alert('Fiyat güncellenemedi');
                                                            }
                                                        }
                                                    }}
                                                    style={{ width: '80px', padding: '0.2rem 0.4rem', fontSize: '0.85rem', borderRadius: '4px', border: '1px solid #ddd', fontWeight: '700', color: 'var(--color-primary)' }}
                                                />
                                                <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>TL</span>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                                                <span style={{ fontSize: '0.85rem', width: '35px' }}>Stok:</span>
                                                <input
                                                    type="number"
                                                    defaultValue={product.stock}
                                                    onBlur={async (e) => {
                                                        const newStock = parseInt(e.target.value);
                                                        if (newStock !== product.stock && !isNaN(newStock)) {
                                                            try {
                                                                await db.updateProduct(product.id, { stock: newStock });
                                                                onRefreshProducts();
                                                            } catch (err) {
                                                                alert('Stok güncellenemedi');
                                                            }
                                                        }
                                                    }}
                                                    style={{ width: '80px', padding: '0.2rem 0.4rem', fontSize: '0.85rem', borderRadius: '4px', border: product.stock < 5 ? '1px solid #ef4444' : '1px solid #ddd', background: product.stock < 5 ? '#fef2f2' : 'white' }}
                                                />
                                            </div>

                                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                                <button
                                                    className="btn btn-outline"
                                                    onClick={() => onEditProduct(product)}
                                                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', flex: 1 }}
                                                >
                                                    <Edit2 size={14} /> Düzenle
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="btn btn-outline"
                                                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', color: 'var(--color-danger)' }}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'coupons' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ margin: 0 }}>Kupon Yönetimi</h3>
                                <button className="btn btn-primary" onClick={() => setIsAddingCoupon(true)}>
                                    <Plus size={18} /> Yeni Kupon
                                </button>
                            </div>

                            {isAddingCoupon && (
                                <form onSubmit={handleAddCoupon} style={{ background: 'var(--color-bg)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem', border: '1px solid #e2e8f0' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                        <div className="form-group">
                                            <label>Kupon Kodu</label>
                                            <input type="text" placeholder="ORN: INDIRIM10" value={newCoupon.code} onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })} required />
                                        </div>
                                        <div className="form-group">
                                            <label>İndirim Tipi</label>
                                            <select value={newCoupon.discount_type} onChange={e => setNewCoupon({ ...newCoupon, discount_type: e.target.value })}>
                                                <option value="percentage">Yüzde (%)</option>
                                                <option value="fixed">Sabit (TL)</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Miktar</label>
                                            <input type="number" value={newCoupon.discount_amount} onChange={e => setNewCoupon({ ...newCoupon, discount_amount: e.target.value })} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Min. Harcama (TL)</label>
                                            <input type="number" value={newCoupon.min_purchase} onChange={e => setNewCoupon({ ...newCoupon, min_purchase: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>Kullanım Limiti</label>
                                            <input type="number" value={newCoupon.usage_limit} onChange={e => setNewCoupon({ ...newCoupon, usage_limit: e.target.value })} placeholder="Sınırsız için boş bırakın" />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                        <button type="button" className="btn btn-outline" onClick={() => setIsAddingCoupon(false)}>İptal</button>
                                        <button type="submit" className="btn btn-primary">Kuponu Oluştur</button>
                                    </div>
                                </form>
                            )}

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                                {coupons.map(coupon => (
                                    <div key={coupon.id} style={{ background: 'white', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0', position: 'relative', opacity: coupon.is_active ? 1 : 0.6 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                            <div>
                                                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-primary)', letterSpacing: '1px' }}>{coupon.code}</div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                                                    {coupon.discount_type === 'percentage' ? `%${coupon.discount_amount} İndirim` : `${coupon.discount_amount} TL İndirim`}
                                                </div>
                                            </div>
                                            <div style={{ background: coupon.is_active ? '#dcfce7' : '#f1f5f9', color: coupon.is_active ? '#166534' : '#64748b', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '700' }}>
                                                {coupon.is_active ? 'Aktif' : 'Pasif'}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', marginBottom: '1rem' }}>
                                            <div>Min. Harcama: {coupon.min_purchase} TL</div>
                                            <div>Kullanım: {coupon.times_used} / {coupon.usage_limit || '∞'}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button className="btn btn-outline" style={{ flex: 1, fontSize: '0.8rem' }} onClick={() => toggleCouponStatus(coupon.id, coupon.is_active)}>
                                                {coupon.is_active ? 'Pasif Yap' : 'Aktif Yap'}
                                            </button>
                                            <button className="btn btn-outline" style={{ color: 'var(--color-danger)', border: '1px solid #fee2e2' }} onClick={async () => { if (confirm('Silsin mi?')) { await db.deleteCoupon(coupon.id); fetchCoupons(); } }}>
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'customers' && (
                        <div>
                            <h3 style={{ marginBottom: '1.5rem' }}>Müşteri Listesi ({customers.length})</h3>
                            <div style={{ overflowX: 'auto', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                            <th style={{ padding: '1rem' }}>Ad Soyad</th>
                                            <th style={{ padding: '1rem' }}>E-posta</th>
                                            <th style={{ padding: '1rem' }}>Telefon</th>
                                            <th style={{ padding: '1rem' }}>Kayıt Tarihi</th>
                                            <th style={{ padding: '1rem' }}>Sipariş Adeti</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.map(c => {
                                            const userOrdersCount = orders.filter(o => o.user_id === c.id).length;
                                            return (
                                                <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                    <td style={{ padding: '1rem', fontWeight: '600' }}>{c.name || 'Belirtilmemiş'}</td>
                                                    <td style={{ padding: '1rem', color: '#475569' }}>{c.email}</td>
                                                    <td style={{ padding: '1rem', color: '#475569' }}>{c.phone || 'Belirtilmemiş'}</td>
                                                    <td style={{ padding: '1rem', color: 'var(--color-text-light)' }}>{c.created_at ? new Date(c.created_at).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}</td>
                                                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>
                                                        <span style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                                            {userOrdersCount}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div>
                            <h3 style={{ marginBottom: '1.5rem' }}>Müşteri Yorumları ({reviews.length})</h3>
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {reviews.length === 0 ? (
                                    <p style={{ color: '#64748b' }}>Henüz kayıtlı yorum bulunmuyor.</p>
                                ) : (
                                    reviews.map(r => (
                                        <div key={r.id} style={{ background: 'white', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                {r.products?.image && (
                                                    <img src={r.products.image} style={{ width: '50px', height: '50px', borderRadius: '6px', objectFit: 'cover' }} alt="" />
                                                )}
                                                <div>
                                                    <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{r.products?.title || 'Bilinmeyen Ürün'}</div>
                                                    <div style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.25rem 0' }}>
                                                        Müşteri: <strong>{r.profiles?.name || r.profiles?.email || 'Kullanıcı'}</strong> • {new Date(r.created_at).toLocaleDateString('tr-TR')}
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', margin: '0.25rem 0' }}>
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={14} fill={i < r.rating ? '#f59e0b' : 'none'} color={i < r.rating ? '#f59e0b' : '#cbd5e1'} />
                                                        ))}
                                                    </div>
                                                    <div style={{ fontSize: '0.9rem', color: '#334155', fontStyle: 'italic', marginTop: '0.5rem' }}>
                                                        "{r.comment}"
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                className="btn btn-outline"
                                                style={{ color: '#ef4444', borderColor: '#fee2e2', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                                                onClick={async () => {
                                                    if (confirm('Bu yorumu silmek istediğinize emin misiniz?')) {
                                                        await db.deleteReview(r.id);
                                                        fetchReviews();
                                                    }
                                                }}
                                            >
                                                <Trash2 size={14} /> Yorumu Sil
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Order Detail Modal */}
                {selectedOrder && (
                    <div className="modal-overlay" style={{ zIndex: 1001 }} onClick={() => setSelectedOrder(null)}>
                        <div className="modal-content" style={{ maxWidth: '600px', width: '90%' }} onClick={e => e.stopPropagation()}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                                <h3 style={{ margin: 0 }}>Sipariş Detayı</h3>
                                <button onClick={() => setSelectedOrder(null)} style={{ background: 'none' }}><X /></button>
                            </div>

                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <div style={{ background: 'var(--color-bg)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '700' }}>
                                        <Clock size={18} /> Durum: <span style={{ color: 'var(--color-primary)' }}>{statusLabels[selectedOrder.status]}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                        {['preparing', 'shipping', 'delivered'].map((s) => (
                                            <div key={s} style={{
                                                flex: 1,
                                                height: '4px',
                                                background: selectedOrder.status === s || (s === 'preparing' && selectedOrder.status !== 'cancelled') || (s === 'shipping' && selectedOrder.status === 'delivered') ? 'var(--color-primary)' : '#e2e8f0',
                                                borderRadius: '2px'
                                            }}></div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}><MapPin size={18} /> Teslimat Bilgileri</h4>
                                    <div style={{ fontSize: '0.9rem', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)' }}>
                                        <div style={{ fontWeight: '700' }}>{selectedOrder.profiles?.name}</div>
                                        <div>{selectedOrder.addresses?.full_address}</div>
                                        <div>{selectedOrder.addresses?.district} / {selectedOrder.addresses?.city}</div>
                                        <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Phone size={14} /> {selectedOrder.addresses?.phone || 'Belirtilmemiş'}
                                        </div>
                                    </div>
                                </div>

                                {selectedOrder.is_gift_wrap && (
                                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem' }}>
                                        <div style={{ fontWeight: '700', color: '#991b1b', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Gift size={18} color="#ef4444" /> 🎁 Hediye Paketi İsteniyor
                                        </div>
                                        {selectedOrder.gift_note && (
                                            <div style={{ fontSize: '0.85rem', color: '#7f1d1d', marginTop: '0.35rem', fontStyle: 'italic', background: 'white', padding: '0.5rem', borderRadius: '4px', border: '1px solid #fca5a5' }}>
                                                Hediye Notu: "{selectedOrder.gift_note}"
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div>
                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}><ShoppingBag size={18} /> Ürünler</h4>
                                    <div style={{ border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                                        {selectedOrder.order_items?.map((item, idx) => (
                                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', borderBottom: idx === selectedOrder.order_items.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                                                <div>
                                                    <div style={{ fontWeight: '600' }}>{item.products?.title}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>{item.quantity} Adet x {item.price} TL</div>
                                                </div>
                                                <div style={{ fontWeight: '700' }}>{(item.quantity * item.price).toFixed(2)} TL</div>
                                            </div>
                                        ))}
                                        {selectedOrder.discount > 0 && (
                                            <div style={{ padding: '0.75rem', display: 'flex', justifyContent: 'space-between', color: '#10b981', background: '#f0fdf4', fontSize: '0.9rem' }}>
                                                <span>İndirim {selectedOrder.coupon_code && `(${selectedOrder.coupon_code})`}</span>
                                                <span>-{Number(selectedOrder.discount).toFixed(2)} TL</span>
                                            </div>
                                        )}
                                        <div style={{ background: '#f8fafc', padding: '0.75rem', display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                                            <span>Toplam</span>
                                            <span>{Number(selectedOrder.total).toFixed(2)} TL</span>
                                        </div>
                                    </div>
                                </div>

                                {selectedOrder.payment_method === 'transfer' && (
                                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', fontSize: '0.9rem' }}>
                                        <div style={{ fontWeight: '700', marginBottom: '0.5rem' }}>💳 Ödeme Yöntemi: Havale/EFT</div>
                                        <div>
                                            Ödeme Durumu: 
                                            {selectedOrder.payment_status === 'paid' ? (
                                                <span style={{ color: '#10b981', fontWeight: '700' }}> Onaylandı ✅</span>
                                            ) : selectedOrder.payment_status === 'notification_sent' ? (
                                                <span style={{ color: '#3b82f6', fontWeight: '700' }}> Bildirim Yapıldı ⏳</span>
                                            ) : (
                                                <span style={{ color: '#f59e0b', fontWeight: '700' }}> Bekleniyor ⏳</span>
                                            )}
                                        </div>
                                        {selectedOrder.transfer_sender && (
                                            <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                                                <div>Gönderen: <strong>{selectedOrder.transfer_sender}</strong></div>
                                                <div>Banka: <strong>{selectedOrder.transfer_bank}</strong></div>
                                            </div>
                                        )}
                                        {selectedOrder.payment_status !== 'paid' && (
                                            <button
                                                onClick={async () => {
                                                    if (confirm('Ödemeyi onaylamak istiyor musunuz?')) {
                                                        await handleUpdateStatus(selectedOrder.id, 'preparing', { payment_status: 'paid' });
                                                    }
                                                }}
                                                className="btn btn-primary"
                                                style={{ width: '100%', marginTop: '0.75rem', justifyContent: 'center', background: '#10b981', cursor: 'pointer' }}
                                            >
                                                Ödemeyi Onayla
                                            </button>
                                        )}
                                    </div>
                                )}

                                {selectedOrder.note && (
                                    <div>
                                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}><FileText size={18} /> Müşteri Notu</h4>
                                        <div style={{ background: '#fffbeb', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', color: '#92400e', border: '1px solid #fef3c7' }}>
                                            {selectedOrder.note}
                                        </div>
                                    </div>
                                )}

                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="btn btn-outline"
                                        style={{ flex: 1 }}
                                    >
                                        Kapat
                                    </button>
                                    {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
                                        <button
                                            onClick={() => handleAdvanceStatus(selectedOrder)}
                                            className="btn btn-primary"
                                            style={{ flex: 2, background: selectedOrder.status === 'preparing' ? '#3b82f6' : '#10b981' }}
                                        >
                                            {selectedOrder.status === 'preparing' ? 'Kargoya Ver (Durumu İlerlet)' : 'Teslim Edildi İşaretle'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {isShippingDialogOpen && (
                    <div className="modal-overlay" style={{ zIndex: 1100 }}>
                        <div className="modal-content" style={{ maxWidth: '400px' }}>
                            <h3 style={{ marginTop: 0 }}>Kargo Bilgilerini Girin</h3>
                            <div className="form-group">
                                <label>Kargo Firması</label>
                                <select
                                    value={trackingInfo.carrier}
                                    onChange={e => setTrackingInfo({ ...trackingInfo, carrier: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                                >
                                    <option value="">Seçiniz...</option>
                                    <option value="Yurtiçi Kargo">Yurtiçi Kargo</option>
                                    <option value="Aras Kargo">Aras Kargo</option>
                                    <option value="MNG Kargo">MNG Kargo</option>
                                    <option value="Sürat Kargo">Sürat Kargo</option>
                                    <option value="PTT Kargo">PTT Kargo</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Takip Numarası</label>
                                <input
                                    type="text"
                                    value={trackingInfo.tracking_code}
                                    onChange={e => setTrackingInfo({ ...trackingInfo, tracking_code: e.target.value })}
                                    placeholder="Örn: 1Z9999999999999999"
                                    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setIsShippingDialogOpen(false)}>İptal</button>
                                <button className="btn btn-primary" style={{ flex: 1 }} onClick={submitShippingInfo} disabled={!trackingInfo.carrier || !trackingInfo.tracking_code}>Kaydet</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, trend }) {
    return (
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', fontWeight: '600' }}>{title}</span>
                <div style={{ background: 'var(--color-bg)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>{icon}</div>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: trend === 'danger' && value > 0 ? '#ef4444' : 'inherit' }}>{value}</div>
        </div>
    );
}
