import { NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import MainAppBottomTabs, {
  MainAppBottomTabParamList,
} from "./MainAppBottomTabs";

// These route names are shared with the screens so navigation stays type-safe.
export type AuthStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
  MainApp: NavigatorScreenParams<MainAppBottomTabParamList> | undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen
        name="MainApp"
        component={MainAppBottomTabs}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}
