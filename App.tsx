import { StatusBar as NativeStatusBar } from "react-native";
import { StatusBar } from "expo-status-bar";
import FlashMessage from "react-native-flash-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthStack from "./src/navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from "./src/store/CartContext";
import { ThemeProvider } from "./src/store/ThemeContext";
import { useTheme } from "./src/store/ThemeContext";
import { LanguageProvider } from "./src/store/LanguageContext";

function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <NavigationContainer>
        <FlashMessage
          position="top"
          statusBarHeight={NativeStatusBar.currentHeight ?? 0}
        />
        <AuthStack />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
