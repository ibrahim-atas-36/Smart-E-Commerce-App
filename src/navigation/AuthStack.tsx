import { NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import MainAppBottomTabs, {
  MainAppBottomTabParamList,
} from "./MainAppBottomTabs";
import CheckoutScreen from "../screens/checkout/CheckoutScreen";
import OrderHistoryScreen from "../screens/orders/OrderHistoryScreen";
import ProductDetailScreen from "../screens/product/ProductDetailScreen";
import type { Product } from "../types/product";
import { useAuthSession } from "../store/AuthSessionContext";
import * as LocalAuthentication from "expo-local-authentication";
import React from "react";

// These route names are shared with the screens so navigation stays type-safe.
export type AuthStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
  MainApp: NavigatorScreenParams<MainAppBottomTabParamList> | undefined;
  Checkout: undefined;
  OrderHistory: undefined;
  ProductDetail: { product: Product };
};

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  const { userEmail, isLoading } = useAuthSession();
  const [biometricChecked, setBiometricChecked] = React.useState(false);

  React.useEffect(() => {
    if (!userEmail) {
      setBiometricChecked(true);
      return;
    }

    const authenticate = async () => {
      try {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (hasHardware && isEnrolled) {
          await LocalAuthentication.authenticateAsync({
            promptMessage: "Hesabınıza erişmek için doğrulayın",
            cancelLabel: "İptal",
          });
        }
      } finally {
        setBiometricChecked(true);
      }
    };

    void authenticate();
  }, [userEmail]);

  if (isLoading || (userEmail && !biometricChecked)) return null;

  return (
    <Stack.Navigator
      initialRouteName={userEmail ? "MainApp" : "SignInScreen"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen
        name="MainApp"
        component={MainAppBottomTabs}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}
