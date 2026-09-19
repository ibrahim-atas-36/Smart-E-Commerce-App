import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { IMAGES } from "../../constants/images-paths";
import { AppColors } from "../../styles/color";
import { s, vs } from "react-native-size-matters";
import { useTheme } from "../../store/ThemeContext";

const HomeHeader = () => {
  const { colors, isDarkMode } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? colors.surface : AppColors.primary },
      ]}
    >
      <Image
        source={IMAGES.appLogo}
        style={[
          styles.logo,
          { tintColor: isDarkMode ? colors.primary : colors.white },
        ]}
      />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: vs(10),
  },
  logo: {
    height: vs(48),
    width: s(48),
    tintColor: AppColors.white,
  },
});
