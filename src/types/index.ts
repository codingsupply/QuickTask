/**
 * Task interface - defines the structure of a task in the application
 */
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  category?: TaskCategory;
}

/**
 * Task category enum - defines possible task categories
 */
export enum TaskCategory {
  PERSONAL = 'personal',
  WORK = 'work',
  SHOPPING = 'shopping',
  HEALTH = 'health',
  OTHER = 'other',
}

/**
 * Task category color mapping
 */
export const TaskCategoryColors: Record<TaskCategory, string> = {
  [TaskCategory.PERSONAL]: '#4A90E2',
  [TaskCategory.WORK]: '#F5A623',
  [TaskCategory.SHOPPING]: '#7ED321',
  [TaskCategory.HEALTH]: '#D0021B',
  [TaskCategory.OTHER]: '#9013FE',
};

/**
 * Mascot state enum - defines possible states for the mascot
 */
export enum MascotState {
  DEFAULT = 'default',
  CELEBRATION = 'celebration',
}

/**
 * Mascot props interface - defines the props for the Mascot component
 */
export interface MascotProps {
  state: MascotState;
  size?: number;
  style?: any;
}

/**
 * Task statistics interface - defines the structure of task statistics
 */
export interface TaskStatistics {
  total: number;
  completed: number;
  remaining: number;
  percentComplete: number;
}

/**
 * Theme interface - defines the structure of the application theme
 */
export interface Theme {
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    error: string;
    success: string;
    taskItem: string;
    taskItemCompleted: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    fontSizes: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    fontWeights: {
      regular: string;
      medium: string;
      bold: string;
    };
  };
}