import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { getProductsByCategory, getAllProducts } from "../services/productApis";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const logo = require("../assets/images/logo.png");

/* CATEGORY */
type Category =
  | "all"
  | "category1"
  | "category2"
  | "category3"
  | "khuyenmai";

/* TAB MAP */
const tabMap = [
  { key: "all", value: "all", label: "tất cả" },
  { key: "banhmi", value: "category1", label: "banhmi" },
  { key: "combo", value: "category2", label: "combo" },
  { key: "nuoc", value: "category3", label: "nuoc" },
  { key: "khuyenmai", value: "khuyenmai", label: "khuyến mãi" },
];

export default function Home({ onLogout }: any) {
  const router = useRouter();
  const navigation = useNavigation<any>();

  const [activeTab, setActiveTab] = useState<Category>("all");
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);

  /* LOAD CART COUNT */
  useEffect(() => {
    const loadCart = async () => {
      const json = await AsyncStorage.getItem("cart");
      const cart = json ? JSON.parse(json) : [];
      setCartCount(cart.reduce((s: number, i: any) => s + i.quantity, 0));
    };
    loadCart();
  }, []);

  /* LOAD PRODUCTS */
  useEffect(() => {
    if (activeTab === "khuyenmai") {
      setProducts([]);
      return;
    }

    if (activeTab === "all") {
      getAllProducts().then(setProducts);
    } else {
      getProductsByCategory(activeTab).then(setProducts);
    }
  }, [activeTab]);

  /* ADD TO CART */
  const addToCart = async (product: any) => {
    const json = await AsyncStorage.getItem("cart");
    let cart = json ? JSON.parse(json) : [];

    const index = cart.findIndex((i: any) => i.id === product.id);
    if (index >= 0) cart[index].quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    await AsyncStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.reduce((s: number, i: any) => s + i.quantity, 0));
  };

  /* SEARCH */
  const filtered =
    activeTab === "khuyenmai"
      ? []
      : products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );

  /* GO TO PAYMENT */
  const goToPayment = async () => {
    const json = await AsyncStorage.getItem("cart");
    const cart = json ? JSON.parse(json) : [];

    if (cart.length === 0) {
      Alert.alert("Thông báo", "Giỏ hàng đang trống");
      return;
    }

    const cartItems = cart.map((i: any) => ({
      id: i.id,
      name: i.name,
      price: Number(i.price),
      qty: i.quantity,
    }));

    const total = cartItems.reduce(
      (sum: number, i: any) => sum + i.qty * i.price,
      0
    );

    navigation.navigate("PaymentScreen", {
      cartItems,
      total,
    });
  };

  return (
    <ImageBackground
      source={require("../assets/images/banhmy2.jpg")}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.overlay}>
        {/* HEADER */}
        <View style={styles.topBar}>
          <Image source={logo} style={styles.logoImg} />
          <Text style={styles.topLogo}>Bánh Mì Zăn Chính</Text>
          <Text style={styles.cart}>🛒 {cartCount}</Text>
        </View>

        {/* BANNER */}
        <SwiperFlatList autoplay autoplayLoop>
          {[1, 2, 3].map((i) => (
            <Image
              key={i}
              source={require("../assets/images/banhmi1.jpg")}
              style={styles.bannerImg}
            />
          ))}
        </SwiperFlatList>

        {/* TABS */}
        <View style={styles.menuTabs}>
          {tabMap.map((tab) => (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.value as Category)}
            >
              <Text
                style={[
                  styles.tab,
                  activeTab === tab.value && styles.tabActive,
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* SEARCH */}
        {activeTab !== "khuyenmai" && (
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm sản phẩm..."
            value={search}
            onChangeText={setSearch}
          />
        )}

        {/* PRODUCTS */}
        {filtered.map((p) => (
          <View key={p.id} style={styles.item}>
            <Image source={{ uri: p.image }} style={styles.itemImg} />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{p.name}</Text>
              <Text style={styles.price}>
                {Number(p.price).toLocaleString()} đ
              </Text>
            </View>
            <Pressable style={styles.addBtn} onPress={() => addToCart(p)}>
              <Text style={styles.addText}>＋</Text>
            </Pressable>
          </View>
        ))}

        {/* THANH TOÁN */}
        <Pressable style={styles.payBtn} onPress={goToPayment}>
          <Text style={styles.payText}>🧾 Thanh toán</Text>
        </Pressable>

        {/* LOGOUT */}
        <Pressable style={styles.logoutBtn} onPress={onLogout}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </Pressable>
      </ScrollView>
    </ImageBackground>
  );
}

/* STYLE */
const styles = StyleSheet.create({
  overlay: { padding: 14, backgroundColor: "rgba(40,20,10,0.85)" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#7c2d12",
    padding: 12,
    borderRadius: 16,
  },
  topLogo: { color: "#FBBF24", fontWeight: "900", fontSize: 18 },
  cart: { color: "#fff", fontWeight: "900" },
  bannerImg: { width, height: 180 },
  menuTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    flexWrap: "wrap",
  },
  tab: { color: "#fff", marginVertical: 4 },
  tabActive: { color: "#FBBF24", fontWeight: "900" },
  searchInput: {
    backgroundColor: "#2a1a0d",
    color: "#fff",
    padding: 12,
    borderRadius: 12,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#3A250F",
    padding: 10,
    borderRadius: 14,
    marginVertical: 6,
    alignItems: "center",
  },
  itemImg: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
  itemName: { color: "#fff", fontWeight: "700" },
  price: { color: "#FBBF24" },
  addBtn: {
    backgroundColor: "#FBBF24",
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  addText: { fontWeight: "900", fontSize: 20 },
  payBtn: {
    backgroundColor: "#FBBF24",
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
  },
  payText: { textAlign: "center", fontWeight: "900" },
  logoutBtn: {
    backgroundColor: "#F87171",
    padding: 14,
    borderRadius: 14,
    marginTop: 20,
  },
  logoutText: { color: "#fff", textAlign: "center", fontWeight: "900" },
  logoImg: { width: 42, height: 42, borderRadius: 10 },
});
