const cacheName = "appV1";
const urlsToCache = [
  "/static/js/bundle.js",
  "/index.html",
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
        const cache = await caches.open("appV1");
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        const networkResponse = await fetch(event.request);
        await cache.put(event.request, networkResponse.clone());
        return networkResponse;
      } catch (error) {
        // Log the error and return a cached response
        console.error("Error fetching and caching:", error);
        const cache = await caches.open("appV1");
        const cachedResponse = await cache.match(event.request);
        return (
          cachedResponse ||
          new Response(null, { status: 404, statusText: "Not found" })
        );
      }
    })()
  );
});

// self.addEventListener("fetch", (event) => {
//   console.log("Fetch event for ", event.request.url);
//   if (!navigator.onLine) {
//     event.respondWith(
//       (async () => {
//         try {
//           const cache = await caches.open("appV1");
//           const cachedResponse = await cache.match(event.request);
//           if (cachedResponse) {
//             return cachedResponse;
//           }
//           const networkResponse = await fetch(event.request);
//           await cache.put(event.request, networkResponse.clone());
//           return networkResponse;
//         } catch (error) {
//           // If an error occurs during caching or fetching, handle it here
//           console.error("Error fetching and caching:", error);
//         }
//       })()
//     );
//   }
// });

// self.addEventListener("fetch", (event) => {
//   console.log("Fetch event for ", event.request.url);
//   if (!navigator.onLine) {
//     event.respondWith(
//       (async () => {
//         let cachedResponse = await caches.match(event.request);
//         if (cachedResponse) {
//           return cachedResponse;
//         }
//         return fetch(event.request);
//       })()
//       // caches
//       //   .match(event.request)
//       //   .then((response) => {
//       //     if (response) {
//       //       console.log("Found response in cache:", response);
//       //       return response;
//       //     }

//       //     let requestUrl = event.request.clone();
//       //     return fetch(requestUrl).catch((error) => {
//       //       console.error("Fetch failed:", error);
//       //     });
//       //   })
//       //   .catch((error) => {
//       //     console.error("Cache match failed:", error);
//       //   })
//     );
//   }
// });

// const cacheName = "appV1";
// const urlsToCache = [
//   "/static/js/bundle.js",
//   "/manifest.json",
//   "/index.html",
//   "/users",
//   "/User",
//   "/About",
// ];

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(cacheName).then((cache) => {
//       console.log("cashed all data");
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   if (!navigator.online) {
//     // if (event.request.url === "https://jsonplaceholder.typicode.com/users") {
//     //     event.waitUntil(
//     //       this.registration.showNotification("Internet", {
//     //         body: "Data Fetch Successfully",
//     //         icon: "/logo192.png",
//     //       })
//     //     );
//     //   }
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         if (response) {
//           return response;
//         }

//         let requestUrl = event.request.clone();
//         return fetch(requestUrl);
//       })
//     );
//   }
// });
