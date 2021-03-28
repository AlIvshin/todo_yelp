import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const HomeScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Home screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
