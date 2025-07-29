import { Task, TaskStatistics } from '../types';

/**
 * Generate a unique ID for a task
 * @returns A unique string ID
 */
export const generateTaskId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * Calculate task statistics from an array of tasks
 * @param tasks Array of tasks
 * @returns TaskStatistics object with calculated statistics
 */
export const calculateTaskStatistics = (tasks: Task[]): TaskStatistics => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const remaining = total - completed;
  const percentComplete = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    remaining,
    percentComplete,
  };
};

/**
 * Sort tasks by completion status and creation date
 * @param tasks Array of tasks to sort
 * @returns Sorted array of tasks
 */
export const sortTasks = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    // First sort by completion status (incomplete first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then sort by creation date (newest first)
    return b.createdAt - a.createdAt;
  });
};

/**
 * Filter tasks based on search query
 * @param tasks Array of tasks to filter
 * @param query Search query string
 * @returns Filtered array of tasks
 */
export const filterTasksByQuery = (tasks: Task[], query: string): Task[] => {
  if (!query.trim()) {
    return tasks;
  }
  
  const lowerCaseQuery = query.toLowerCase().trim();
  return tasks.filter(task => 
    task.title.toLowerCase().includes(lowerCaseQuery)
  );
};

/**
 * Filter tasks by category
 * @param tasks Array of tasks to filter
 * @param category Category to filter by (undefined for all)
 * @returns Filtered array of tasks
 */
export const filterTasksByCategory = (tasks: Task[], category?: string): Task[] => {
  if (!category) {
    return tasks;
  }
  
  return tasks.filter(task => task.category === category);
};

/**
 * Validate task title
 * @param title Task title to validate
 * @returns Boolean indicating if title is valid
 */
export const isValidTaskTitle = (title: string): boolean => {
  return title.trim().length > 0;
};