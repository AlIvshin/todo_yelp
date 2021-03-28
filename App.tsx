/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RootContainer} from './src/navigation';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <RootContainer />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.lighter,
    flex: 1,
  },
});

export default App;
