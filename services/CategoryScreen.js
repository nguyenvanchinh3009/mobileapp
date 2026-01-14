import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Image, StyleSheet } from "react-native";
import { getCategories } from "./categoryApis";
import { getProductsByCategory } from "./productApis";

export default function CategoryScreen() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Load danh mục
  useEffect(() => {
    getCategories((data) => setCategories(data));
  }, []);

  // Load sản phẩm khi chọn category
  useEffect(() => {
    if (selectedCategory) {
      getProductsByCategory(selectedCategory.id, (data) => setProducts(data));
    }
  }, [selectedCategory]);

  const renderCategory = ({ item }) => (
    <Pressable
      style={[
        styles.categoryBtn,
        selectedCategory?.id === item.id && styles.categorySelected,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={styles.categoryText}>{item.name}</Text>
    </Pressable>
  );

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price} VND</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Danh mục
      </Text>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
        contentContainerStyle={{ marginBottom: 20 }}
      />

      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Sản phẩm
      </Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoryBtn: {
    padding: 10,
    marginRight: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  categorySelected: {
    backgroundColor: "#4CAF50",
  },
  categoryText: {
    color: "#000",
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    color: "green",
  },
});
