import React, { useCallback } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import * as Haptics from 'expo-haptics';

interface ThemeToggleProps {
  style?: any;
}

/**
 * ThemeToggle Component
 * 
 * Provides a toggle button to switch between light and dark themes
 * 
 * @param props ThemeToggleProps
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({ style }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  // Handle theme toggle
  const handleToggle = useCallback(() => {
    toggleTheme();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, [toggleTheme]);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? theme.colors.card
            : theme.colors.primary + '20',
        },
        style,
      ]}
      onPress={handleToggle}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.toggle,
          {
            backgroundColor: isDarkMode ? theme.colors.primary : 'white',
            transform: [
              { translateX: isDarkMode ? 22 : 0 },
            ],
          },
        ]}
      />
      
      <Text
        style={[
          styles.icon,
          {
            color: isDarkMode ? 'transparent' : theme.colors.primary,
            opacity: isDarkMode ? 0 : 1,
          },
        ]}
      >
        ☀️
      </Text>
      
      <Text
        style={[
          styles.icon,
          styles.moonIcon,
          {
            color: isDarkMode ? theme.colors.text : 'transparent',
            opacity: isDarkMode ? 1 : 0,
          },
        ]}
      >
        🌙
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
  },
  toggle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  icon: {
    position: 'absolute',
    fontSize: 14,
    alignSelf: 'center',
  },
  moonIcon: {
    right: 8,
  },
});

export default React.memo(ThemeToggle);