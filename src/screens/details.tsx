import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const DetailsScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Details screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
