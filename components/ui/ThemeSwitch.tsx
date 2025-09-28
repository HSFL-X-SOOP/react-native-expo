import React, { createContext, useContext, useState, useEffect } from 'react';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { Sun, Moon } from '@tamagui/lucide-icons';

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  currentTheme: 'light' | 'dark';
};

const ThemeContext = createContext<ThemeContextType | null>(null);

// Theme Provider
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
    throw new Error('useThemeContext must be used within ThemeProvider');
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
        <Sun size={size} color={color} />
      ) : (
        <Moon size={size} color={color} />
      )}
    </TouchableOpacity>
  );
};