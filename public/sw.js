const cacheName = "appV1";
const urlsToCache = [
  "/index.html",
  "/static/js/bundle.js",
  "/favicon.ico",
  "/logo192.png",
  "/manifest.json",
  "https://jsonplaceholder.typicode.com/users",
  "/",
  "/User",
  "/About",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("Caching all data");
      return cache.addAll(urlsToCache).catch((error) => {
        console.error("Failed to cache", error);
      });
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Fetch event for ", event.request.url);
  event.respondWith(
    (async () => {
      try {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        const networkResponse = await fetch(event.request);

        // Check if the response is opaque
        if (networkResponse.type === "opaque") {
          // Handle the opaque response (e.g., video files)
          return networkResponse;
        }

        // Only cache non-opaque responses
        if (event.request.destination !== "video" && networkResponse.ok) {
          await cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      } catch (error) {
        console.error("Error fetching and caching:", error);
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(event.request);
        return (
          cachedResponse ||
          new Response(null, { status: 404, statusText: "Not found" })
        );
      }
    })()
  );
});

self.addEventListener("push", function (event) {
  console.log("Push Notification received");
  const options = {
    body: event.data.text(),
    icon: "/logo192.png",
    badge: "/favicon.ico",
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// // this code working fine but after the offline mode its give error when download
// const cacheName = "appV1";
// const urlsToCache = [
//   "/index.html",
//   "/static/js/bundle.js",
//   "/favicon.ico",
//   "/logo192.png",
//   "/manifest.json",
//   "https://jsonplaceholder.typicode.com/users",
//   "/",
//   "/User",
//   "/About",
// ];

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(cacheName).then((cache) => {
//       console.log("Caching all data");
//       return cache.addAll(urlsToCache).catch((error) => {
//         console.error("Failed to cache", error);
//       });
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   console.log("Fetch event for ", event.request.url);
//   event.respondWith(
//     (async () => {
//       try {
//         const cache = await caches.open("appV1");
//         const cachedResponse = await cache.match(event.request);
//         if (cachedResponse) {
//           return cachedResponse;
//         }
//         const networkResponse = await fetch(event.request);
//         // Only cache video files
//         if (event.request.destination === "video") {
//           await cache.put(event.request, networkResponse.clone());
//         }
//         // await cache.put(event.request, networkResponse.clone());
//         return networkResponse;
//       } catch (error) {
//         // Log the error and return a cached response
//         console.error("Error fetching and caching:", error);
//         const cache = await caches.open("appV1");
//         const cachedResponse = await cache.match(event.request);
//         return (
//           cachedResponse ||
//           new Response(null, { status: 404, statusText: "Not found" })
//         );
//       }
//     })()
//   );
// });

// self.addEventListener("push", function (event) {
//   console.log("Push Notification received");
//   const options = {
//     body: event.data.text(),
//     icon: "/logo192.png",
//     badge: "/favicon.ico",
//   };
//   event.waitUntil(
//     self.registration.showNotification("Push Notification", options)
//   );
// });
