import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React, { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppColors } from "../../styles/color";
import { useTheme } from "../../store/ThemeContext";

interface AppSafeViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const AppSafeView: FC<AppSafeViewProps> = ({ children, style }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.surface }]}
      edges={["top", "bottom"]}
    >
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default AppSafeView;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  container: {
    flex: 1,
  },
});
