import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  Pressable,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { getAllProducts } from "../../services/productApis";
import { useNavigation } from "@react-navigation/native";

export default function ProductScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any>({});
  const navigation = useNavigation<any>();

  useEffect(() => {
    getAllProducts().then((data: any[]) => setProducts(data));
  }, []);

  const addItem = (item: any) => {
    setCart((prev: any) => {
      const currentQty = prev[item.id]?.qty || 0;
      return {
        ...prev,
        [item.id]: {
          ...item,
          price: Number(item.price),
          qty: currentQty + 1,
        },
      };
    });
  };

  const removeItem = (id: string) => {
    setCart((prev: any) => {
      const currentQty = prev[id]?.qty || 0;
      if (currentQty <= 1) {
        const clone = { ...prev };
        delete clone[id];
        return clone;
      }
      return {
        ...prev,
        [id]: {
          ...prev[id],
          qty: currentQty - 1,
        },
      };
    });
  };

  const cartItems = Object.values(cart);
  const total = cartItems.reduce(
    (sum: number, i: any) => sum + i.qty * i.price,
    0
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const cartItem = cart[item.id];

          return (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>{item.price} đ</Text>
                </View>

                {/* NÚT MUA KIỂU GRAB */}
                {!cartItem ? (
                  <Pressable
                    style={styles.addBtn}
                    onPress={() => addItem(item)}
                  >
                    <Text style={styles.addText}>＋</Text>
                  </Pressable>
                ) : (
                  <View style={styles.qtyBox}>
                    <Pressable
                      style={styles.qtyBtn}
                      onPress={() => removeItem(item.id)}
                    >
                      <Text style={styles.qtyText}>−</Text>
                    </Pressable>

                    <Text style={styles.qtyNumber}>{cartItem.qty}</Text>

                    <Pressable
                      style={styles.qtyBtn}
                      onPress={() => addItem(item)}
                    >
                      <Text style={styles.qtyText}>＋</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            </View>
          );
        }}
      />

      {/* THANH TOÁN */}
      {cartItems.length > 0 && (
        <Pressable
          style={styles.checkout}
          onPress={() =>
            navigation.navigate("PaymentScreen", {
              cartItems,
              total,
            })
          }
        >
          <Text style={styles.checkoutText}>
            Thanh toán • {total}đ
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 12,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    color: "#e53935",
    marginTop: 4,
    fontWeight: "600",
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e53935",
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  qtyNumber: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  checkout: {
    backgroundColor: "#e53935",
    padding: 14,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
