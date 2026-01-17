import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { ref, onValue, update } from "firebase/database";
import { db } from "../firebaseConfig";

export default function AdminOrderScreen() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const orderRef = ref(db, "orders");

    onValue(orderRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return setOrders([]);

      const list = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setOrders(list);
    });
  }, []);

  const confirmOrder = (orderId: string) => {
    update(ref(db, `orders/${orderId}`), {
      status: "confirmed",
      confirmedAt: Date.now(),
    });
  };

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text>ID: {item.id}</Text>
          <Text>User: {item.userId}</Text>
          <Text>Tổng: {item.total}đ</Text>
          <Text>Trạng thái: {item.status}</Text>

          {item.status === "pending" && (
            <Pressable
              style={styles.btn}
              onPress={() => confirmOrder(item.id)}
            >
              <Text style={{ color: "#fff" }}>XÁC NHẬN</Text>
            </Pressable>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    margin: 10,
    borderRadius: 8,
  },
  btn: {
    backgroundColor: "green",
    padding: 8,
    marginTop: 8,
    alignItems: "center",
    borderRadius: 6,
  },
});
