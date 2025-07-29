import { Theme } from '../types';

/**
 * Light theme configuration
 */
export const lightTheme: Theme = {
  colors: {
    primary: '#4A90E2',
    background: '#F9F9F9',
    card: '#FFFFFF',
    text: '#333333',
    border: '#E0E0E0',
    notification: '#FF3B30',
    error: '#FF3B30',
    success: '#4CD964',
    taskItem: '#FFFFFF',
    taskItemCompleted: '#F0F0F0',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
    },
    fontWeights: {
      regular: '400',
      medium: '500',
      bold: '700',
    },
  },
};

/**
 * Dark theme configuration
 */
export const darkTheme: Theme = {
  colors: {
    primary: '#5A9FF2',
    background: '#121212',
    card: '#1E1E1E',
    text: '#F0F0F0',
    border: '#333333',
    notification: '#FF453A',
    error: '#FF453A',
    success: '#30D158',
    taskItem: '#2C2C2C',
    taskItemCompleted: '#252525',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
    },
    fontWeights: {
      regular: '400',
      medium: '500',
      bold: '700',
    },
  },
};