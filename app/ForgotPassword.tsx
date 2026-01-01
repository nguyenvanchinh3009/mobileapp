import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

interface ForgotPasswordProps {
  onBack: () => void;
}

export default function ForgotPassword({ onBack }: ForgotPasswordProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleReset = () => {
    if (!newPassword || !confirm) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu tối thiểu 6 ký tự");
      return;
    }

    if (newPassword !== confirm) {
      Alert.alert("Lỗi", "Mật khẩu không khớp");
      return;
    }

    // ✅ FAKE SUCCESS
    Alert.alert(
      "Thành công",
      "Mật khẩu đã được thay đổi (demo)",
      [{ text: "OK", onPress: onBack }]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Quên mật khẩu</Text>

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu mới"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Nhập lại mật khẩu"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      <Pressable style={styles.btn} onPress={handleReset}>
        <Text style={styles.btnText}>Xác nhận</Text>
      </Pressable>

      <Pressable onPress={onBack}>
        <Text style={styles.back}>← Quay lại đăng nhập</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flexGrow: 1 },
  title: { fontSize: 24, marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  btn: {
    backgroundColor: "#D97706",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "600" },
  back: {
    textAlign: "center",
    marginTop: 20,
    color: "#D97706",
  },
});
