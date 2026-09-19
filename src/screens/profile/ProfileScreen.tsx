import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  View,
} from "react-native";
import React from "react";
import AppSafeView from "../../components/views/AppSafeView";
import AppText from "../../components/texts/AppText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { IMAGES } from "../../constants/images-paths";
import { AppColors } from "../../styles/color";
import { s, vs } from "react-native-size-matters";
import { useTheme } from "../../store/ThemeContext";
import { languageOptions, useLanguage } from "../../store/LanguageContext";
import AccountDetailsScreen from "./AccountDetailsScreen";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { AuthStackParamList } from "../../navigation/AuthStack";

type MainAppNavigationProp = StackNavigationProp<AuthStackParamList, "MainApp">;

const ProfileScreen = () => {
  const [isLanguageModalVisible, setLanguageModalVisible] =
    React.useState(false);
  const [isAccountDetailsVisible, setAccountDetailsVisible] =
    React.useState(false);
  const { colors, isDarkMode, setIsDarkMode } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigation = useNavigation<MainAppNavigationProp>();

  const handleAccountDeleted = () => {
    setAccountDetailsVisible(false);
    navigation.replace("SignUpScreen");
  };

  return (
    <AppSafeView
      style={[styles.screen, { backgroundColor: colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageHeading}>
          <View>
            <AppText style={[styles.eyebrow, { color: colors.secondaryText }]}>
              {t("account")}
            </AppText>
            <AppText
              variant="bold"
              style={[styles.pageTitle, { color: colors.text }]}
            >
              {t("profileSettings")}
            </AppText>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Edit profile"
            style={[styles.editButton, { backgroundColor: colors.surface }]}
          >
            <MaterialIcons name="edit" size={s(19)} color={colors.text} />
          </Pressable>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("accountDetails")}
          onPress={() => setAccountDetailsVisible(true)}
          style={[
            styles.profileCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.avatarRing}>
            <Image source={IMAGES.appLogo} style={styles.avatar} />
          </View>
          <View style={styles.profileDetails}>
            <AppText
              variant="bold"
              style={[styles.profileName, { color: colors.text }]}
            >
              Ibrahim Atas
            </AppText>
            <AppText
              style={[styles.profileEmail, { color: colors.secondaryText }]}
            >
              ibrahim@example.com
            </AppText>
            <View style={styles.memberBadge}>
              <MaterialIcons
                name="verified"
                size={s(14)}
                color={colors.accent}
              />
              <AppText style={[styles.memberText, { color: colors.accent }]}>
                Smart member
              </AppText>
            </View>
          </View>
          <MaterialIcons
            name="chevron-right"
            size={s(23)}
            color={colors.secondaryText}
          />
        </Pressable>

        <AppText style={[styles.sectionLabel, { color: colors.secondaryText }]}>
          {t("preferences")}
        </AppText>
        <View
          style={[
            styles.settingsCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.settingRow}>
            <View
              style={[styles.settingIcon, { backgroundColor: colors.elevated }]}
            >
              <MaterialIcons
                name={isDarkMode ? "light-mode" : "dark-mode"}
                size={s(20)}
                color={colors.text}
              />
            </View>
            <View style={styles.settingCopy}>
              <AppText
                variant="bold"
                style={[styles.settingTitle, { color: colors.text }]}
              >
                {t("darkMode")}
              </AppText>
              <AppText
                style={[
                  styles.settingDescription,
                  { color: colors.secondaryText },
                ]}
              >
                {t("darkModeDescription")}
              </AppText>
            </View>
            <View style={styles.switchWrap}>
              <Switch
                accessibilityLabel="Toggle dark mode"
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                ios_backgroundColor={colors.border}
                trackColor={{ false: colors.border, true: colors.accent }}
                thumbColor={isDarkMode ? colors.surface : colors.white}
                style={styles.switch}
              />
            </View>
          </View>

          <View
            style={[styles.separator, { backgroundColor: colors.border }]}
          />

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Choose language"
            onPress={() => setLanguageModalVisible(true)}
            style={styles.settingRow}
          >
            <View
              style={[styles.settingIcon, { backgroundColor: colors.elevated }]}
            >
              <MaterialIcons name="language" size={s(20)} color={colors.text} />
            </View>
            <View style={styles.settingCopy}>
              <AppText
                variant="bold"
                style={[styles.settingTitle, { color: colors.text }]}
              >
                {t("language")}
              </AppText>
              <AppText
                style={[
                  styles.settingDescription,
                  { color: colors.secondaryText },
                ]}
              >
                {
                  languageOptions.find((option) => option.code === language)
                    ?.label
                }
              </AppText>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={s(23)}
              color={colors.secondaryText}
            />
          </Pressable>
        </View>

        <AppText style={[styles.sectionLabel, { color: colors.secondaryText }]}>
          {t("support")}
        </AppText>
        <View
          style={[
            styles.supportCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <MaterialIcons
            name="support-agent"
            size={s(23)}
            color={colors.text}
          />
          <View style={styles.settingCopy}>
            <AppText
              variant="bold"
              style={[styles.settingTitle, { color: colors.text }]}
            >
              {t("needHelp")}
            </AppText>
            <AppText
              style={[
                styles.settingDescription,
                { color: colors.secondaryText },
              ]}
            >
              {t("supportDescription")}
            </AppText>
          </View>
          <MaterialIcons
            name="arrow-forward"
            size={s(21)}
            color={colors.secondaryText}
          />
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent
        visible={isLanguageModalVisible}
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setLanguageModalVisible(false)}
        >
          <Pressable
            style={[styles.languageSheet, { backgroundColor: colors.surface }]}
            onPress={(event) => event.stopPropagation()}
          >
            <View style={styles.sheetHandle} />
            <AppText
              variant="bold"
              style={[styles.sheetTitle, { color: colors.text }]}
            >
              {t("chooseLanguage")}
            </AppText>
            <AppText
              style={[styles.sheetSubtitle, { color: colors.secondaryText }]}
            >
              {t("selectLanguage")}
            </AppText>
            {languageOptions.map((option) => {
              const isSelected = language === option.code;

              return (
                <Pressable
                  key={option.code}
                  onPress={() => {
                    setLanguage(option.code);
                    setLanguageModalVisible(false);
                  }}
                  style={[
                    styles.languageOption,
                    isSelected && [
                      styles.languageOptionSelected,
                      { backgroundColor: colors.elevated },
                    ],
                  ]}
                >
                  <AppText
                    style={[
                      styles.languageText,
                      {
                        color: isSelected ? colors.text : colors.secondaryText,
                      },
                    ]}
                  >
                    {option.label}
                  </AppText>
                  {isSelected ? (
                    <MaterialIcons
                      name="check"
                      size={s(21)}
                      color={colors.text}
                    />
                  ) : null}
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        animationType="slide"
        presentationStyle="fullScreen"
        visible={isAccountDetailsVisible}
        onRequestClose={() => setAccountDetailsVisible(false)}
      >
        <AccountDetailsScreen
          onClose={() => setAccountDetailsVisible(false)}
          onAccountDeleted={handleAccountDeleted}
        />
      </Modal>
    </AppSafeView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: AppColors.background,
  },
  content: {
    padding: s(16),
    paddingTop: vs(22),
    paddingBottom: vs(34),
  },
  pageHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: vs(18),
  },
  eyebrow: {
    fontSize: s(10),
    fontWeight: "700",
    letterSpacing: 1.2,
    marginBottom: vs(5),
  },
  pageTitle: {
    fontSize: s(24),
  },
  editButton: {
    width: s(42),
    height: s(42),
    borderRadius: s(14),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 7,
    elevation: 2,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: s(14),
    borderRadius: s(20),
    borderWidth: 1,
  },
  avatarRing: {
    width: s(68),
    height: s(68),
    borderRadius: s(34),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppColors.primary,
  },
  avatar: {
    width: s(58),
    height: s(58),
    borderRadius: s(29),
    tintColor: AppColors.white,
  },
  profileDetails: {
    flex: 1,
    marginLeft: s(12),
  },
  profileName: {
    fontSize: s(16),
  },
  profileEmail: {
    marginTop: vs(3),
    fontSize: s(12),
  },
  memberBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(4),
    marginTop: vs(7),
  },
  memberText: {
    fontSize: s(10),
    fontWeight: "700",
  },
  sectionLabel: {
    marginTop: vs(24),
    marginBottom: vs(9),
    fontSize: s(10),
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  settingsCard: {
    borderRadius: s(20),
    borderWidth: 1,
    paddingHorizontal: s(14),
  },
  settingRow: {
    minHeight: vs(72),
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    width: s(38),
    height: s(38),
    borderRadius: s(12),
    alignItems: "center",
    justifyContent: "center",
  },
  settingCopy: {
    flex: 1,
    marginLeft: s(11),
  },
  switchWrap: {
    width: s(48),
    height: vs(32),
    alignItems: "flex-end",
    justifyContent: "center",
  },
  switch: {
    transform: [{ scaleX: 0.88 }, { scaleY: 0.88 }],
  },
  settingTitle: {
    fontSize: s(14),
  },
  settingDescription: {
    marginTop: vs(3),
    fontSize: s(11),
  },
  separator: {
    height: 1,
    marginLeft: s(49),
  },
  supportCard: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: vs(70),
    paddingHorizontal: s(16),
    borderRadius: s(20),
    borderWidth: 1,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(15, 23, 42, 0.42)",
  },
  languageSheet: {
    paddingHorizontal: s(20),
    paddingTop: vs(10),
    paddingBottom: vs(26),
    borderTopLeftRadius: s(28),
    borderTopRightRadius: s(28),
  },
  sheetHandle: {
    alignSelf: "center",
    width: s(38),
    height: vs(4),
    borderRadius: s(2),
    backgroundColor: AppColors.medGray,
    marginBottom: vs(18),
  },
  sheetTitle: {
    fontSize: s(20),
  },
  sheetSubtitle: {
    marginTop: vs(4),
    marginBottom: vs(15),
    fontSize: s(12),
  },
  languageOption: {
    minHeight: vs(44),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: s(12),
    borderRadius: s(12),
  },
  languageOptionSelected: {
    backgroundColor: AppColors.lightGray,
  },
  languageText: {
    fontSize: s(14),
  },
});
