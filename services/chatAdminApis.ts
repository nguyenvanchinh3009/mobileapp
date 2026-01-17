import { onValue, ref } from "firebase/database";
import { db } from "../firebaseConfig";

export const subscribeUsers = (callback: (users: any[]) => void) => {
  const usersRef = ref(db, "chats");

  return onValue(usersRef, (snapshot) => {
    if (!snapshot.exists()) {
      callback([]);
      return;
    }

    const data = snapshot.val();

    const list = Object.keys(data).map((uid) => {
      const messages = data[uid].messages
        ? Object.values(data[uid].messages)
        : [];

      const lastMessage =
        messages.length > 0 ? messages[messages.length - 1] : null;

      return {
        uid,
        lastMessage,
      };
    });

    callback(list);
  });
};
