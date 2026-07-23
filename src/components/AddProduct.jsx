import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Image as ImageIcon, Upload, Check, ListPlus } from 'lucide-react';
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
        stock: 10,
        flash_discount_rate: 0
    });
    const [extraImages, setExtraImages] = useState([]);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [specs, setSpecs] = useState([{ key: 'Malzeme', value: '' }, { key: 'Garanti', value: '2 Yıl' }]);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (editProduct) {
            setFormData({
                title: editProduct.title || '',
                price: editProduct.price || '',
                description: editProduct.description || '',
                image: editProduct.image || '',
                category: editProduct.category || 1,
                stock: editProduct.stock || 0,
                flash_discount_rate: editProduct.flash_discount_rate || 0
            });
            // Parse specs if available
            try {
                if (editProduct.specs) {
                    const parsed = typeof editProduct.specs === 'string' ? JSON.parse(editProduct.specs) : editProduct.specs;
                    if (Array.isArray(parsed) && parsed.length > 0) setSpecs(parsed);
                } else {
                    setSpecs([{ key: 'Malzeme', value: '' }, { key: 'Garanti', value: '2 Yıl' }]);
                }
            } catch (e) {
                setSpecs([{ key: 'Malzeme', value: '' }, { key: 'Garanti', value: '2 Yıl' }]);
            }
            fetchExtraImages(editProduct.id);
        } else {
            setFormData({ title: '', price: '', description: '', image: '', category: 1, stock: 10, flash_discount_rate: 0 });
            setExtraImages([]);
            setSpecs([{ key: 'Malzeme', value: '' }, { key: 'Garanti', value: '2 Yıl' }]);
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

    // Device File Upload Handler (Multi-file support using FileReader -> DataURL)
    const handleFilesSelected = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setIsUploading(true);
        let processedCount = 0;
        const newImgs = [];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target.result;
                newImgs.push({ url: dataUrl, is_new: true });
                processedCount++;

                if (processedCount === files.length) {
                    // Set first image as main image if main image is empty
                    if (!formData.image && newImgs.length > 0) {
                        setFormData(prev => ({ ...prev, image: newImgs[0].url }));
                        setExtraImages(prev => [...prev, ...newImgs.slice(1)]);
                    } else {
                        setExtraImages(prev => [...prev, ...newImgs]);
                    }
                    setIsUploading(false);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleAddExtraImage = () => {
        if (!newImageUrl) return;
        if (!formData.image) {
            setFormData({ ...formData, image: newImageUrl });
        } else {
            setExtraImages([...extraImages, { url: newImageUrl, is_new: true }]);
        }
        setNewImageUrl('');
    };

    const handleRemoveExtraImage = (index) => {
        setExtraImages(extraImages.filter((_, i) => i !== index));
    };

    const handleSetAsMainImage = (url) => {
        const currentMain = formData.image;
        setFormData({ ...formData, image: url });
        if (currentMain) {
            setExtraImages(prev => [...prev.filter(img => img.url !== url), { url: currentMain, is_new: true }]);
        } else {
            setExtraImages(prev => prev.filter(img => img.url !== url));
        }
    };

    // Specs Handlers
    const handleAddSpec = () => {
        setSpecs([...specs, { key: '', value: '' }]);
    };

    const handleSpecChange = (index, field, value) => {
        const updated = [...specs];
        updated[index][field] = value;
        setSpecs(updated);
    };

    const handleRemoveSpec = (index) => {
        setSpecs(specs.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.price) return;

        // Clean empty specs
        const cleanSpecs = specs.filter(s => s.key.trim() !== '' && s.value.trim() !== '');

        onAdd({
            ...formData,
            id: editProduct?.id,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            flash_discount_rate: parseInt(formData.flash_discount_rate) || 0,
            category: parseInt(formData.category),
            image: formData.image || 'https://placehold.co/600x400?text=Urun',
            specs: JSON.stringify(cleanSpecs),
            extraImages: extraImages
        });

        if (!editProduct) {
            setFormData({ title: '', price: '', description: '', image: '', category: 1, stock: 10, flash_discount_rate: 0 });
            setExtraImages([]);
            setSpecs([{ key: 'Malzeme', value: '' }, { key: 'Garanti', value: '2 Yıl' }]);
        }
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" style={{ maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800', color: 'var(--color-text)' }}>
                        {editProduct ? '✏️ Ürünü Düzenle' : '✨ Yeni Ürün Ekle'}
                    </h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* Basic Info */}
                    <div className="form-group">
                        <label style={{ fontWeight: '700' }}>Ürün Adı *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                            placeholder="Örn: Kişiye Özel Ahşap Çerçeve"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ fontWeight: '700' }}>Kategori *</label>
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

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label style={{ fontWeight: '700' }}>Fiyat (TL) *</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                                required
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ fontWeight: '700' }}>Stok Adedi *</label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                required
                                min="0"
                                placeholder="10"
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ color: '#ef4444', fontWeight: '700' }}>⚡ Flaş Oranı (%)</label>
                            <input
                                type="number"
                                value={formData.flash_discount_rate}
                                onChange={e => setFormData({ ...formData, flash_discount_rate: e.target.value })}
                                min="0"
                                max="99"
                                placeholder="Örn: 40"
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
                            />
                        </div>
                    </div>

                    {/* Image Upload Dropzone & Gallery Manager */}
                    <div className="form-group" style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '2px dashed #cbd5e1', marginTop: '1rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                            <Upload size={20} /> Cihazdan Fotoğraf Yükle & Galeri Yönetimi
                        </label>

                        {/* File Upload Zone */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'white', borderRadius: 'var(--radius-md)', border: '1px dashed #94a3b8', cursor: 'pointer', marginBottom: '1rem' }}>
                            <input
                                type="file"
                                id="file-upload-input"
                                multiple
                                accept="image/*"
                                onChange={handleFilesSelected}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="file-upload-input" style={{ cursor: 'pointer', textAlign: 'center', width: '100%' }}>
                                <Upload size={32} color="var(--color-primary)" style={{ marginBottom: '0.5rem' }} />
                                <div style={{ fontSize: '0.95rem', fontWeight: '700' }}>Fotoğraf Seç veya Buraya Sürükle</div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>Birden fazla görsel seçebilirsiniz (JPG, PNG, WebP)</div>
                            </label>
                        </div>

                        {/* URL Option */}
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            <input
                                type="text"
                                value={newImageUrl}
                                onChange={e => setNewImageUrl(e.target.value)}
                                placeholder="Veya görsel bağlantısı (URL) yapıştırın"
                                style={{ flex: 1, padding: '0.5rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}
                            />
                            <button type="button" className="btn btn-primary" onClick={handleAddExtraImage} style={{ padding: '0.5rem 1rem' }}>
                                <Plus size={18} /> Ekle
                            </button>
                        </div>

                        {/* Selected Main Image & Gallery List */}
                        <div style={{ marginTop: '1rem' }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', color: '#475569' }}>Kapak Fotoğrafı:</div>
                            {formData.image ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'white', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                                    <img src={formData.image} style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover' }} alt="Kapak" />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#166534' }}>✓ Ana Kapak Görseli</div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '300px' }}>{formData.image}</div>
                                    </div>
                                    <button type="button" className="btn btn-outline" style={{ fontSize: '0.75rem', color: '#ef4444' }} onClick={() => setFormData({ ...formData, image: '' })}>Temizle</button>
                                </div>
                            ) : (
                                <div style={{ fontSize: '0.85rem', color: '#ef4444', fontStyle: 'italic', marginBottom: '1rem' }}>Lütfen bir ana görsel yükleyin veya seçin.</div>
                            )}

                            {extraImages.length > 0 && (
                                <>
                                    <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', color: '#475569' }}>Ek Galeri Resimleri ({extraImages.length}):</div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '0.75rem' }}>
                                        {extraImages.map((img, idx) => (
                                            <div key={idx} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                                                <img src={img.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={`Galeri ${idx}`} />
                                                <button
                                                    type="button"
                                                    title="Ana Kapak Yap"
                                                    onClick={() => handleSetAsMainImage(img.url)}
                                                    style={{ position: 'absolute', bottom: '2px', left: '2px', background: 'rgba(0,0,0,0.7)', color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.65rem', padding: '2px 4px', cursor: 'pointer' }}
                                                >
                                                    Kapak
                                                </button>
                                                <button
                                                    type="button"
                                                    title="Sil"
                                                    onClick={() => handleRemoveExtraImage(idx)}
                                                    style={{ position: 'absolute', top: '2px', right: '2px', background: '#ef4444', color: 'white', borderRadius: '50%', width: '20px', height: '20px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Dynamic Specifications Editor */}
                    <div className="form-group" style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0', marginTop: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: 'var(--color-primary)', margin: 0 }}>
                                <ListPlus size={20} /> Teknik Özellikler & Detaylar (Specifications)
                            </label>
                            <button type="button" className="btn btn-outline" style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }} onClick={handleAddSpec}>
                                <Plus size={16} /> Özellik Ekle
                            </button>
                        </div>

                        <div style={{ display: 'grid', gap: '0.75rem' }}>
                            {specs.map((spec, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <input
                                        type="text"
                                        value={spec.key}
                                        onChange={e => handleSpecChange(idx, 'key', e.target.value)}
                                        placeholder="Örn: Malzeme, Boyut, Garanti"
                                        style={{ flex: 1, padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}
                                    />
                                    <span style={{ fontWeight: 'bold', color: '#94a3b8' }}>:</span>
                                    <input
                                        type="text"
                                        value={spec.value}
                                        onChange={e => handleSpecChange(idx, 'value', e.target.value)}
                                        placeholder="Örn: Paslanmaz Çelik, 2 Yıl"
                                        style={{ flex: 1.5, padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSpec(idx)}
                                        style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2', borderRadius: 'var(--radius-md)', padding: '0.5rem', cursor: 'pointer' }}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="form-group" style={{ marginTop: '1.5rem' }}>
                        <label style={{ fontWeight: '700' }}>Detaylı Ürün Açıklaması</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            placeholder="Ürünün özelliklerini, hikayesini ve detaylarını yazın..."
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1', width: '100%' }}
                        />
                    </div>

                    <div className="modal-actions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                        <button type="button" className="btn btn-outline" style={{ flex: 1, padding: '0.75rem' }} onClick={onClose}>İptal</button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 2, padding: '0.75rem', fontWeight: '800' }}>
                            {editProduct ? 'Güncellemeleri Kaydet ✏️' : 'Ürünü Yayınla 🎉'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

