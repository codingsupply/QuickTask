import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MascotProps, MascotState } from '../types';

/**
 * Mascot Component
 * 
 * Displays the application mascot in different states
 * This is a placeholder component that will be replaced with Lottie animations in the future
 * 
 * @param props MascotProps
 */
const Mascot: React.FC<MascotProps> = ({ state, size = 120, style }) => {
  // Get the appropriate mascot display based on the state
  const mascotDisplay = useMemo(() => {
    switch (state) {
      case MascotState.CELEBRATION:
        return {
          backgroundColor: '#4CAF50',
          text: '🎉',
        };
      case MascotState.DEFAULT:
      default:
        return {
          backgroundColor: '#4A90E2',
          text: '📝',
        };
    }
  }, [state]);

  return (
    <View style={[styles.container, style]}>
      {/* 
        LOTTIE INTEGRATION NOTE:
        This View component would be replaced with a Lottie animation in the future.
        The implementation would look something like:
        
        <LottieView
          source={require(`../../assets/mascot-${state}.json`)}
          autoPlay
          loop
          style={{ width: size, height: size }}
        />
      */}
      <View 
        style={[
          styles.mascot, 
          { 
            width: size, 
            height: size, 
            borderRadius: size / 2,
            backgroundColor: mascotDisplay.backgroundColor 
          }
        ]}
      >
        <Text style={styles.mascotText}>{mascotDisplay.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  mascot: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  mascotText: {
    fontSize: 40,
  }
});

export default React.memo(Mascot);