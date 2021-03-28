/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from "react-native";

import {
  Colors,
  Header,
} from "react-native/Libraries/NewAppScreen";
import { RootContainer } from "./src/navigation";

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={"dark-content"} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.root}
        contentContainerStyle={styles.root}
      >
        <NavigationContainer>
        <RootContainer/>
        </NavigationContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root:{
    backgroundColor: Colors.lighter,
    flex: 1,}
})

export default App;
