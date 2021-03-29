import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from './routes';
import {RestaurantListScreen} from '../screens/restaurant-list';
import {DetailsScreen} from '../screens/details';
const RootNavigator = createStackNavigator<RootNavigatorParamList>();

export const RootContainer = () => (
  <RootNavigator.Navigator initialRouteName={ROUTES.RestaurantList}>
    <RootNavigator.Screen
      name={ROUTES.RestaurantList}
      component={RestaurantListScreen}
      options={{title: 'Restaurant List'}}
    />
    <RootNavigator.Screen name={ROUTES.Details} component={DetailsScreen} />
  </RootNavigator.Navigator>
);
