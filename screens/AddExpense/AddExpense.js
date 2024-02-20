import React, {useContext, useRef, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';

export default function AddExpense() {
  let modalRef = useRef(null);

  const {user} = useContext(AuthContext);

  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(null);
  const [cateogry, setCategory] = useState('');

  const handleAdd = () => {
    saveDataInFirebase(
      expenseCollection,
      {
        name: title,
        amount: amount,
        cateogry,
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

  return (
    <CustomBottomSheet
      closeOnBackdopPress={false}
      defaultOpen
      enablePanDownToClose={false}
      getRefValue={value => (modalRef.current = value)}>
      <ScrollView>
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

            <MultiSelect onSelect={item => setCategory(item)} />
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
