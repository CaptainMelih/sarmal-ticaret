/**
 * Security and Data Protection Utility Functions
 */

export function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/[<>]/g, '')
        .trim();
}

export function maskName(name) {
    if (!name || typeof name !== 'string') return 'Müşteri';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
        return parts[0].charAt(0) + '***';
    }
    const firstName = parts[0];
    const lastName = parts[parts.length - 1];
    return `${firstName.charAt(0)}*** ${lastName.charAt(0)}.`;
}

export function maskPhone(phone) {
    if (!phone || typeof phone !== 'string') return '05** *** ** **';
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) return '05** *** ** **';
    return `${digits.slice(0, 4)} *** ** ${digits.slice(-2)}`;
}

export function maskAddress(city, district) {
    const c = city ? `${city.slice(0, 2)}***` : 'İst***';
    const d = district ? `${district.slice(0, 2)}***` : 'Ka***';
    return `${d} / ${c}`;
}
