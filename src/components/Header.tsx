import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

/**
 * Header Component
 * 
 * Displays the app header with title, subtitle, and theme toggle
 * 
 * @param props HeaderProps
 */
const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          style={[
            styles.title,
            { color: theme.colors.text },
          ]}
        >
          {title}
        </Text>
        
        {subtitle && (
          <Text
            style={[
              styles.subtitle,
              { color: theme.colors.text + '80' },
            ]}
          >
            {subtitle}
          </Text>
        )}
      </View>
      
      <ThemeToggle />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default React.memo(Header);