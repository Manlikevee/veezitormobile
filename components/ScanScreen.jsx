import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Text } from 'react-native';

const { height } = Dimensions.get('window');

const ScanScreen = ({children}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startAnimation();
  }, [animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height * 0.4], // Adjust the height factor as needed
  });

  return (
    <View style={styles.container}>
      <View style={styles.scanArea}>
        <Animated.View
          style={[
            styles.animatedLine,
            {
              transform: [{ translateY }],
            },
          ]}
        />
        {children}
    
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  scanArea: {
 
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  animatedLine: {
    width: '100%',
    height: 2,
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
  },
});

export default ScanScreen;
