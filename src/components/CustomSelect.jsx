import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export function CustomSelect({ value, onChange, options, placeholder, required, disabled }) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div ref={selectRef} style={{ position: 'relative', width: '100%', opacity: disabled ? 0.6 : 1, pointerEvents: disabled ? 'none' : 'auto' }}>
            <div
                onClick={() => !disabled && setIsOpen(!isOpen)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: isOpen ? '2px solid var(--color-primary)' : '1px solid #e2e8f0',
                    background: disabled ? '#f8fafc' : 'white',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    userSelect: 'none',
                    minHeight: '48px'
                }}
            >
                <span style={{ color: selectedOption ? 'inherit' : '#94a3b8', fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown size={18} color="#64748b" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
            </div>
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    marginTop: '4px',
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    maxHeight: '260px',
                    overflowY: 'auto',
                    zIndex: 9999
                }}>
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            onClick={() => {
                                onChange(opt.value);
                                setIsOpen(false);
                            }}
                            style={{
                                padding: '0.75rem 1rem',
                                cursor: 'pointer',
                                background: opt.value === value ? '#f0f7ff' : 'white',
                                color: opt.value === value ? 'var(--color-primary)' : 'inherit',
                                borderBottom: '1px solid #f1f5f9',
                                fontSize: '0.95rem'
                            }}
                            onMouseEnter={e => e.target.style.background = '#f8fafc'}
                            onMouseLeave={e => e.target.style.background = opt.value === value ? '#f0f7ff' : 'white'}
                        >
                            {opt.label}
                        </div>
                    ))}
                    {options.length === 0 && (
                        <div style={{ padding: '1rem', color: '#94a3b8', textAlign: 'center', fontSize: '0.9rem' }}>
                            Seçenek bulunamadı
                        </div>
                    )}
                </div>
            )}
            <input 
                type="text" 
                value={value} 
                onChange={() => {}} 
                required={required} 
                style={{ opacity: 0, position: 'absolute', height: 0, width: 0, padding: 0, border: 0, pointerEvents: 'none' }} 
            />
        </div>
    );
}
