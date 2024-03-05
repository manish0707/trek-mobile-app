import React from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './ExpensesDetails.style';
import {useNavigation, useRoute} from '@react-navigation/native';
import {images} from '../../images';
import {Colors} from '../../styles/Colors';
import {textStyles} from '../../styles/textStyles';
import {commonStyles} from '../../styles/commonstyles';
import {deleteDocumentFromCollection} from '../../utils/expenses';
import {expenseCollection} from '../../firebaseConfig';

export default function ExpenseDetails() {
  const navigation = useNavigation();
  const {params} = useRoute();

  const deleteExpense = async (expenseId: string) => {
    try {
      await deleteDocumentFromCollection(expenseCollection, expenseId);
      navigation.goBack();
    } catch (e) {
      Alert.alert('Delete error!', e?.message);
    }
  };

  const handleDeletePress = () => {
    Alert.alert('Delete Expense', 'This expense will be deleted.', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => deleteExpense(params?.id),
      },
    ]);
  };

  return (
    <View style={styles.wrapper}>
      <View style={{flex: 1, alignItems: 'flex-start'}}>
        <View
          style={{
            borderWidth: 3,
            borderColor: Colors.lightGray,
            padding: 10,
            borderRadius: 50,
          }}>
          <Image
            style={{height: 50, width: 50}}
            source={images[params.cateogry.toLowerCase()]}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text style={[textStyles.large, {fontWeight: '500'}]}>
            {params?.name}
          </Text>
          <Text style={[textStyles.Xlarge, {fontWeight: 'bold'}]}>
            {params?.amount}
          </Text>
        </View>

        <Text style={[textStyles.medium, {color: Colors.gray, marginTop: 4}]}>
          {params?.date}
        </Text>

        <View style={[commonStyles.categoryTag, {marginTop: 20}]}>
          <Text style={[textStyles.small, {color: Colors.brand}]}>
            {params?.cateogry}
          </Text>
        </View>

        {params?.note && (
          <>
            <Text
              style={[textStyles.medium, {marginTop: 30, marginBottom: 10}]}>
              Note
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.lightGray,
                width: '100%',
                borderRadius: 6,
                padding: 10,
                minHeight: 80,
              }}>
              <Text style={[textStyles.medium, {color: Colors.gray}]}>
                {params?.note}
              </Text>
            </View>
          </>
        )}
      </View>

      <View>
        <TouchableOpacity
          onPress={handleDeletePress}
          style={[commonStyles.button, {backgroundColor: Colors.red}]}>
          <Text
            style={[
              textStyles.medium,
              {color: Colors.white, textAlign: 'center'},
            ]}>
            Delete Expense
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
