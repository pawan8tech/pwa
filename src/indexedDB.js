//  its working fine but it store video when fetch
import { openDB } from "idb";

const DB_NAME = "video-storage";
const DB_VERSION = 1;
const STORE_NAME = "videos";

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

export const saveVideo = async (video) => {
  const db = await initDB();
  await db.put(STORE_NAME, video);
};

export const getVideo = async (id) => {
  const db = await initDB();
  return await db.get(STORE_NAME, id);
};

export const getAllVideos = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

export const deleteVideo = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};

// export const openDatabase = () => {
//   return new Promise((resolve, reject) => {
//     const request = indexedDB.open("VideoStore", 1);

//     request.onupgradeneeded = (event) => {
//       const db = event.target.result;
//       if (!db.objectStoreNames.contains("videos")) {
//         db.createObjectStore("videos", { keyPath: "id" });
//       }
//     };

//     request.onsuccess = (event) => {
//       resolve(event.target.result);
//     };

//     request.onerror = (event) => {
//       reject(event.target.error);
//     };
//   });
// };

// export const saveVideo = (db, id, blob) => {
//   return new Promise((resolve, reject) => {
//     const transaction = db.transaction(["videos"], "readwrite");
//     const store = transaction.objectStore("videos");
//     const request = store.put({ id, blob });

//     request.onsuccess = () => {
//       resolve();
//     };

//     request.onerror = (event) => {
//       reject(event.target.error);
//     };
//   });
// };

// export const getVideo = (db, id) => {
//   return new Promise((resolve, reject) => {
//     const transaction = db.transaction(["videos"], "readonly");
//     const store = transaction.objectStore("videos");
//     const request = store.get(id);

//     request.onsuccess = (event) => {
//       resolve(event.target.result);
//     };

//     request.onerror = (event) => {
//       reject(event.target.error);
//     };
//   });
// };
