import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
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
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { AuthStackParamList } from "../../navigation/AuthStack";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Modal, Pressable } from "react-native";
import { showMessage } from "react-native-flash-message";

type HomeNavigation = StackNavigationProp<AuthStackParamList, "MainApp">;

const HomeScreen = () => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const navigation = useNavigation<HomeNavigation>();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [scannerVisible, setScannerVisible] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [sortDescending, setSortDescending] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const visibleProducts = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(normalizedQuery),
    );

    return [...filtered].sort((left, right) =>
      sortDescending ? right.price - left.price : left.price - right.price,
    );
  }, [query, sortDescending]);

  const refreshProducts = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 450);
  };

  const openScanner = async () => {
    const permission = cameraPermission?.granted
      ? cameraPermission
      : await requestCameraPermission();
    if (permission.granted) {
      setScannerVisible(true);
    }
  };

  const handleBarcode = ({ data }: { data: string }) => {
    setScannerVisible(false);
    const product = products.find(
      (item) => item.barcode === data || item.id.toString() === data,
    );
    if (product) {
      navigation.navigate("ProductDetail", { product });
      return;
    }
    showMessage({ message: "Bu barkoda ait ürün bulunamadı", type: "warning" });
  };

  React.useEffect(() => {
    const loadingTimer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <AppSafeView
      style={[styles.screen, { backgroundColor: colors.background }]}
    >
      <FlatList
        data={isLoading ? [] : visibleProducts}
        keyExtractor={(product) => product.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshProducts}
            tintColor={colors.primary}
          />
        }
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
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Barkod tara"
                onPress={openScanner}
              >
                <MaterialIcons
                  name="photo-camera"
                  size={s(21)}
                  color={colors.text}
                />
              </Pressable>
            </View>
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <SkeletonList colors={colors} />
          ) : (
            <View style={styles.noResults}>
              <LottieView
                source={require("../../assets/animations/empty-state.json")}
                autoPlay
                loop
                style={styles.emptyAnimation}
              />
              <AppText
                style={[styles.noResultsText, { color: colors.secondaryText }]}
              >
                {t("noProductsFound")}
              </AppText>
            </View>
          )
        }
        renderItem={({ item }) => (
          <ProductCard
            product={item as Product}
            onPress={(selectedProduct) =>
              navigation.navigate("ProductDetail", { product: selectedProduct })
            }
          />
        )}
      />
      <Modal
        visible={scannerVisible}
        animationType="slide"
        onRequestClose={() => setScannerVisible(false)}
      >
        <View style={styles.scannerScreen}>
          <CameraView
            style={StyleSheet.absoluteFill}
            facing="back"
            onBarcodeScanned={scannerVisible ? handleBarcode : undefined}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "ean13", "ean8", "code128"],
            }}
          />
          <View style={styles.scannerOverlay}>
            <AppText variant="bold" style={styles.scannerTitle}>
              Ürün barkodunu veya QR kodu okutun
            </AppText>
            <View style={styles.scanFrame} />
            <Pressable
              onPress={() => setScannerVisible(false)}
              style={styles.closeScanner}
            >
              <AppText variant="bold" style={styles.closeScannerText}>
                Kapat
              </AppText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </AppSafeView>
  );
};

const SkeletonList = ({
  colors,
}: {
  colors: ReturnType<typeof useTheme>["colors"];
}) => (
  <View style={styles.skeletonList}>
    {[0, 1, 2, 3].map((item) => (
      <View
        key={item}
        style={[
          styles.skeletonCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View
          style={[styles.skeletonImage, { backgroundColor: colors.elevated }]}
        />
        <View
          style={[styles.skeletonLine, { backgroundColor: colors.elevated }]}
        />
        <View
          style={[
            styles.skeletonShortLine,
            { backgroundColor: colors.elevated },
          ]}
        />
      </View>
    ))}
  </View>
);

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
  emptyAnimation: {
    width: s(110),
    height: s(110),
  },
  skeletonList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: s(12),
  },
  skeletonCard: {
    width: "48%",
    borderRadius: s(16),
    borderWidth: 1,
    padding: s(10),
    gap: vs(10),
  },
  skeletonImage: {
    height: vs(130),
    borderRadius: s(10),
  },
  skeletonLine: {
    height: vs(12),
    borderRadius: s(6),
  },
  skeletonShortLine: {
    width: "55%",
    height: vs(12),
    borderRadius: s(6),
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
  scannerScreen: {
    flex: 1,
    backgroundColor: "#000",
  },
  scannerOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: vs(70),
    paddingBottom: vs(40),
  },
  scannerTitle: {
    color: "#fff",
    fontSize: s(16),
    textAlign: "center",
    paddingHorizontal: s(24),
  },
  scanFrame: {
    width: s(240),
    height: s(240),
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: s(18),
  },
  closeScanner: {
    minWidth: s(110),
    minHeight: vs(44),
    borderRadius: s(14),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.92)",
  },
  closeScannerText: {
    color: "#101114",
  },
});
