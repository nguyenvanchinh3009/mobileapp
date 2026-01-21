import { ref, push } from "firebase/database";
import { db } from "./firebaseData";

export const createOrder = async (items: any[], total: number) => {
  const orderRef = ref(db, "orders");

  const order = {
    items: items || [],
    total: Number(total) || 0,
    status: "pending",
    createdAt: Date.now(),
  };

  return push(orderRef, order);
};
