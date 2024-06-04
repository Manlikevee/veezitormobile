import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { ThemedView } from './ThemedView';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ShimmerEffect = ({ width = SCREEN_WIDTH - 40, height = 20, style }) => {
  const shimmerAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnimatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  }, [shimmerAnimatedValue]);

  const translateX = shimmerAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (


    <ThemedView lightColor='#e0e0e0' darkColor='#1111' style={[styles.container, { width, height }, style]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </ThemedView>





  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#e0e0e0',
    overflow: 'hidden',
    borderRadius: 4,
    marginTop:9
  },
  shimmer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
  },
});

export default ShimmerEffect;
