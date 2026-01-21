import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CartScreen() {
  const navigation = useNavigation<any>();
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  /* LOAD CART */
  const loadCart = async () => {
    const json = await AsyncStorage.getItem("cart");
    const data = json ? JSON.parse(json) : [];
    setCart(data);
    calcTotal(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [])
  );

  /* TÍNH TỔNG */
  const calcTotal = (data: any[]) => {
    const sum = data.reduce(
      (s, i) => s + i.price * i.quantity,
      0
    );
    setTotal(sum);
  };

  /* + */
  const increase = async (id: any) => {
    const newCart = cart.map((i) =>
      i.id === id ? { ...i, quantity: i.quantity + 1 } : i
    );
    setCart(newCart);
    calcTotal(newCart);
    await AsyncStorage.setItem("cart", JSON.stringify(newCart));
  };

  /* - */
  const decrease = async (id: any) => {
    let newCart = cart.map((i) =>
      i.id === id ? { ...i, quantity: i.quantity - 1 } : i
    );

    newCart = newCart.filter((i) => i.quantity > 0);

    setCart(newCart);
    calcTotal(newCart);
    await AsyncStorage.setItem("cart", JSON.stringify(newCart));
  };

  /* XÓA */
  const removeItem = (id: any) => {
    Alert.alert("Xóa món", "Bỏ món này khỏi giỏ?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          const newCart = cart.filter((i) => i.id !== id);
          setCart(newCart);
          calcTotal(newCart);
          await AsyncStorage.setItem("cart", JSON.stringify(newCart));
        },
      },
    ]);
  };

  /* THANH TOÁN */
  const checkout = () => {
    if (cart.length === 0) {
      Alert.alert("Giỏ hàng trống");
      return;
    }

    const cartItems = cart.map((i) => ({
      id: i.id,
      name: i.name,
      price: i.price,
      qty: i.quantity,
    }));

    navigation.navigate("PaymentScreen", {
      cartItems,
      total,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🛒 GIỎ HÀNG</Text>

      {cart.map((i) => (
        <View key={i.id} style={styles.item}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{i.name}</Text>
            <Text style={styles.price}>{i.price}đ</Text>
          </View>

          <View style={styles.qtyBox}>
            <Pressable onPress={() => decrease(i.id)}>
              <Text style={styles.btn}>−</Text>
            </Pressable>

            <Text style={styles.qty}>{i.quantity}</Text>

            <Pressable onPress={() => increase(i.id)}>
              <Text style={styles.btn}>＋</Text>
            </Pressable>
          </View>

          <Pressable onPress={() => removeItem(i.id)}>
            <Text style={styles.remove}>✖</Text>
          </Pressable>
        </View>
      ))}

      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Tổng tiền:</Text>
        <Text style={styles.totalMoney}>{total}đ</Text>
      </View>

      <Pressable style={styles.payBtn} onPress={checkout}>
        <Text style={styles.payText}>Thanh toán</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  item: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  name: { fontWeight: "600", fontSize: 16 },
  price: { color: "#e53935" },
  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  btn: {
    fontSize: 22,
    width: 30,
    textAlign: "center",
  },
  qty: { width: 30, textAlign: "center" },
  remove: { color: "red", fontSize: 18 },
  totalBox: {
    marginTop: 16,
    padding: 14,
    backgroundColor: "#fff3e0",
    borderRadius: 8,
  },
  totalText: { fontSize: 16 },
  totalMoney: { fontSize: 20, fontWeight: "bold", color: "#e53935" },
  payBtn: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  payText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
