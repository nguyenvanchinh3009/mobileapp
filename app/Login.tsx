import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth } from "../firebaseConfig";

export default function Login({
  onLoginSuccess,
  onGoRegister,
  onForgotPassword,
}: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Nhập email và mật khẩu");
      return;
    }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      onLoginSuccess();
    } catch {
      Alert.alert("Lỗi", "Sai email hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/images/banhmy2.jpg")}
        style={styles.logo}
      />

      <Text style={styles.title}>Bánh Mì Van Chinh</Text>
      <Text style={styles.sub}>Đăng nhập để đặt bánh nóng giòn</Text>

      {/* Email */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      {/* Password */}
      <TextInput
        placeholder="Mật khẩu"
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <Pressable onPress={onForgotPassword}>
        <Text style={styles.forgot}>Quên mật khẩu?</Text>
      </Pressable>

      {/* Login */}
      <Pressable style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>
          {loading ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}
        </Text>
      </Pressable>

      {/* Register */}
      <Pressable onPress={onGoRegister}>
        <Text style={styles.register}>
          Chưa có tài khoản? <Text style={{ color: "#F97316" }}>Đăng ký</Text>
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    padding: 24,
  },

  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 16,
  },

  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "900",
    color: "#F97316",
  },

  sub: {
    textAlign: "center",
    color: "#666",
    marginBottom: 32,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#FED7AA",
    marginBottom: 16,
  },

  forgot: {
    textAlign: "right",
    color: "#F97316",
    marginBottom: 24,
    fontWeight: "600",
  },

  btn: {
    backgroundColor: "#F97316",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },

  register: {
    textAlign: "center",
    marginTop: 20,
    color: "#444",
    fontWeight: "600",
  },
});
