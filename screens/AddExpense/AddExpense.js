import React, {useContext, useEffect, useRef, useState} from 'react';
import CustomBottomSheet from '../../components/CustomBottomSheet/CustomBottomSheet';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './AddExpense.styles';
import {commonStyles} from '../../styles/commonstyles';
import MultiSelect from '../../components/MultiSelect/MultiSelect';
import {saveDataInFirebase} from '../../utils/auth';
import {expenseCollection} from '../../firebaseConfig';
import {AuthContext} from '../../context/AuthContext';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import dayjs from 'dayjs';
import {categories, constants, dateFormat, dateOptions} from '../../constants';

export default function AddExpense() {
  let modalRef = useRef(null);

  const {user} = useContext(AuthContext);

  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(null);
  const [cateogry, setCategory] = useState('');
  const [date, setDate] = useState(dayjs());
  const [currentDateOptions, setCurrentOptions] = useState(dateOptions);

  useEffect(() => {}, []);

  const handleAdd = () => {
    if (!title || !amount) return;

    saveDataInFirebase(
      expenseCollection,
      title,
      {
        name: title,
        amount: amount,
        cateogry,
        date: date.format(constants.DATE_FORMAT),
        userId: user.uid,
      },

      () => {
        navigation.goBack();
      },
      e => {
        console.log('errr adding expe', e);
      },
    );
  };

  const handleCustomDate = cusotmDate => {
    setCurrentOptions(
      currentDateOptions.map(item =>
        item === dateOptions[2] ? date.format(constants.DATE_FORMAT) : item,
      ),
    );
    setDate(cusotmDate);
  };

  const handleSelectDate = value => {
    if (value === dateOptions[0]) {
      setDate(dayjs());
    }

    if (value === dateOptions[1]) {
      setDate(dayjs().add(-1, 'day'));
    }

    if (value === dateOptions[2]) {
      navigation.navigate('CalenderScreen', {getDataBack: handleCustomDate});
    }
  };

  console.log(currentDateOptions);

  return (
    <CustomBottomSheet
      closeOnBackdopPress={false}
      defaultOpen
      enablePanDownToClose={false}
      getRefValue={value => (modalRef.current = value)}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.wrapper}>
          <View>
            <Text style={styles.heading}>Add Expense</Text>
            <Text style={styles.subHeading}>Title</Text>
            <TextInput
              onChangeText={text => setTitle(text)}
              style={styles.input}
            />

            <Text style={styles.subHeading}>Amount</Text>
            <TextInput
              onChangeText={amount => setAmount(amount)}
              keyboardType="number-pad"
              style={styles.input}
            />

            <Text style={styles.subHeading}>Category</Text>

            <MultiSelect
              items={categories}
              onSelect={item => setCategory(item)}
            />

            <Text style={styles.subHeading}>Date</Text>
            <MultiSelect
              items={currentDateOptions}
              defaultValue={currentDateOptions[0]}
              onSelect={handleSelectDate}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={handleAdd}
        style={[commonStyles.button, styles.btn]}>
        <Text style={commonStyles.buttonText}>Add</Text>
      </TouchableOpacity>
    </CustomBottomSheet>
  );
}
