import { db } from "@/firebaseConfig";
import { onValue, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";

export default function AdminOrderScreen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersRef = ref(db, "orders");
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(id => ({
          id,
          ...data[id]
        }));
        setOrders(list);
      }
    });
  }, []);

  const confirmOrder = (id) => {
    update(ref(db, `orders/${id}`), {
      status: "confirmed"
    });
  };

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>Tổng: {item.total}đ</Text>
          <Text>Thanh toán: {item.paymentMethod}</Text>
          <Text>Trạng thái: {item.status}</Text>

          {item.status === "pending" && (
            <Button
              title="Xác nhận"
              onPress={() => confirmOrder(item.id)}
            />
          )}
        </View>
      )}
    />
  );
}
