/**
 * Helper utilities for secure order codes and tracking numbers.
 */

export function formatOrderCode(orderOrId) {
    if (!orderOrId && orderOrId !== 0) return 'SRM-00000';
    
    // If passed full order object with custom order_code
    if (typeof orderOrId === 'object' && orderOrId !== null) {
        if (orderOrId.order_code) return orderOrId.order_code;
        const num = parseInt(String(orderOrId.id).replace(/\D/g, '')) || 0;
        return `SRM-${String(num).padStart(5, '0')}`;
    }

    const num = parseInt(String(orderOrId).replace(/\D/g, '')) || 0;
    return `SRM-${String(num).padStart(5, '0')}`;
}

export function generateTrackingNumber(orderId) {
    const num = parseInt(String(orderId).replace(/\D/g, '')) || Math.floor(Math.random() * 90000 + 10000);
    const randomSuffix = Math.floor(Math.random() * 900 + 100);
    return `TRK-${num}${randomSuffix}`;
}
