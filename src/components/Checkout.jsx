import React, { useState } from 'react';
import { X, MapPin, CreditCard, Percent, ShoppingBag, Truck, CheckCircle, AlertCircle, ShieldCheck, MapIcon } from 'lucide-react';
import * as db from '../lib/supabase';
import { TURKEY_DATA } from '../data/turkey-data';
import { CustomSelect } from './CustomSelect';


const PAYMENT_METHODS = [
    { id: 'credit', name: 'Kredi Kartı', icon: CreditCard },
    // { id: 'cash', name: 'Kapıda Ödeme', icon: ShoppingBag },
    { id: 'transfer', name: 'Havale/EFT', icon: Truck }
];

export function Checkout({ isOpen, onClose, cartItems, addresses, onCompleteOrder, onAddAddress, user }) {
    const [step, setStep] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState('credit');
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponError, setCouponError] = useState('');
    const [isApplying, setIsApplying] = useState(false);
    const [orderNote, setOrderNote] = useState('');
    const [guestAddress, setGuestAddress] = useState({
        fullAddress: '',
        city: '',
        district: '',
        phone: ''
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [createdOrder, setCreatedOrder] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    // Group items by product id
    const groupedItems = cartItems.reduce((acc, item) => {
        const existing = acc.find(i => i.id === item.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            acc.push({ ...item, quantity: 1 });
        }
        return acc;
    }, []);

    const subtotal = groupedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Automatic threshold discounts (disabled)
    const autoDiscount = null;

    const activeDiscount = appliedCoupon || autoDiscount;

    let discount = 0;
    if (activeDiscount) {
        if (activeDiscount.discount_type === 'percentage') {
            discount = (subtotal * activeDiscount.discount_amount / 100);
        } else {
            discount = activeDiscount.discount_amount;
        }
    }

    const shipping = 0; // Ücretsiz kargo
    const total = Math.max(0, subtotal - discount + shipping);

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        setCouponError('');
        setIsApplying(true);
        try {
            const coupon = await db.getCoupon(couponCode);
            if (coupon) {
                if (subtotal < coupon.min_purchase) {
                    setCouponError(`Bu kupon için minimum ${coupon.min_purchase} TL harcama yapmalısınız.`);
                } else {
                    setAppliedCoupon(coupon);
                    setCouponCode('');
                }
            } else {
                setCouponError('Geçersiz veya süresi dolmuş kupon kodu.');
            }
        } catch (err) {
            setCouponError('Kupon uygulanırken bir hata oluştu.');
        } finally {
            setIsApplying(false);
        }
    };

    const isAddressValid = () => {
        if (user) {
            return selectedAddress !== null;
        } else {
            return (guestAddress.fullAddress || '').trim() !== '' &&
                   (guestAddress.city || '').trim() !== '' &&
                   (guestAddress.district || '').trim() !== '' &&
                   (guestAddress.phone || '').trim().length >= 10;
        }
    };

    const handleComplete = async () => {
        if (step === 1) {
            if (!isAddressValid()) {
                alert(user ? 'Lütfen bir teslimat adresi seçin.' : 'Lütfen tüm adres bilgilerinizi eksiksiz doldurun.');
                return;
            }
            setStep(2);
        } else if (step === 2) {
            if (!agreedToTerms) {
                alert('Ödemeye geçmeden önce Mesafeli Satış Sözleşmesi ve İade Koşulları metinlerini onaylamanız gerekmektedir.');
                return;
            }
            setIsSubmitting(true);
            try {
                const result = await onCompleteOrder({
                    addressId: selectedAddress ? selectedAddress.id : null,
                    guestAddress: !user ? guestAddress : null,
                    paymentMethod: selectedPayment,
                    items: groupedItems,
                    subtotal,
                    discount,
                    couponCode: appliedCoupon?.code || null,
                    total,
                    note: orderNote
                });

                if (selectedPayment === 'transfer') {
                    setCreatedOrder(result);
                    setStep(3);
                }
            } catch (err) {
                alert('Sipariş tamamlanırken bir hata oluştu: ' + err.message);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                style={{ maxWidth: '950px', width: '95%', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                    <h2 style={{ margin: 0 }}>Güvenli Ödeme</h2>
                    <button onClick={onClose} style={{ background: 'none' }}>
                        <X />
                    </button>
                </div>

                {/* Progress Steps */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    gap: '1rem',
                    padding: '0 1rem'
                }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem', color: step >= 1 ? 'var(--color-primary)' : 'var(--color-text-light)' }}>
                        <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: step >= 1 ? 'var(--color-primary)' : 'var(--color-bg)', color: step >= 1 ? 'white' : 'var(--color-text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.9rem' }}>
                            {step > 1 ? <CheckCircle size={18} /> : '1'}
                        </div>
                        <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Adres Bilgileri</span>
                    </div>
                    <div style={{ flex: 0.5, height: '2px', background: step >= 2 ? 'var(--color-primary)' : '#e2e8f0' }} />
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem', color: step >= 2 ? 'var(--color-primary)' : 'var(--color-text-light)' }}>
                        <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: step >= 2 ? 'var(--color-primary)' : 'var(--color-bg)', color: step >= 2 ? 'white' : 'var(--color-text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.9rem' }}>
                            2
                        </div>
                        <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Ödeme ve Onay</span>
                    </div>
                </div>

                {step === 3 ? (
                    <div style={{ textAlign: 'center', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', overflowY: 'auto' }}>
                        <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: '#dcfce7', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                            <CheckCircle size={40} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#10b981', marginBottom: '0.5rem' }}>Siparişiniz Başarıyla Alındı!</h3>
                            <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem' }}>Sipariş numaranız: <strong style={{ color: 'var(--color-text)', fontSize: '1.1rem' }}>#{createdOrder?.id || ''}</strong></p>
                        </div>
                        
                        <div style={{
                            background: 'var(--color-bg)',
                            border: '1px solid #e2e8f0',
                            borderRadius: 'var(--radius-lg)',
                            padding: '1.5rem',
                            width: '100%',
                            maxWidth: '500px',
                            textAlign: 'left',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <h4 style={{ fontWeight: '700', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text)' }}>
                                <Truck size={18} color="var(--color-primary)" /> Havale/EFT Bilgileri
                            </h4>
                            <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--color-text)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#64748b' }}>Banka:</span>
                                    <span style={{ fontWeight: '600' }}>Ziraat Bankası</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#64748b' }}>Alıcı Adı:</span>
                                    <span style={{ fontWeight: '600' }}>Melih Yıldız</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ color: '#64748b' }}>IBAN:</span>
                                    <span style={{ fontWeight: '700', fontFamily: 'monospace', background: '#f1f5f9', color: '#1e293b', padding: '0.2rem 0.5rem', borderRadius: '4px', cursor: 'pointer' }} onClick={() => {
                                        navigator.clipboard.writeText('TR85 0001 0009 0100 1234 5678 90');
                                        alert('IBAN kopyalandı!');
                                    }} title="Kopyalamak için tıklayın">
                                        TR85 0001 0009 0100 1234 5678 90 📋
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#64748b' }}>Toplam Tutar:</span>
                                    <span style={{ fontWeight: '700', color: 'var(--color-primary)' }}>{Number(createdOrder?.total || 0).toFixed(2)} TL</span>
                                </div>
                            </div>
                            
                            <div style={{
                                marginTop: '1.25rem',
                                background: '#fffbeb',
                                border: '1px solid #fef3c7',
                                color: '#92400e',
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.85rem',
                                display: 'flex',
                                gap: '0.5rem',
                                alignItems: 'flex-start'
                            }}>
                                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span>
                                    <strong>Önemli:</strong> Lütfen Havale/EFT yaparken açıklama kısmına sadece sipariş numaranızı (<strong>#{createdOrder?.id || ''}</strong>) yazınız. Siparişiniz ödemeniz onaylandıktan sonra kargoya verilecektir.
                                </span>
                            </div>
                        </div>

                        <button className="btn btn-primary" onClick={onClose} style={{ padding: '0.75rem 2rem', fontWeight: '700', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            Kapat ve Ana Sayfaya Dön
                        </button>
                    </div>
                ) : (
                    <div className="checkout-content">
                        <div style={{ minWidth: 0 }}>
                            {step === 1 && (
                                <div>
                                    <h3 style={{ marginBottom: '1.25rem', fontSize: '1.1rem' }}>Teslimat Adresi Seçin</h3>
                                    {!user ? (
                                        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
                                            <h4 style={{ marginBottom: '1rem' }}>Misafir Teslimat Bilgileri</h4>
                                            <div className="form-group" style={{ marginBottom: '1rem' }}>
                                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Tam Adres *</label>
                                                <textarea
                                                    value={guestAddress.fullAddress}
                                                    onChange={e => setGuestAddress({ ...guestAddress, fullAddress: e.target.value })}
                                                    placeholder="Mahalle, sokak, bina no..."
                                                    rows="3"
                                                    style={{ width: '100%', minHeight: '100px', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '2px solid #cbd5e1', display: 'block', background: 'white' }}
                                                    required
                                                />
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                                <div className="form-group">
                                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>İl *</label>
                                                    <CustomSelect
                                                        value={guestAddress.city}
                                                        onChange={city => setGuestAddress({ ...guestAddress, city, district: '' })}
                                                        required
                                                        placeholder="İl Seçin"
                                                        options={Object.keys(TURKEY_DATA).sort((a, b) => a.localeCompare(b, 'tr')).map(city => ({ value: city, label: city }))}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>İlçe *</label>
                                                    <CustomSelect
                                                        value={guestAddress.district}
                                                        onChange={district => setGuestAddress({ ...guestAddress, district })}
                                                        required
                                                        disabled={!guestAddress.city}
                                                        placeholder="İlçe Seçin"
                                                        options={guestAddress.city ? TURKEY_DATA[guestAddress.city].sort((a, b) => a.localeCompare(b, 'tr')).map(district => ({ value: district, label: district })) : []}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Telefon *</label>
                                                <input
                                                    type="tel"
                                                    value={guestAddress.phone}
                                                    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                                    onChange={e => setGuestAddress({ ...guestAddress, phone: e.target.value })}
                                                    placeholder="05xxxxxxxxx"
                                                    maxLength={11}
                                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}
                                                    required
                                                />
                                            </div>
                                            {onAddAddress && (
                                                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                                                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Veya alışverişinizi daha sonra kolayca yapabilmek için</p>
                                                    <button className="btn btn-outline" onClick={() => { onClose(); onAddAddress(); }}>
                                                        Üye Ol / Giriş Yap
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                                            {addresses.length === 0 ? (
                                                <div style={{ padding: '2rem', textAlign: 'center', background: '#f8fafc', borderRadius: 'var(--radius-lg)', gridColumn: '1 / -1' }}>
                                                    <p style={{ color: 'var(--color-text-light)', marginBottom: '1rem' }}>
                                                        Kayıtlı teslimat adresiniz bulunmamaktadır. Siparişe devam etmek için lütfen hesabınıza bir adres ekleyin.
                                                    </p>
                                                    <button className="btn btn-primary" onClick={onAddAddress} style={{ margin: '0 auto' }}>
                                                        Profilime Git ve Adres Ekle 📍
                                                    </button>
                                                </div>
                                            ) : (
                                                addresses.map(address => (
                                                    <div
                                                        key={address.id}
                                                        onClick={() => setSelectedAddress(address)}
                                                        style={{
                                                            padding: '1.25rem',
                                                            background: selectedAddress?.id === address.id ? '#f0f7ff' : 'white',
                                                            borderRadius: 'var(--radius-lg)',
                                                            cursor: 'pointer',
                                                            border: selectedAddress?.id === address.id ? '2px solid var(--color-primary)' : '2px solid #e2e8f0',
                                                            transition: 'all 0.2s',
                                                            position: 'relative'
                                                        }}
                                                    >
                                                        {selectedAddress?.id === address.id && (
                                                            <div style={{ position: 'absolute', top: '10px', right: '10px', color: 'var(--color-primary)' }}>
                                                                <CheckCircle size={20} />
                                                            </div>
                                                        )}
                                                        <div style={{ fontWeight: '700', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                            <MapPin size={16} color={selectedAddress?.id === address.id ? 'var(--color-primary)' : '#64748b'} />
                                                            {address.title}
                                                        </div>
                                                        <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
                                                            {address.full_address}
                                                        </div>
                                                        <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem', fontWeight: '600' }}>
                                                            {address.district}, {address.city}
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                            {addresses.length > 0 && (
                                                <div
                                                    onClick={() => { onClose(); onAddAddress(); }}
                                                    style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: 'var(--radius-lg)', cursor: 'pointer', border: '2px dashed #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#64748b' }}
                                                >
                                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0' }}>+</div>
                                                    <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Yeni Adres Ekle</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {step === 2 && (
                                <div>
                                    <h3 style={{ marginBottom: '1.25rem', fontSize: '1.1rem' }}>Ödeme Yöntemi</h3>
                                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
                                        {PAYMENT_METHODS.map(method => {
                                            const Icon = method.icon;
                                            const isActive = selectedPayment === method.id;
                                            return (
                                                <div
                                                    key={method.id}
                                                    onClick={() => setSelectedPayment(method.id)}
                                                    style={{
                                                        padding: '1.25rem',
                                                        background: isActive ? '#f0f7ff' : 'white',
                                                        borderRadius: 'var(--radius-lg)',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '1rem',
                                                        border: isActive ? '2px solid var(--color-primary)' : '2px solid #e2e8f0',
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    <div style={{ width: '45px', height: '45px', borderRadius: 'var(--radius-md)', background: isActive ? 'white' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isActive ? 'var(--color-primary)' : '#64748b' }}>
                                                        <Icon size={24} />
                                                    </div>
                                                    <span style={{ fontWeight: '700', flex: 1 }}>{method.name}</span>
                                                    {isActive && <CheckCircle size={20} color="var(--color-primary)" />}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Sipariş Notu</h3>
                                    <textarea
                                        value={orderNote}
                                        onChange={(e) => setOrderNote(e.target.value)}
                                        placeholder="Kargo notu veya ürün hazırlığı ile ilgili bir notunuz var mı?"
                                        rows={4}
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: 'var(--radius-lg)',
                                            resize: 'none',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Sidebar Summary */}
                        <div style={{ minWidth: 0 }}>
                            <div className="checkout-summary">
                                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <ShoppingBag size={20} /> Sepet Özeti
                                </h3>

                                <div style={{ marginBottom: '1.5rem', maxHeight: '300px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                                    {groupedItems.map((item, index) => (
                                        <div key={index} style={{
                                            display: 'flex',
                                            gap: '0.75rem',
                                            marginBottom: '1rem'
                                        }}>
                                            <img src={item.image} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontWeight: '600', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.quantity} Adet x {item.price} TL</div>
                                            </div>
                                            <div style={{ fontWeight: '700', fontSize: '0.9rem', textAlign: 'right' }}>{(item.price * item.quantity).toFixed(2)} TL</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Coupon Section */}
                                <div style={{ marginBottom: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #e2e8f0' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <input
                                            type="text"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                            placeholder="Kupon Kodunuz"
                                            disabled={!!appliedCoupon || isApplying}
                                            style={{
                                                flex: 1,
                                                padding: '0.6rem 0.8rem',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: 'var(--radius-md)',
                                                fontSize: '0.85rem',
                                                outline: 'none'
                                            }}
                                        />
                                        {!appliedCoupon ? (
                                            <button
                                                onClick={handleApplyCoupon}
                                                disabled={!couponCode || isApplying}
                                                className="btn btn-primary"
                                                style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}
                                            >
                                                {isApplying ? '...' : 'Uygula'}
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => { setAppliedCoupon(null); setCouponCode(''); }}
                                                className="btn btn-outline"
                                                style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', color: '#ef4444', borderColor: '#fee2e2' }}
                                            >
                                                Kaldır
                                            </button>
                                        )}
                                    </div>

                                    {couponError && (
                                        <div style={{ fontSize: '0.75rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
                                            <AlertCircle size={12} /> {couponError}
                                        </div>
                                    )}

                                    {activeDiscount && (
                                        <div style={{
                                            fontSize: '0.8rem',
                                            color: '#10b981',
                                            background: '#f0fdf4',
                                            padding: '0.5rem 0.75rem',
                                            borderRadius: 'var(--radius-md)',
                                            marginTop: '0.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontWeight: '600'
                                        }}>
                                            <Percent size={14} />
                                            {activeDiscount.code}: {activeDiscount.description || (activeDiscount.discount_type === 'percentage' ? `%${activeDiscount.discount_amount} indirim!` : `${activeDiscount.discount_amount} TL indirim!`)}
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'grid', gap: '0.75rem', paddingTop: '1.25rem', borderTop: '2px solid #e2e8f0' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#64748b' }}>
                                        <span>Ara Toplam</span>
                                        <span>{subtotal.toFixed(2)} TL</span>
                                    </div>
                                    {discount > 0 && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#10b981', fontWeight: '600' }}>
                                            <span>Toplam İndirim</span>
                                            <span>-{discount.toFixed(2)} TL</span>
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#64748b' }}>
                                        <span>Kargo Ücreti</span>
                                        <span>Ücretsiz</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        paddingTop: '1rem',
                                        borderTop: '1px solid #e2e8f0',
                                        fontWeight: '900',
                                        fontSize: '1.4rem',
                                        color: 'var(--color-primary)'
                                    }}>
                                        <span>Toplam</span>
                                        <span>{total.toFixed(2)} TL</span>
                                    </div>
                                </div>

                                {step === 2 && (
                                    <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'var(--color-bg)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                                        <input
                                            type="checkbox"
                                            id="terms-checkbox"
                                            checked={agreedToTerms}
                                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                                            style={{ marginTop: '0.2rem', cursor: 'pointer', width: '1.2rem', height: '1.2rem', accentColor: 'var(--color-primary)' }}
                                        />
                                        <label htmlFor="terms-checkbox" style={{ fontSize: '0.85rem', color: 'var(--color-text)', cursor: 'pointer', lineHeight: '1.5' }}>
                                            <a href="/mesafeli-satis-sozlesmesi" target="_blank" style={{ color: 'var(--color-primary)' }}>Mesafeli Satış Sözleşmesini</a>, {' '}
                                            <a href="/iade-kosullari" target="_blank" style={{ color: 'var(--color-primary)' }}>İptal ve İade Koşullarını</a> okudum ve onaylıyorum.
                                        </label>
                                    </div>
                                )}

                                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                                    {step === 2 && (
                                        <button
                                            className="btn btn-outline"
                                            onClick={() => setStep(1)}
                                            disabled={isSubmitting}
                                            style={{ flex: 1, padding: '0.8rem' }}
                                        >
                                            Geri
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleComplete}
                                        disabled={isSubmitting || (step === 1 && !isAddressValid())}
                                        style={{
                                            flex: 2,
                                            justifyContent: 'center',
                                            padding: '0.8rem',
                                            fontWeight: '800',
                                            opacity: (isSubmitting || (step === 1 && !isAddressValid())) ? 0.5 : 1,
                                            cursor: (isSubmitting || (step === 1 && !isAddressValid())) ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {isSubmitting ? 'İşleniyor...' : (step === 1 ? 'Ödemeye Geç' : 'Siparişi Onayla')}
                                    </button>
                                </div>

                                <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#94a3b8', marginTop: '1.5rem' }}>
                                    🔒 256-bit SSL şifreleme ile güvenli ödeme.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
