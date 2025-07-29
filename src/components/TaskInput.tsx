import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Keyboard,
  Animated,
  Modal,
  FlatList,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { TaskCategory } from '../types';
import { useTheme } from '../hooks/useTheme';
import { isValidTaskTitle } from '../utils/taskUtils';

interface TaskInputProps {
  onAddTask: (title: string, category?: TaskCategory) => void;
}

/**
 * TaskInput Component
 * 
 * Provides an input field for adding new tasks with category selection
 * 
 * @param props TaskInputProps
 */
const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const { theme } = useTheme();
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | undefined>(undefined);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  // Available categories
  const categories = Object.values(TaskCategory);

  // Handle task submission
  const handleAddTask = useCallback(() => {
    if (isValidTaskTitle(taskTitle)) {
      onAddTask(taskTitle, selectedCategory);
      setTaskTitle('');
      setSelectedCategory(undefined);
      Keyboard.dismiss();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      // Shake animation for invalid input
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  }, [taskTitle, selectedCategory, onAddTask, shakeAnimation]);

  // Handle category selection
  const handleSelectCategory = useCallback((category: TaskCategory) => {
    setSelectedCategory(category);
    setShowCategoryModal(false);
    inputRef.current?.focus();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  // Toggle category modal
  const toggleCategoryModal = useCallback(() => {
    setShowCategoryModal(prev => !prev);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  // Render category item
  const renderCategoryItem = useCallback(({ item }: { item: TaskCategory }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        {
          backgroundColor:
            selectedCategory === item
              ? theme.colors.primary
              : theme.colors.card,
        },
      ]}
      onPress={() => handleSelectCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          {
            color:
              selectedCategory === item
                ? 'white'
                : theme.colors.text,
          },
        ]}
      >
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </Text>
    </TouchableOpacity>
  ), [selectedCategory, handleSelectCategory, theme]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
            transform: [{ translateX: shakeAnimation }],
          },
        ]}
      >
        <TextInput
          ref={inputRef}
          style={[styles.input, { color: theme.colors.text }]}
          placeholder="Add a new task..."
          placeholderTextColor={theme.colors.text + '80'}
          value={taskTitle}
          onChangeText={setTaskTitle}
          onSubmitEditing={handleAddTask}
          returnKeyType="done"
          blurOnSubmit={false}
        />
        
        <TouchableOpacity
          style={[
            styles.categoryButton,
            {
              backgroundColor: selectedCategory
                ? theme.colors.primary
                : theme.colors.card,
              borderColor: theme.colors.border,
            },
          ]}
          onPress={toggleCategoryModal}
        >
          <Text
            style={[
              styles.categoryButtonText,
              {
                color: selectedCategory ? 'white' : theme.colors.text,
              },
            ]}
          >
            {selectedCategory
              ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
              : 'Category'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.addButton,
            {
              backgroundColor: isValidTaskTitle(taskTitle)
                ? theme.colors.primary
                : theme.colors.border,
            },
          ]}
          onPress={handleAddTask}
          disabled={!isValidTaskTitle(taskTitle)}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </Animated.View>
      
      <Modal
        visible={showCategoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCategoryModal(false)}
        >
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                { color: theme.colors.text },
              ]}
            >
              Select Category
            </Text>
            
            <FlatList
              data={categories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.categoryList}
            />
            
            <TouchableOpacity
              style={[
                styles.clearCategoryButton,
                { borderColor: theme.colors.border },
              ]}
              onPress={() => {
                setSelectedCategory(undefined);
                setShowCategoryModal(false);
              }}
            >
              <Text
                style={[
                  styles.clearCategoryText,
                  { color: theme.colors.text },
                ]}
              >
                Clear Category
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  categoryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderLeftWidth: 1,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 1,
    padding: 16,
    maxHeight: '50%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  categoryList: {
    paddingBottom: 16,
  },
  categoryItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
  },
  clearCategoryButton: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 8,
  },
  clearCategoryText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default React.memo(TaskInput);