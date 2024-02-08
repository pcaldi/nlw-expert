import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
  children: ReactNode
}

type ButtonTextProps = {
  children: ReactNode
}

type ButtonIconProps = {
  children: ReactNode
}

// Composição de Componentes - Estratégia para você ter flexibilidade na hora de
// utilizar o componente, criando as partes dele separada e depois exportar com
// flexibilidade elas.
function Button({ children, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity className="bg-lime-400 rounded-md h-12 items-center justify-center flex-row" activeOpacity={0.7} {...rest}>
      {children}
    </TouchableOpacity>
  )
}


function ButtonText({ children }: ButtonTextProps) {
  return (
    <Text className="text-black text-base font-heading mx-2">
      {children}
    </Text>
  )
}

function ButtonIcon({ children }: ButtonIconProps) {
  return children
}


Button.Text = ButtonText
Button.Icon = ButtonIcon

export { Button }
