import React, { createContext, useContext } from "react";

export type MainTabName = "Home" | "Cart" | "Profile";

interface MainTabNavigationContextValue {
  navigateToTab: (tabName: MainTabName) => void;
}

export const MainTabNavigationContext = createContext<
  MainTabNavigationContextValue | undefined
>(undefined);

export const useMainTabNavigation = () => {
  const context = useContext(MainTabNavigationContext);

  if (!context) {
    throw new Error(
      "useMainTabNavigation must be used inside MainAppBottomTabs",
    );
  }

  return context;
};
