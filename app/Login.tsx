import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { signInWithEmailAndPassword } from "firebase/auth";
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
    <ImageBackground
      source={require("../assets/images/hinh-nen-anime-06.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.logo}>⚔️ GAME PORTAL</Text>
          <Text style={styles.sub}>Enter your legend</Text>

          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={20} color="#7C7CFF" />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#AAA"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={20} color="#7C7CFF" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#AAA"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <Pressable onPress={onForgotPassword}>
            <Text style={styles.forgot}>Forgot password?</Text>
          </Pressable>

          <Pressable onPress={handleLogin}>
            <LinearGradient colors={["#7C7CFF", "#5B5BFF"]} style={styles.btn}>
              <Text style={styles.btnText}>
                {loading ? "Loading..." : "LOGIN"}
              </Text>
            </LinearGradient>
          </Pressable>

          <Pressable onPress={onGoRegister}>
            <Text style={styles.register}>
              Don’t have an account? Create one
            </Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "rgba(20,20,40,0.9)",
    borderRadius: 28,
    padding: 28,
    borderWidth: 1,
    borderColor: "rgba(124,124,255,0.5)",
  },
  logo: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "900",
    color: "#7C7CFF",
    marginBottom: 4,
  },
  sub: {
    textAlign: "center",
    color: "#9CA3AF",
    marginBottom: 28,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#7C7CFF",
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
  forgot: {
    color: "#7C7CFF",
    textAlign: "right",
    marginBottom: 24,
  },
  btn: {
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1,
  },
  register: {
    marginTop: 20,
    textAlign: "center",
    color: "#7C7CFF",
  },
});
