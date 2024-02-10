import { View, Text, ScrollView, Alert, Linking } from "react-native";

import { ProductCartProps, useCartStore } from "@/stores/cart-stores";

import { FormatCurrency } from "@/utils/functions/formatCurrency";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/link-button";
import { useState } from "react";
import { useNavigation } from "expo-router";

export default function Cart() {
  const [address, setAddress] = useState('')

  const PHONE_NUMBER = process.env.EXPO_PUBLIC_PHONE_NUMBER

  const cartStore = useCartStore()

  const navigation = useNavigation()

  const total = FormatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0))

  function handleProductRemove(product: ProductCartProps) {
    //cartStore.remove(product)
    Alert.alert("Remover", `Deseja remover ${product.title} do pedido ?`, [
      {
        text: "Cancelar"
      },
      {
        text: "Remover",
        onPress: () => cartStore.remove(product.id)
      }
    ])
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert("Endereço", "Informe o endereço da entrega")
    }

    const products = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`).join("")

    const message = `NOVO PEDIDO
      \n Entregar em: ${address}
      \n ${products}
      \n Valor Total: ${total}
    `
    cartStore.clear()
    navigation.goBack()
    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
  }

  return (
    <KeyboardAwareScrollView>
      <View className="flex-1 pt-8">
        <Header title="Seu carinho" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="p-5 flex-1">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {
                  cartStore.products.map(product => (
                    <Product key={product.id} data={product} onPress={() => handleProductRemove(product)} />
                  ))
                }
              </View>
            ) : (
              <Text className="text-slate-400 text-center my-8 font-body">Seu carrinho está vazio...</Text>
            )}

            <View className="flex-row items-center gap-2 mt-5 mb-4 ">
              <Text className="text-white font-subtitle text-xl">Total: </Text>
              <Text className="text-lime-400 font-heading text-2xl">{total}</Text>

            </View>

            <Input
              placeholder="Endereço"
              onChangeText={setAddress}
              onSubmitEditing={handleOrder}
              blurOnSubmit={true}
              returnKeyType="next"
            />

          </View>
        </ScrollView>

        <View className="p-5 gap-5">
          <Button onPress={handleOrder}>
            <Button.Text>Enviar pedido</Button.Text>
            <Button.Icon>
              <Feather name="arrow-right-circle" size={20} />
            </Button.Icon>
          </Button>
          <LinkButton title="Voltar ao menu" href="/" />
        </View>
      </View >
    </KeyboardAwareScrollView>
  );
}

