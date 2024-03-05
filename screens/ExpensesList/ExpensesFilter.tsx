import React, {useState} from 'react';
import CustomBottomSheet from '../../components/CustomBottomSheet/CustomBottomSheet';
import {styles} from './ExpensesList.styles';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import MultiSelect from '../../components/MultiSelect/MultiSelect';
import DatePicker from '../../components/DatePicker/DatePicker';
import {dateFilterNames, dateFilters} from '../../constants';
import {commonStyles} from '../../styles/commonstyles';
import dayjs from 'dayjs';
import {getFormattedDate} from '../../utils/date';

export default function ExpensesFilter({
  getFilterValues = (_filters: any) => {},
  onBackDropPress = () => {},
}) {
  const [startDate, setStartDate] = useState(getFormattedDate(dayjs()));
  const [endDate, setEndDate] = useState(getFormattedDate(dayjs()));

  const [filterName, setFilterName] = useState('');

  const [showCustomFilter, setShowCustomFilter] = useState(false);

  const getStartDate = (date: string) =>
    setStartDate(getFormattedDate(dayjs(date)));

  const getEndDate = (date: string) =>
    setEndDate(getFormattedDate(dayjs(date)));

  const handleQuickSelect = (filter: string) => {
    if (showCustomFilter) {
      setShowCustomFilter(false);
    }
    switch (filter) {
      case dateFilters.today: {
        setStartDate(getFormattedDate(dayjs().startOf('day')));
        setEndDate(getFormattedDate(dayjs().endOf('day')));
        break;
      }

      case dateFilters.yesterday: {
        const yesterday = dayjs().subtract(1, 'day');
        setStartDate(getFormattedDate(yesterday.startOf('day')));
        setEndDate(getFormattedDate(yesterday.endOf('day')));
        break;
      }

      case dateFilters.thisWeek: {
        setStartDate(getFormattedDate(dayjs().startOf('week')));
        setEndDate(getFormattedDate(dayjs().endOf('week')));
        break;
      }

      case dateFilters.lastWeek: {
        const lastWeek = dayjs().subtract(1, 'week');
        setStartDate(getFormattedDate(lastWeek.startOf('week')));
        setEndDate(getFormattedDate(lastWeek.endOf('week')));
        break;
      }
      case dateFilters.thisMonth: {
        setStartDate(getFormattedDate(dayjs().startOf('month')));
        setEndDate(getFormattedDate(dayjs().endOf('month')));
        break;
      }
      case dateFilters.custom: {
        setStartDate(getFormattedDate(dayjs().startOf('day')));
        setEndDate(getFormattedDate(dayjs().endOf('day')));
        setShowCustomFilter(true);
        break;
      }
      default: {
        console.log('default');
      }
    }

    setFilterName(filter);
  };

  const handleApply = () => {
    getFilterValues({startDate, endDate, filterName});
  };

  return (
    <CustomBottomSheet
      onBackDropPress={onBackDropPress}
      height="70%"
      defaultOpen
      closeOnBackdopPress>
      <View style={styles.filterPopupWrap}>
        <ScrollView style={{flex: 1}}>
          <Text style={textStyles.large}>Filter Expenses</Text>
          <MultiSelect
            items={dateFilterNames}
            style={{marginTop: 10}}
            onSelect={item => handleQuickSelect(item)}
          />

          {showCustomFilter && (
            <View>
              <Text style={[textStyles.large, {marginTop: 30}]}>
                Filter By Date Range
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <DatePicker
                  date={startDate}
                  getDate={getStartDate}
                  style={{marginRight: 30}}
                />
                <DatePicker date={endDate} getDate={getEndDate} />
              </View>
            </View>
          )}
        </ScrollView>
        <TouchableOpacity onPress={handleApply} style={[commonStyles.button]}>
          <Text style={commonStyles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </CustomBottomSheet>
  );
}
