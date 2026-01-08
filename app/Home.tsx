import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
const router = useRouter();

import { SwiperFlatList } from "react-native-swiper-flatlist";

const { width } = Dimensions.get("window");
const logo = require("../assets/images/logo.png");

interface HomeProps {
  onLogout: () => void;
  onChangePassword: () => void;
}

type Product = {
  id: string;
  name: string;
  price?: number;
  image?: any;
  desc?: string;
};

type ProductCategory = "banhmi" | "combo" | "nuoc" | "khuyenmai";

export default function Home({ onLogout }: HomeProps) {
  const navigation = useNavigation<any>(); // ✅ Dòng này cực quan trọng
  const [cartCount, setCartCount] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [activeTab, setActiveTab] = useState<ProductCategory>("banhmi");
  

  // ✅ Hàm thêm vào giỏ hàng
  const addToCart = async (product: Product) => {
    try {
      const jsonValue = await AsyncStorage.getItem("cart");
      let cart: any[] = jsonValue ? JSON.parse(jsonValue) : [];

      const index = cart.findIndex((item) => item.id === product.id);
      if (index >= 0) {
        cart[index].quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      await AsyncStorage.setItem("cart", JSON.stringify(cart));
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    } catch (e) {
      console.log("Lỗi khi thêm sản phẩm:", e);
    }
  };

  // Dữ liệu sản phẩm cho từng tab
  const productsData: Record<ProductCategory, Product[]> = {
    banhmi: [
      { id: "p1", name: "Bánh mì thịt nướng", price: 20000, image: require("../assets/images/banhmithitnuong.jpg") },
      { id: "p2", name: "Bánh mì chả lụa", price: 15000, image: require("../assets/images/banhmi1.jpg") },
      { id: "p3", name: "Bánh mì trứng", price: 12000, image: require("../assets/images/banhmy2.jpg") },
      { id: "p4", name: "Bánh mì gà xé", price: 25000, image: require("../assets/images/banhmy2.jpg") },
      { id: "p5", name: "Bánh mì xúc xích", price: 18000, image: require("../assets/images/banhmi1.jpg") },
      { id: "p6", name: "Bánh mì bò nướng", price: 30000, image: require("../assets/images/banhmy2.jpg") },
    ],
    combo: [
      { id: "c1", name: "Combo sáng no", price: 35000, image: require("../assets/images/banhmi1.jpg") },
      { id: "c2", name: "Combo đặc biệt", price: 45000, image: require("../assets/images/banhmy2.jpg") },
    ],
    nuoc: [
      { id: "n1", name: "Trà tắc", price: 10000, image: require("../assets/images/tratat.jpg") },
      { id: "n2", name: "Cà phê sữa", price: 15000, image: require("../assets/images/cfsua.jpg") },
      { id: "n3", name: "Nước cam", price: 12000, image: require("../assets/images/nccam.jpg") },
    ],
    khuyenmai: [
      { id: "k1", name: "Giảm 10% đơn đầu tiên", desc: "Áp dụng cho khách hàng mới" },
      { id: "k2", name: "Mua 2 tặng 1", desc: "Áp dụng cho bánh mì thịt nướng" },
    ],
  };

  const products: Product[] = productsData[activeTab];
  const filteredProducts: Product[] =
    activeTab === "khuyenmai"
      ? products
      : products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <ImageBackground
      source={require("../assets/images/banhmy2.jpg")}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.overlay}>
        {/* LOGO + HEADER */}
        <View style={styles.topBar}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={logo} style={styles.logoImg} />
            <Text style={styles.topLogo}>Bánh Mì Zăn Chính</Text>
          </View>

          <View style={styles.cart}>
            <Text style={styles.cartText}>🛒 {cartCount}</Text>
          </View>
        </View>

        {/* BANNER */}
        <View style={styles.bannerBox}>
          <SwiperFlatList
            autoplay
            autoplayDelay={3}
            autoplayLoop
            index={0}
            showPagination
            paginationActiveColor="#FBBF24"
            paginationDefaultColor="rgba(255,255,255,0.4)"
          >
            {[
              require("../assets/images/banhmi1.jpg"),
              require("../assets/images/banhmy2.jpg"),
              require("../assets/images/banhmithitnuong.jpg"),
            ].map((img, index) => (
              <View key={index} style={styles.bannerSlide}>
                <Image source={img} style={styles.bannerImg} resizeMode="cover" />
              </View>
            ))}
          </SwiperFlatList>

          <View style={styles.bannerTextBox}>
            <Text style={styles.bannerTitle}>BÁNH MÌ Zăn Chính</Text>
            <Text style={styles.bannerDesc}>“Hương vị bánh mì truyền thống Việt Nam”</Text>
          </View>
        </View>

        {/* MENU TABS */}
        <View style={styles.menuTabs}>
          {(["banhmi", "combo", "nuoc", "khuyenmai"] as ProductCategory[]).map((tab) => (
            <Pressable key={tab} onPress={() => setActiveTab(tab)}>
              <Text style={[styles.tab, activeTab === tab && styles.tabActive]}>
                {tab === "banhmi"
                  ? "Bánh Mì"
                  : tab === "combo"
                  ? "Combo"
                  : tab === "nuoc"
                  ? "Nước"
                  : "Khuyến mãi"}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* SEARCH */}
        {activeTab !== "khuyenmai" && (
          <TextInput
            style={styles.searchInput}
            placeholder="🔍 Tìm sản phẩm..."
            placeholderTextColor="#ccc"
            value={search}
            onChangeText={setSearch}
          />
        )}

        {/* PRODUCTS */}
        {activeTab === "khuyenmai" ? (
          <View>
            {products.map((km: Product) => (
              <View key={km.id} style={styles.promoItem}>
                <Text style={styles.itemName}>{km.name}</Text>
                <Text style={styles.price}>{km.desc}</Text>
              </View>
            ))}
          </View>
        ) : (
          filteredProducts.map((p: Product) => (
            <View key={p.id} style={styles.item}>
              {p.image && <Image source={p.image} style={styles.itemImg} />}
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{p.name}</Text>
                <Text style={styles.price}>{p.price?.toLocaleString()} đ</Text>
              </View>
              <Pressable style={styles.addBtn} onPress={() => addToCart(p)}>
                <Text style={styles.addText}>＋</Text>
              </Pressable>
            </View>
          ))
        )}

        {/* 🔥 NÚT THANH TOÁN */}
        <Pressable
  style={{
    backgroundColor: "#FBBF24",
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
  }}
  onPress={() => router.push("/PaymentScreen")}  // ✅ Expo Router điều hướng theo tên file
>
  <Text style={{ color: "#000", fontWeight: "900", textAlign: "center" }}>
    🧾 Xem giỏ hàng / Thanh toán
  </Text>
</Pressable>
<Pressable
  style={{
    backgroundColor: "#22c55e",
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
  }}
  onPress={() => router.push("/ChatScreen")}
>
  <Text style={{ color: "#fff", fontWeight: "900", textAlign: "center" }}>
    💬 Chat với cửa hàng
  </Text>
</Pressable>


        {/* NÚT ĐĂNG XUẤT */}
        <Pressable style={styles.logoutBtn} onPress={onLogout}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </Pressable>

        {/* LIÊN KẾT MẠNG XÃ HỘI */}
        <View style={styles.socialContainer}>
          <Text style={styles.connectTitle}>🌐 Kết nối với chúng tôi</Text>
          <View style={styles.socialRow}>
            <Pressable
              style={[styles.socialCircle, { backgroundColor: "#1877F2" }]}
              onPress={() =>
                Linking.openURL("https://www.facebook.com/van.chinh.526281/?locale=vi_VN")
              }
            >
              <Text style={styles.socialIcon}>📘</Text>
              <Text style={styles.socialLabel}>Facebook</Text>
            </Pressable>

            <Pressable
              style={[styles.socialCircle, { backgroundColor: "#25D366" }]}
              onPress={() => Linking.openURL("https://zalo.me/0941471786")}
            >
              <Text style={styles.socialIcon}>💬</Text>
              <Text style={styles.socialLabel}>Zalo</Text>
            </Pressable>

            <Pressable
              style={[styles.socialCircle, { backgroundColor: "#F87171" }]}
              onPress={() => Linking.openURL("tel:0908811592")}
            >
              <Text style={styles.socialIcon}>📞</Text>
              <Text style={styles.socialLabel}>Gọi</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: { backgroundColor: "rgba(40,20,10,0.85)", padding: 14 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#7c2d12",
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  topLogo: { color: "#FBBF24", fontSize: 18, fontWeight: "900" },
  cart: { backgroundColor: "#FBBF24", padding: 8, borderRadius: 20 },
  cartText: { fontWeight: "900" },
  bannerBox: { borderRadius: 20, overflow: "hidden", marginBottom: 14 },
  bannerSlide: { width: width, height: 200 },
  bannerImg: { width: "100%", height: 180 },
  bannerTextBox: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  bannerTitle: { color: "#FBBF24", fontSize: 20, fontWeight: "900" },
  bannerDesc: { color: "#fff" },
  menuTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#7c2d12",
    padding: 10,
    borderRadius: 14,
    marginBottom: 10,
  },
  tab: { color: "#fff", fontWeight: "600" },
  tabActive: {
    color: "#FBBF24",
    fontWeight: "900",
    borderBottomWidth: 2,
    borderBottomColor: "#FBBF24",
    paddingBottom: 4,
  },
  searchInput: {
    backgroundColor: "#2a1a0d",
    borderRadius: 12,
    padding: 12,
    color: "#fff",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#FBBF24",
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#3A250F",
    padding: 10,
    borderRadius: 14,
    marginBottom: 10,
    alignItems: "center",
  },
  itemImg: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
  itemName: { color: "#fff", fontWeight: "700" },
  price: { color: "#FBBF24" },
  promoItem: { backgroundColor: "#3A250F", padding: 14, borderRadius: 14, marginBottom: 10 },
  addBtn: {
    backgroundColor: "#FBBF24",
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  addText: { fontSize: 20, fontWeight: "900", color: "#000" },
  logoutBtn: {
    backgroundColor: "#F87171",
    padding: 14,
    borderRadius: 14,
    marginTop: 20,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontWeight: "900" },
  socialContainer: { backgroundColor: "rgba(58,37,15,0.95)", padding: 16, borderRadius: 16, marginTop: 20 },
  connectTitle: { textAlign: "center", color: "#FBBF24", fontWeight: "900", fontSize: 16 },
  socialRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 14 },
  socialCircle: { alignItems: "center", justifyContent: "center", width: 90, height: 90, borderRadius: 45 },
  socialIcon: { fontSize: 32, color: "#fff" },
  socialLabel: { color: "#fff", fontWeight: "700", marginTop: 4, fontSize: 13 },
  logoImg: { width: 42, height: 42, borderRadius: 10, marginRight: 10, backgroundColor: "#fff" },
});
