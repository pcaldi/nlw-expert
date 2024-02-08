import { useState, useRef } from "react";
import { FlatList, SectionList, Text, View } from "react-native";

import { Link } from "expo-router";

import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'

import { useCartStore } from "@/stores/cart-stores";

import { CategoryButton } from "@/components/category-button";
import { Header } from "@/components/header";
import { Product } from "@/components/product";


export default function Home() {
  const cartStore = useCartStore();


  const [category, setCategory] = useState(CATEGORIES[0]);

  const cartQuantityItem = cartStore.products.reduce((total, product) => total + product.quantity, 0);


  const sectionListRef = useRef<SectionList<ProductProps>>(null);

  function handleCategorySelected(categorySelected: string) {
    setCategory(categorySelected);

    const sectionIndex = CATEGORIES.findIndex((category) => category === categorySelected);
    //console.log(sectionIndex)

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        animated: true,
        itemIndex: 0,
      });
    }
  };



  return (
    <View className=" flex-1 pt-8">

      <Header title="Faça seu Pedido" cartQuantityItems={cartQuantityItem} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelected(item)} />
        )}
        horizontal
        className="mt-5 max-h-10"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false} // Para não fazer um efeito de esticar, ou de uma seção ficar em cima
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white mt-8 mb-3 font-heading">{title}</Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 80
        }}
      />

    </View>
  );
}
