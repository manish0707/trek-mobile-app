import React, {useCallback} from 'react';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '../styles/Colors';
import {MaxCreditStack} from './MaxCreditStack';
import Home from '../screens/Home/Home';
import ExpensesList from '../screens/Expenses/ExpensesList';

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
      style={focused ? iconStyles : [iconStyles, {borderColor: 'white'}]}
      size={28}
      name={name}
      color={'black'}
    />
  );
};

const screenNamesToHideBottomBar = ['AddAndEditCard'];

export default function Naviation() {
  const getScreenOptions = ({route}) => {
    const options = {header: () => null, tabBarStyle: {height: 60}};

    const currentScreen = getFocusedRouteNameFromRoute(route);
    if (screenNamesToHideBottomBar.includes(currentScreen)) {
      options.tabBarStyle = {display: 'none'};
    }
    return options;
  };

  const getIcon = useCallback(iconName => <TabIcon name={iconName} />, []);

  const tabBarIcon = iconName => {
    return () => getIcon(iconName);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={getScreenOptions}>
        <Tab.Screen
          options={{
            ...headerStyles,
            tabBarLabel: () => null,
            tabBarIcon: tabBarIcon('home'),
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            ...headerStyles,

            tabBarLabel: () => null,
            tabBarIcon: tabBarIcon('wallet'),
          }}
          name="Wallet"
          component={ExpensesList}
        />
        <Tab.Screen
          options={{
            ...headerStyles,
            tabBarLabel: () => null,
            tabBarIcon: tabBarIcon('cards'),
          }}
          name="Max Credit"
          component={MaxCreditStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
