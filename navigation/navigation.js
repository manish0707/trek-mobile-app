import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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

const iconStyles = {
  borderWidth: 1,
  borderRadius: 10,
  paddingVertical: 4,
  paddingHorizontal: 8,
  borderColor: 'lightgray',
};

const TabIcon = ({focused, name}) => {
  return (
    <Icon
      style={focused ? iconStyles : {}}
      size={28}
      name={name}
      color={'black'}
    />
  );
};

export default function Naviation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{header: () => null, tabBarStyle: {height: 80}}}>
        <Tab.Screen
          options={{
            ...headerStyles,
            tabBarLabel: () => null,
            tabBarIcon: values => <TabIcon {...values} name="home" />,
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            ...headerStyles,
            tabBarLabel: () => null,
            tabBarIcon: values => <TabIcon {...values} name="wallet" />,
          }}
          name="Wallet"
          component={MaxCreditStack}
        />
        <Tab.Screen
          options={{
            ...headerStyles,
            tabBarLabel: () => null,
            tabBarIcon: values => <TabIcon {...values} name="cards" />,
          }}
          name="Max Credit"
          component={MaxCreditStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
