import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '../styles/Colors';
import {MaxCreditStack} from './MaxCreditStack';
import Home from '../screens/Home/Home';

const Tab = createBottomTabNavigator();

const headerStyles = {
  headerStyle: {backgroundColor: Colors.brand},
  headerTitleStyle: {fontSize: 24},
  headerTintColor: 'white',
};

export default function Naviation() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{header: () => null}}>
        <Tab.Screen
          options={{
            ...headerStyles,
            headerBackVisible: false,
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={headerStyles}
          name="Max Credit"
          component={MaxCreditStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
