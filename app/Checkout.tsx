import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

export default function Checkout() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { cartItems = [], total = 0 } = route.params || {};

  return (
    <View>
      <Text>XÁC NHẬN ĐƠN HÀNG</Text>

      {cartItems.map((item: any) => (
        <Text key={item.id}>
          {item.name} x{item.qty}
        </Text>
      ))}

      <Text>TỔNG: {total}đ</Text>

      <Button
        title="Thanh toán"
        onPress={() =>
          navigation.navigate("PaymentScreen", { cartItems, total })
        }
      />
    </View>
  );
}
