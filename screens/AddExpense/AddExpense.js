import React, {useRef} from 'react';
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

export default function AddExpense() {
  let modalRef = useRef(null);
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
            <TextInput style={styles.input} />

            <Text style={styles.subHeading}>Amount</Text>
            <TextInput keyboardType="number-pad" style={styles.input} />

            <Text style={styles.subHeading}>Category</Text>

            <MultiSelect />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={[commonStyles.button, styles.btn]}>
        <Text style={commonStyles.buttonText}>Add</Text>
      </TouchableOpacity>
    </CustomBottomSheet>
  );
}
