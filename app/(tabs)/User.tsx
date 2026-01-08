import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function User() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 👉 Đăng nhập
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập Email và Mật khẩu!");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setIsLoggedIn(true);
      Alert.alert("Thành công", "Đăng nhập thành công!");
    } catch {
      Alert.alert("Lỗi", "Sai tài khoản hoặc mật khẩu!");
    }
  };

  // 👉 Đăng ký
  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập Email và Mật khẩu!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      setIsLoggedIn(true);
      setIsRegister(false);
      Alert.alert("Thành công", "Đăng ký thành công!");
    } catch (error: any) {
      Alert.alert("Lỗi", error.message);
    }
  };

  // 👉 Đăng xuất
  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    Alert.alert("Đăng xuất thành công");
  };

  // 🔸 Nếu đã đăng nhập: hiển thị thông tin + nút đăng xuất
  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/avatar.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.title}>👤 Xin chào!</Text>
        <Text style={styles.emailText}>{email}</Text>

        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </Pressable>
      </View>
    );
  }

  // 🔸 Nếu chưa đăng nhập: hiển thị login / register
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/avatar.jpg")}
        style={styles.avatar}
      />

      <Text style={styles.title}>
        {isRegister ? "Đăng ký tài khoản" : "Đăng nhập tài khoản"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {isRegister ? (
        <Pressable style={styles.btn} onPress={handleRegister}>
          <Text style={styles.btnText}>Đăng ký</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Đăng nhập</Text>
        </Pressable>
      )}

      <Pressable
        onPress={() => setIsRegister(!isRegister)}
        style={{ marginTop: 10 }}
      >
        <Text style={styles.switchText}>
          {isRegister
            ? "Đã có tài khoản? Đăng nhập"
            : "Chưa có tài khoản? Đăng ký"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A250F",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    color: "#FBBF24",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 20,
  },
  emailText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 30,
  },
  input: {
    width: "90%",
    backgroundColor: "#2a1a0d",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderColor: "#FBBF24",
    borderWidth: 1,
    color: "#fff",
  },
  btn: {
    backgroundColor: "#FBBF24",
    width: "90%",
    padding: 14,
    borderRadius: 10,
  },
  btnText: {
    textAlign: "center",
    fontWeight: "900",
    color: "#000",
  },
  switchText: {
    color: "#FBBF24",
    marginTop: 10,
    fontWeight: "600",
  },
  logoutBtn: {
    backgroundColor: "#F87171",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "900",
  },
});
