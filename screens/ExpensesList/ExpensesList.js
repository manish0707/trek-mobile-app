import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './ExpensesList.styles';
import {getMyExpenses} from '../../utils/expenses';
import {AuthContext} from '../../context/AuthContext';
import {useIsFocused} from '@react-navigation/native';

export default function ExpensesList({navigation}) {
  const [expenses, setExpenses] = useState([]);
  const {user} = useContext(AuthContext);

  const isfocused = useIsFocused();

  const handleAdd = () => {
    navigation.navigate('AddExpense');
  };

  useEffect(() => {
    getMyExpenses(
      user.uid,
      data => setExpenses(data),
      error => console.log(error),
    );
  }, [user.uid, isfocused]);

  return (
    <View style={styles.wrapper}>
      <Text>Expenses List</Text>
      {expenses.map((exp, index) => (
        <Text key={index}>{exp.name}</Text>
      ))}
      <TouchableOpacity onPress={handleAdd} style={styles.addExpenseButton}>
        <Icon name="plus" color="white" size={50} />
      </TouchableOpacity>
    </View>
  );
}
