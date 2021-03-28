import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type RouteProps = RouteProp<RootNavigatorParamList, 'Details'>;

export const DetailsScreen = () => {
  const route = useRoute<RouteProps>();
  return (
    <View style={styles.root}>
      <Text>Details screen: {route.params.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
