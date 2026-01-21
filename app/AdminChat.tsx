import {
    sendShopMessage,
    subscribeUserMessages,
} from "@/services/chatApis";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

export default function AdminChat({ uid }: { uid: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    return subscribeUserMessages(uid, setMessages);
  }, []);

  const send = () => {
    sendShopMessage(uid, text);
    setText("");
  };

  return (
    <View>
      <FlatList
        data={messages}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <Text>{item.sender}: {item.text}</Text>}
      />

      <TextInput value={text} onChangeText={setText} />
      <Pressable onPress={send}>
        <Text>Gửi</Text>
      </Pressable>
    </View>
  );
}
