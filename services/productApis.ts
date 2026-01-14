import { getDatabase, ref, get } from "firebase/database";
import { app } from "../firebaseConfig";

const db = getDatabase(app);

export const getAllProducts = async () => {
  const snapshot = await get(ref(db, "products"));

  if (!snapshot.exists()) return [];

  return Object.entries(snapshot.val()).map(([key, value]: any) => ({
    key,        // 🔥 dùng Firebase key
    ...value
  }));
};
