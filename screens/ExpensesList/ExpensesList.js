import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './ExpensesList.styles';
import {getMyExpenses} from '../../utils/expenses';
import {AuthContext} from '../../context/AuthContext';
import {useIsFocused} from '@react-navigation/native';

export default function ExpensesList({navigation}) {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useContext(AuthContext);

  const isfocused = useIsFocused();

  const handleAdd = () => {
    navigation.navigate('AddExpense');
  };

  useEffect(() => {
    getMyExpenses(
      user.uid,
      data => {
        setExpenses(data);
        setIsLoading(false);
      },
      error => {
        console.log(error);
        setIsLoading(false);
      },
    );
  }, [user.uid, isfocused]);

  return (
    <View style={styles.wrapper}>
      <Text
        style={{
          textAlign: 'center',
          marginVertical: 10,
          fontSize: 24,
          color: 'black',
        }}>
        Expenses List
      </Text>

      {isLoading ? (
        <ActivityIndicator size={40} />
      ) : (
        <FlatList
          data={expenses}
          contentContainerStyle={{paddingBottom: 120}}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  padding: 10,
                  marginVertical: 10,
                  margin: 10,
                  borderColor: 'lightgray',
                  borderRadius: 4,
                }}>
                <View>
                  <Text style={{fontSize: 20, color: 'black'}}>
                    {item.name}
                  </Text>
                  <Text style={{fontSize: 14, color: 'gray', marginTop: 2}}>
                    {item.cateogry}
                  </Text>
                </View>
                <Text
                  style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                  ₹{item.amount}
                </Text>
              </View>
            );
          }}
        />
      )}

      <TouchableOpacity onPress={handleAdd} style={styles.addExpenseButton}>
        <Icon name="plus" color="white" size={50} />
      </TouchableOpacity>
    </View>
  );
}
