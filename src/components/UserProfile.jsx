import React, { useState } from 'react';
import { X, User, MapPin, ShoppingBag, CreditCard, LogOut, Edit2, Trash2, Plus, Truck, CheckCircle, Clock, Mail, Phone } from 'lucide-react';
import { TURKEY_DATA } from '../data/turkey-data';
import { CustomSelect } from './CustomSelect';


export function UserProfile({ isOpen, onClose, user, onLogout, addresses, onAddAddress, onDeleteAddress, orders }) {
    const [activeTab, setActiveTab] = useState('profile');
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [newAddress, setNewAddress] = useState({
        title: '',
        fullAddress: '',
        city: '',
        district: '',
        zipCode: ''
    });

    if (!isOpen) return null;

    const handleAddAddress = (e) => {
        e.preventDefault();
        const formattedAddress = {
            title: newAddress.title,
            full_address: newAddress.fullAddress,
            city: newAddress.city,
            district: newAddress.district,
            zip_code: newAddress.zipCode
        };
        onAddAddress(formattedAddress);
        setNewAddress({ title: '', fullAddress: '', city: '', district: '', zipCode: '' });
        setIsAddingAddress(false);
    };

    const tabs = [
        { id: 'profile', label: 'Profil', icon: User },
        { id: 'addresses', label: 'Adreslerim', icon: MapPin },
        { id: 'orders', label: 'Siparişlerim', icon: ShoppingBag }
    ];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                style={{ maxWidth: '800px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                    <h2 style={{ margin: 0 }}>Hesabım</h2>
                    <button onClick={onClose} style={{ background: 'none' }}>
                        <X />
                    </button>
                </div>

                <div className="profile-tabs">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    background: 'none',
                                    padding: '0.75rem 1rem',
                                    borderBottom: activeTab === tab.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                                    color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-light)',
                                    fontWeight: activeTab === tab.id ? '600' : '400',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '-2px',
                                    transition: 'all 0.2s',
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    borderTop: 'none',
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
                    {activeTab === 'profile' && (
                        <div>
                            <div style={{
                                background: 'var(--color-bg)',
                                padding: '1.5rem',
                                borderRadius: 'var(--radius-lg)',
                                marginBottom: '1rem'
                            }}>
                                <h3 style={{ marginBottom: '1rem' }}>Kullanıcı Bilgileri</h3>
                                <div style={{ display: 'grid', gap: '1.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ background: 'white', padding: '1rem', borderRadius: '50%', border: '1px solid #e2e8f0' }}>
                                            <User size={32} color="var(--color-primary)" />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Ad Soyad</div>
                                            <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{user.name}</div>
                                        </div>
                                    </div>
                                    <div className="profile-grid">
                                        <div style={{ background: 'white', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Mail size={14} /> E-posta</div>
                                            <div style={{ fontWeight: '600', marginTop: '0.25rem' }}>{user.email}</div>
                                        </div>
                                        <div style={{ background: 'white', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Phone size={14} /> Telefon</div>
                                            <div style={{ fontWeight: '600', marginTop: '0.25rem' }}>{user.phone || 'Belirtilmemiş'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="btn btn-outline"
                                onClick={onLogout}
                                style={{ width: '100%', justifyContent: 'center', color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}
                            >
                                <LogOut size={18} />
                                Güvenli Çıkış Yap
                            </button>
                        </div>
                    )}

                    {activeTab === 'addresses' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ margin: 0 }}>Teslimat Adreslerim</h3>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setIsAddingAddress(!isAddingAddress)}
                                    style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                                >
                                    <Plus size={18} />
                                    Yeni Adres
                                </button>
                            </div>

                            {isAddingAddress && (
                                <form onSubmit={handleAddAddress} style={{
                                    background: 'var(--color-bg)',
                                    padding: '1.5rem',
                                    borderRadius: 'var(--radius-lg)',
                                    marginBottom: '1.5rem',
                                    border: '1px solid #e2e8f0'
                                }}>
                                    <h4 style={{ marginBottom: '1.25rem' }}>Yeni Adres Ekle</h4>
                                    <div className="form-group">
                                        <label>Adres Başlığı *</label>
                                        <input
                                            type="text"
                                            value={newAddress.title}
                                            onChange={e => setNewAddress({ ...newAddress, title: e.target.value })}
                                            placeholder="Örn: Ev, İş"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Tam Adres *</label>
                                        <textarea
                                            value={newAddress.fullAddress}
                                            onChange={e => setNewAddress({ ...newAddress, fullAddress: e.target.value })}
                                            placeholder="Mahalle, sokak, bina no..."
                                            rows={3}
                                            required
                                        />
                                    </div>
                                    <div className="profile-grid">
                                        <div className="form-group">
                                            <label>İl *</label>
                                            <CustomSelect
                                                value={newAddress.city}
                                                onChange={city => setNewAddress({ ...newAddress, city, district: '' })}
                                                required
                                                placeholder="İl Seçin"
                                                options={Object.keys(TURKEY_DATA).sort((a, b) => a.localeCompare(b, 'tr')).map(city => ({ value: city, label: city }))}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>İlçe *</label>
                                            <CustomSelect
                                                value={newAddress.district}
                                                onChange={district => setNewAddress({ ...newAddress, district })}
                                                required
                                                disabled={!newAddress.city}
                                                placeholder="İlçe Seçin"
                                                options={newAddress.city ? TURKEY_DATA[newAddress.city].sort((a, b) => a.localeCompare(b, 'tr')).map(district => ({ value: district, label: district })) : []}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                        <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setIsAddingAddress(false)}>
                                            İptal
                                        </button>
                                        <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                                            Adresi Kaydet
                                        </button>
                                    </div>
                                </form>
                            )}

                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {addresses.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-lg)', color: 'var(--color-text-light)' }}>
                                        <MapPin size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                                        <div>Henüz kayıtlı adresiniz yok.</div>
                                    </div>
                                ) : (
                                    addresses.map(address => (
                                        <div
                                            key={address.id}
                                            style={{
                                                background: 'var(--color-bg)',
                                                padding: '1.25rem',
                                                borderRadius: 'var(--radius-lg)',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'start',
                                                border: '1px solid #e2e8f0'
                                            }}
                                        >
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: '700', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <div style={{ background: 'white', padding: '0.4rem', borderRadius: '4px' }}><MapPin size={16} color="var(--color-primary)" /></div>
                                                    {address.title}
                                                </div>
                                                <div style={{ fontSize: '0.9rem' }}>{address.full_address}</div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginTop: '0.25rem' }}>
                                                    {address.district}, {address.city} {address.zip_code && `- ${address.zip_code}`}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => onDeleteAddress(address.id)}
                                                style={{
                                                    background: 'white',
                                                    padding: '0.5rem',
                                                    borderRadius: 'var(--radius-md)',
                                                    border: '1px solid #fecaca',
                                                    color: 'var(--color-danger)',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div>
                            <h3 style={{ marginBottom: '1.25rem' }}>Sipariş Geçmişim ({orders.length})</h3>
                            {orders.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-lg)', color: 'var(--color-text-light)' }}>
                                    <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                                    <p>Henüz siparişiniz yok.</p>
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gap: '1.25rem' }}>
                                    {orders.map(order => (
                                        <div
                                            key={order.id}
                                            style={{
                                                background: 'white',
                                                padding: '1.25rem',
                                                borderRadius: 'var(--radius-lg)',
                                                border: '1px solid #e2e8f0',
                                                marginBottom: '1rem'
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
                                                <div>
                                                    <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>
                                                        Sipariş #{order.id.slice(0, 8)}
                                                    </div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginTop: '0.25rem' }}>
                                                        {new Date(order.created_at).toLocaleDateString('tr-TR')} • {order.order_items?.length || 0} Ürün
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                                                        {Number(order.total).toFixed(2)} TL
                                                    </div>
                                                    <div style={{
                                                        fontSize: '0.75rem',
                                                        padding: '0.2rem 0.6rem',
                                                        borderRadius: '20px',
                                                        background: order.status === 'delivered' ? '#dcfce7' : order.status === 'shipping' ? '#dbeafe' : '#fef3c7',
                                                        color: order.status === 'delivered' ? '#166534' : order.status === 'shipping' ? '#1e40af' : '#92400e',
                                                        fontWeight: '700',
                                                        marginTop: '0.25rem'
                                                    }}>
                                                        {order.status === 'preparing' ? 'Hazırlanıyor' : order.status === 'shipping' ? 'Kargoda' : order.status === 'delivered' ? 'Teslim Edildi' : 'İptal Edildi'}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status Progress Bar */}
                                            {order.status !== 'cancelled' && (
                                                <div style={{ padding: '0 0.5rem', marginTop: '2rem' }}>
                                                    <div style={{ position: 'relative', height: '6px', background: '#f1f5f9', borderRadius: '3px', marginBottom: '2.5rem' }}>
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            height: '100%',
                                                            background: 'var(--color-primary)',
                                                            width: order.status === 'delivered' ? '100%' : order.status === 'shipping' ? '66%' : '33%',
                                                            borderRadius: '3px',
                                                            transition: 'width 0.5s ease'
                                                        }}></div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', top: '-12px', left: 0, right: 0 }}>
                                                            {[
                                                                { s: 'preparing', icon: Clock, label: 'Hazırlanıyor' },
                                                                { s: 'shipping', icon: Truck, label: 'Kargoda' },
                                                                { s: 'delivered', icon: CheckCircle, label: 'Teslim Edildi' }
                                                            ].map((step, idx) => {
                                                                const isActive = (order.status === step.s) || (step.s === 'preparing') || (step.s === 'shipping' && order.status === 'delivered') || order.status === 'delivered';
                                                                const Icon = step.icon;
                                                                return (
                                                                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                        <div style={{
                                                                            width: '30px',
                                                                            height: '30px',
                                                                            borderRadius: '50%',
                                                                            background: isActive ? 'var(--color-primary)' : 'white',
                                                                            border: `2px solid ${isActive ? 'var(--color-primary)' : '#e2e8f0'}`,
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            color: isActive ? 'white' : '#cbd5e1',
                                                                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                                                        }}>
                                                                            <Icon size={14} />
                                                                        </div>
                                                                        <span style={{ position: 'absolute', top: '35px', fontSize: '0.65rem', fontWeight: isActive ? '700' : '500', color: isActive ? 'var(--color-primary)' : '#cbd5e1' }}>
                                                                            {step.label}
                                                                        </span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Tracking Info */}
                                            {order.tracking_number && (
                                                <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)', fontWeight: '600' }}>
                                                        <Truck size={18} /> Kargo Takip Bilgileri
                                                    </div>
                                                    {order.payment_method && order.payment_method !== 'credit' && (
                                                        <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Firma: <span style={{ fontWeight: '600' }}>{order.payment_method}</span></div>
                                                    )}
                                                    <div style={{ fontSize: '0.9rem' }}>
                                                        Takip No: <span style={{ fontWeight: '600', letterSpacing: '1px' }}>{order.tracking_number}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                                                {order.status === 'preparing' && (
                                                    <button
                                                        className="btn btn-outline"
                                                        style={{ color: '#ef4444', border: '1px solid #fecaca', flex: 1, padding: '0.5rem' }}
                                                        onClick={async () => {
                                                            if (confirm('Siparişinizi iptal etmek istediğinize emin misiniz?')) {
                                                                try {
                                                                    await db.updateOrderStatus(order.id, 'cancelled');
                                                                    alert('Sipariş iptal edildi.');
                                                                    // Update local state would be ideal here if passed down, but reload works for now or let parent handle
                                                                    window.location.reload();
                                                                } catch (e) {
                                                                    alert('Hata oluştu');
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        Siparişi İptal Et
                                                    </button>
                                                )}
                                                {order.status === 'delivered' && (
                                                    <button
                                                        className="btn btn-outline"
                                                        style={{ flex: 1, padding: '0.5rem' }}
                                                        onClick={() => alert('İade/Değişim talebiniz için lütfen destek hattımızla (info@sarmalticaret.com) iletişime geçin. Talebiniz en kısa sürede değerlendirilecektir.')}
                                                    >
                                                        İade / Değişim Talep Et
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
