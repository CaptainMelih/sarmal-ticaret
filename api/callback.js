export default function handler(req, res) {
    const { status } = req.query || {};
    if (status === 'success') {
        res.redirect(302, '/?success=true');
    } else {
        res.redirect(302, '/?error=payment_failed');
    }
}
