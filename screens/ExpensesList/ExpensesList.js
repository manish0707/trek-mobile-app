import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './ExpensesList.styles';
import {createUserInFirebase} from '../../utils/auth';

export default function ExpensesList({navigation}) {
  const handleAdd = () => {
    // navigation.navigate('AddExpense');
    createUserInFirebase();
  };

  return (
    <View style={styles.wrapper}>
      <Text>Expenses List</Text>
      <TouchableOpacity onPress={handleAdd} style={styles.addExpenseButton}>
        <Icon name="plus" color="white" size={50} />
      </TouchableOpacity>
    </View>
  );
}
