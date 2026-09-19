import { Image, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/color";
import AppText from "../texts/AppText";
import { useCart } from "../../store/CartContext";
import type { Product } from "../../types/product";

export type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
  onPress?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { cart, addToCart, toggleFavorite, isFavorite } = useCart();
  const addedToCart = cart.some((item) => item.id === product.id);
  const markedFavorite = isFavorite(product.id);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress?.(product)}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.imageURL }}
          style={styles.image}
          resizeMode="contain"
        />
        <Pressable
          accessibilityLabel={
            markedFavorite ? "Remove from favorites" : "Add to favorites"
          }
          onPress={() => toggleFavorite(product)}
          style={styles.favoriteButton}
        >
          <AppText
            style={[
              styles.favoriteIcon,
              markedFavorite && styles.favoriteActive,
            ]}
          >
            {markedFavorite ? "♥" : "♡"}
          </AppText>
        </Pressable>
      </View>
      <View style={styles.details}>
        <AppText numberOfLines={1} style={styles.title}>
          {product.title}
        </AppText>
        <AppText variant="bold" style={styles.price}>
          ${product.price.toLocaleString()}
        </AppText>
        <Pressable
          accessibilityLabel={
            addedToCart ? "Product already in cart" : "Add product to cart"
          }
          disabled={addedToCart}
          onPress={() => addToCart(product)}
          style={[styles.cartButton, addedToCart && styles.cartButtonAdded]}
        >
          <Image
            source={require("../../assets/images/cart-tab-icon.png")}
            style={[
              styles.cartButtonIcon,
              { tintColor: addedToCart ? AppColors.black : AppColors.white },
            ]}
          />
          <AppText
            style={[
              styles.cartButtonText,
              addedToCart && styles.cartButtonTextAdded,
            ]}
          >
            {addedToCart ? "Sepete eklendi" : "Add to cart"}
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
