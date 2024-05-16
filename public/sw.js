const cacheName = "appV1";
const urlsToCache = ["/static/js/bundle.js", "/index.html", "/users"];

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
  if (!navigator.online) {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          if (response) {
            console.log("Found response in cache:", response);
            return response;
          }

          let requestUrl = event.request.clone();
          return fetch(requestUrl).catch((error) => {
            console.error("Fetch failed:", error);
          });
        })
        .catch((error) => {
          console.error("Cache match failed:", error);
        })
    );
  }
});

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
