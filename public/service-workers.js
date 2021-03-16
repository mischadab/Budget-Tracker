const CACHE_NAME = "bank-cache-v1";
const DATA_CACHE_NAME = "data-cache-v2";

const URLS_TO_CACHE = [
    '/',
    '/db.js',
    '/index.js',
    '/style.css',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// event handler install
self.addEventListener('install', event => {
    // steps for installing cache
    event.waitUntil(
        caches.open('CACHE_NAME').then(cache => {
            console.log("cache is open")
            return cache.addAll(URLS_TO_CACHE)
        })
    )
})