import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import AppSafeView from "../../components/views/AppSafeView";
import HomeHeader from "../../components/headers/HomeHeader";
import ProductCard, { Product } from "../../components/cards/ProductCard";
import AppText from "../../components/texts/AppText";
import { products } from "../../data/products";
import { AppColors } from "../../styles/color";
import { s, vs } from "react-native-size-matters";
import { useTheme } from "../../store/ThemeContext";
import { useLanguage } from "../../store/LanguageContext";

const HomeScreen = () => {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <AppSafeView
      style={[styles.screen, { backgroundColor: colors.background }]}
    >
      <HomeHeader />
      <FlatList
        data={products}
        keyExtractor={(product) => product.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.heading}>
            <View>
              <AppText
                variant="bold"
                style={[styles.title, { color: colors.text }]}
              >
                {t("discoverProducts")}
              </AppText>
              <AppText
                style={[styles.subtitle, { color: colors.secondaryText }]}
              >
                {t("findSomething")}
              </AppText>
            </View>
            <View
              style={[
                styles.filterButton,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <AppText style={[styles.filterIcon, { color: colors.text }]}>
                ≡
              </AppText>
            </View>
          </View>
        }
        renderItem={({ item }) => <ProductCard product={item as Product} />}
      />
    </AppSafeView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: AppColors.background,
  },
  content: {
    paddingHorizontal: s(16),
    paddingBottom: vs(28),
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: vs(14),
    paddingBottom: vs(16),
  },
  title: {
    fontSize: s(21),
  },
  subtitle: {
    marginTop: vs(4),
    color: AppColors.medGray,
    fontSize: s(12),
  },
  filterButton: {
    width: s(40),
    height: s(40),
    borderRadius: s(14),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: AppColors.blueGray,
  },
  filterIcon: {
    fontSize: s(22),
    lineHeight: s(22),
    color: AppColors.primary,
    transform: [{ rotate: "90deg" }],
  },
  column: {
    gap: s(12),
    marginBottom: vs(12),
  },
});
