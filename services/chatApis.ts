import { getAuth } from "firebase/auth";
import { onValue, push, ref } from "firebase/database";
import { db } from "../firebaseConfig";

/* USER gửi tin */
export const sendUserMessage = async (text: string) => {
  const uid = getAuth().currentUser?.uid;
  if (!uid) return;

  await push(ref(db, `chats/${uid}/messages`), {
    sender: "user",
    text,
    time: Date.now(),
  });
};

/* ADMIN gửi tin */
export const sendShopMessage = async (uid: string, text: string) => {
  await push(ref(db, `chats/${uid}/messages`), {
    sender: "shop",
    text,
    time: Date.now(),
  });
};

/* USER lắng nghe tin nhắn */
export const subscribeUserMessages = (
  uid: string,
  callback: (data: any[]) => void
) => {
  const chatRef = ref(db, `chats/${uid}/messages`);

  return onValue(chatRef, (snap) => {
    if (!snap.exists()) {
      callback([]);
      return;
    }

    const data = snap.val();
    const list = Object.keys(data).map((k) => ({
      id: k,
      ...data[k],
    }));

    callback(list.sort((a, b) => a.time - b.time));
  });
};

/* ADMIN lấy danh sách user đang chat */
export const subscribeUsers = (callback: (list: any[]) => void) => {
  const chatRef = ref(db, "chats");

  return onValue(chatRef, (snap) => {
    if (!snap.exists()) {
      callback([]);
      return;
    }

    const data = snap.val();

    const users = Object.keys(data).map((uid) => {
      const messages = data[uid].messages || {};
      const last = Object.values(messages).slice(-1)[0];

      return {
        uid,
        lastMessage: last,
      };
    });

    callback(users);
  });
};
