import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { updatePassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

interface ChangePasswordProps {
  onBack: () => void;
}

export default function ChangePassword({ onBack }: ChangePasswordProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!password || !confirm) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu tối thiểu 6 ký tự");
      return;
    }

    if (password !== confirm) {
      Alert.alert("Lỗi", "Mật khẩu không khớp");
      return;
    }

    try {
      setLoading(true);

      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Lỗi", "Bạn chưa đăng nhập");
        return;
      }

      await updatePassword(user, password);

      Alert.alert("Thành công", "Đổi mật khẩu thành công", [
        { text: "OK", onPress: onBack },
      ]);
    } catch (error: any) {
      let msg = "Đổi mật khẩu thất bại";

      if (error.code === "auth/requires-recent-login") {
        msg = "Vui lòng đăng nhập lại để đổi mật khẩu";
      }

      Alert.alert("Lỗi", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đổi mật khẩu</Text>

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu mới"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Nhập lại mật khẩu mới"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      <Pressable
        style={[styles.btn, loading && { opacity: 0.6 }]}
        onPress={handleChangePassword}
        disabled={loading}
      >
        <Text style={styles.btnText}>
          {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
        </Text>
      </Pressable>

      <Pressable onPress={onBack}>
        <Text style={styles.back}>← Quay lại</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: "#FFF8F0",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  btn: {
    backgroundColor: "#D97706",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  back: {
    marginTop: 20,
    textAlign: "center",
    color: "#D97706",
  },
});
