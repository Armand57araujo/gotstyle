const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

// Cache strategy for CSS and JavaScript files
const assetsCache = new CacheFirst({
  cacheName: 'assets-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxEntries: 50, // Max number of entries to cache
      maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
    }),
  ],
});

// Cache strategy for images
const imagesCache = new StaleWhileRevalidate({
  cacheName: 'images-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
  ],
});

// Register routes for different asset types
registerRoute(
  /\.(?:js|css)$/,
  ({ request }) => {
    return assetsCache.handle({ request });
  }
);

registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  ({ request }) => {
    return imagesCache.handle({ request });
  }
);
