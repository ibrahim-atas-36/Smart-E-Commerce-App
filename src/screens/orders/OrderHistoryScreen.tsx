import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import AppSafeView from "../../components/views/AppSafeView";
import AppText from "../../components/texts/AppText";
import type { AuthStackParamList } from "../../navigation/AuthStack";
import { useCart } from "../../store/CartContext";
import { useTheme } from "../../store/ThemeContext";
import { s, vs } from "react-native-size-matters";

type OrdersNavigation = StackNavigationProp<AuthStackParamList, "OrderHistory">;

const OrderHistoryScreen = () => {
  const navigation = useNavigation<OrdersNavigation>();
  const { orders } = useCart();
  const { colors } = useTheme();

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
          Siparişlerim
        </AppText>
        <View style={styles.iconButton} />
      </View>
      <FlatList
        data={orders}
        keyExtractor={(order) => order.id}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons
              name="receipt-long"
              size={s(46)}
              color={colors.secondaryText}
            />
            <AppText variant="bold" style={{ color: colors.text }}>
              Henüz sipariş yok
            </AppText>
            <AppText style={{ color: colors.secondaryText }}>
              Tamamladığınız siparişler burada görünecek.
            </AppText>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.orderCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={styles.orderHeader}>
              <View>
                <AppText variant="bold" style={{ color: colors.text }}>
                  {item.id}
                </AppText>
                <AppText style={{ color: colors.secondaryText }}>
                  {new Date(item.createdAt).toLocaleDateString("tr-TR")}
                </AppText>
              </View>
              <View
                style={[styles.status, { backgroundColor: colors.elevated }]}
              >
                <AppText style={{ color: colors.accent }}>
                  {item.status}
                </AppText>
              </View>
            </View>
            {item.products.map((product) => (
              <View key={product.id} style={styles.productRow}>
                <AppText numberOfLines={1} style={styles.productTitle}>
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
            <View style={styles.orderHeader}>
              <AppText style={{ color: colors.secondaryText }}>
                {item.products.length} ürün · {item.paymentLabel}
              </AppText>
              <AppText variant="bold" style={{ color: colors.primary }}>
                ${item.total.toFixed(0)}
              </AppText>
            </View>
          </View>
        )}
      />
    </AppSafeView>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: s(16),
    paddingTop: vs(12),
    paddingBottom: vs(10),
  },
  iconButton: {
    width: s(40),
    height: s(40),
    borderRadius: s(13),
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: s(18) },
  content: { padding: s(16), paddingBottom: vs(30), gap: vs(12), flexGrow: 1 },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: vs(10),
  },
  orderCard: {
    borderRadius: s(18),
    borderWidth: 1,
    padding: s(14),
    gap: vs(12),
  },
  orderHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: s(10),
  },
  status: {
    borderRadius: s(10),
    paddingHorizontal: s(9),
    paddingVertical: vs(5),
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: s(10),
  },
  productTitle: { flex: 1 },
  divider: { height: 1 },
});
