import { StyleSheet, View } from "react-native";
import React from "react";
import NetInfo from "@react-native-community/netinfo";
import { StatusBar } from "expo-status-bar";
import FlashMessage from "react-native-flash-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AuthStack from "./src/navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from "./src/store/CartContext";
import { ThemeProvider } from "./src/store/ThemeContext";
import { useTheme } from "./src/store/ThemeContext";
import { LanguageProvider } from "./src/store/LanguageContext";
import { AuthSessionProvider } from "./src/store/AuthSessionContext";
import AppText from "./src/components/texts/AppText";

function AppContent() {
  const { isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();
  const [isOffline, setIsOffline] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(state.isConnected === false);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <NavigationContainer>
        {isOffline ? (
          <View style={[styles.offlineBanner, { paddingTop: insets.top + 8 }]}>
            <AppText style={styles.offlineText}>
              İnternet bağlantınız kesildi
            </AppText>
          </View>
        ) : null}
        <FlashMessage position="top" statusBarHeight={insets.top} />
        <AuthStack />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  offlineBanner: {
    backgroundColor: "#b91c1c",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
  },
  offlineText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthSessionProvider>
            <CartProvider>
              <AppContent />
            </CartProvider>
          </AuthSessionProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
