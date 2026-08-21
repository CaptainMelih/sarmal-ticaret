import React from 'react';
import { Checkout } from './Checkout';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, ShoppingBag } from 'lucide-react';

export function CheckoutPage({ cartItems, addresses, onCompleteOrder, onAddAddress, user }) {
    const navigate = useNavigate();

    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div style={{ background: '#f8fafc', minHeight: 'calc(100vh - 120px)', padding: '2rem 0 4rem' }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                {/* Breadcrumbs */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>
                    <Link to="/" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <ArrowLeft size={16} /> Ana Sayfa
                    </Link>
                    <span>/</span>
                    <Link to="/sepet" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '600' }}>
                        Sepetim
                    </Link>
                    <span>/</span>
                    <span style={{ fontWeight: '700', color: '#1e293b' }}>Ödeme ve Teslimat</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0 }}>
                        <ShieldCheck size={32} color="var(--color-primary)" /> Güvenli Ödeme Ekranı
                    </h1>
                </div>

                {/* Render Checkout Component as Page */}
                <Checkout
                    isOpen={true}
                    isPage={true}
                    onClose={() => navigate('/sepet')}
                    cartItems={cartItems}
                    addresses={addresses}
                    onCompleteOrder={onCompleteOrder}
                    onAddAddress={onAddAddress}
                    user={user}
                />
            </div>
        </div>
    );
}
