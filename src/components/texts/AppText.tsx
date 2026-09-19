import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";
import { s } from "react-native-size-matters";
import { AppColors } from "../../styles/color";
import { useTheme } from "../../store/ThemeContext";

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  variant?: "bold" | "medium" | "small";
}

const AppText: React.FC<AppTextProps> = ({
  children,
  style,
  variant = "medium",
  ...rest
}) => {
  const { colors } = useTheme();

  return (
    <Text {...rest} style={[styles[variant], { color: colors.text }, style]}>
      {children}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  bold: {
    fontSize: s(18),
    color: AppColors.black,
    fontWeight: "bold",
  },
  medium: {
    fontSize: s(14),
    color: AppColors.black,
    fontWeight: "normal",
  },
  small: {
    fontSize: s(10),
    color: AppColors.black,
    fontWeight: "normal",
  },
});
