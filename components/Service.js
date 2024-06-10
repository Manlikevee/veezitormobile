// Service.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
const Service = ({ name, icon }) => {
  return (
    <ThemedView style={styles.itemContainer}>

      <ThemedText style={styles.itemText}>{name}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  itemText: {
    marginTop: 5,
    fontSize: 16,

  },
});

export default Service;
