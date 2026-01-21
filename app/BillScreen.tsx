import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function BillScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    if (!params.cart) return;

    const raw =
      typeof params.cart === "string"
        ? params.cart
        : params.cart[0];

    setCart(JSON.parse(raw));
  }, []);

  const total = Number(params.total || 0);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        🧾 HÓA ĐƠN
      </Text>

      {cart.map((p) => (
        <Text key={p.id}>
          {p.name} x{p.quantity} ={" "}
          {(p.price * p.quantity).toLocaleString()} đ
        </Text>
      ))}

      <Text style={{ marginTop: 10, fontWeight: "bold" }}>
        Tổng: {total.toLocaleString()} đ
      </Text>

      <Pressable
        onPress={() => router.replace("/Home")}
        style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: "#444",
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          VỀ TRANG CHỦ
        </Text>
      </Pressable>
    </View>
  );
}
