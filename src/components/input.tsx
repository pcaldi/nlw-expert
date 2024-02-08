import { TextInput, TextInputProps } from "react-native";
import colors from "tailwindcss/colors";

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
      style={{ marginTop: 10 }}
      textAlignVertical="center"
      placeholderTextColor={colors.slate[400]}
      className="bg-slate-800 rounded-md text-white font-body text-sm h-10 p-2"
      {...rest}
    />)
}
