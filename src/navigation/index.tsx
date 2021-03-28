import React from 'react';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import {ROUTES} from './routes';
import { HomeScreen } from '../screens/home';
import { DetailsScreen } from '../screens/details';
const RootNavigator = createStackNavigator<RootNavigatorParamList>();

export const RootContainer =() => (
    <RootNavigator.Navigator initialRouteName={ROUTES.Home}>
        <RootNavigator.Screen name={ROUTES.Home} component={HomeScreen} />
        <RootNavigator.Screen name={ROUTES.Details} component={DetailsScreen} />
    </RootNavigator.Navigator>
) 