import { db } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";

// Lấy danh sách category
export const getCategories = (callback) => {
  const categoriesRef = ref(db, "categories");
  onValue(categoriesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const categoriesArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      callback(categoriesArray);
    } else {
      callback([]);
    }
  });
};
