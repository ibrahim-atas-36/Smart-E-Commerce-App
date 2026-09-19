import { FlatList, StyleSheet, TextInput, View } from "react-native";
import React from "react";
import AppSafeView from "../../components/views/AppSafeView";
import ProductCard, { Product } from "../../components/cards/ProductCard";
import AppText from "../../components/texts/AppText";
import { products } from "../../data/products";
import { AppColors } from "../../styles/color";
import { s, vs } from "react-native-size-matters";
import { useTheme } from "../../store/ThemeContext";
import { useLanguage } from "../../store/LanguageContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const HomeScreen = () => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [query, setQuery] = React.useState("");
  const [sortDescending, setSortDescending] = React.useState(false);
  const visibleProducts = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(normalizedQuery),
    );

    return [...filtered].sort((left, right) =>
      sortDescending ? right.price - left.price : left.price - right.price,
    );
  }, [query, sortDescending]);

  return (
    <AppSafeView
      style={[styles.screen, { backgroundColor: colors.background }]}
    >
      <FlatList
        data={visibleProducts}
        keyExtractor={(product) => product.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
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
                  styles.resultCount,
                  { backgroundColor: colors.elevatedSurface },
                ]}
              >
                <AppText
                  style={[
                    styles.resultCountText,
                    { color: colors.secondaryText },
                  ]}
                >
                  {visibleProducts.length}
                </AppText>
              </View>
            </View>
            <View
              style={[
                styles.searchBar,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <MaterialIcons
                name="search"
                size={s(21)}
                color={colors.secondaryText}
              />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder={t("searchProducts")}
                placeholderTextColor={colors.secondaryText}
                style={[styles.searchInput, { color: colors.text }]}
                returnKeyType="search"
              />
              {query.length > 0 ? (
                <MaterialIcons
                  name="close"
                  size={s(19)}
                  color={colors.secondaryText}
                  onPress={() => setQuery("")}
                />
              ) : null}
              <MaterialIcons
                name={sortDescending ? "arrow-downward" : "arrow-upward"}
                size={s(19)}
                color={colors.text}
                onPress={() => setSortDescending((current) => !current)}
              />
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.noResults}>
            <MaterialIcons
              name="search-off"
              size={s(34)}
              color={colors.secondaryText}
            />
            <AppText
              style={[styles.noResultsText, { color: colors.secondaryText }]}
            >
              {t("noProductsFound")}
            </AppText>
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
    paddingTop: vs(10),
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
  searchBar: {
    minHeight: vs(46),
    flexDirection: "row",
    alignItems: "center",
    gap: s(9),
    paddingHorizontal: s(13),
    borderRadius: s(15),
    borderWidth: 1,
    marginBottom: vs(14),
  },
  searchInput: {
    flex: 1,
    minHeight: vs(42),
    paddingVertical: 0,
    fontSize: s(13),
  },
  resultCount: {
    minWidth: s(30),
    height: s(30),
    borderRadius: s(15),
    alignItems: "center",
    justifyContent: "center",
  },
  resultCountText: {
    fontSize: s(12),
    fontWeight: "700",
  },
  noResults: {
    alignItems: "center",
    paddingVertical: vs(48),
    gap: vs(10),
  },
  noResultsText: {
    fontSize: s(13),
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
