import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface EmptyStateProps {
  title: string;
  message: string;
  iconName?: string;
}

/**
 * EmptyState Component
 * 
 * Displays a message when no content is available
 * 
 * @param props EmptyStateProps
 */
const EmptyState: React.FC<EmptyStateProps> = ({ title, message, iconName }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {/* 
        Note: In a real implementation, we would use an icon library like @expo/vector-icons
        For this example, we're using a placeholder for the icon
      */}
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: theme.colors.primary + '20' },
        ]}
      >
        <Text style={[styles.iconPlaceholder, { color: theme.colors.primary }]}>
          {iconName ? iconName.charAt(0).toUpperCase() : '?'}
        </Text>
      </View>
      
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {title}
      </Text>
      
      <Text style={[styles.message, { color: theme.colors.text + '80' }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconPlaceholder: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 250,
  },
});

export default React.memo(EmptyState);