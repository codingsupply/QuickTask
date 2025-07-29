import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types';

// Storage keys
const TASKS_STORAGE_KEY = '@QuickTasks:tasks';
const APP_VERSION_KEY = '@QuickTasks:version';
const CURRENT_APP_VERSION = '1.0.0';

/**
 * Save tasks to AsyncStorage
 * @param tasks Array of tasks to save
 */
export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving tasks:', error);
    throw new Error('Failed to save tasks to storage');
  }
};

/**
 * Load tasks from AsyncStorage
 * @returns Array of tasks or empty array if none found
 */
export const loadTasks = async (): Promise<Task[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    // Return empty array on error to prevent app crash
    return [];
  }
};

/**
 * Clear all tasks from AsyncStorage
 */
export const clearTasks = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TASKS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing tasks:', error);
    throw new Error('Failed to clear tasks from storage');
  }
};

/**
 * Check and perform data migration if needed
 * This function will be called on app startup to handle any data structure changes
 * between app versions
 */
export const checkAndMigrateData = async (): Promise<void> => {
  try {
    // Get stored app version
    const storedVersion = await AsyncStorage.getItem(APP_VERSION_KEY) || '0.0.0';
    
    // If versions match, no migration needed
    if (storedVersion === CURRENT_APP_VERSION) {
      return;
    }
    
    // Perform migration based on version differences
    // For future updates, add migration logic here
    
    // Example migration:
    // if (compareVersions(storedVersion, '0.9.0') < 0) {
    //   await migrateFrom090To100();
    // }
    
    // Update stored version to current
    await AsyncStorage.setItem(APP_VERSION_KEY, CURRENT_APP_VERSION);
  } catch (error) {
    console.error('Error during data migration:', error);
    // Don't throw here to prevent app crash on startup
  }
};

/**
 * Helper function to compare version strings
 * Returns:
 * - negative if v1 < v2
 * - positive if v1 > v2
 * - 0 if v1 === v2
 */
export const compareVersions = (v1: string, v2: string): number => {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;
    
    if (part1 < part2) return -1;
    if (part1 > part2) return 1;
  }
  
  return 0;
};