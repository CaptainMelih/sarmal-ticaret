import React from 'react';
import { Sparkles } from 'lucide-react';

export function Hero({ onAddProduct, isAdmin }) {
    return (
        <div className="hero">
            <div className="container">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Sparkles size={32} />
                    <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>Sarmal Ticaret</span>
                </div>
                <h1>Kalitenin ve Zarafetin Buluştuğu Adres</h1>
                <p>
                    Sevdiklerinize özel, size özel... En kaliteli hediyelik eşyalar, dekoratif ürünler ve
                    daha fazlası Sarmal Ticaret güvencesiyle kapınızda.
                </p>
                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        className="btn btn-primary"
                        onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
                        style={{
                            background: 'white',
                            color: 'var(--color-primary)',
                            fontSize: '1.1rem',
                            padding: '0.75rem 2rem',
                            boxShadow: 'var(--shadow-lg)'
                        }}
                    >
                        Ürünleri İncele
                    </button>
                    {isAdmin && (
                        <button
                            className="btn btn-outline"
                            onClick={onAddProduct}
                            style={{
                                color: 'white',
                                borderColor: 'white',
                                fontSize: '1.1rem',
                                padding: '0.75rem 2rem'
                            }}
                        >
                            Ürün Ekle (Yönetici)
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
