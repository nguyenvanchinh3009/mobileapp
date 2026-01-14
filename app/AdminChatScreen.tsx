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

export default function AdminChatScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    return subscribeMessages(setMessages);
  }, []);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text, "shop");
    setText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shop Bánh Mì</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.sender === "shop" ? styles.shop : styles.user,
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
          placeholder="Shop nhập..."
          style={styles.input}
        />
        <Pressable style={styles.btn} onPress={handleSend}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Trả lời</Text>
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
  header: {
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    color: "#F97316",
    marginBottom: 8,
  },
  bubble: {
    padding: 10,
    borderRadius: 12,
    marginVertical: 6,
    maxWidth: "75%",
  },
  user: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E7EB",
  },
  shop: {
    alignSelf: "flex-end",
    backgroundColor: "#FDBA74",
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
