import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

export default function OrderSuccess() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🎉</Text>

      <Text style={styles.title}>ĐẶT HÀNG THÀNH CÔNG</Text>
      <Text style={styles.sub}>
        Cảm ơn bạn đã mua bánh mì tại cửa hàng của chúng tôi
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Về trang chủ</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  icon: {
    fontSize: 64,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 8,
  },
  sub: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#e53935",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
