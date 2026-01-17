import React from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { createOrder } from "../services/orderApis";

export default function PaymentScreen() {
  const handlePay = async (paymentMethod: "cash" | "bank") => {
    try {
      await createOrder(
        "user_001", // ✅ userId
        [
          {
            productId: "product1",
            name: "Bánh mì thịt",
            price: 15000,
            qty: 2,
          },
        ], // ✅ items
        30000, // ✅ total
        paymentMethod // ✅ cash | bank
      );

      Alert.alert("Thành công", "Đã tạo đơn hàng");
    } catch (e) {
      Alert.alert("Lỗi", "Không tạo được đơn");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh toán</Text>

      <Pressable style={styles.btn} onPress={() => handlePay("cash")}>
        <Text style={styles.text}>💵 Tiền mặt</Text>
      </Pressable>

      <Pressable style={styles.btn} onPress={() => handlePay("bank")}>
        <Text style={styles.text}>🏦 Chuyển khoản</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  btn: {
    backgroundColor: "#f97316",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
