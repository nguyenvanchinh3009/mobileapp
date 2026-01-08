import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router"; // ✅ thay cho navigation.navigate
import React, { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Product {
  id: string;
  name: string;
  price?: number;
  image?: any;
  quantity: number;
}

export default function PaymentScreen() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const router = useRouter(); // ✅ hook điều hướng trong Expo Router

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const jsonValue = await AsyncStorage.getItem("cart");
    if (jsonValue) {
      const items: Product[] = JSON.parse(jsonValue);
      setCartItems(items);
      const sum = items.reduce(
        (acc, item) => acc + (item.price || 0) * item.quantity,
        0
      );
      setTotal(sum);
    }
  };

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      Alert.alert("Giỏ hàng trống", "Bạn chưa chọn sản phẩm nào");
      return;
    }

    await AsyncStorage.removeItem("cart");
    Alert.alert(
      "Thanh toán thành công 🎉",
      `Tổng cộng: ${total.toLocaleString()} đ`,
      [{ text: "OK", onPress: () => router.replace("/Home") }]
    );
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.item}>
      {item.image && <Image source={item.image} style={styles.image} />}
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>
          {item.price?.toLocaleString()} đ × {item.quantity}
        </Text>
      </View>
      <Text style={styles.subtotal}>
        {(item.price || 0) * item.quantity} đ
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧾 Xác nhận thanh toán</Text>

      {cartItems.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 30 }}>
          Giỏ hàng trống 😥
        </Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng cộng:</Text>
        <Text style={styles.totalPrice}>{total.toLocaleString()} đ</Text>
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payText}>Xác nhận thanh toán</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.payButton, { backgroundColor: "#aaa", marginTop: 10 }]}
        onPress={() => router.back()}
      >
        <Text style={styles.payText}>⬅️ Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  name: { fontSize: 16, fontWeight: "500" },
  price: { color: "#555" },
  subtotal: { fontWeight: "bold", color: "#000" },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  totalText: { fontSize: 18, fontWeight: "bold" },
  totalPrice: { fontSize: 18, fontWeight: "bold", color: "#e74c3c" },
  payButton: {
    backgroundColor: "#e67e22",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  payText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
