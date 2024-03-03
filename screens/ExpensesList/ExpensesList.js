/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './ExpensesList.styles';
import {getMyExpenses} from '../../utils/expenses';
import {AuthContext} from '../../context/AuthContext';
import {useIsFocused} from '@react-navigation/native';
import {Colors} from '../../styles/Colors';
import {textStyles} from '../../styles/textStyles';
import dayjs from 'dayjs';
import {categories, constants} from '../../constants';
import ExpensesFilter from './ExpensesFilter';

export default function ExpensesList({navigation}) {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openFilterPopup, setOpenFilterPopup] = useState(false);
  const [filters, setFilters] = useState({
    startDate: dayjs().startOf('day').format(constants.DATE_FORMAT),
    endDate: dayjs().endOf('day').format(constants.DATE_FORMAT),
  });

  const {user} = useContext(AuthContext);

  const isfocused = useIsFocused();

  const handleAdd = () => {
    navigation.navigate('AddExpense');
  };

  useEffect(() => {
    getMyExpenses(
      user.uid,
      filters.startDate,
      filters.endDate,
      data => {
        setExpenses(data);
        setIsLoading(false);
      },
      error => {
        console.log(error);
        setIsLoading(false);
      },
    );
  }, [user.uid, isfocused, filters.startDate, filters.endDate]);

  const handleFilterPopup = () => {
    setOpenFilterPopup(!openFilterPopup);
  };

  const handlefilterApply = filterValues => {
    setOpenFilterPopup(false);
    setFilters(filterValues);
  };

  const renderItem = ({item}) => {
    console.log(item.cateogry);
    console.log(categories.find(i => i.name === item.cateogry));
    return (
      <View style={styles.expenseItem}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              borderWidth: 3,
              borderColor: Colors.lightGray,
              padding: 8,
              borderRadius: 50,
              marginRight: 10,
            }}>
            <Image
              style={{
                height: 34,
                width: 34,
              }}
              source={
                categories.find(i => i.name === item.cateogry)?.image ||
                undefined
              }
            />
          </View>
          <View>
            <Text style={textStyles.large}>{item.name}</Text>
            <Text
              style={[textStyles.small, {color: Colors.gray, marginTop: 4}]}>
              {item.date}
            </Text>
            <View style={styles.categoryTag}>
              <Text
                style={[
                  textStyles.small,
                  {color: Colors.brand, textAlign: 'center'},
                ]}>
                {item.cateogry}
              </Text>
            </View>
          </View>
        </View>
        <Text style={[textStyles.large, {fontWeight: 'bold'}]}>
          ₹{item.amount}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Text
        style={[textStyles.Xlarge, {textAlign: 'center', marginVertical: 10}]}>
        Expenses List
      </Text>

      <TouchableOpacity style={styles.filterButton} onPress={handleFilterPopup}>
        <Text style={textStyles.medium}>Filter</Text>
        <Icon size={18} color="black" name="filter-variant" />
      </TouchableOpacity>

      {isLoading ? (
        <ActivityIndicator size={40} />
      ) : (
        <FlatList
          data={expenses}
          contentContainerStyle={{paddingBottom: 120, marginTop: 10}}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={[textStyles.medium, {textAlign: 'center'}]}>
              No Expenses Found!
            </Text>
          }
        />
      )}

      <TouchableOpacity onPress={handleAdd} style={styles.addExpenseButton}>
        <Icon name="plus" color="white" size={50} />
      </TouchableOpacity>

      {openFilterPopup && (
        <ExpensesFilter
          onBackDropPress={() => setOpenFilterPopup(false)}
          getFilterValues={handlefilterApply}
        />
      )}
    </View>
  );
}
