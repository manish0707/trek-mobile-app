import React from 'react';
import {styles} from './ExpenseCard.styles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import {categories, constants} from '../../constants';
import {Colors} from '../../styles/Colors';
import {useNavigation} from '@react-navigation/native';
import { commonStyles } from '../../styles/commonstyles';

export default function ExpenseCard({item}: any) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ExpenseDetails', item);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.expenseItem}>
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
              categories.find(i => i.name === item.cateogry)?.image || undefined
            }
          />
        </View>
        <View>
          <Text style={textStyles.large}>{item.name}</Text>
          <Text style={[textStyles.small, {color: Colors.gray}]}>
            {item.date}
          </Text>
          <View style={commonStyles.categoryTag}>
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
        {constants.RUPEES_SYMBOL}
        {item.amount}
      </Text>
    </TouchableOpacity>
  );
}
