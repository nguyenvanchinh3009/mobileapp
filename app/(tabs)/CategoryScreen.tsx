import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getAllCategories } from "../../services/categoryApis";
import { useRouter } from "expo-router";

export default function CategoryScreen() {
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh mục bánh mì</Text>

      <FlatList
        data={categories}
        numColumns={2}
 keyExtractor={(item) => item.key}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "./ProductScreen",
                params: { categoryId: item.id, name: item.name },
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
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
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 12,
  },
  name: {
    marginTop: 8,
    fontWeight: "700",
    color: "#333",
  },
});
