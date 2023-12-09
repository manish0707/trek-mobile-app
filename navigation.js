import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home/Home';
import IntroScreen from './screens/Intro/IntroScreen';

const Stack = createNativeStackNavigator();

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
          options={{header: () => null}}
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
