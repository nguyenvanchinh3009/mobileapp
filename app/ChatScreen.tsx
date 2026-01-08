import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";

// ⚙️ Firebase config (dùng file firebaseConfig.ts của bạn)
import { firebaseConfig } from "../firebaseConfig";

// ✅ Khởi tạo app & database
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const chatRef = ref(db, "chat");
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const msgs = Object.values(data);
        setMessages(msgs);
      } else {
        setMessages([]);
      }
    });
  }, []);

  const sendMessage = async () => {
    if (message.trim().length === 0) return;
    const chatRef = ref(db, "chat");
    await push(chatRef, {
      sender: "Khách hàng",
      text: message,
      time: new Date().toLocaleTimeString(),
    });
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💬 Chat với cửa hàng</Text>

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageBubble}>
            <Text style={styles.sender}>{item.sender}:</Text>
            <Text>{item.text}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tin nhắn..."
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Gửi" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  messageBubble: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 8,
    marginBottom: 6,
  },
  sender: { fontWeight: "bold", color: "#333" },
  time: { fontSize: 10, color: "#777", alignSelf: "flex-end" },
  inputRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 8,
    marginRight: 8,
  },
});
