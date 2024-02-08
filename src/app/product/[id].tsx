import { useLocalSearchParams, useNavigation } from "expo-router";

import { Image, View, Text } from "react-native";

import { Redirect } from 'expo-router'

import { Feather } from "@expo/vector-icons";

import { PRODUCTS } from "@/utils/data/products";
import { FormatCurrency } from "@/utils/functions/formatCurrency";

import { useCartStore } from '@/stores/cart-stores'

import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";




export default function Product() {
  const cartStore = useCartStore();

  const navigation = useNavigation();

  const { id } = useLocalSearchParams();
  //console.log(id);

  const product = PRODUCTS.find((item) => item.id === id);

  //console.log(cartStore.products);

  function handleAddToCart() {
    if (product) {

      cartStore.add(product);
      navigation.goBack();
    }

  };

  // Caso o produto não exista, redireciona para a raiz.
  if (!product) {
    return <Redirect href="/" />
  }


  return (
    <View className="flex-1">
      <Image
        source={product.cover}
        className="w-full h-52"
        resizeMode="cover"
      />
      <View className="flex-1 p-5 mt-8">

        <Text
          className="text-white font-heading text-3xl"
        >{product.title}</Text>

        <Text className="text-2xl font-heading text-lime-400 my-2">{FormatCurrency(product.price)}</Text>


        {
          product.ingredients.map((ingredient) => (
            <Text key={ingredient} className="text-slate-400 font-body text-base leading-6">{"\u2022"} {ingredient}</Text> // {"\u2022"} - unicode para gerar o bullet point
          ))
        }
      </View>

      <View className="pb-8 p-5 gap-5">

        <Button onPress={handleAddToCart}>

          <Button.Icon>
            <Feather name="plus-circle" size={20} />
          </Button.Icon>

          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>

        <LinkButton href="/" title="Voltar ao menu" />

      </View>


    </View>
  )
}
