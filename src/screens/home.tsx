import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {search} from '../utils/requests';

export const HomeScreen = () => {
  useEffect(() => {
    search('').then((items) => {
      console.log('Search results: ', items);
    });
  }, []);
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
