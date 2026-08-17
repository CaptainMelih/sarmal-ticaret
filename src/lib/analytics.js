import { supabase } from './supabase';

// Helper to generate or retrieve session ID
function getSessionId() {
    if (typeof window === 'undefined') return 'server_session';
    try {
        let sid = window.sessionStorage.getItem('sarmal_analytics_sid');
        if (!sid) {
            sid = 's_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
            window.sessionStorage.setItem('sarmal_analytics_sid', sid);
        }
        return sid;
    } catch (e) {
        return 'fallback_session';
    }
}

// Detect device category
function getDeviceType() {
    if (typeof window === 'undefined') return 'desktop';
    const ua = navigator.userAgent || '';
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'tablet';
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) return 'mobile';
    return 'desktop';
}

// Detect referrer source
function getTrafficSource() {
    if (typeof window === 'undefined') return 'Doğrudan';
    const ref = document.referrer ? document.referrer.toLowerCase() : '';
    if (!ref) return 'Doğrudan';
    if (ref.includes('instagram.com') || ref.includes('ig')) return 'Instagram';
    if (ref.includes('whatsapp') || ref.includes('wa.me')) return 'WhatsApp';
    if (ref.includes('google.') || ref.includes('googleadservices')) return 'Google';
    if (ref.includes('facebook.com') || ref.includes('fb.')) return 'Facebook';
    if (ref.includes('tiktok.com')) return 'TikTok';
    if (ref.includes('t.co') || ref.includes('twitter.com') || ref.includes('x.com')) return 'X (Twitter)';
    if (ref.includes('youtube.com')) return 'YouTube';
    return 'Diğer Web Siteleri';
}

// In-memory / local storage buffer for offline or resilient tracking
const LOCAL_ANALYTICS_KEY = 'sarmal_local_visits';

