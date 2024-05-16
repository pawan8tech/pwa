const cacheName = "appV1";
const urlsToCache = [
  "static/js/bundle.js",
  // "manifest.json",
  "/index.html",
  "/",
  "/sw.js",
  "/User",
  "/About",
  // "/favicon.ico",
  // "/logo192.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (!navigator.online) {
    //   if (event.request.url === "https://jsonplaceholder.typicode.com/users") {
    //     event.waitUntil(
    //       this.registration.showNotification("Internet", {
    //         body: "Data Fetch Successfully",
    //         icon: "/logo192.png",
    //       })
    //     );
    //   }
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }

        let requestUrl = event.request.clone();
        return fetch(requestUrl);
      })
    );
  }
});
