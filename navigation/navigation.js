import React, {useContext} from 'react';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '../styles/Colors';
import {MaxCreditStack} from './MaxCreditStack';
import Home from '../screens/Home/Home';
import {Platform} from 'react-native';
import {ExpensesStack} from './ExpensesStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from '../context/AuthContext';
import Login from '../screens/Login/Login';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

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

const screenNamesToHideBottomBar = ['AddAndEditCard', 'AddExpense'];

export default function Naviation() {
  const {user} = useContext(AuthContext);

  const getScreenOptions = ({route}) => {
    const options = {
      header: () => null,
      tabBarStyle: {height: Platform.OS === 'android' ? 60 : 100},
    };

    const currentScreen = getFocusedRouteNameFromRoute(route);
    if (screenNamesToHideBottomBar.includes(currentScreen)) {
      options.tabBarStyle = {display: 'none'};
    }
    return options;
  };

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator screenOptions={getScreenOptions}>
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
            name="Expense Stack"
            component={ExpensesStack}
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
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            options={{header: () => null}}
            name="auth"
            component={Login}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
