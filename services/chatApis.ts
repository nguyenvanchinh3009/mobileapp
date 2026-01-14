import { ref, push, onValue, query, orderByChild } from "firebase/database";
import { db } from "../firebaseConfig";

const ROOM_ID = "room_123"; // mỗi user có thể tạo room riêng sau

export const sendMessage = async (text: string, sender: "user" | "shop") => {
  const msgRef = ref(db, `chats/${ROOM_ID}/messages`);
  await push(msgRef, {
    text,
    sender,
    time: Date.now(),
  });
};

export const subscribeMessages = (callback: (msgs: any[]) => void) => {
  const msgRef = query(
    ref(db, `chats/${ROOM_ID}/messages`),
    orderByChild("time")
  );

  return onValue(msgRef, (snapshot) => {
    if (!snapshot.exists()) {
      callback([]);
      return;
    }

    const data = snapshot.val();
    const list = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));

    callback(list);
  });
};
