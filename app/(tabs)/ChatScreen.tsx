import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { subscribeMessages, sendMessage } from "@/services/chatApis";

export default function ChatScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    return subscribeMessages(setMessages);
  }, []);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text, "user");
    setText("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
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

      <View style={styles.inputBar}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Nhập tin nhắn..."
          style={styles.input}
        />
        <Pressable style={styles.btn} onPress={handleSend}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Gửi</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7ED",
    padding: 10,
  },
  bubble: {
    padding: 10,
    borderRadius: 12,
    marginVertical: 6,
    maxWidth: "75%",
  },
  user: {
    alignSelf: "flex-end",
    backgroundColor: "#FDBA74",
  },
  shop: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E7EB",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  input: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  btn: {
    backgroundColor: "#F97316",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
