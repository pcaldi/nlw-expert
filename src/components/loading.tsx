import { ActivityIndicator, View } from "react-native";

// Importar as cores do tailwind para utilizar como propriedade
import colors from "tailwindcss/colors";


export function Loading() {
  return (
    <View className=" flex-1 bg-slate-900 items-center justify-center">
      <ActivityIndicator color={colors.white} />
    </View>
  )
}
