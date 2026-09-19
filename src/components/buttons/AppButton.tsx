import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import React from "react";
import { AppColors } from "../../styles/color";
import { vs, s } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { useTheme } from "../../store/ThemeContext";

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
}

const AppButton: React.FC<AppButtonProps> = ({
  onPress,
  title,
  backgroundColor,
  textColor,
  style,
  styleTitle,
  disabled = false,
  ...rest
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      {...rest}
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          backgroundColor: disabled
            ? colors.disabledGray
            : (backgroundColor ?? colors.primary),
        },
        style,
      ]}
      disabled={disabled}
    >
      <AppText
        variant="bold"
        style={[
          styles.textTitle,
          { color: textColor ?? colors.onPrimary },
          styleTitle,
        ]}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: vs(42),
    backgroundColor: AppColors.primary,
    borderRadius: s(14),
    justifyContent: "center",
    alignItems: "center",
  },
  textTitle: {
    fontSize: s(16),
    color: AppColors.white,
  },
});
