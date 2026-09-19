import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import AppSafeView from "../../components/views/AppSafeView";
import HomeHeader from "../../components/headers/HomeHeader";
import AppText from "../../components/texts/AppText";
import { useCart } from "../../store/CartContext";
import { AppColors } from "../../styles/color";
import { s, vs } from "react-native-size-matters";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useMainTabNavigation } from "../../navigation/MainTabNavigationContext";
import { useTheme } from "../../store/ThemeContext";
import { useLanguage } from "../../store/LanguageContext";

const CartScreen = () => {
  const {
    cart,
    favorites,
    addToCart,
    isInCart,
    removeFromCart,
    toggleFavorite,
  } = useCart();
  const { navigateToTab } = useMainTabNavigation();
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <AppSafeView
      style={[styles.screen, { backgroundColor: colors.background }]}
    >
      <HomeHeader />
      <FlatList
        data={cart}
        keyExtractor={(product) => product.id.toString()}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.heading}>
            <AppText variant="bold" style={styles.title}>
              {t("yourCart")}
            </AppText>
            <AppText style={styles.count}>
              {cart.length} {t("cartItems")}
            </AppText>
          </View>
        }
        ListEmptyComponent={
          <View
            style={[
              styles.emptyState,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View
              style={[
                styles.emptyIcon,
                { backgroundColor: colors.elevatedSurface },
              ]}
            >
              <MaterialIcons
                name="shopping-bag"
                size={s(34)}
                color={colors.primary}
              />
            </View>
            <AppText
              style={[styles.emptyEyebrow, { color: colors.secondaryText }]}
            >
              {t("readyWhen")}
            </AppText>
            <AppText variant="bold" style={styles.emptyTitle}>
              {t("cartWaiting")}
            </AppText>
            <AppText
              style={[styles.emptyText, { color: colors.secondaryText }]}
            >
              {t("discoverSomething")}
            </AppText>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Explore products"
              onPress={() => navigateToTab("Home")}
              style={[styles.shopButton, { backgroundColor: colors.primary }]}
            >
              <AppText
                variant="bold"
                style={[styles.shopButtonText, { color: colors.background }]}
              >
                {t("exploreProducts")}
              </AppText>
              <MaterialIcons
                name="arrow-forward"
                size={s(19)}
                color={colors.white}
              />
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.item,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Image
              source={{ uri: item.imageURL }}
              style={[
                styles.itemImage,
                { backgroundColor: colors.elevatedSurface },
              ]}
            />
            <View style={styles.itemDetails}>
              <AppText numberOfLines={1} style={styles.itemTitle}>
                {item.title}
              </AppText>
              <AppText variant="bold" style={styles.itemPrice}>
                ${item.price.toLocaleString()}
              </AppText>
            </View>
            <Pressable
              accessibilityLabel={`Remove ${item.title} from cart`}
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => removeFromCart(item.id)}
              style={styles.removeButton}
            >
              <MaterialIcons name="clear" size={s(24)} color={colors.medGray} />
            </Pressable>
          </View>
        )}
        ListFooterComponent={
          favorites.length > 0 ? (
            <View style={styles.favoritesSection}>
              <AppText variant="bold" style={styles.favoritesTitle}>
                {t("savedFavorites")}
              </AppText>
              {favorites.map((product) => (
                <View
                  key={product.id}
                  style={[
                    styles.favoriteItem,
                    { backgroundColor: colors.surface },
                  ]}
                >
                  <Image
                    source={{ uri: product.imageURL }}
                    style={[
                      styles.favoriteImage,
                      { backgroundColor: colors.elevatedSurface },
                    ]}
                  />
                  <AppText numberOfLines={1} style={styles.favoriteText}>
                    {product.title}
                  </AppText>
                  <View style={styles.favoriteActions}>
                    <Pressable
                      accessibilityLabel={`Add ${product.title} to cart`}
                      accessibilityRole="button"
                      disabled={isInCart(product.id)}
                      hitSlop={6}
                      onPress={() => addToCart(product)}
                      style={styles.favoriteActionButton}
                    >
                      <MaterialIcons
                        name="add-shopping-cart"
                        size={s(21)}
                        color={
                          isInCart(product.id)
                            ? colors.disabledGray
                            : colors.primary
                        }
                      />
                    </Pressable>
                    <Pressable
                      accessibilityLabel={`Remove ${product.title} from favorites`}
                      accessibilityRole="button"
                      hitSlop={6}
                      onPress={() => toggleFavorite(product)}
                      style={styles.favoriteActionButton}
                    >
                      <MaterialIcons
                        name="clear"
                        size={s(22)}
                        color={colors.medGray}
                      />
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </AppSafeView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: AppColors.background,
  },
  content: {
    padding: s(16),
    paddingBottom: vs(24),
    flexGrow: 1,
  },
  heading: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: vs(16),
  },
  title: {
    fontSize: s(22),
  },
  count: {
    color: AppColors.medGray,
    fontSize: s(12),
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: vs(12),
    padding: s(10),
    borderRadius: s(14),
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: AppColors.blueGray,
  },
  itemImage: {
    width: s(82),
    height: s(82),
    borderRadius: s(10),
    backgroundColor: AppColors.lightGray,
  },
  itemDetails: {
    flex: 1,
    marginLeft: s(12),
    gap: vs(6),
  },
  itemTitle: {
    fontSize: s(14),
    fontWeight: "600",
  },
  itemPrice: {
    fontSize: s(15),
  },
  removeButton: {
    width: s(32),
    height: s(32),
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: vs(10),
    paddingHorizontal: s(18),
    paddingVertical: vs(16),
    borderRadius: s(24),
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: AppColors.blueGray,
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  emptyIcon: {
    width: s(72),
    height: s(72),
    borderRadius: s(36),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppColors.lightGray,
    marginBottom: vs(16),
  },
  emptyEyebrow: {
    color: AppColors.medGray,
    fontSize: s(10),
    fontWeight: "700",
    letterSpacing: 1.2,
    marginBottom: vs(7),
  },
  emptyTitle: {
    fontSize: s(22),
  },
  emptyText: {
    marginTop: vs(9),
    color: AppColors.medGray,
    textAlign: "center",
    fontSize: s(13),
    lineHeight: vs(20),
    maxWidth: s(240),
  },
  shopButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: s(8),
    minHeight: vs(44),
    marginTop: vs(22),
    paddingHorizontal: s(20),
    borderRadius: s(14),
    backgroundColor: AppColors.primary,
  },
  shopButtonText: {
    color: AppColors.white,
    fontSize: s(13),
  },
  favoritesSection: {
    marginTop: vs(18),
  },
  favoritesTitle: {
    marginBottom: vs(10),
    fontSize: s(17),
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: vs(8),
    padding: s(8),
    borderRadius: s(10),
    backgroundColor: AppColors.white,
  },
  favoriteImage: {
    width: s(48),
    height: s(48),
    borderRadius: s(8),
    backgroundColor: AppColors.lightGray,
  },
  favoriteText: {
    flex: 1,
    marginLeft: s(10),
    fontSize: s(13),
  },
  favoriteActions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: s(8),
  },
  favoriteActionButton: {
    width: s(30),
    height: s(34),
    alignItems: "center",
    justifyContent: "center",
  },
});
