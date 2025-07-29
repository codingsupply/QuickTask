import React, { useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  RefreshControl,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Task } from '../types';
import TaskItem from './TaskItem';
import EmptyState from './EmptyState';
import { useTheme } from '../hooks/useTheme';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

/**
 * TaskList Component
 * 
 * Displays a list of tasks with pull-to-refresh functionality
 * Shows an empty state when no tasks are available
 * 
 * @param props TaskListProps
 */
const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isLoading,
  refreshing,
  onRefresh,
  onToggleTask,
  onDeleteTask,
}) => {
  const { theme } = useTheme();

  // Render individual task item
  const renderItem = useCallback(
    ({ item }: { item: Task }) => (
      <TaskItem
        task={item}
        onToggle={onToggleTask}
        onDelete={onDeleteTask}
      />
    ),
    [onToggleTask, onDeleteTask]
  );

  // Extract key for FlatList
  const keyExtractor = useCallback((item: Task) => item.id, []);

  // Loading indicator
  if (isLoading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.text }]}>
          Loading tasks...
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={[
        styles.listContent,
        tasks.length === 0 && styles.emptyListContent,
      ]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.colors.primary]}
          tintColor={theme.colors.primary}
        />
      }
      ListEmptyComponent={
        !isLoading ? (
          <EmptyState
            title="No Tasks Yet"
            message="Add your first task to get started!"
            iconName="clipboard-outline"
          />
        ) : null
      }
      showsVerticalScrollIndicator={false}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
      removeClippedSubviews={true}
      ListHeaderComponent={<View style={styles.listHeader} />}
      ListFooterComponent={<View style={styles.listFooter} />}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 8,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  listHeader: {
    height: 8,
  },
  listFooter: {
    height: 100,
  },
});

export default React.memo(TaskList);