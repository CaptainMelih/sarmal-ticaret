import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User } from 'lucide-react';

const BOT_RESPONSES = [
    'Merhaba! Size nasıl yardımcı olabilirim? 😊',
    'Ürünlerimiz hakkında detaylı bilgi almak için müşteri hizmetlerimizi arayabilirsiniz.',
    'Siparişleriniz 2-3 iş günü içinde kargoya verilir.',
    'Ücretsiz kargo tüm siparişlerde geçerlidir! 🚚',
    'Ürünlerimizde %100 müşteri memnuniyeti garantisi vardır.',
    'Başka nasıl yardımcı olabilirim?'
];

export function LiveSupport() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Merhaba! Sarmal Ticaret müşteri hizmetlerine hoş geldiniz. Size nasıl yardımcı olabilirim?', sender: 'bot', time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            text: inputText,
            sender: 'user',
            time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setInputText('');
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            setIsTyping(false);
            const botMessage = {
                id: messages.length + 2,
                text: BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)],
                sender: 'bot',
                time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMessage]);
        }, 1500);
    };

    return (
        <>
            {/* Chat Widget Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '3.5rem',
                    height: '3.5rem',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    boxShadow: isOpen ? 'none' : '0 8px 16px rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    zIndex: 1001
                }}
                onMouseEnter={(e) => {
                    if (!isOpen) e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                    if (!isOpen) e.currentTarget.style.transform = 'scale(1)';
                }}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
                {!isOpen && (
                    <span style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        width: '20px',
                        height: '20px',
                        background: 'var(--color-accent)',
                        borderRadius: '50%',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        animation: 'pulse 2s infinite'
                    }}>
                        !
                    </span>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    bottom: '6rem',
                    right: '2rem',
                    width: '350px',
                    height: '500px',
                    background: 'white',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    zIndex: 1001,
                    animation: 'slideUp 0.3s ease'
                }}>
                    {/* Header */}
                    <div style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-primary)'
                        }}>
                            <User size={20} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600' }}>Müşteri Hizmetleri</div>
                            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                                <span style={{
                                    display: 'inline-block',
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: '#4ade80',
                                    marginRight: '0.5rem'
                                }} />
                                Online
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '1rem',
                        background: '#f5f7fa',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        {messages.map(msg => (
                            <div
                                key={msg.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                                }}
                            >
                                <div style={{
                                    maxWidth: '75%',
                                    background: msg.sender === 'user'
                                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                        : 'white',
                                    color: msg.sender === 'user' ? 'white' : 'var(--color-text)',
                                    padding: '0.75rem 1rem',
                                    borderRadius: msg.sender === 'user'
                                        ? '1rem 1rem 0 1rem'
                                        : '1rem 1rem 1rem 0',
                                    boxShadow: 'var(--shadow-sm)'
                                }}>
                                    <div>{msg.text}</div>
                                    <div style={{
                                        fontSize: '0.75rem',
                                        opacity: 0.7,
                                        marginTop: '0.25rem',
                                        textAlign: 'right'
                                    }}>
                                        {msg.time}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <div style={{
                                    background: 'white',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '1rem 1rem 1rem 0',
                                    boxShadow: 'var(--shadow-sm)',
                                    display: 'flex',
                                    gap: '0.25rem'
                                }}>
                                    <span style={{ animation: 'bounce 1s infinite', animationDelay: '0s' }}>●</span>
                                    <span style={{ animation: 'bounce 1s infinite', animationDelay: '0.2s' }}>●</span>
                                    <span style={{ animation: 'bounce 1s infinite', animationDelay: '0.4s' }}>●</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div style={{
                        padding: '1rem',
                        background: 'white',
                        borderTop: '1px solid #e2e8f0',
                        display: 'flex',
                        gap: '0.5rem'
                    }}>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Mesajınızı yazın..."
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                border: '1px solid #e2e8f0',
                                borderRadius: 'var(--radius-lg)',
                                outline: 'none'
                            }}
                        />
                        <button
                            onClick={handleSend}
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 'var(--radius-lg)',
                                padding: '0.75rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </>
    );
}
