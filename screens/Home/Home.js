import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import {textStyles} from '../../styles/textStyles';
import {Colors} from '../../styles/Colors';
import {constants, dateFilters} from '../../constants';
import {images} from '../../images';
import {getMyExpenses} from '../../utils/expenses';
import dayjs from 'dayjs';
import {useIsFocused} from '@react-navigation/native';
import ExpensesFilter from '../ExpensesList/ExpensesFilter';

export default function Home() {
  const {user} = useContext(AuthContext);
  const [total, setTotal] = useState(0);
  const [topCategories, setTopCategories] = useState([]);
  const [openFilterPopup, setOpenFilterPopup] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    startDate: dayjs().startOf('day').format(constants.DATE_FORMAT),
    endDate: dayjs().endOf('day').format(constants.DATE_FORMAT),
    filterName: dateFilters.today,
  });

  const isfocused = useIsFocused();

  useEffect(() => {
    const fetchData = () => {
      getMyExpenses(
        user.uid,
        filters.startDate,
        filters.endDate,
        data => {
          const categoryCount = {};

          data.forEach(item => {
            const category = item.cateogry;
            categoryCount[category] = (categoryCount[category] || 0) + 1;
          });

          const mostUsedCategories = Object.entries(categoryCount)
            .sort((a, b) => b[1] - a[1])
            .map(([category]) => ({
              name: category,
              percent: (categoryCount[category] / data.length) * 100,
            }));

          setTotal(
            data.reduce((accum, current) => (accum += current.amount), 0),
          );
          setTopCategories(mostUsedCategories);

          setIsLoading(false);
        },
        error => {
          console.log(error);
          setIsLoading(false);
        },
      );
    };
    fetchData();
  }, [filters.endDate, filters.startDate, user.uid, isfocused]);

  const handlefilterApply = filterValues => {
    setOpenFilterPopup(false);
    setFilters(filterValues);
  };

  console.log({filters});

  return (
    <>
      <ScrollView style={{flex: 1, paddingHorizontal: 10, marginTop: 20}}>
        <View>
          <Text style={[textStyles.Xlarge]}>Hello, {user.displayName}</Text>
        </View>

        <ImageBackground
          source={images.background}
          imageStyle={{borderRadius: 20}}
          style={{
            marginTop: 20,
            padding: 14,
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: 'white'}}>Total Expense</Text>
            <TouchableOpacity
              onPress={() => setOpenFilterPopup(true)}
              style={{
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 10,
                padding: 10,
              }}>
              <Text style={{color: 'white'}}>{filters.filterName}</Text>
            </TouchableOpacity>
          </View>
          <Text style={[textStyles.largeHeading, {marginVertical: 10}]}>
            {constants.RUPEES_SYMBOL}
            {total}
          </Text>
          <Text style={{color: 'white'}}>
            Amount for {filters.filterName.toLowerCase()}
          </Text>
        </ImageBackground>

        <View
          style={{
            marginTop: 30,
            borderWidth: 1,
            borderColor: Colors.lightGray,
            padding: 10,
            borderRadius: 20,
          }}>
          <Text style={textStyles.Xlarge}>Categories</Text>

          {topCategories.map((category, idx) => (
            <View key={idx} style={{marginTop: 10}}>
              <Text style={textStyles.medium}>{category.name}</Text>
              <View
                style={{
                  height: 10,
                  backgroundColor: Colors.brand,
                  borderRadius: 10,
                  marginTop: 4,
                  width:
                    category.percent + (Dimensions.get('screen').width - 100),
                }}
              />
            </View>
          ))}
        </View>

        {/* <View style={{marginBottom: 50}}>
        <Text style={[textStyles.large, {marginTop: 30}]}>Recent Expenses</Text>
        <View>
          <ExpenseCard
            item={{
              amount: '122',
              cateogry: 'Entertainment',
              date: 'March 3, 2024',
              name: 'with some note',
              note: 'this is some note',
              userId: 'DNzaMcz4Yye3g8xQu0ntlC2gNTU2',
            }}
          />
          <ExpenseCard
            item={{
              amount: '122',
              cateogry: 'Education',
              date: 'March 3, 2024',
              name: 'with some note',
              note: 'this is some note',
              userId: 'DNzaMcz4Yye3g8xQu0ntlC2gNTU2',
            }}
          />
          <ExpenseCard
            item={{
              amount: '122',
              cateogry: 'Travel',
              date: 'March 3, 2024',
              name: 'with some note',
              note: 'this is some note',
              userId: 'DNzaMcz4Yye3g8xQu0ntlC2gNTU2',
            }}
          />
        </View>
      </View> */}
      </ScrollView>
      {openFilterPopup && (
        <ExpensesFilter
          onBackDropPress={() => setOpenFilterPopup(false)}
          getFilterValues={handlefilterApply}
        />
      )}
    </>
  );
}
