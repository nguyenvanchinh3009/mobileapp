import { ref, get } from "firebase/database";
import { db } from "../firebaseConfig";

// lấy tất cả sản phẩm
export async function getAllProducts() {
  const snapshot = await get(ref(db, "products"));
  if (!snapshot.exists()) return [];

  const data = snapshot.val();
  return Object.keys(data).map(key => data[key]);
}

// ✅ LẤY SẢN PHẨM THEO CATEGORY
export async function getProductsByCategory(categoryId: string) {
  const snapshot = await get(ref(db, "products"));
  if (!snapshot.exists()) return [];

  const data = snapshot.val();

  return Object.keys(data)
    .map(key => data[key])
    .filter(product => product.categoryId === categoryId);
}
