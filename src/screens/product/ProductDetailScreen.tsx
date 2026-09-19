import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  View,
} from "react-native";
import { Image as ExpoImage } from "expo-image";
import { s, vs } from "react-native-size-matters";
import AppButton from "../../components/buttons/AppButton";
import AppSafeView from "../../components/views/AppSafeView";
import AppText from "../../components/texts/AppText";
import AppTextInput from "../../components/inputs/AppTextInput";
import type { AuthStackParamList } from "../../navigation/AuthStack";
import { useCart } from "../../store/CartContext";
import { useTheme } from "../../store/ThemeContext";
import type { ProductReview } from "../../types/product";

type ProductNavigation = StackNavigationProp<
  AuthStackParamList,
  "ProductDetail"
>;

const defaultReviews: ProductReview[] = [
  {
    id: "initial-1",
    author: "Ayse K.",
    rating: 5,
    comment: "Beklentimi karsiladi, kaliteli bir urun.",
  },
  {
    id: "initial-2",
    author: "Mert D.",
    rating: 4,
    comment: "Kargo hizliydi ve urun sorunsuz geldi.",
  },
];

const ProductDetailScreen = () => {
  const navigation = useNavigation<ProductNavigation>();
  const route = useRoute<RouteProp<AuthStackParamList, "ProductDetail">>();
  const { product } = route.params;
  const { addToCart } = useCart();
  const { colors } = useTheme();
  const [selectedSize, setSelectedSize] = React.useState(
    product.sizes?.[0] ?? "Standart",
  );
  const [selectedColor, setSelectedColor] = React.useState(
    product.colors?.[0] ?? "Siyah",
  );
  const [reviews, setReviews] = React.useState<ProductReview[]>(
    product.reviews ?? defaultReviews,
  );
  const [reviewVisible, setReviewVisible] = React.useState(false);
  const [reviewText, setReviewText] = React.useState("");
  const [reviewRating, setReviewRating] = React.useState(5);
  const sizes = product.sizes ?? ["S", "M", "L"];
  const colorsList = product.colors ?? ["Siyah", "Beyaz"];
  const variantKey = `${selectedSize}-${selectedColor}`;
  const stock =
    product.stock?.[variantKey] ??
    product.stock?.[selectedSize] ??
    { S: 12, M: 8, L: 3 }[selectedSize] ??
    6;
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const submitReview = () => {
    if (!reviewText.trim()) return;
    setReviews((current) => [
      {
        id: `review-${Date.now()}`,
        author: "Sen",
        rating: reviewRating,
        comment: reviewText.trim(),
      },
      ...current,
    ]);
    setReviewText("");
    setReviewRating(5);
    setReviewVisible(false);
  };

  return (
    <AppSafeView
      style={[styles.screen, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={[styles.iconButton, { backgroundColor: colors.surface }]}
        >
          <MaterialIcons name="arrow-back" size={s(21)} color={colors.text} />
        </Pressable>
        <Pressable
          onPress={() =>
            Share.share({
              title: product.title,
              message: `${product.title} - $${product.price.toLocaleString()}\n${product.imageURL}`,
            })
          }
          style={[styles.iconButton, { backgroundColor: colors.surface }]}
        >
          <MaterialIcons name="share" size={s(21)} color={colors.text} />
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ExpoImage
          source={{ uri: product.imageURL }}
          cachePolicy="memory-disk"
          contentFit="contain"
          style={[styles.image, { backgroundColor: colors.surface }]}
        />
        <View style={styles.titleRow}>
          <AppText
            variant="bold"
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
        </View>
        <View style={styles.ratingRow}>
          <AppText style={{ color: "#f59e0b" }}>
            {"★".repeat(Math.round(averageRating))}
            {"☆".repeat(5 - Math.round(averageRating))}
          </AppText>
          <AppText style={{ color: colors.secondaryText }}>
            {" "}
            {averageRating.toFixed(1)} ({reviews.length} yorum)
          </AppText>
        </View>
        <AppText style={[styles.sectionLabel, { color: colors.secondaryText }]}>
          Beden
        </AppText>
        <View style={styles.options}>
          {sizes.map((size) => (
            <Pressable
              key={size}
              onPress={() => setSelectedSize(size)}
              style={[
                styles.option,
                {
                  borderColor:
                    selectedSize === size ? colors.primary : colors.border,
                  backgroundColor:
                    selectedSize === size ? colors.elevated : colors.surface,
                },
              ]}
            >
              <AppText style={{ color: colors.text }}>{size}</AppText>
            </Pressable>
          ))}
        </View>
        <AppText style={[styles.sectionLabel, { color: colors.secondaryText }]}>
          Renk
        </AppText>
        <View style={styles.options}>
          {colorsList.map((color) => (
            <Pressable
              key={color}
              onPress={() => setSelectedColor(color)}
              style={[
                styles.option,
                {
                  borderColor:
                    selectedColor === color ? colors.primary : colors.border,
                  backgroundColor:
                    selectedColor === color ? colors.elevated : colors.surface,
                },
              ]}
            >
              <AppText style={{ color: colors.text }}>{color}</AppText>
            </Pressable>
          ))}
        </View>
        <View
          style={[
            styles.stockRow,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <MaterialIcons
            name="inventory-2"
            size={s(19)}
            color={colors.accent}
          />
          <AppText style={{ color: colors.text }}>
            {stock > 0 ? `${stock} adet stokta` : "Bu varyasyon tükendi"}
          </AppText>
        </View>
        <AppButton
          title="Sepete ekle"
          disabled={stock === 0}
          onPress={() => addToCart(product)}
          style={styles.addButton}
        />
        <View style={styles.reviewHeader}>
          <AppText
            variant="bold"
            style={[styles.sectionTitle, { color: colors.text }]}
          >
            Yorumlar
          </AppText>
          <Pressable onPress={() => setReviewVisible(true)}>
            <AppText variant="bold" style={{ color: colors.primary }}>
              Yorum yaz
            </AppText>
          </Pressable>
        </View>
        {reviews.map((review) => (
          <View
            key={review.id}
            style={[
              styles.review,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={styles.reviewTop}>
              <AppText variant="bold" style={{ color: colors.text }}>
                {review.author}
              </AppText>
              <AppText style={{ color: "#f59e0b" }}>
                {"★".repeat(review.rating)}
              </AppText>
            </View>
            <AppText style={{ color: colors.secondaryText }}>
              {review.comment}
            </AppText>
          </View>
        ))}
      </ScrollView>
      <Modal
        visible={reviewVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setReviewVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modal, { backgroundColor: colors.surface }]}>
            <AppText
              variant="bold"
              style={[styles.sectionTitle, { color: colors.text }]}
            >
              Yorumun
            </AppText>
            <View style={styles.ratingPicker}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <Pressable key={rating} onPress={() => setReviewRating(rating)}>
                  <AppText
                    style={{
                      color: rating <= reviewRating ? "#f59e0b" : colors.border,
                      fontSize: s(28),
                    }}
                  >
                    ★
                  </AppText>
                </Pressable>
              ))}
            </View>
            <AppTextInput
              value={reviewText}
              onChangeText={setReviewText}
              placeholder="Ürün hakkında ne düşünüyorsun?"
              multiline
            />
            <AppButton title="Yorumu yayınla" onPress={submitReview} />
            <Pressable
              onPress={() => setReviewVisible(false)}
              style={styles.cancel}
            >
              <AppText style={{ color: colors.secondaryText }}>Vazgeç</AppText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </AppSafeView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: s(16),
    paddingTop: vs(12),
  },
  iconButton: {
    width: s(40),
    height: s(40),
    borderRadius: s(13),
    alignItems: "center",
    justifyContent: "center",
  },
  content: { padding: s(16), paddingBottom: vs(40) },
  image: { width: "100%", height: vs(260), borderRadius: s(20) },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: s(12),
    marginTop: vs(18),
  },
  title: { flex: 1, fontSize: s(22) },
  price: { fontSize: s(18) },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: vs(8) },
  sectionLabel: {
    marginTop: vs(20),
    marginBottom: vs(8),
    fontSize: s(12),
    fontWeight: "700",
  },
  options: { flexDirection: "row", flexWrap: "wrap", gap: s(8) },
  option: {
    minWidth: s(52),
    paddingHorizontal: s(14),
    height: vs(38),
    borderWidth: 1,
    borderRadius: s(12),
    alignItems: "center",
    justifyContent: "center",
  },
  stockRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(8),
    borderWidth: 1,
    borderRadius: s(14),
    padding: s(12),
    marginTop: vs(18),
  },
  addButton: { marginTop: vs(14) },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: vs(26),
    marginBottom: vs(10),
  },
  sectionTitle: { fontSize: s(18) },
  review: {
    borderWidth: 1,
    borderRadius: s(14),
    padding: s(12),
    gap: vs(7),
    marginBottom: vs(8),
  },
  reviewTop: { flexDirection: "row", justifyContent: "space-between" },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  modal: {
    borderTopLeftRadius: s(24),
    borderTopRightRadius: s(24),
    padding: s(20),
    gap: vs(12),
  },
  ratingPicker: { flexDirection: "row", gap: s(6) },
  cancel: { alignItems: "center", padding: s(8) },
});
