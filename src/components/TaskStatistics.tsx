import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TaskStatistics as TaskStatsType } from '../types';
import { useTheme } from '../hooks/useTheme';

interface TaskStatisticsProps {
  statistics: TaskStatsType;
}

/**
 * TaskStatistics Component
 * 
 * Displays statistics about tasks (total, completed, remaining)
 * 
 * @param props TaskStatisticsProps
 */
const TaskStatistics: React.FC<TaskStatisticsProps> = ({ statistics }) => {
  const { theme } = useTheme();
  const { total, completed, remaining, percentComplete } = statistics;

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.text }]}>
            {total}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.text + '80' }]}>
            Total
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text
            style={[
              styles.statValue,
              { color: theme.colors.success },
            ]}
          >
            {completed}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.text + '80' }]}>
            Completed
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text
            style={[
              styles.statValue,
              { color: remaining > 0 ? theme.colors.primary : theme.colors.success },
            ]}
          >
            {remaining}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.text + '80' }]}>
            Remaining
          </Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBackground,
            { backgroundColor: theme.colors.border },
          ]}
        >
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: theme.colors.primary,
                width: `${percentComplete}%`,
              },
            ]}
          />
        </View>
        
        <Text style={[styles.progressText, { color: theme.colors.text }]}>
          {percentComplete}% Complete
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBackground: {
    height: 8,
    borderRadius: 4,
    width: '100%',
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default React.memo(TaskStatistics);