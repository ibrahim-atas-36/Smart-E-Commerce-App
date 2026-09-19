import React from "react";
import { AppColors, AppThemeColors, DarkColors } from "../styles/color";

interface ThemeContextValue {
  colors: AppThemeColors;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const colors = isDarkMode ? DarkColors : AppColors;

  return (
    <ThemeContext.Provider value={{ colors, isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};
