import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddAndEditCard from '../screens/AddAndEditCard/AddAndEditCard';
import CardsList from '../screens/CardsList/CardsList';
import {Colors} from '../styles/Colors';

const Stack = createNativeStackNavigator();

export function MaxCreditStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'Cards List',
          headerStyle: {backgroundColor: Colors.brand},
          headerTitleStyle: {color: 'white', fontSize: 20},
        }}
        name="CardsListScreen"
        component={CardsList}
      />
      <Stack.Screen
        options={{
          title: 'Add / Edit Card',
        }}
        name="AddAndEditCard"
        component={AddAndEditCard}
      />
    </Stack.Navigator>
  );
}
