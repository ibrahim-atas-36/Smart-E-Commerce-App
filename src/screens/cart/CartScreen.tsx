import { FlatList, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import AppSafeView from "../../components/views/AppSafeView";
import AppText from "../../components/texts/AppText";
import AppTextInput from "../../components/inputs/AppTextInput";
import { useCart } from "../../store/CartContext";
import { AppColors } from "../../styles/color";
import { s, vs } from "react-native-size-matters";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useMainTabNavigation } from "../../navigation/MainTabNavigationContext";
import { useTheme } from "../../store/ThemeContext";
import { useLanguage } from "../../store/LanguageContext";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { AuthStackParamList } from "../../navigation/AuthStack";
import { Image as ExpoImage } from "expo-image";

type CartNavigation = StackNavigationProp<AuthStackParamList, "MainApp">;

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
  const navigation = useNavigation<CartNavigation>();
  const [coupon, setCoupon] = React.useState("");
  const [couponApplied, setCouponApplied] = React.useState(false);
  const cartTotal = cart.reduce((total, product) => total + product.price, 0);
  const discount = couponApplied ? cartTotal * 0.1 : 0;
  const total = cartTotal - discount;

  return (
    <AppSafeView
      style={[styles.screen, { backgroundColor: colors.background }]}
    >
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
              <LottieView
                source={require("../../assets/animations/empty-state.json")}
                autoPlay
                loop
                style={styles.emptyAnimation}
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
            <ExpoImage
              source={{ uri: item.imageURL }}
              style={[
                styles.itemImage,
                { backgroundColor: colors.elevatedSurface },
              ]}
              cachePolicy="memory-disk"
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
          <>
            {favorites.length > 0 ? (
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
                    <ExpoImage
                      source={{ uri: product.imageURL }}
                      style={[
                        styles.favoriteImage,
                        { backgroundColor: colors.elevatedSurface },
                      ]}
                      cachePolicy="memory-disk"
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
            ) : null}
            {cart.length > 0 ? (
              <View
                style={[
                  styles.summaryCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={styles.summaryRow}>
                  <AppText style={{ color: colors.secondaryText }}>
                    {t("subtotal")}
                  </AppText>
                  <AppText style={{ color: colors.text }}>
                    ${cartTotal.toLocaleString()}
                  </AppText>
                </View>
                {couponApplied ? (
                  <View style={styles.summaryRow}>
                    <AppText style={{ color: colors.accent }}>
                      SMART10 indirimi
                    </AppText>
                    <AppText style={{ color: colors.accent }}>
                      -${discount.toFixed(0)}
                    </AppText>
                  </View>
                ) : null}
                <View
                  style={[
                    styles.summaryDivider,
                    { backgroundColor: colors.border },
                  ]}
                />
                <View style={styles.summaryRow}>
                  <AppText variant="bold" style={{ color: colors.text }}>
                    {t("total")}
                  </AppText>
                  <AppText
                    variant="bold"
                    style={[styles.summaryTotal, { color: colors.primary }]}
                  >
                    ${total.toFixed(0)}
                  </AppText>
                </View>
              </View>
            ) : null}
            {cart.length > 0 ? (
              <View style={styles.couponRow}>
                <AppTextInput
                  value={coupon}
                  onChangeText={setCoupon}
                  placeholder="İndirim kodu gir"
                  autoCapitalize="characters"
                  style={styles.couponInput}
                />
                <Pressable
                  onPress={() =>
                    setCouponApplied(coupon.trim().toUpperCase() === "SMART10")
                  }
                  style={[styles.applyButton, { borderColor: colors.primary }]}
                >
                  <AppText variant="bold" style={{ color: colors.primary }}>
                    Uygula
                  </AppText>
                </Pressable>
              </View>
            ) : null}
            {cart.length > 0 ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Proceed to checkout"
                onPress={() => navigation.navigate("Checkout")}
                style={[
                  styles.checkoutButton,
                  { backgroundColor: colors.primary },
                ]}
              >
                <AppText variant="bold" style={{ color: colors.onPrimary }}>
                  Ödemeye geç
                </AppText>
                <MaterialIcons
                  name="arrow-forward"
                  size={s(20)}
                  color={colors.onPrimary}
                />
              </Pressable>
            ) : null}
          </>
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
    paddingTop: s(22),
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
  emptyAnimation: {
    width: s(70),
    height: s(70),
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
  summaryCard: {
    marginTop: vs(18),
    padding: s(16),
    borderRadius: s(18),
    borderWidth: 1,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryDivider: {
    height: 1,
    marginVertical: vs(12),
  },
  summaryTotal: {
    fontSize: s(18),
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
  checkoutButton: {
    minHeight: vs(48),
    marginTop: vs(12),
    borderRadius: s(14),
    paddingHorizontal: s(18),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  couponRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(8),
    marginTop: vs(12),
  },
  couponInput: {
    flex: 1,
  },
  applyButton: {
    height: vs(42),
    borderWidth: 1,
    borderRadius: s(14),
    paddingHorizontal: s(14),
    alignItems: "center",
    justifyContent: "center",
  },
});
