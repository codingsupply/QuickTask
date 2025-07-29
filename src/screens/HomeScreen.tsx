import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Alert } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import { useTheme } from '../hooks/useTheme';
import { MascotState } from '../types';

// Components
import Header from '../components/Header';
import Mascot from '../components/Mascot';
import TaskStatistics from '../components/TaskStatistics';
import SearchBar from '../components/SearchBar';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';

/**
 * HomeScreen Component
 * 
 * Main screen of the application that displays all tasks and related functionality
 */
const HomeScreen: React.FC = () => {
  const {
    tasks,
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
    refreshTasks,
    clearCompletedTasks,
  } = useTasks();
  
  const { theme } = useTheme();
  
  // Determine mascot state based on task statistics
  const mascotState = useMemo(() => {
    if (statistics.total > 0 && statistics.remaining === 0) {
      return MascotState.CELEBRATION;
    }
    return MascotState.DEFAULT;
  }, [statistics]);

  // Handle search query change
  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, [setSearchQuery]);

  // Handle search clear
  const handleSearchClear = useCallback(() => {
    setSearchQuery('');
  }, [setSearchQuery]);

  // Handle clear completed tasks with confirmation
  const handleClearCompleted = useCallback(() => {
    if (statistics.completed === 0) {
      return;
    }
    
    Alert.alert(
      'Clear Completed Tasks',
      `Are you sure you want to delete all ${statistics.completed} completed tasks?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          onPress: clearCompletedTasks,
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  }, [statistics.completed, clearCompletedTasks]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <StatusBar
        barStyle={theme.colors.background === '#FFFFFF' ? 'dark-content' : 'light-content'}
        backgroundColor={theme.colors.background}
      />
      
      <Header
        title="QuickTasks"
        subtitle={`${statistics.remaining} tasks remaining`}
      />
      
      <Mascot state={mascotState} />
      
      <TaskStatistics statistics={statistics} />
      
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearchChange}
        onClear={handleSearchClear}
      />
      
      <TaskInput onAddTask={addTask} />
      
      <View style={styles.listContainer}>
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          refreshing={refreshing}
          onRefresh={refreshTasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
});

export default HomeScreen;