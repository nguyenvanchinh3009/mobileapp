import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Alert,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createOrder } from "../services/orderApis";

export default function PaymentScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const cartItems = route.params?.cartItems || [];
  const total = Number(route.params?.total) || 0;

  /* COD */
  const payCOD = async () => {
    await createOrder(cartItems, total);

    await AsyncStorage.removeItem("cart");

    Alert.alert("Thành công", "Đặt hàng thành công (Tiền mặt)");
    navigation.navigate("OrderSuccess");
  };

  /* MOMO – GIẢ LẬP */
  const payMomo = async () => {
    Alert.alert(
      "Ví MoMo",
      "Xác nhận thanh toán MoMo?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Thanh toán",
          onPress: async () => {
            await createOrder(cartItems, total);

            await AsyncStorage.removeItem("cart");

            Alert.alert("Thành công", "Thanh toán MoMo thành công");
            navigation.navigate("OrderSuccess");
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>XÁC NHẬN ĐƠN HÀNG</Text>

      {cartItems.map((item: any) => (
        <View key={item.id} style={styles.itemCard}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>
            {item.qty} x {item.price}đ
          </Text>
        </View>
      ))}

      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Tổng tiền</Text>
        <Text style={styles.totalMoney}>{total}đ</Text>
      </View>

      <Pressable style={styles.codBtn} onPress={payCOD}>
        <Text style={styles.btnText}>💵 Thanh toán tiền mặt</Text>
      </Pressable>

      <Pressable style={styles.momoBtn} onPress={payMomo}>
        <Text style={styles.btnText}>📱 Thanh toán MoMo</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: "600" },
  price: { marginTop: 4, color: "#555" },
  totalBox: {
    marginTop: 16,
    padding: 14,
    backgroundColor: "#fff3e0",
    borderRadius: 8,
    marginBottom: 20,
  },
  totalText: { fontSize: 16 },
  totalMoney: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e53935",
  },
  codBtn: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  momoBtn: {
    backgroundColor: "#A50064",
    padding: 14,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
