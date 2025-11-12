import React, { createContext, useContext, useState, useEffect } from 'react';
import { MD3LightTheme, MD3DarkTheme, MD3Theme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
  theme: MD3Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1e3a8a',
    secondary: '#0891b2',
    tertiary: '#059669',
    primaryContainer: '#dbeafe',
    secondaryContainer: '#cffafe',
    tertiaryContainer: '#d1fae5',
    surface: '#ffffff',
    surfaceVariant: '#f8fafc',
    background: '#ffffff',
    onBackground: '#0f172a',
    onSurface: '#0f172a',
    onSurfaceVariant: '#64748b',
    error: '#dc2626',
    errorContainer: '#fef2f2',
    outline: '#e2e8f0',
    outlineVariant: '#cbd5e1',
  },
};

const DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#3b82f6',
    secondary: '#06b6d4',
    tertiary: '#10b981',
    primaryContainer: '#1e3a8a',
    secondaryContainer: '#0891b2',
    tertiaryContainer: '#059669',
    surface: '#0f172a',
    surfaceVariant: '#1e293b',
    background: '#0f172a',
    onBackground: '#f8fafc',
    onSurface: '#f8fafc',
    onSurfaceVariant: '#cbd5e1',
    error: '#f87171',
    errorContainer: '#7f1d1d',
    outline: '#334155',
    outlineVariant: '#475569',
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  const theme = isDark ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};