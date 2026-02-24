import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import * as db from '../lib/supabase';

const categories = [
    { id: 1, name: '🎁 Kişiye Özel' },
    { id: 2, name: '❤️ Sevgiliye Hediye' },
    { id: 3, name: '⌚ Saat & Aksesuar' },
    { id: 4, name: '☕ Bardak & Termos' },
    { id: 5, name: '👕 Tekstil' },
    { id: 6, name: '🏠 Dekoratif' }
];

export function AddProduct({ isOpen, onClose, onAdd, editProduct = null }) {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        image: '',
        category: 1,
        stock: 10
    });
    const [extraImages, setExtraImages] = useState([]);
    const [newImageUrl, setNewImageUrl] = useState('');

    useEffect(() => {
        if (editProduct) {
            setFormData({
                title: editProduct.title || '',
                price: editProduct.price || '',
                description: editProduct.description || '',
                image: editProduct.image || '',
                category: editProduct.category || 1,
                stock: editProduct.stock || 0
            });
            fetchExtraImages(editProduct.id);
        } else {
            setFormData({ title: '', price: '', description: '', image: '', category: 1, stock: 10 });
            setExtraImages([]);
        }
    }, [editProduct, isOpen]);

    const fetchExtraImages = async (productId) => {
        try {
            const imgs = await db.getProductImages(productId);
            setExtraImages(imgs);
        } catch (err) {
            console.error('Fetch extra images error:', err);
        }
    };

    if (!isOpen) return null;

    const handleAddExtraImage = () => {
        if (!newImageUrl) return;
        setExtraImages([...extraImages, { url: newImageUrl, is_new: true }]);
        setNewImageUrl('');
    };

    const handleRemoveExtraImage = async (img, index) => {
        if (img.id) {
            // If it has an ID, it's already in the DB, but we'll handle deletion in the parent or separately
            // For now, let's mark it for deletion or just remove from local state
            setExtraImages(extraImages.filter((_, i) => i !== index));
        } else {
            setExtraImages(extraImages.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.price) return;

        onAdd({
            ...formData,
            id: editProduct?.id,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            category: parseInt(formData.category),
            image: formData.image || 'https://placehold.co/600x400?text=Urun',
            extraImages: extraImages // Pass extra images to parent
        });

        if (!editProduct) {
            setFormData({ title: '', price: '', description: '', image: '', category: 1, stock: 10 });
            setExtraImages([]);
        }
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                    <h2 style={{ margin: 0 }}>{editProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</h2>
                    <button onClick={onClose} style={{ background: 'none' }}><X /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Ürün Adı *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                            placeholder="Örn: Kişiye Özel Termos"
                        />
                    </div>
                    <div className="form-group">
                        <label>Kategori *</label>
                        <select
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #cbd5e1',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '1rem',
                                background: 'white'
                            }}
                        >
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label>Fiyat (TL) *</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                                required
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                            />
                        </div>
                        <div className="form-group">
                            <label>Stok Adedi *</label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                required
                                min="0"
                                placeholder="10"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Ana Görsel URL *</label>
                        <input
                            type="text"
                            value={formData.image}
                            onChange={e => setFormData({ ...formData, image: e.target.value })}
                            placeholder="https://..."
                            required
                        />
                    </div>

                    <div className="form-group" style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}><ImageIcon size={18} /> Galeri Resimleri (Opsiyonel)</label>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            <input
                                type="text"
                                value={newImageUrl}
                                onChange={e => setNewImageUrl(e.target.value)}
                                placeholder="Ek resim URL'si"
                                style={{ flex: 1, padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}
                            />
                            <button type="button" className="btn btn-primary" onClick={handleAddExtraImage} style={{ padding: '0.5rem' }}>
                                <Plus size={20} />
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '0.5rem' }}>
                            {extraImages.map((img, idx) => (
                                <div key={idx} style={{ position: 'relative', width: '60px', height: '60px' }}>
                                    <img src={img.url} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveExtraImage(img, idx)}
                                        style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: 'white', borderRadius: '50%', width: '18px', height: '18px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Trash2 size={10} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Açıklama</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            placeholder="Ürün açıklaması..."
                        />
                    </div>
                    <div className="modal-actions" style={{ marginTop: '2rem' }}>
                        <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={onClose}>İptal</button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Ürünü Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
