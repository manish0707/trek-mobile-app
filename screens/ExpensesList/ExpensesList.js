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
import {Colors} from '../../styles/Colors';
import CustomBottomSheet from '../../components/CustomBottomSheet/CustomBottomSheet';

export default function ExpensesList({navigation}) {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openFilterPopup, setOpenFilterPopup] = useState(false);

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

  const handleFilterPopup = () => {
    setOpenFilterPopup(!openFilterPopup);
  };

  console.log(openFilterPopup);

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

      <TouchableOpacity style={styles.filterButton} onPress={handleFilterPopup}>
        <Text style={{fontSize: 16, color: 'black'}}>Filter</Text>
        <Icon size={18} color="black" name="filter-variant" />
      </TouchableOpacity>

      {isLoading ? (
        <ActivityIndicator size={40} />
      ) : (
        <FlatList
          data={expenses}
          contentContainerStyle={{paddingBottom: 120, marginTop: 10}}
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
                  // margin: 10,
                  borderColor: 'lightgray',
                  borderRadius: 4,
                }}>
                <View>
                  <Text style={{fontSize: 20, color: 'black'}}>
                    {item.name}
                  </Text>
                  <Text style={{fontSize: 14, color: 'gray', marginTop: 4}}>
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

      {openFilterPopup && (
        <CustomBottomSheet onBackDropPress={handleFilterPopup} height="80%" defaultOpen closeOnBackdopPress>
          <Text>abc</Text>
        </CustomBottomSheet>
      )}
    </View>
  );
}
