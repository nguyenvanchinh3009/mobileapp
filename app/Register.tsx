import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth } from "../firebaseConfig";

export default function Register({ onBackToLogin }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirm) {
      Alert.alert("Lỗi", "Nhập đầy đủ thông tin");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Lỗi", "Mật khẩu không khớp");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      Alert.alert("🎉 Thành công", "Tài khoản đã được tạo!");
      onBackToLogin();
    } catch (e: any) {
      Alert.alert("Lỗi", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/banhmi-bg.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>🥖 TẠO TÀI KHOẢN MUA BÁNH</Text>
          <Text style={styles.sub}>Nhập thông tin để đặt bánh mỗi ngày</Text>

          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={20} color="#F59E0B" />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#AAA"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={20} color="#F59E0B" />
            <TextInput
              placeholder="Mật khẩu"
              placeholderTextColor="#AAA"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#F59E0B" />
            <TextInput
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor="#AAA"
              secureTextEntry
              style={styles.input}
              value={confirm}
              onChangeText={setConfirm}
            />
          </View>

          <Pressable onPress={handleRegister}>
            <LinearGradient colors={["#F59E0B", "#F97316"]} style={styles.btn}>
              <Text style={styles.btnText}>
                {loading ? "Đang tạo..." : "TẠO TÀI KHOẢN"}
              </Text>
            </LinearGradient>
          </Pressable>

          <Pressable onPress={onBackToLogin}>
            <Text style={styles.back}>← Quay lại đăng nhập</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "rgba(30,20,10,0.9)",
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: "#F59E0B",
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
    color: "#F59E0B",
  },
  sub: {
    textAlign: "center",
    color: "#FDE68A",
    marginBottom: 24,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#F59E0B",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#fff",
    fontSize: 16,
  },
  btn: {
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1,
  },
  back: {
    marginTop: 20,
    textAlign: "center",
    color: "#FBBF24",
  },
});
