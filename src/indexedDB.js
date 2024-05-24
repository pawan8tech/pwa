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
