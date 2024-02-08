import { Pressable, Text, PressableProps } from "react-native";

// Biblioteca para implementar condicional na classe
import clsx from "clsx";


type CategoryButtonProps = PressableProps & {
  title: string
  isSelected?: boolean
}

export function CategoryButton({ title, isSelected, ...rest }: CategoryButtonProps) {
  return (

    // Implemento condicional na classe
    <Pressable className={clsx("bg-slate-800 px-4 justify-center rounded-md h-10", isSelected && "border-2 border-lime-400")} {...rest}>

      <Text className="text-slate-100 text-sm font-subtitle">
        {title}
      </Text>
    </Pressable>
  );
}
