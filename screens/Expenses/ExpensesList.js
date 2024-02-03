import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './ExpensesList.styles';

export default function ExpensesList() {
  return (
    <View style={styles.wrapper}>
      <Text>Expenses List</Text>
      <TouchableOpacity style={styles.addExpenseButton}>
        <Icon name="plus" color="white" size={50} />
      </TouchableOpacity>
    </View>
  );
}
