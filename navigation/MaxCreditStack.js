import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddAndEditCard from '../screens/AddAndEditCard/AddAndEditCard';
import CardsList from '../screens/CardsList/CardsList';

const Stack = createNativeStackNavigator();

export function MaxCreditStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{title: 'Cards List'}}
        name="CardsListScreen"
        component={CardsList}
      />
      <Stack.Screen
        options={{title: 'Add / Edit Card'}}
        name="AddAndEditCard"
        component={AddAndEditCard}
      />
    </Stack.Navigator>
  );
}
