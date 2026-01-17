import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function OrderSuccess() {
  const router = useRouter();

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "900" }}>
        🎉 Đặt hàng thành công!
      </Text>

      <Text style={{ marginVertical: 12 }}>
        Nếu bạn chọn chuyển khoản, vui lòng thanh toán theo thông tin ngân hàng.
      </Text>

      <Text>
        🏦 Ngân hàng: Vietcombank{"\n"}
        👤 Chủ TK: NGUYEN VAN A{"\n"}
        🔢 STK: 0123 456 789{"\n"}
        📝 Nội dung: Tên + SĐT
      </Text>

      <Button title="Về trang chủ" onPress={() => router.replace("/")} />
    </View>
  );
}
