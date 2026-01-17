import { ref, push, update, onValue, get } from "firebase/database";
import { db } from "../firebaseConfig";

/* ===== TẠO ĐƠN ===== */
export const createOrder = (
  userId: string,
  items: any[],
  total: number,
  paymentMethod: "cash" | "bank"
) => {
  return push(ref(db, "orders"), {
    userId,
    items,
    total,
    paymentMethod,
    status: "pending",
    createdAt: Date.now(),
  });
};

/* ===== ADMIN XÁC NHẬN ===== */
export const confirmOrder = (orderId: string) => {
  return update(ref(db, `orders/${orderId}`), {
    status: "confirmed",
    confirmedAt: Date.now(),
  });
};

/* ===== ADMIN LẤY TẤT CẢ ĐƠN ===== */
export const getAllOrders = (callback: (orders: any[]) => void) => {
  onValue(ref(db, "orders"), (snapshot) => {
    const data = snapshot.val();
    if (!data) return callback([]);

    callback(
      Object.keys(data).map((id) => ({
        id,
        ...data[id],
      }))
    );
  });
};

/* ===== USER XEM BILL ===== */
export const getOrderById = async (orderId: string) => {
  const snap = await get(ref(db, `orders/${orderId}`));
  return snap.exists() ? snap.val() : null;
};
