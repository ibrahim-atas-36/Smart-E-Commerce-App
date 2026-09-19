import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { BlurTargetView, BlurView } from "expo-blur";
import PagerView from "react-native-pager-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeScreen from "../screens/home/HomeScreen";
import CartScreen from "../screens/cart/CartScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import { AppColors } from "../styles/color";
import AppText from "../components/texts/AppText";
import {
  MainTabNavigationContext,
  type MainTabName,
} from "./MainTabNavigationContext";
import { useTheme } from "../store/ThemeContext";

export type MainAppBottomTabParamList = {
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
};

const tabNames: MainTabName[] = ["Home", "Cart", "Profile"];
const tabScreens = [HomeScreen, CartScreen, ProfileScreen];
const tabIcons = {
  Home: require("../assets/images/home-tab-icon.png"),
  Cart: require("../assets/images/cart-tab-icon.png"),
  Profile: require("../assets/images/profile-tab-icon.png"),
};

interface MainTabBarProps {
  activeIndex: number;
  onSelect: (index: number) => void;
  blurTarget: React.RefObject<View | null>;
}

const MainTabBar = ({ activeIndex, onSelect, blurTarget }: MainTabBarProps) => {
  const insets = useSafeAreaInsets();
  const { colors, isDarkMode } = useTheme();

  return (
    <View
      style={[
        styles.tabBarShell,
        {
          bottom: insets.bottom + 8,
          backgroundColor: isDarkMode
            ? "rgba(27, 29, 34, 0.78)"
            : "rgba(255, 255, 255, 0.46)",
          borderColor: isDarkMode
            ? "rgba(255, 255, 255, 0.18)"
            : "rgba(255, 255, 255, 0.85)",
        },
      ]}
    >
      <BlurView
        blurMethod="dimezisBlurView"
        blurTarget={blurTarget}
        intensity={55}
        style={StyleSheet.absoluteFill}
        tint={isDarkMode ? "systemMaterialDark" : "systemMaterialLight"}
      />
      <View style={styles.tabBar}>
        {tabNames.map((routeName, index) => {
          const isFocused = activeIndex === index;

          return (
            <Pressable
              key={routeName}
              accessibilityRole="tab"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={() => onSelect(index)}
              style={[
                styles.tabItem,
                isFocused && {
                  backgroundColor: isDarkMode
                    ? "rgba(255, 255, 255, 0.16)"
                    : "rgba(255, 255, 255, 0.72)",
                },
              ]}
            >
              <Image
                source={tabIcons[routeName]}
                style={[
                  styles.tabIcon,
                  {
                    tintColor: isFocused ? colors.text : colors.secondaryText,
                  },
                ]}
              />
              <AppText
                style={[
                  styles.tabLabel,
                  {
                    color: isFocused ? colors.text : colors.secondaryText,
                  },
                ]}
              >
                {routeName}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const MainAppBottomTabs = () => {
  const { colors } = useTheme();
  const pagerRef = React.useRef<PagerView>(null);
  const blurTargetRef = React.useRef<View | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const selectTab = (index: number) => {
    pagerRef.current?.setPage(index);
  };

  const navigateToTab = (tabName: MainTabName) => {
    const tabIndex = tabNames.indexOf(tabName);

    if (tabIndex >= 0) {
      selectTab(tabIndex);
    }
  };

  const handlePageSelected = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <MainTabNavigationContext.Provider value={{ navigateToTab }}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <BlurTargetView ref={blurTargetRef} style={styles.pagerTarget}>
          <PagerView
            ref={pagerRef}
            initialPage={0}
            onPageSelected={(event) =>
              handlePageSelected(event.nativeEvent.position)
            }
            style={styles.pager}
          >
            {tabScreens.map((Screen, index) => (
              <View key={tabNames[index]} style={styles.page}>
                <Screen />
              </View>
            ))}
          </PagerView>
        </BlurTargetView>
        <MainTabBar
          activeIndex={activeIndex}
          blurTarget={blurTargetRef}
          onSelect={selectTab}
        />
      </View>
    </MainTabNavigationContext.Provider>
  );
};

export default MainAppBottomTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  pagerTarget: {
    flex: 1,
  },
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
  tabBarShell: {
    position: "absolute",
    left: 12,
    right: 12,
    borderRadius: 26,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.85)",
    backgroundColor: "rgba(255, 255, 255, 0.46)",
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 8,
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
  },
  tabItem: {
    flex: 1,
    minHeight: 58,
    marginHorizontal: 4,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  tabItemActive: {
    backgroundColor: "rgba(255, 255, 255, 0.72)",
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginBottom: 3,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
});
