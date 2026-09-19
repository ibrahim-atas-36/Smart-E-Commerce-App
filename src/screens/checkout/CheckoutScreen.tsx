import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AppButton from "../../components/buttons/AppButton";
import AppSafeView from "../../components/views/AppSafeView";
import AppText from "../../components/texts/AppText";
import AppTextInput from "../../components/inputs/AppTextInput";
import type { AuthStackParamList } from "../../navigation/AuthStack";
import { useCart } from "../../store/CartContext";
import { useTheme } from "../../store/ThemeContext";
import { s, vs } from "react-native-size-matters";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const addressSchema = z.object({
  fullName: z.string().trim().min(2, "Ad soyad en az 2 karakter olmalı."),
  address: z.string().trim().min(8, "Açık adres en az 8 karakter olmalı."),
  city: z.string().trim().min(2, "Şehir bilgisi gerekli."),
  postalCode: z.string().regex(/^\d{5}$/, "Posta kodu 5 haneli olmalı."),
});

type AddressFormValues = z.infer<typeof addressSchema>;

type CheckoutNavigation = StackNavigationProp<AuthStackParamList, "Checkout">;

const CheckoutScreen = () => {
  const navigation = useNavigation<CheckoutNavigation>();
  const { cart, placeOrder } = useCart();
  const { colors } = useTheme();
  const [step, setStep] = React.useState(0);
  const {
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: { fullName: "", address: "", city: "", postalCode: "" },
    mode: "onTouched",
  });
  const address = watch();
  const [cardNumber, setCardNumber] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [coupon, setCoupon] = React.useState("");
  const [couponApplied, setCouponApplied] = React.useState(false);
  const [error, setError] = React.useState("");
  const [completedOrderId, setCompletedOrderId] = React.useState("");
  const [mapVisible, setMapVisible] = React.useState(false);
  const [mapCoordinate, setMapCoordinate] = React.useState({
    latitude: 41.0082,
    longitude: 28.9784,
  });

  const subtotal = cart.reduce((total, product) => total + product.price, 0);
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const updateAddress = (key: keyof AddressFormValues, value: string) => {
    setValue(key, value, { shouldValidate: true });
    setError("");
  };

  const formatCardNumber = (value: string) =>
    value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2
      ? `${digits.slice(0, 2)}/${digits.slice(2)}`
      : digits;
  };

  const selectMapLocation = async (coordinate: typeof mapCoordinate) => {
    setMapCoordinate(coordinate);
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== Location.PermissionStatus.GRANTED) {
        setMapVisible(false);
        return;
      }
      const result = await Location.reverseGeocodeAsync(coordinate);
      const location = result[0];
      if (location) {
        const addressLine = [location.street, location.name]
          .filter(Boolean)
          .join(" ");
        updateAddress(
          "address",
          addressLine ||
            `${coordinate.latitude.toFixed(5)}, ${coordinate.longitude.toFixed(5)}`,
        );
        updateAddress("city", location.city || location.district || "");
        updateAddress("postalCode", location.postalCode || "");
      }
    } catch {
      updateAddress(
        "address",
        `${coordinate.latitude.toFixed(5)}, ${coordinate.longitude.toFixed(5)}`,
      );
    } finally {
      setMapVisible(false);
    }
  };

  const nextStep = async () => {
    if (step === 0 && !(await trigger())) {
      setError("Teslimat adresindeki alanları kontrol edin.");
      return;
    }
    if (
      step === 1 &&
      (cardNumber.replace(/\s/g, "").length !== 16 ||
        expiry.length !== 5 ||
        cvv.length !== 3)
    ) {
      setError(
        "Kart numarası, son kullanma tarihi ve CVV bilgilerini kontrol edin.",
      );
      return;
    }
    setError("");
    setStep((current) => current + 1);
  };

  const completeOrder = () => {
    const order = placeOrder({
      address,
      subtotal,
      discount,
      total,
      paymentLabel: `•••• ${cardNumber.replace(/\s/g, "").slice(-4)}`,
    });
    setCompletedOrderId(order.id);
  };

  if (completedOrderId) {
    return (
      <AppSafeView
        style={[styles.screen, { backgroundColor: colors.background }]}
      >
        <View style={styles.successContent}>
          <LottieView
            source={require("../../assets/animations/order-success.json")}
            autoPlay
            loop={false}
            style={styles.successAnimation}
          />
          <AppText
            variant="bold"
            style={[styles.successTitle, { color: colors.text }]}
          >
            Siparişiniz alındı
          </AppText>
          <AppText
            style={[styles.successCopy, { color: colors.secondaryText }]}
          >
            Teşekkürler. Siparişiniz hazırlanmaya başladı.
          </AppText>
          <View
            style={[
              styles.orderNumber,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <AppText style={{ color: colors.secondaryText }}>
              Sipariş numarası
            </AppText>
            <AppText variant="bold" style={{ color: colors.text }}>
              {completedOrderId}
            </AppText>
          </View>
          <AppButton
            title="Siparişlerime git"
            onPress={() => navigation.replace("OrderHistory")}
          />
          <Pressable
            onPress={() => navigation.replace("MainApp")}
            style={styles.backHome}
          >
            <AppText variant="bold" style={{ color: colors.primary }}>
              Alışverişe devam et
            </AppText>
          </Pressable>
        </View>
      </AppSafeView>
    );
  }

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
        <AppText variant="bold" style={[styles.title, { color: colors.text }]}>
          Ödeme
        </AppText>
        <View style={styles.iconButton} />
      </View>
      <View style={styles.steps}>
        {["Adres", "Ödeme", "Onay"].map((label, index) => (
          <View key={label} style={styles.stepItem}>
            <View
              style={[
                styles.stepDot,
                {
                  backgroundColor:
                    index <= step ? colors.primary : colors.border,
                },
              ]}
            >
              <AppText
                style={{
                  color:
                    index <= step ? colors.onPrimary : colors.secondaryText,
                }}
              >
                {index + 1}
              </AppText>
            </View>
            <AppText
              style={{
                color: index <= step ? colors.text : colors.secondaryText,
              }}
            >
              {label}
            </AppText>
          </View>
        ))}
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {step === 0 ? (
          <View>
            <AppText
              variant="bold"
              style={[styles.sectionTitle, { color: colors.text }]}
            >
              Teslimat adresi
            </AppText>
            <AppTextInput
              value={address.fullName}
              onChangeText={(value) => updateAddress("fullName", value)}
              placeholder="Ad soyad"
            />
            {errors.fullName ? (
              <AppText style={styles.error}>{errors.fullName.message}</AppText>
            ) : null}
            <AppTextInput
              value={address.address}
              onChangeText={(value) => updateAddress("address", value)}
              placeholder="Açık adres"
              multiline
            />
            {errors.address ? (
              <AppText style={styles.error}>{errors.address.message}</AppText>
            ) : null}
            <View style={styles.row}>
              <AppTextInput
                value={address.city}
                onChangeText={(value) => updateAddress("city", value)}
                placeholder="Şehir"
                style={styles.halfInput}
              />
              <AppTextInput
                value={address.postalCode}
                onChangeText={(value) => updateAddress("postalCode", value)}
                placeholder="Posta kodu"
                keyboardType="numeric"
                style={styles.halfInput}
              />
            </View>
            {errors.city || errors.postalCode ? (
              <AppText style={styles.error}>
                {errors.city?.message ?? errors.postalCode?.message}
              </AppText>
            ) : null}
            <Pressable
              onPress={() => setMapVisible(true)}
              style={[styles.mapButton, { borderColor: colors.primary }]}
            >
              <MaterialIcons name="map" size={s(20)} color={colors.primary} />
              <AppText variant="bold" style={{ color: colors.primary }}>
                Haritadan adres seç
              </AppText>
            </Pressable>
          </View>
        ) : step === 1 ? (
          <View>
            <AppText
              variant="bold"
              style={[styles.sectionTitle, { color: colors.text }]}
            >
              Kart bilgileri
            </AppText>
            <View
              style={[styles.cardPreview, { backgroundColor: colors.primary }]}
            >
              <MaterialIcons
                name="contactless"
                size={s(24)}
                color={colors.onPrimary}
              />
              <AppText style={[styles.cardNumber, { color: colors.onPrimary }]}>
                {cardNumber || "•••• •••• •••• ••••"}
              </AppText>
              <AppText style={{ color: colors.onPrimary }}>
                {cardNumber ? "Kart sahibi" : "Güvenli ödeme"}
              </AppText>
            </View>
            <AppTextInput
              value={cardNumber}
              onChangeText={(value) => setCardNumber(formatCardNumber(value))}
              placeholder="Kart numarası"
              keyboardType="numeric"
            />
            <View style={styles.row}>
              <AppTextInput
                value={expiry}
                onChangeText={(value) => setExpiry(formatExpiry(value))}
                placeholder="AA/YY"
                keyboardType="numeric"
                style={styles.halfInput}
              />
              <AppTextInput
                value={cvv}
                onChangeText={(value) =>
                  setCvv(value.replace(/\D/g, "").slice(0, 3))
                }
                placeholder="CVV"
                keyboardType="numeric"
                secureTextEntry
                style={styles.halfInput}
              />
            </View>
          </View>
        ) : (
          <View>
            <AppText
              variant="bold"
              style={[styles.sectionTitle, { color: colors.text }]}
            >
              Sipariş özeti
            </AppText>
            <View
              style={[
                styles.summary,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              {cart.map((product) => (
                <View key={product.id} style={styles.summaryRow}>
                  <AppText numberOfLines={1} style={styles.productName}>
                    {product.title}
                  </AppText>
                  <AppText style={{ color: colors.text }}>
                    ${product.price.toLocaleString()}
                  </AppText>
                </View>
              ))}
              <View
                style={[styles.divider, { backgroundColor: colors.border }]}
              />
              <View style={styles.summaryRow}>
                <AppText style={{ color: colors.secondaryText }}>
                  Ara toplam
                </AppText>
                <AppText>${subtotal.toLocaleString()}</AppText>
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
              <View style={styles.summaryRow}>
                <AppText variant="bold">Toplam</AppText>
                <AppText variant="bold" style={{ color: colors.primary }}>
                  ${total.toFixed(0)}
                </AppText>
              </View>
            </View>
            <AppText
              style={[styles.addressPreview, { color: colors.secondaryText }]}
            >
              {address.fullName} · {address.address}, {address.city}
            </AppText>
          </View>
        )}
        {step === 2 ? null : (
          <View style={styles.couponRow}>
            <AppTextInput
              value={coupon}
              onChangeText={setCoupon}
              placeholder="İndirim kodu"
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
        )}
        {error ? <AppText style={styles.error}>{error}</AppText> : null}
        <AppButton
          title={step === 2 ? "Siparişi tamamla" : "Devam et"}
          onPress={step === 2 ? completeOrder : nextStep}
          style={styles.nextButton}
        />
      </ScrollView>
      <Modal
        visible={mapVisible}
        animationType="slide"
        onRequestClose={() => setMapVisible(false)}
      >
        <View style={styles.mapScreen}>
          <MapView
            style={StyleSheet.absoluteFill}
            initialRegion={{
              ...mapCoordinate,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
            }}
            onPress={(event) =>
              void selectMapLocation(event.nativeEvent.coordinate)
            }
          >
            <Marker coordinate={mapCoordinate} />
          </MapView>
          <View style={styles.mapHeader}>
            <AppText variant="bold" style={styles.mapTitle}>
              Teslimat konumunu seç
            </AppText>
            <Pressable
              onPress={() => setMapVisible(false)}
              style={styles.mapClose}
            >
              <MaterialIcons name="close" size={s(22)} color={colors.text} />
            </Pressable>
          </View>
        </View>
      </Modal>
    </AppSafeView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
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
  title: { fontSize: s(18) },
  steps: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: s(28),
    paddingVertical: vs(22),
  },
  stepItem: { alignItems: "center", gap: vs(5) },
  stepDot: {
    width: s(30),
    height: s(30),
    borderRadius: s(15),
    alignItems: "center",
    justifyContent: "center",
  },
  content: { padding: s(16), paddingBottom: vs(35) },
  sectionTitle: { fontSize: s(20), marginBottom: vs(12) },
  row: { flexDirection: "row", gap: s(10) },
  halfInput: { flex: 1 },
  cardPreview: {
    borderRadius: s(18),
    padding: s(18),
    minHeight: vs(140),
    justifyContent: "space-between",
    marginBottom: vs(16),
  },
  cardNumber: { fontSize: s(20), letterSpacing: 1 },
  summary: { borderRadius: s(18), borderWidth: 1, padding: s(14), gap: vs(12) },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: s(12),
  },
  productName: { flex: 1 },
  divider: { height: 1 },
  addressPreview: { marginTop: vs(14), lineHeight: vs(20) },
  couponRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(8),
    marginTop: vs(16),
  },
  couponInput: { flex: 1 },
  applyButton: {
    height: vs(42),
    borderWidth: 1,
    borderRadius: s(14),
    paddingHorizontal: s(14),
    alignItems: "center",
    justifyContent: "center",
  },
  error: { color: "#dc2626", marginTop: vs(12) },
  nextButton: { marginTop: vs(20) },
  mapButton: {
    minHeight: vs(44),
    marginTop: vs(14),
    borderWidth: 1,
    borderRadius: s(14),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: s(8),
  },
  mapScreen: { flex: 1, backgroundColor: "#fff" },
  mapHeader: {
    position: "absolute",
    top: vs(54),
    left: s(16),
    right: s(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: s(12),
    borderRadius: s(14),
    backgroundColor: "rgba(255,255,255,0.94)",
  },
  mapTitle: { fontSize: s(16) },
  mapClose: {
    width: s(34),
    height: s(34),
    borderRadius: s(17),
    alignItems: "center",
    justifyContent: "center",
  },
  successContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: s(24),
  },
  successIcon: {
    width: s(82),
    height: s(82),
    borderRadius: s(41),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: vs(20),
  },
  successAnimation: {
    width: s(150),
    height: s(150),
    marginBottom: vs(8),
  },
  successTitle: { fontSize: s(25) },
  successCopy: { textAlign: "center", marginTop: vs(8), marginBottom: vs(22) },
  orderNumber: {
    width: "100%",
    borderWidth: 1,
    borderRadius: s(16),
    padding: s(16),
    alignItems: "center",
    gap: vs(5),
    marginBottom: vs(18),
  },
  backHome: { padding: s(16) },
});
