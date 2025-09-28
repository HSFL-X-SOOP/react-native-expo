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
    console.log('Theme manuell gewechselt zu:', !isDark ? 'dark' : 'light');
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
    // Fallback when context is not available - use system theme
    console.warn('useThemeContext used outside ThemeProvider, using system theme as fallback');
    return {
      isDark: false, // Default to light theme
      toggleTheme: () => {
        console.warn('ThemeSwitch used outside ThemeProvider - toggle ignored');
      },
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
  color = '#ffffff'
}) => {
  const { isDark, toggleTheme } = useThemeContext();

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
        <SunFilledIcon size={size} color={color} />
      ) : (
        <MoonFilledIcon size={size} color={color} />
      )}
    </TouchableOpacity>
  );
};