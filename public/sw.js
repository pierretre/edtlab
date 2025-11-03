// Service Worker for caching strategies and offline support
const CACHE_NAME = 'edt-website-v1';
const STATIC_CACHE = 'edt-static-v1';
const DYNAMIC_CACHE = 'edt-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/en/',
    '/fr/',
    '/src/assets/fonts/Marianne-Regular.woff2',
    '/src/assets/fonts/Marianne-Bold.woff2',
    '/favicon.png',
    '/offline.html' // We'll create this
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');

    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Static assets cached');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Failed to cache static assets', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip external requests
    if (url.origin !== location.origin) {
        return;
    }

    event.respondWith(
        cacheFirst(request)
            .catch(() => networkFirst(request))
            .catch(() => fallbackResponse(request))
    );
});

// Cache-first strategy for static assets
async function cacheFirst(request) {
    const url = new URL(request.url);

    // Use cache-first for static assets
    if (isStaticAsset(url.pathname)) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }

    throw new Error('Not a static asset');
}

// Network-first strategy for dynamic content
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);

        if (networkResponse.ok) {
            // Cache successful responses
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        // Network failed, try cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        throw error;
    }
}

// Fallback response for offline scenarios
async function fallbackResponse(request) {
    // const url = new URL(request.url); // Unused for now

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
        const offlineResponse = await caches.match('/offline.html');
        if (offlineResponse) {
            return offlineResponse;
        }
    }

    // Return a basic response for other requests
    return new Response('Offline', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}

// Helper function to identify static assets
function isStaticAsset(pathname) {
    return (
        pathname.startsWith('/_assets/') ||
        pathname.startsWith('/images/') ||
        pathname.startsWith('/fonts/') ||
        pathname.endsWith('.css') ||
        pathname.endsWith('.js') ||
        pathname.endsWith('.woff2') ||
        pathname.endsWith('.woff') ||
        pathname.endsWith('.png') ||
        pathname.endsWith('.jpg') ||
        pathname.endsWith('.jpeg') ||
        pathname.endsWith('.svg') ||
        pathname.endsWith('.webp') ||
        pathname.endsWith('.avif')
    );
}

// Background sync for analytics (if supported)
self.addEventListener('sync', (event) => {
    if (event.tag === 'analytics-sync') {
        event.waitUntil(syncAnalytics());
    }
});

async function syncAnalytics() {
    // Sync any queued analytics data when back online
    try {
        const queuedData = await getQueuedAnalytics();
        if (queuedData.length > 0) {
            for (const data of queuedData) {
                await sendAnalytics(data);
            }
            await clearQueuedAnalytics();
        }
    } catch (error) {
        console.error('Failed to sync analytics:', error);
    }
}

// Helper functions for analytics queue (simplified)
async function getQueuedAnalytics() {
    // Implementation would depend on your analytics setup
    return [];
}

async function sendAnalytics(data) {
    // Implementation would depend on your analytics setup
    return fetch('/analytics', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

async function clearQueuedAnalytics() {
    // Clear the analytics queue
}

// Message handling for analytics and other features
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'ANALYTICS_SYNC') {
        // Handle analytics sync requests
        console.log('Service Worker: Analytics sync requested');
    }
});

// Periodic cache cleanup
setInterval(() => {
    cleanupOldCaches();
}, 24 * 60 * 60 * 1000); // Run daily

async function cleanupOldCaches() {
    try {
        const cache = await caches.open(DYNAMIC_CACHE);
        const requests = await cache.keys();
        const now = Date.now();
        const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days

        for (const request of requests) {
            const response = await cache.match(request);
            if (response) {
                const dateHeader = response.headers.get('date');
                if (dateHeader) {
                    const responseDate = new Date(dateHeader).getTime();
                    if (now - responseDate > maxAge) {
                        await cache.delete(request);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Cache cleanup failed:', error);
    }
}