import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { s, vs } from "react-native-size-matters";
import AppSafeView from "../../components/views/AppSafeView";
import AppText from "../../components/texts/AppText";
import { IMAGES } from "../../constants/images-paths";
import { useLanguage } from "../../store/LanguageContext";
import { useTheme } from "../../store/ThemeContext";

interface AccountDetailsScreenProps {
  onClose: () => void;
  onAccountDeleted: () => void;
}

const AccountDetailsScreen = ({
  onClose,
  onAccountDeleted,
}: AccountDetailsScreenProps) => {
  const { colors } = useTheme();
  const { t } = useLanguage();

  const confirmDelete = () => {
    Alert.alert(t("deleteAccount"), t("deleteAccountWarning"), [
      { text: "Cancel", style: "cancel" },
      {
        text: t("deleteAccount"),
        style: "destructive",
        onPress: onAccountDeleted,
      },
    ]);
  };

  return (
    <AppSafeView
      style={[styles.screen, { backgroundColor: colors.background }]}
    >
      <View style={styles.topBar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close account details"
          onPress={onClose}
          style={[styles.backButton, { backgroundColor: colors.surface }]}
        >
          <MaterialIcons name="arrow-back" size={s(21)} color={colors.text} />
        </Pressable>
        <AppText
          variant="bold"
          style={[styles.topTitle, { color: colors.text }]}
        >
          {t("accountDetails")}
        </AppText>
        <View style={styles.topSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.hero,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.avatarRing}>
            <Image source={IMAGES.appLogo} style={styles.avatar} />
          </View>
          <AppText variant="bold" style={[styles.name, { color: colors.text }]}>
            Ibrahim Atas
          </AppText>
          <AppText style={[styles.email, { color: colors.secondaryText }]}>
            ibrahim@example.com
          </AppText>
        </View>

        <AppText style={[styles.sectionLabel, { color: colors.secondaryText }]}>
          {t("personalInformation")}
        </AppText>
        <View
          style={[
            styles.infoCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.infoRow}>
            <View
              style={[styles.infoIcon, { backgroundColor: colors.elevated }]}
            >
              <MaterialIcons
                name="person-outline"
                size={s(20)}
                color={colors.text}
              />
            </View>
            <View>
              <AppText
                style={[styles.infoLabel, { color: colors.secondaryText }]}
              >
                {t("fullName")}
              </AppText>
              <AppText
                variant="bold"
                style={[styles.infoValue, { color: colors.text }]}
              >
                Ibrahim Atas
              </AppText>
            </View>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.infoRow}>
            <View
              style={[styles.infoIcon, { backgroundColor: colors.elevated }]}
            >
              <MaterialIcons
                name="mail-outline"
                size={s(20)}
                color={colors.text}
              />
            </View>
            <View>
              <AppText
                style={[styles.infoLabel, { color: colors.secondaryText }]}
              >
                {t("email")}
              </AppText>
              <AppText
                variant="bold"
                style={[styles.infoValue, { color: colors.text }]}
              >
                ibrahim@example.com
              </AppText>
            </View>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.infoRow}>
            <View
              style={[styles.infoIcon, { backgroundColor: colors.elevated }]}
            >
              <MaterialIcons
                name="calendar-today"
                size={s(20)}
                color={colors.text}
              />
            </View>
            <View>
              <AppText
                style={[styles.infoLabel, { color: colors.secondaryText }]}
              >
                {t("memberSince")}
              </AppText>
              <AppText
                variant="bold"
                style={[styles.infoValue, { color: colors.text }]}
              >
                September 2026
              </AppText>
            </View>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("deleteAccount")}
          onPress={confirmDelete}
          style={[styles.deleteButton, { borderColor: "#ef4444" }]}
        >
          <MaterialIcons name="delete-outline" size={s(21)} color="#ef4444" />
          <AppText variant="bold" style={styles.deleteText}>
            {t("deleteAccount")}
          </AppText>
        </Pressable>
        <AppText style={[styles.warning, { color: colors.secondaryText }]}>
          {t("deleteAccountWarning")}
        </AppText>
      </ScrollView>
    </AppSafeView>
  );
};

export default AccountDetailsScreen;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: s(16),
    paddingTop: vs(14),
    paddingBottom: vs(10),
  },
  backButton: {
    width: s(40),
    height: s(40),
    borderRadius: s(13),
    alignItems: "center",
    justifyContent: "center",
  },
  topTitle: { fontSize: s(17) },
  topSpacer: { width: s(40) },
  content: { padding: s(16), paddingBottom: vs(40) },
  hero: {
    alignItems: "center",
    paddingVertical: vs(24),
    borderRadius: s(22),
    borderWidth: 1,
  },
  avatarRing: {
    width: s(82),
    height: s(82),
    borderRadius: s(41),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f766e",
  },
  avatar: {
    width: s(68),
    height: s(68),
    borderRadius: s(34),
    tintColor: "#fff",
  },
  name: { marginTop: vs(14), fontSize: s(20) },
  email: { marginTop: vs(4), fontSize: s(12) },
  sectionLabel: {
    marginTop: vs(24),
    marginBottom: vs(9),
    fontSize: s(10),
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  infoCard: { borderRadius: s(20), borderWidth: 1, paddingHorizontal: s(14) },
  infoRow: { flexDirection: "row", alignItems: "center", minHeight: vs(72) },
  infoIcon: {
    width: s(38),
    height: s(38),
    borderRadius: s(12),
    alignItems: "center",
    justifyContent: "center",
    marginRight: s(12),
  },
  infoLabel: { fontSize: s(11) },
  infoValue: { marginTop: vs(3), fontSize: s(14) },
  divider: { height: 1, marginLeft: s(50) },
  deleteButton: {
    minHeight: vs(48),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: s(8),
    marginTop: vs(28),
    borderRadius: s(15),
    borderWidth: 1,
  },
  deleteText: { color: "#ef4444", fontSize: s(13) },
  warning: { marginTop: vs(9), textAlign: "center", fontSize: s(11) },
});
