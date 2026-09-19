import {
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import { showMessage } from "react-native-flash-message";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/color";
import AppText from "../texts/AppText";
import { useCart } from "../../store/CartContext";
import type { Product } from "../../types/product";
import { useTheme } from "../../store/ThemeContext";
import { useLanguage } from "../../store/LanguageContext";
import { Image as ExpoImage } from "expo-image";

export type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
  onPress?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { cart, addToCart, toggleFavorite, isFavorite } = useCart();
  const { colors } = useTheme();
  const { t } = useLanguage();
  const addedToCart = cart.some((item) => item.id === product.id);
  const markedFavorite = isFavorite(product.id);
  const favoriteScale = React.useRef(new Animated.Value(1)).current;

  const animateFavorite = () => {
    Animated.sequence([
      Animated.timing(favoriteScale, {
        toValue: 1.28,
        duration: 110,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(favoriteScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
    toggleFavorite(product);
    showMessage({
      message: markedFavorite ? "Favorilerden çıkarıldı" : "Favorilere eklendi",
      type: "success",
      duration: 1800,
    });
  };

  const addProductToCart = () => {
    addToCart(product);
    showMessage({
      message: "Ürün sepete eklendi",
      type: "success",
      duration: 1800,
    });
  };

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress?.(product)}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.imageContainer,
          { backgroundColor: colors.elevatedSurface },
        ]}
      >
        <ExpoImage
          source={{ uri: product.imageURL }}
          style={styles.image}
          cachePolicy="memory-disk"
          resizeMode="contain"
        />
        <Pressable
          accessibilityLabel={
            markedFavorite ? "Remove from favorites" : "Add to favorites"
          }
          onPress={animateFavorite}
          style={[styles.favoriteButton, { backgroundColor: colors.surface }]}
        >
          <Animated.View style={{ transform: [{ scale: favoriteScale }] }}>
            <AppText
              style={[
                styles.favoriteIcon,
                { color: markedFavorite ? colors.accent : colors.medGray },
              ]}
            >
              {markedFavorite ? "♥" : "♡"}
            </AppText>
          </Animated.View>
        </Pressable>
      </View>
      <View style={styles.details}>
        <AppText
          numberOfLines={1}
          style={[styles.title, { color: colors.text }]}
        >
          {product.title}
        </AppText>
        <AppText
          variant="bold"
          style={[styles.price, { color: colors.primary }]}
        >
          ${product.price.toLocaleString()}
        </AppText>
        <Pressable
          accessibilityLabel={
            addedToCart ? "Product already in cart" : "Add product to cart"
          }
          disabled={addedToCart}
          onPress={addProductToCart}
          style={[
            styles.cartButton,
            { backgroundColor: colors.primary },
            addedToCart && {
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.accent,
            },
          ]}
        >
          <Image
            source={require("../../assets/images/cart-tab-icon.png")}
            style={[
              styles.cartButtonIcon,
              { tintColor: addedToCart ? colors.accent : colors.onPrimary },
            ]}
          />
          <AppText
            style={[
              styles.cartButtonText,
              { color: addedToCart ? colors.accent : colors.onPrimary },
            ]}
          >
            {addedToCart ? t("addedToCart") : t("addToCart")}
          </AppText>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 0,
    backgroundColor: AppColors.white,
    borderRadius: s(16),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.04)",
    elevation: 5,
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.11,
    shadowRadius: 10,
  },
  pressed: {
    opacity: 0.86,
  },
  imageContainer: {
    width: "100%",
    height: vs(145),
    backgroundColor: AppColors.lightGray,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    position: "absolute",
    top: s(8),
    right: s(8),
    width: s(32),
    height: s(32),
    borderRadius: s(16),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppColors.white,
    elevation: 2,
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  favoriteIcon: {
    fontSize: s(20),
    lineHeight: s(22),
    color: AppColors.medGray,
  },
  favoriteActive: {
    color: AppColors.primary,
  },
  details: {
    paddingHorizontal: s(12),
    paddingVertical: vs(10),
    gap: vs(5),
  },
  title: {
    fontSize: s(13),
    fontWeight: "600",
  },
  price: {
    fontSize: s(15),
    color: AppColors.primary,
  },
  cartButton: {
    minHeight: vs(34),
    borderRadius: s(10),
    flexDirection: "row",
    gap: s(6),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppColors.primary,
  },
  cartButtonAdded: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: AppColors.black,
  },
  cartButtonText: {
    color: AppColors.white,
    fontSize: s(11),
    fontWeight: "600",
  },
  cartButtonTextAdded: {
    color: AppColors.black,
  },
  cartButtonIcon: {
    width: s(17),
    height: s(17),
  },
});
