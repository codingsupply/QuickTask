import { useState, useEffect, useCallback } from 'react';
import { Task, TaskCategory, TaskStatistics } from '../types';
import { loadTasks, saveTasks } from '../utils/storage';
import { generateTaskId, calculateTaskStatistics, sortTasks } from '../utils/taskUtils';
import * as Haptics from 'expo-haptics';

/**
 * Custom hook for managing tasks
 * Provides functions for adding, toggling, deleting, and filtering tasks
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [statistics, setStatistics] = useState<TaskStatistics>({
    total: 0,
    completed: 0,
    remaining: 0,
    percentComplete: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | undefined>(undefined);
  const [refreshing, setRefreshing] = useState(false);

  // Load tasks from storage on initial render
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const storedTasks = await loadTasks();
        setTasks(sortTasks(storedTasks));
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Update filtered tasks when tasks, search query, or category changes
  useEffect(() => {
    let result = [...tasks];
    
    // Apply search filter if query exists
    if (searchQuery.trim()) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    // Apply category filter if selected
    if (selectedCategory) {
      result = result.filter(task => task.category === selectedCategory);
    }
    
    // Sort the filtered tasks
    result = sortTasks(result);
    
    setFilteredTasks(result);
    
    // Update statistics based on all tasks (not filtered)
    setStatistics(calculateTaskStatistics(tasks));
  }, [tasks, searchQuery, selectedCategory]);

  // Add a new task
  const addTask = useCallback(async (title: string, category?: TaskCategory) => {
    if (!title.trim()) return;
    
    try {
      const newTask: Task = {
        id: generateTaskId(),
        title: title.trim(),
        completed: false,
        createdAt: Date.now(),
        category,
      };
      
      const updatedTasks = [newTask, ...tasks];
      setTasks(updatedTasks);
      await saveTasks(updatedTasks);
      
      // Provide haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error('Failed to add task:', error);
      // Provide error haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }, [tasks]);

  // Toggle task completion status
  const toggleTask = useCallback(async (id: string) => {
    try {
      const updatedTasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      
      setTasks(updatedTasks);
      await saveTasks(updatedTasks);
      
      // Provide haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  }, [tasks]);

  // Delete a task
  const deleteTask = useCallback(async (id: string) => {
    try {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      await saveTasks(updatedTasks);
      
      // Provide haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  }, [tasks]);

  // Update a task
  const updateTask = useCallback(async (updatedTask: Task) => {
    try {
      const updatedTasks = tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      );
      
      setTasks(updatedTasks);
      await saveTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  }, [tasks]);

  // Refresh tasks from storage
  const refreshTasks = useCallback(async () => {
    setRefreshing(true);
    try {
      const storedTasks = await loadTasks();
      setTasks(sortTasks(storedTasks));
    } catch (error) {
      console.error('Failed to refresh tasks:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Clear all completed tasks
  const clearCompletedTasks = useCallback(async () => {
    try {
      const remainingTasks = tasks.filter(task => !task.completed);
      setTasks(remainingTasks);
      await saveTasks(remainingTasks);
      
      // Provide haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error('Failed to clear completed tasks:', error);
    }
  }, [tasks]);

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    statistics,
    isLoading,
    refreshing,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    refreshTasks,
    clearCompletedTasks,
  };
};