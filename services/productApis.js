import { onValue, ref } from "firebase/database";
import { db } from "../firebaseConfig";


// Lấy tất cả sản phẩm
export const getProducts = (callback) => {
  const productsRef = ref(db, "products");
  onValue(productsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const productsArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      callback(productsArray);
    } else {
      callback([]);
    }
  });
};

// Lấy sản phẩm theo categoryId
export const getProductsByCategory = (categoryId, callback) => {
  getProducts((allProducts) => {
    const filtered = allProducts.filter(
      (item) => item.categoryId === categoryId
    );
    callback(filtered);
  });
};
