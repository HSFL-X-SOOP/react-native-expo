import React, { createContext, useContext, useState, useEffect } from 'react';
import { TouchableOpacity, useColorScheme } from 'react-native';
import {MoonFilledIcon, SunFilledIcon} from "@/components/ui/Icons.tsx";

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  currentTheme: 'light' | 'dark';
};

const ThemeContext = createContext<ThemeContextType | null>(null);
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemTheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemTheme === 'dark');
  const [isManualOverride, setIsManualOverride] = useState(false);

  useEffect(() => {
    if (!isManualOverride) {
      setIsDark(systemTheme === 'dark');
    }
  }, [systemTheme, isManualOverride]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    setIsManualOverride(true)
  };

  const currentTheme = isDark ? 'dark' : 'light';

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    // Return fallback silently - this is expected in Portal contexts like Sheets
    return {
      isDark: false,
      toggleTheme: () => {},
      currentTheme: 'light' as 'light' | 'dark'
    };
  }
  return context;
};

export interface ThemeSwitchProps {
  size?: number;
  color?: string;
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  size = 22,
  color
}) => {
  const { isDark, toggleTheme } = useThemeContext();

  const iconColor = color || (isDark ? '#FDB813' : '#1a1a1a');

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      }}
    >
      {isDark ? (
        <SunFilledIcon size={size} color={iconColor} />
      ) : (
        <MoonFilledIcon size={size} color={iconColor} />
      )}
    </TouchableOpacity>
  );
};