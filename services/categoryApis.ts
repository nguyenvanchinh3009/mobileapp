import { onValue, ref } from "firebase/database";
import { db } from "../firebaseConfig";

export const getAllCategories = (): Promise<any[]> => {
  return new Promise((resolve) => {
    onValue(ref(db, "categories"), (snapshot) => {
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
