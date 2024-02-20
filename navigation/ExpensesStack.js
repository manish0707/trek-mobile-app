import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from '../styles/Colors';
import AddExpense from '../screens/AddExpense/AddExpense';
import ExpensesList from '../screens/ExpensesList/ExpensesList';

const Stack = createNativeStackNavigator();

export function ExpensesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'Expense List',
          headerStyle: {backgroundColor: Colors.brand},
          headerTitleStyle: {color: 'white', fontSize: 20},
        }}
        name="ExpenseList"
        component={ExpensesList}
      />
      <Stack.Screen
        options={{
          title: 'Add Expense',
        }}
        name="AddExpense"
        component={AddExpense}
      />
    </Stack.Navigator>
  );
}
