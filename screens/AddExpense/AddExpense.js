import React, {useContext, useEffect, useRef, useState} from 'react';
import CustomBottomSheet from '../../components/CustomBottomSheet/CustomBottomSheet';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {v4 as uuidv4} from 'uuid';
import {styles} from './AddExpense.styles';
import {commonStyles} from '../../styles/commonstyles';
import MultiSelect from '../../components/MultiSelect/MultiSelect';
import {saveDataInFirebase} from '../../utils/auth';
import {expenseCollection} from '../../firebaseConfig';
import {AuthContext} from '../../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import {categories, constants, dateOptions} from '../../constants';
import {textStyles} from '../../styles/textStyles';
import {Colors} from '../../styles/Colors';

export default function AddExpense() {
  let modalRef = useRef(null);

  const {user} = useContext(AuthContext);

  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(null);
  const [cateogry, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(dayjs());
  const [currentDateOptions, setCurrentOptions] = useState(dateOptions);

  useEffect(() => {}, []);

  const handleAdd = () => {
    if (!title || !amount) return;

    const uniqueId = uuidv4();

    saveDataInFirebase(
      expenseCollection,
      uniqueId,
      {
        name: title,
        amount: amount,
        cateogry,
        date: date.format(constants.DATE_FORMAT),
        note,
        id: uniqueId,
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

  const handleAmount = amnt => {
    let value = amnt;

    // if (!value.includes(constants.RUPEES_SYMBOL)) {
    //   value = `${constants.RUPEES_SYMBOL}${amnt}`;
    // }

    setAmount(value);
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={{padding: 14}}>
          <Text style={styles.subHeading}>Title</Text>
          <TextInput
            onChangeText={text => setTitle(text)}
            style={styles.input}
          />

          <Text style={styles.subHeading}>Amount</Text>
          <TextInput
            onChangeText={handleAmount}
            placeholder={constants.RUPEES_SYMBOL}
            keyboardType="number-pad"
            style={styles.input}
            value={amount}
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
          <Text style={styles.subHeading}>Note</Text>
          <TextInput
            onChangeText={text => setNote(text)}
            style={[styles.input, textStyles.medium]}
            numberOfLines={5}
            textAlignVertical="top"
            multiline
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={handleAdd}
        style={[commonStyles.button, styles.btn]}>
        <Text style={commonStyles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}
