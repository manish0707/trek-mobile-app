import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './screens/Home/Home';
import IntroScreen from './screens/Intro/IntroScreen';
import AddAndEditCard from './screens/AddAndEditCard/AddAndEditCard';
import {Colors} from './styles/Colors';
import {Strings} from './utils/constants';

const Stack = createBottomTabNavigator();

const headerStyles = {
  title: Strings.appName,
  headerStyle: {backgroundColor: Colors.brand},
  headerTitleStyle: {fontSize: 24},
  headerTintColor: 'white',
};

export default function Naviation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{header: () => null}}
          name="IntroScreen"
          component={IntroScreen}
        />
        <Stack.Screen
          options={{
            ...headerStyles,
            headerBackVisible: false,
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={headerStyles}
          name="AddAndEditCard"
          component={AddAndEditCard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
