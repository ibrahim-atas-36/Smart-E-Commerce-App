import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
} from "react-native";
import React from "react";
import { vs, s } from "react-native-size-matters";
import { AppColors } from "../../styles/color";

interface AppTextInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  style?: StyleProp<TextStyle>;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  style,
  ...rest
}) => {
  return (
    <TextInput
      {...rest}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      style={[styles.input, style]}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: vs(42),
    backgroundColor: AppColors.lightGray,
    borderWidth: s(1),
    borderColor: AppColors.borderColor,
    borderRadius: s(14),
    paddingHorizontal: s(20),
    marginVertical: vs(4),
  },
});
