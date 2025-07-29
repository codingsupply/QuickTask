import { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '../constants/theme';
import { Theme } from '../types';

// Storage key for theme preference
const THEME_PREFERENCE_KEY = '@QuickTasks:themePreference';

// Theme preference options
type ThemePreference = 'light' | 'dark' | 'system';

/**
 * Custom hook for theme management
 * Provides functions for getting and setting the current theme
 */
export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>('system');
  const [theme, setTheme] = useState<Theme>(systemColorScheme === 'dark' ? darkTheme : lightTheme);

  // Load theme preference from storage on initial render
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const storedPreference = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
        if (storedPreference) {
          setThemePreferenceState(storedPreference as ThemePreference);
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      }
    };

    loadThemePreference();
  }, []);

  // Update theme when preference or system color scheme changes
  useEffect(() => {
    let selectedTheme: Theme;
    
    switch (themePreference) {
      case 'light':
        selectedTheme = lightTheme;
        break;
      case 'dark':
        selectedTheme = darkTheme;
        break;
      case 'system':
      default:
        selectedTheme = systemColorScheme === 'dark' ? darkTheme : lightTheme;
        break;
    }
    
    setTheme(selectedTheme);
  }, [themePreference, systemColorScheme]);

  // Set theme preference and save to storage
  const setThemePreference = async (preference: ThemePreference) => {
    try {
      await AsyncStorage.setItem(THEME_PREFERENCE_KEY, preference);
      setThemePreferenceState(preference);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  // Toggle between light and dark themes
  const toggleTheme = async () => {
    const newPreference = theme === lightTheme ? 'dark' : 'light';
    await setThemePreference(newPreference);
  };

  return {
    theme,
    isDarkMode: theme === darkTheme,
    themePreference,
    setThemePreference,
    toggleTheme,
  };
};