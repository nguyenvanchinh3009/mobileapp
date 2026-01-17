import { onValue, ref } from "firebase/database";
import { db } from "../firebaseConfig";

export const getAllProducts = (): Promise<any[]> => {
  return new Promise((resolve) => {
    onValue(ref(db, "products"), (snapshot) => {
      const data = snapshot.val() || {};
      resolve(
        Object.keys(data).map((key) => ({
          key,
          ...data[key],
        }))
      );
    });
  });
};

export const getProductsByCategory = (categoryId: string): Promise<any[]> => {
  return new Promise((resolve) => {
    onValue(ref(db, "products"), (snapshot) => {
      const data = snapshot.val() || {};
      resolve(
        Object.keys(data)
          .map((key) => ({ key, ...data[key] }))
          .filter((p) => p.categoryId === categoryId)
      );
    });
  });
};
