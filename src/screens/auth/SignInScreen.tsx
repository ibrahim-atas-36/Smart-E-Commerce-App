import { StyleSheet, View, Image, Pressable, Platform } from "react-native";
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

type SignInNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "SignInScreen"
>;

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  // This hook gives the screen access to the typed auth navigator.
  const navigation = useNavigation<SignInNavigationProp>();

  return (
    <AppSafeView style={styles.container}>
      <View style={styles.form}>
        <Image source={IMAGES.appLogo} style={styles.logo} />

        <AppTextInput
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordWrapper}>
          <AppTextInput
            placeholder="Password"
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
            <AppText style={styles.eyeText}>
              {showPassword ? "Hide" : "Show"}
            </AppText>
          </Pressable>
        </View>

        <AppText variant="bold" style={styles.appName}>
          Smart E Commerce
        </AppText>

        <View style={styles.rowBetween}>
          <Pressable
            onPress={() => setRememberMe((prev) => !prev)}
            style={styles.rememberRow}
          >
            <View
              style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
            >
              {rememberMe ? (
                <AppText style={styles.checkMark}>✓</AppText>
              ) : null}
            </View>
            <AppText style={styles.rememberText}>Remember me</AppText>
          </Pressable>
          <AppText style={styles.forgotPassword}>Forgot Password?</AppText>
        </View>

        <AppButton
          title="Login"
          style={styles.loginButton}
          // Continue to the main tab layout after the login action.
          onPress={() => navigation.navigate("MainApp")}
        />
        <AppButton
          title="Sign Up"
          style={styles.registerButton}
          backgroundColor={AppColors.lightGray}
          textColor={AppColors.black}
          // Open the registration screen when the secondary button is pressed.
          onPress={() => navigation.navigate("SignUpScreen")}
        />

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <AppText style={styles.dividerText}>or continue with</AppText>
          <View style={styles.dividerLine} />
        </View>

        <Pressable style={styles.googleButton}>
          <View style={styles.googleIconWrapper}>
            <View style={styles.googleLogo}>
              <View style={[styles.googleArc, styles.googleBlue]} />
              <View style={[styles.googleArc, styles.googleRed]} />
              <View style={[styles.googleArc, styles.googleYellow]} />
              <View style={[styles.googleArc, styles.googleGreen]} />
              <View style={styles.googleCenter} />
            </View>
          </View>
          <AppText style={styles.googleButtonText}>
            Continue with Google
          </AppText>
        </Pressable>

        {Platform.OS === "ios" ? (
          <Pressable style={styles.appleButton}>
            <View style={styles.appleIconWrapper}>
              <AppText style={styles.appleIcon}></AppText>
            </View>
            <AppText style={styles.appleButtonText}>
              Continue with Apple
            </AppText>
          </Pressable>
        ) : null}

        <View style={styles.signUpRow}>
          <AppText style={styles.signUpText}>Don’t have an account?</AppText>
          <Pressable onPress={() => navigation.navigate("SignUpScreen")}>
            <AppText style={styles.signUpLink}>Sign Up</AppText>
          </Pressable>
        </View>
      </View>
    </AppSafeView>
  );
};

export default SignInScreen;

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
    marginBottom: vs(10),
    textAlign: "center",
    color: AppColors.black,
  },
  rowBetween: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: vs(16),
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: s(14),
    height: s(14),
    borderRadius: s(4),
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    marginRight: s(8),
    backgroundColor: AppColors.white,
  },
  checkboxChecked: {
    backgroundColor: AppColors.black,
    borderColor: AppColors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  checkMark: {
    color: AppColors.white,
    fontSize: s(10),
    lineHeight: s(10),
  },
  rememberText: {
    fontSize: s(11),
    color: AppColors.medGray,
  },
  forgotPassword: {
    color: AppColors.medGray,
    fontSize: s(11),
  },
  loginButton: {
    marginTop: vs(6),
  },
  registerButton: {
    marginTop: vs(10),
    borderWidth: 1,
    borderColor: AppColors.primary,
  },
  dividerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: vs(18),
    marginBottom: vs(12),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: AppColors.blueGray,
  },
  dividerText: {
    marginHorizontal: s(12),
    fontSize: s(10),
    color: AppColors.medGray,
  },
  googleButton: {
    width: "100%",
    marginTop: vs(6),
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    borderRadius: s(20),
    height: vs(40),
    backgroundColor: AppColors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIconWrapper: {
    width: s(22),
    height: s(22),
    borderRadius: s(11),
    backgroundColor: AppColors.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: s(10),
  },
  googleLogo: {
    width: s(18),
    height: s(18),
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  googleArc: {
    position: "absolute",
    width: s(12),
    height: s(12),
    borderRadius: s(6),
  },
  googleBlue: {
    backgroundColor: "#4285F4",
    top: 0,
    left: 0,
  },
  googleRed: {
    backgroundColor: "#EA4335",
    top: 0,
    right: 0,
  },
  googleYellow: {
    backgroundColor: "#FBBC05",
    bottom: 0,
    left: 0,
  },
  googleGreen: {
    backgroundColor: "#34A853",
    bottom: 0,
    right: 0,
  },
  googleCenter: {
    width: s(8),
    height: s(8),
    borderRadius: s(4),
    backgroundColor: AppColors.white,
    position: "absolute",
    zIndex: 1,
  },
  googleButtonText: {
    fontSize: s(14),
    color: AppColors.black,
    fontWeight: "600",
  },
  appleButton: {
    width: "100%",
    marginTop: vs(10),
    borderWidth: 1,
    borderColor: AppColors.black,
    borderRadius: s(20),
    height: vs(40),
    backgroundColor: AppColors.black,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  appleIconWrapper: {
    marginRight: s(10),
    justifyContent: "center",
    alignItems: "center",
  },
  appleIcon: {
    color: AppColors.white,
    fontSize: s(18),
    fontWeight: "bold",
  },
  appleButtonText: {
    fontSize: s(14),
    color: AppColors.white,
    fontWeight: "600",
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
