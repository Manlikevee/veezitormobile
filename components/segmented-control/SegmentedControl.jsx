import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import  {Colors}  from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
const SegmentedControl = React.memo(
  ({ options, selectedOption, onOptionPress }) => {
    const { width: windowWidth } = useWindowDimensions();
    const colorScheme = useColorScheme();
    const internalPadding = 20;
    const segmentedControlWidth = windowWidth - 40;

    const itemWidth =
      (segmentedControlWidth - internalPadding) / options.length;

    const rStyle = useAnimatedStyle(() => {
      return {
        left: withTiming(
          itemWidth * options.indexOf(selectedOption) + internalPadding / 2
        ),
      };
    }, [selectedOption, options, itemWidth]);

    return (
      <ThemedView lightColor='#fff' darkColor="#111111"
        style={[
          styles.container,
          {
            width: segmentedControlWidth,
            borderRadius: 2,
            paddingLeft: internalPadding / 2,
          },
        ]}
      >
        <Animated.View
          style={[
            {
              width: itemWidth,
              position: 'absolute',
              borderRadius: 10,
          
              height: '80%',
              top: '10%',
              backgroundColor: Colors[colorScheme ?? "light"].cardborderColor,
            },
            rStyle,
            styles.activeBox,
          ]}
        />
        {options.map((option) => {
          return (
          
            <TouchableOpacity
              onPress={() => {
                onOptionPress?.(option);
              }}
              key={option}
              style={[
                {
                  
                  width: itemWidth,
                  borderBottomWidth: 1,
                  borderBottomColor: 'transparent'
                },
                styles.labelContainer,
              ]}
            >
              <ThemedText style={styles.label} darkColor='#ffffff99'>{option}</ThemedText>
            </TouchableOpacity>
        
          );
        })}
      </ThemedView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 55,
    marginTop:5,
    // backgroundColor:'#fff',
  },
  activeBox: {

  },
  labelContainer: { justifyContent: 'center', alignItems: 'center' },
  label: {
   
    fontSize: 16,
  },
});

export default SegmentedControl ;
