import { StatusBar } from "react-native";
import FlashMessage from "react-native-flash-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthStack from "./src/navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from "./src/store/CartContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          <FlashMessage
            position="top"
            statusBarHeight={StatusBar.currentHeight ?? 0}
          />
          <AuthStack />
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
}
