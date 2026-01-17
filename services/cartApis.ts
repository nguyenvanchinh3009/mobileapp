import { ref, onValue, remove, push } from "firebase/database";
import { db } from "../firebaseConfig";

export const addToCart = (product: any) => {
  push(ref(db, "carts"), {
    productId: product.key,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1,
  });
};

export const getCartItems = (): Promise<any[]> => {
  return new Promise((resolve) => {
    onValue(ref(db, "carts"), (snapshot) => {
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

export const clearCart = () => {
  remove(ref(db, "carts"));
};
