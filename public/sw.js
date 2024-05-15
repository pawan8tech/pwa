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
    if (event.request.url === "https://jsonplaceholder.typicode.com/users") {
      event.waitUntil(
        this.registration.showNotification("Internet", {
          body: "internet not working",
        })
      );
    }
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
// self.addEventListener("push", (event) => {
//   const data = event.data.json();
//   const options = {
//     body: data.body,
//     icon: "/logo192.png",
//     badge: "/logo192.png",
//   };
//   event.waitUntil(self.registration.showNotification(data.title, options));
// });
