import { getDatabase, ref, get } from "firebase/database";
import { app } from "../firebaseConfig";

const db = getDatabase(app);

export const getAllCategories = async () => {
  const snapshot = await get(ref(db, "categories"));

  if (!snapshot.exists()) return [];

  return Object.entries(snapshot.val()).map(([key, value]: any) => ({
    key,
    ...value
  }));
};
