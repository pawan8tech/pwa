// export default function swDev() {
//   let swUrl = `/sw.js`;
//   navigator.serviceWorker.register(swUrl).then(
//     (registration) => {
//       console.log(
//         "ServiceWorker registration successful with scope: ",
//         registration.scope
//       );
//     },
//     (err) => {
//       console.error("ServiceWorker registration failed: ", err);
//     }
//   );
// }

export default function swDev() {
  function determineAppServerKey() {
    const vapidPublicKey =
      "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
    return urlBase64ToUint8Array(vapidPublicKey);
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // let swUrl = `sw.js`;
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.log("Service Worker registered:", registration);

      // Subscribe to push notifications
      registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: determineAppServerKey(),
        })
        .then(function (subscription) {
          console.log("Push subscription successful:", subscription);
        })
        .catch(function (error) {
          console.error("Error subscribing to push notifications:", error);
        });
    })
    .catch(function (error) {
      console.error("Service Worker registration failed:", error);
    });
}

//
// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker.register("/sw.js").then(
//       (registration) => {
//       },
//       (err) => {
//         console.error("ServiceWorker registration failed: ", err);
//       }
//     );
//   });
// }
