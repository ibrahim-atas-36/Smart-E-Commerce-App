import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { useTheme } from "../../store/ThemeContext";
import { languageOptions, useLanguage } from "../../store/LanguageContext";

const AuthScreenActions = () => {
  const { colors, isDarkMode, setIsDarkMode } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isLanguageVisible, setLanguageVisible] = React.useState(false);

  return (
    <>
      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Choose language"
          onPress={() => setLanguageVisible(true)}
          style={[
            styles.actionButton,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <MaterialIcons name="language" size={s(19)} color={colors.text} />
        </Pressable>
        <Pressable
          accessibilityRole="switch"
          accessibilityLabel="Toggle dark mode"
          accessibilityState={{ checked: isDarkMode }}
          onPress={() => setIsDarkMode(!isDarkMode)}
          style={[
            styles.actionButton,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <MaterialIcons
            name={isDarkMode ? "light-mode" : "dark-mode"}
            size={s(19)}
            color={colors.text}
          />
        </Pressable>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={isLanguageVisible}
        onRequestClose={() => setLanguageVisible(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setLanguageVisible(false)}
        >
          <Pressable
            style={[styles.sheet, { backgroundColor: colors.surface }]}
            onPress={(event) => event.stopPropagation()}
          >
            <View style={styles.handle} />
            <AppText
              variant="bold"
              style={[styles.title, { color: colors.text }]}
            >
              {t("chooseLanguage")}
            </AppText>
            <AppText style={[styles.subtitle, { color: colors.secondaryText }]}>
              {t("selectLanguage")}
            </AppText>
            {languageOptions.map((option) => {
              const isSelected = language === option.code;

              return (
                <Pressable
                  key={option.code}
                  onPress={() => {
                    setLanguage(option.code);
                    setLanguageVisible(false);
                  }}
                  style={[
                    styles.languageRow,
                    isSelected && { backgroundColor: colors.elevated },
                  ]}
                >
                  <AppText
                    style={{
                      color: isSelected ? colors.text : colors.secondaryText,
                    }}
                  >
                    {option.label}
                  </AppText>
                  {isSelected ? (
                    <MaterialIcons
                      name="check"
                      size={s(20)}
                      color={colors.text}
                    />
                  ) : null}
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

export default AuthScreenActions;

const styles = StyleSheet.create({
  actions: {
    position: "absolute",
    zIndex: 10,
    top: vs(10),
    left: s(16),
    right: s(16),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    width: s(40),
    height: s(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: s(13),
    borderWidth: 1,
  },
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(15, 23, 42, 0.42)",
  },
  sheet: {
    paddingHorizontal: s(20),
    paddingTop: vs(10),
    paddingBottom: vs(26),
    borderTopLeftRadius: s(26),
    borderTopRightRadius: s(26),
  },
  handle: {
    alignSelf: "center",
    width: s(38),
    height: vs(4),
    borderRadius: s(2),
    backgroundColor: "#94a3b8",
    marginBottom: vs(18),
  },
  title: {
    fontSize: s(20),
  },
  subtitle: {
    marginTop: vs(4),
    marginBottom: vs(14),
    fontSize: s(12),
  },
  languageRow: {
    minHeight: vs(44),
    paddingHorizontal: s(12),
    borderRadius: s(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
