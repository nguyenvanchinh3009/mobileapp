import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getAllProducts, getProductsByCategory } from "../../services/productApis";

export default function ProductScreen() {
  const { categoryId, name } = useLocalSearchParams();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (categoryId) {
      getProductsByCategory(categoryId as string).then(setProducts);
    } else {
      getAllProducts().then(setProducts);
    }
  }, [categoryId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {name ? name : "Tất cả bánh mì"}
      </Text>

      <FlatList
        data={products}
        numColumns={2}
     keyExtractor={(item) => item.key}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <Pressable style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price.toLocaleString()}đ</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF7ED", padding: 12 },
  title: {
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 12,
    color: "#F97316",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 12,
  },
  name: {
    marginTop: 8,
    fontWeight: "700",
    color: "#333",
  },
  price: {
    marginTop: 4,
    color: "#F97316",
    fontWeight: "800",
  },
});