function getLocalVisits() {
    if (typeof window === 'undefined') return [];
    try {
        const raw = window.localStorage.getItem(LOCAL_ANALYTICS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveLocalVisit(visit) {
    if (typeof window === 'undefined') return;
    try {
        const existing = getLocalVisits();
        // Keep last 300 records in local buffer
        const updated = [visit, ...existing].slice(0, 300);
        window.localStorage.setItem(LOCAL_ANALYTICS_KEY, JSON.stringify(updated));
    } catch (e) {}
}

/**
 * Track a page view without blocking page render (fire-and-forget)
 */
export function trackPageView(path = '/', pageTitle = '') {
    if (typeof window === 'undefined') return;

    // Ignore admin pages from visitor metrics
    if (path.startsWith('/admin')) return;

    const visitData = {
        session_id: getSessionId(),
        path: path || window.location.pathname || '/',
        title: pageTitle || document.title || 'Sarmal Ticaret',
        device: getDeviceType(),
        source: getTrafficSource(),
        timestamp: new Date().toISOString()
    };

    // 1. Immediately store in local buffer for instantaneous metric calculation
    saveLocalVisit(visitData);

    // 2. Asynchronously broadcast to Supabase
    Promise.resolve().then(async () => {
        try {
            await supabase.from('site_visits').insert([{
                session_id: visitData.session_id,
                path: visitData.path,
                device: visitData.device,
                source: visitData.source,
                created_at: visitData.timestamp
            }]);
        } catch (err) {
            // Silently handled (local buffer acts as backup)
        }
    });
}

/**
 * Fetch and compute full real-time traffic analytics for Admin Panel
 */
export async function getTrafficAnalytics() {
    let visits = [];

    try {
        // Try fetching last 7 days of visits from Supabase
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const { data, error } = await supabase
            .from('site_visits')
            .select('*')
            .gte('created_at', sevenDaysAgo.toISOString())
            .order('created_at', { ascending: false })
            .limit(1000);

        if (!error && data && data.length > 0) {
            visits = data.map(d => ({
                session_id: d.session_id,
                path: d.path,
                device: d.device || 'mobile',
                source: d.source || 'Doğrudan',
                timestamp: d.created_at
            }));
        }
    } catch (e) {
        console.warn('Supabase site_visits fetch notice, using local cache:', e);
    }

    // Merge with local buffer to ensure instant real-time numbers
    const localVisits = getLocalVisits();
    const allVisits = [...visits, ...localVisits];

    // Deduplicate by session_id + timestamp (rounded to minute)
    const seen = new Set();
    const uniqueVisits = [];
    for (const v of allVisits) {
        const key = `${v.session_id}_${v.path}_${(v.timestamp || '').slice(0, 16)}`;
        if (!seen.has(key)) {
            seen.add(key);
            uniqueVisits.push(v);
        }
    }

    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // 1. Live Active Users (Last 5 mins)
    const activeSessions = new Set();
    uniqueVisits.forEach(v => {
        const vTime = new Date(v.timestamp);
        if (vTime >= fiveMinutesAgo) {
            activeSessions.add(v.session_id);
        }
    });
    // Default to at least 1 if admin is active
    const liveActiveUsers = Math.max(activeSessions.size, 1);

    // 2. Today's Unique Visitors & Page Views
    const todaySessions = new Set();
    let todayPageViews = 0;
    uniqueVisits.forEach(v => {
        const vTime = new Date(v.timestamp);
        if (vTime >= startOfToday) {
            todaySessions.add(v.session_id);
            todayPageViews++;
        }
    });
    const todayVisitors = Math.max(todaySessions.size, liveActiveUsers);

    // 3. Device Breakdown (100% Real Logs)
    const deviceCounts = { mobile: 0, desktop: 0, tablet: 0 };
    uniqueVisits.forEach(v => {
        const d = (v.device || 'mobile').toLowerCase();
        if (deviceCounts[d] !== undefined) deviceCounts[d]++;
        else deviceCounts.mobile++;
    });
    const totalDevices = (deviceCounts.mobile + deviceCounts.desktop + deviceCounts.tablet);
    const deviceStats = {
        mobilePct: totalDevices > 0 ? Math.round((deviceCounts.mobile / totalDevices) * 100) : 0,
        desktopPct: totalDevices > 0 ? Math.round((deviceCounts.desktop / totalDevices) * 100) : 0,
        tabletPct: totalDevices > 0 ? Math.round((deviceCounts.tablet / totalDevices) * 100) : 0
    };

    // 4. Traffic Sources (100% Real Referrers)
    const sourceCounts = {};
    uniqueVisits.forEach(v => {
        const s = v.source || 'Doğrudan';
        sourceCounts[s] = (sourceCounts[s] || 0) + 1;
    });

    // 5. 7-Day Visitor Trend (Day by Day Real Logs)
    const dayNames = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
    const weeklyTrend = [];
    for (let i = 6; i >= 0; i--) {
        const targetDate = new Date(now);
        targetDate.setDate(targetDate.getDate() - i);
        const dayStart = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
        const dayEnd = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 23, 59, 59);

        const daySessions = new Set();
        let dayViews = 0;
        uniqueVisits.forEach(v => {
            const vTime = new Date(v.timestamp);
            if (vTime >= dayStart && vTime <= dayEnd) {
                daySessions.add(v.session_id);
                dayViews++;
            }
        });

        const count = i === 0 ? todayVisitors : daySessions.size;

        weeklyTrend.push({
            date: targetDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }),
            dayName: dayNames[targetDate.getDay()],
            visitors: count,
            views: dayViews
        });
    }

    // 6. Top Visited Pages & Products (100% Real Path Logging)
    const pageCounts = {};
    uniqueVisits.forEach(v => {
        const p = v.path || '/';
        pageCounts[p] = (pageCounts[p] || 0) + 1;
    });

    const topPages = Object.entries(pageCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([path, count]) => {
            let label = 'Anasayfa';
            if (path.startsWith('/product/')) label = `Ürün #${path.replace('/product/', '')}`;
            else if (path.startsWith('/category/')) label = `Kategori #${path.replace('/category/', '')}`;
            else if (path === '/checkout') label = 'Ödeme Sayfası';
            else if (path === '/cart') label = 'Sepet Sayfası';
            else if (path === '/hakkimizda') label = 'Hakkımızda';

            return { path, label, count };
        });

    return {
        liveActiveUsers,
        todayVisitors,
        todayPageViews: Math.max(todayPageViews, todayVisitors),
        deviceStats,
        sourceCounts,
        weeklyTrend,
        topPages
    };
}
