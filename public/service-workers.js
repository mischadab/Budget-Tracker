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
});

// fetch cache
self.addEventListener('fetch', event => {
    const { url } = event.request;
    if (url.includes("/api/")) {
        event.respondWith(
            caches.open(DATA_CACHE_NAME).then(cache => {
                return fetch(url)
                    .then(response => {
                        // if response was good, clone it and store it in the cache
                        if (response.status === 200) {
                            cache.put(event.request, response.clone())
                        }
                        return response;
                    })
                    .catch(err => {
                        return cache.match(url);
                    });
            })
                .catch(err => console.log(err))
        )
        return; 
    } 
    event.respondWith(
        fetch(event.request).catch(function(){
            return cache.match(event.request).then(response => {
                return response;
            })
        })
    )
})

