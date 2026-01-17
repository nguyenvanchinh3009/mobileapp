import React from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { confirmOrder } from "../services/orderApis";

export default function ConfirmOrderScreen() {
  const handleConfirm = async () => {
    try {
      await confirmOrder("-OkxA123ABC"); // 👈 DÁN ORDER ID VÀO ĐÂY
      Alert.alert("OK", "Đã xác nhận đơn hàng");
    } catch (e) {
      Alert.alert("Lỗi", "Xác nhận thất bại");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Pressable
        style={{ backgroundColor: "green", padding: 15, borderRadius: 8 }}
        onPress={handleConfirm}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Xác nhận đơn hàng
        </Text>
      </Pressable>
    </View>
  );
}
