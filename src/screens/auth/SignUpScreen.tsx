import { StyleSheet, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import AppSafeView from "../../components/views/AppSafeView";
import { IMAGES } from "../../constants/images-paths";
import { vs, s } from "react-native-size-matters";
import AppTextInput from "../../components/inputs/AppTextInput";
import AppText from "../../components/texts/AppText";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/color";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { AuthStackParamList } from "../../navigation/AuthStack";
import { useTheme } from "../../store/ThemeContext";
import AuthScreenActions from "../../components/headers/AuthScreenActions";
import { useLanguage } from "../../store/LanguageContext";
import { useAuthSession } from "../../store/AuthSessionContext";

type SignUpNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "SignUpScreen"
>;

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { colors, isDarkMode } = useTheme();
  const { t } = useLanguage();
  // This hook lets the sign-up screen return to the sign-in screen.
  const navigation = useNavigation<SignUpNavigationProp>();
  const { signIn } = useAuthSession();

  return (
    <AppSafeView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <AuthScreenActions />
      <View style={styles.form}>
        <Image
          source={IMAGES.appLogo}
          style={[styles.logo, isDarkMode && { tintColor: colors.text }]}
        />

        <AppTextInput
          placeholder={t("email")}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordWrapper}>
          <AppTextInput
            placeholder={t("password")}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            style={styles.passwordInput}
          />

          <Pressable
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.eyeButton}
          >
            <AppText style={[styles.eyeText, { color: colors.secondaryText }]}>
              {showPassword ? "Hide" : "Show"}
            </AppText>
          </Pressable>
        </View>

        <View style={styles.passwordWrapper}>
          <AppTextInput
            placeholder={t("confirmPassword")}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            style={styles.passwordInput}
          />

          <Pressable
            onPress={() => setShowConfirmPassword((prev) => !prev)}
            style={styles.eyeButton}
          >
            <AppText style={[styles.eyeText, { color: colors.secondaryText }]}>
              {showConfirmPassword ? "Hide" : "Show"}
            </AppText>
          </Pressable>
        </View>

        <AppText
          variant="bold"
          style={[styles.appName, { color: colors.text }]}
        >
          Smart E Commerce
        </AppText>

        <AppButton
          title={t("createAccount")}
          style={styles.loginButton}
          // Continue to the main tab layout after account creation.
          onPress={async () => {
            await signIn(email, true);
            navigation.navigate("MainApp");
          }}
        />
        <AppButton
          title={t("login")}
          style={styles.registerButton}
          backgroundColor={colors.elevatedSurface}
          textColor={colors.text}
          // Return to the existing login screen when the user already has an account.
          onPress={() => navigation.navigate("SignInScreen")}
        />

        <View style={styles.signUpRow}>
          <AppText style={[styles.signUpText, { color: colors.text }]}>
            {t("alreadyAccount")}
          </AppText>
          <Pressable onPress={() => navigation.navigate("SignInScreen")}>
            <AppText style={[styles.signUpLink, { color: colors.text }]}>
              {t("login")}
            </AppText>
          </Pressable>
        </View>
      </View>
    </AppSafeView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  form: {
    width: "100%",
    paddingHorizontal: s(20),
    paddingTop: vs(10),
    alignItems: "center",
  },
  logo: {
    width: s(150),
    height: vs(150),
    marginBottom: vs(12),
  },
  passwordWrapper: {
    width: "100%",
    position: "relative",
  },
  passwordInput: {
    paddingRight: s(70),
  },
  eyeButton: {
    position: "absolute",
    right: s(16),
    top: vs(19),
  },
  eyeText: {
    fontSize: s(10),
    color: AppColors.medGray,
  },
  appName: {
    fontSize: s(16),
    marginTop: vs(8),
    marginBottom: vs(16),
    textAlign: "center",
    color: AppColors.black,
  },
  loginButton: {
    marginTop: vs(6),
  },
  registerButton: {
    marginTop: vs(10),
    borderWidth: 1,
    borderColor: AppColors.primary,
  },
  signUpRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: vs(16),
  },
  signUpText: {
    fontSize: s(11),
    color: AppColors.black,
  },
  signUpLink: {
    marginLeft: s(6),
    fontSize: s(12),
    color: AppColors.black,
    fontWeight: "bold",
  },
});
