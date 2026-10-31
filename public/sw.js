// Pop Seat Cinema — Service Worker

const CACHE_NAME = 'pop-seat-sw-v1';

self.addEventListener('install', (event) => {
  // Skip waiting so the SW activates immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Claim all open clients without requiring a reload
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass-through: let every request go to the network as normal
  event.respondWith(fetch(event.request));
});

