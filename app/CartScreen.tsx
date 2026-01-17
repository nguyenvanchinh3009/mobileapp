import { getDatabase, push, ref } from "firebase/database";

export const createOrder = (
  items: any[],
  total: number,
  paymentMethod: "COD" | "BANK"
) => {
  const db = getDatabase();
  const orderRef = ref(db, "orders");

  return push(orderRef, {
    items,
    total,  
    paymentMethod,
    status: paymentMethod === "COD" ? "PENDING" : "WAITING_TRANSFER",
    createdAt: Date.now(),
  });
};
