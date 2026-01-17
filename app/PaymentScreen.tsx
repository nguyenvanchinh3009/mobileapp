import React from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { createOrder } from "../services/orderApis";
import { useNavigation } from "@react-navigation/native";

export default function PaymentScreen() {
  const navigation = useNavigation<any>();

  const handlePay = async () => {
    const orderId = await createOrder(
      "user_001",
      [
        { name: "Burger", price: 15000, qty: 1 },
        { name: "Coke", price: 15000, qty: 1 },
      ],
      30000,
      "cash"
    );

    Alert.alert("Tạo đơn thành công");

    navigation.navigate("Bill", { orderId });
  };

  return (
    <View>
      <Pressable onPress={handlePay}>
        <Text>Thanh toán</Text>
      </Pressable>
    </View>
  );
}
