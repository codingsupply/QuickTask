import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { Task, TaskCategory, TaskCategoryColors } from '../types';
import { useTheme } from '../hooks/useTheme';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * TaskItem Component
 * 
 * Displays a single task with swipe actions and completion toggle
 * 
 * @param props TaskItemProps
 */
const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const { theme } = useTheme();
  
  // Handle task toggle
  const handleToggle = useCallback(() => {
    onToggle(task.id);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [task.id, onToggle]);
  
  // Handle task deletion with confirmation
  const handleDelete = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => onDelete(task.id),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  }, [task.id, onDelete]);
  
  // Render right swipe actions (delete)
  const renderRightActions = useCallback((progress: Animated.AnimatedInterpolation<number>) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 0],
    });
    
    return (
      <Animated.View
        style={[
          styles.rightAction,
          {
            transform: [{ translateX: trans }],
            backgroundColor: theme.colors.error,
          },
        ]}
      >
        <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }, [handleDelete, theme]);
  
  // Render left swipe actions (toggle)
  const renderLeftActions = useCallback((progress: Animated.AnimatedInterpolation<number>) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [-80, 0],
    });
    
    return (
      <Animated.View
        style={[
          styles.leftAction,
          {
            transform: [{ translateX: trans }],
            backgroundColor: theme.colors.success,
          },
        ]}
      >
        <TouchableOpacity onPress={handleToggle} style={styles.actionButton}>
          <Text style={styles.actionText}>
            {task.completed ? 'Undo' : 'Complete'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }, [handleToggle, task.completed, theme]);

  // Get category color or default color
  const categoryColor = task.category 
    ? TaskCategoryColors[task.category as TaskCategory] 
    : theme.colors.primary;

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      friction={2}
      rightThreshold={40}
      leftThreshold={40}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: task.completed
              ? theme.colors.taskItemCompleted
              : theme.colors.taskItem,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.checkbox}
          onPress={handleToggle}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.checkboxInner,
              {
                borderColor: categoryColor,
                backgroundColor: task.completed ? categoryColor : 'transparent',
              },
            ]}
          >
            {task.completed && <View style={styles.checkmark} />}
          </View>
        </TouchableOpacity>
        
        <View style={styles.content}>
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.text,
                textDecorationLine: task.completed ? 'line-through' : 'none',
                opacity: task.completed ? 0.7 : 1,
              },
            ]}
            numberOfLines={2}
          >
            {task.title}
          </Text>
          
          {task.category && (
            <View
              style={[
                styles.categoryTag,
                { backgroundColor: TaskCategoryColors[task.category as TaskCategory] },
              ]}
            >
              <Text style={styles.categoryText}>
                {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: 'white',
    borderRadius: 6,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  categoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  rightAction: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    borderRadius: 8,
    marginVertical: 4,
  },
  leftAction: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    borderRadius: 8,
    marginVertical: 4,
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default React.memo(TaskItem);