import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ref, onValue } from "firebase/database";
import { db } from "../firebaseConfig";

export default function BillScreen({ route }: any) {
  const { orderId } = route.params;
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const orderRef = ref(db, `orders/${orderId}`);

    const unsub = onValue(orderRef, (snapshot) => {
      if (snapshot.exists()) {
        setOrder(snapshot.val());
      }
    });

    return () => unsub();
  }, [orderId]);

  if (!order) return <Text>Đang tải bill...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧾 HÓA ĐƠN</Text>

      <Text>Trạng thái: {order.status}</Text>
      <Text>Thanh toán: {order.paymentMethod}</Text>

      <Text style={styles.line}>-------------------</Text>

      {order.items?.map((item: any, index: number) => (
        <Text key={index}>
          {item.name} x {item.qty} = {item.price * item.qty}đ
        </Text>
      ))}

      <Text style={styles.total}>Tổng: {order.total}đ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  total: { marginTop: 10, fontWeight: "bold", color: "green" },
  line: { marginVertical: 10 },
});
