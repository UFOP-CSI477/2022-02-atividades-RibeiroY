import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Main } from '../screens/Main';
import { People } from '../screens/People';
import { Coleta } from '../screens/Coleta';
import { Town } from '../screens/Town';
import { State } from '../screens/State';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: 'yellow',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          backgroundColor: 'blue.800',
        },
        headerShown: false,
      }}
    >
      <Screen
        name="menu"
        component={Main}
        options={{
          tabBarLabel: 'Menu Principal',
          
        }}
      />
      <Screen
        name="state"
        component={State}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="town"
        component={Town}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="people"
        component={People}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="coleta"
        component={Coleta}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}
