import { useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface HomeProps {
  onLogout: () => void;
  onChangePassword: () => void;
}

export default function Home({ onLogout, onChangePassword }: HomeProps) {
  const [userName] = useState("Nguyễn Văn A");

  const games = [
    {
      name: "Cyber Legend",
      image: require("../assets/images/game1.jpg"),
    },
    {
      name: "Dragon War",
      image: require("../assets/images/game2.jpg"),
    },
    {
      name: "Shadow Ninja",
      image: require("../assets/images/game3.jpg"),
    },
  ];

  return (
    <ImageBackground
      source={require("../assets/images/hinh-nen-anime-06.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.overlay}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.logo}>🎮 GAME ZONE</Text>
          <Pressable onPress={onLogout}>
            <Text style={styles.logout}>Logout</Text>
          </Pressable>
        </View>

        {/* PROFILE */}
        <View style={styles.profile}>
          <Image
            source={require("../assets/images/avatar.png")}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.welcome}>Welcome back</Text>
            <Text style={styles.username}>{userName}</Text>
            <Text style={styles.rank}>Rank: Diamond 💎</Text>
          </View>
        </View>

        {/* BANNER */}
        <Image
          source={require("../assets/images/banner.jpg")}
          style={styles.banner}
        />

        {/* GAMES */}
        <Text style={styles.section}>🔥 Popular Games</Text>
        <View style={styles.gameList}>
          {games.map((g, i) => (
            <Pressable key={i} style={styles.card}>
              <Image source={g.image} style={styles.gameImg} />
              <View style={styles.cardOverlay}>
                <Text style={styles.gameName}>{g.name}</Text>
                <Text style={styles.play}>▶ Play</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* ACTIONS */}
        <View style={styles.actions}>
          <Pressable style={styles.btn}>
            <Text style={styles.btnText}>🎒 Inventory</Text>
          </Pressable>

          <Pressable style={styles.btn} onPress={onChangePassword}>
            <Text style={styles.btnText}>🔐 Change Password</Text>
          </Pressable>

          <Pressable style={[styles.btn, styles.logoutBtn]} onPress={onLogout}>
            <Text style={styles.logoutText}>🚪 Exit Game</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flexGrow: 1,
    backgroundColor: "rgba(10,10,25,0.75)",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  logo: {
    color: "#7C7CFF",
    fontSize: 24,
    fontWeight: "900",
  },

  logout: {
    color: "#F87171",
    fontWeight: "700",
  },

  profile: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(40,40,70,0.9)",
    borderRadius: 18,
    padding: 12,
    marginBottom: 16,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },

  welcome: {
    color: "#9CA3AF",
    fontSize: 12,
  },

  username: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },

  rank: {
    color: "#7C7CFF",
    fontSize: 12,
  },

  banner: {
    width: "100%",
    height: 150,
    borderRadius: 16,
    marginBottom: 16,
  },

  section: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },

  gameList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#1A1A2E",
  },

  gameImg: {
    width: "100%",
    height: 130,
  },

  cardOverlay: {
    padding: 8,
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  gameName: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  play: {
    color: "#7C7CFF",
    fontSize: 12,
    marginTop: 4,
  },

  actions: {
    marginTop: 24,
    gap: 12,
  },

  btn: {
    backgroundColor: "rgba(124,124,255,0.15)",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#7C7CFF",
  },

  btnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  logoutBtn: {
    borderColor: "#F87171",
    backgroundColor: "rgba(248,113,113,0.15)",
  },

  logoutText: {
    color: "#F87171",
    fontWeight: "800",
  },
});
