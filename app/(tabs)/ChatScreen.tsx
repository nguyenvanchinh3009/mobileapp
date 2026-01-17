import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { getAuth } from "firebase/auth";
import { sendUserMessage, subscribeUserMessages } from "@/services/chatApis";

export default function ChatScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsub = auth.onAuthStateChanged((u) => {
      if (u) setUid(u.uid);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!uid) return;
    return subscribeUserMessages(uid, setMessages);
  }, [uid]);

  const send = () => {
    if (!text.trim()) return;
    sendUserMessage(text);
    setText("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.sender === "user" ? styles.user : styles.shop,
            ]}
          >
            <Text>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.row}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.input}
          placeholder="Nhập tin nhắn..."
        />
        <Pressable style={styles.btn} onPress={send}>
          <Text style={{ color: "#fff" }}>Gửi</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  bubble: { padding: 10, marginVertical: 5, borderRadius: 10, maxWidth: "70%" },
  user: { alignSelf: "flex-end", backgroundColor: "#FDBA74" },
  shop: { alignSelf: "flex-start", backgroundColor: "#E5E7EB" },
  row: { flexDirection: "row" },
  input: { flex: 1, borderWidth: 1, padding: 10, borderRadius: 20 },
  btn: {
    backgroundColor: "#F97316",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 20,
    marginLeft: 5,
  },
});
