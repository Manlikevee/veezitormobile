// Service.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
const Service = ({ name, icon }) => {
  const colorScheme = useColorScheme();
  return (
    <ThemedView style={{flex: 1, alignItems:'center', margin:6}}>
    <ThemedView lightColor='#f9f9f9' darkColor='#111111'  style={[
      {
        borderColor: Colors[colorScheme ?? "light"].cardborderColor,
      },
      styles.itemContainer,
    ]}>
                  <Image
          source={icon}
          style={{
            width: 24,
            height: 24,
            objectFit: "cover",
            alignSelf: "center",

          }}
        />

    </ThemedView>
<ThemedText style={styles.itemText}>{name}</ThemedText>
    </ThemedView>

  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  itemText: {
    marginTop: 5,

  },
});

export default Service;
