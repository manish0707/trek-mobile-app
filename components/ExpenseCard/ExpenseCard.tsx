import React from 'react';
import {styles} from './ExpenseCard.styles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import {categories, constants} from '../../constants';
import {Colors} from '../../styles/Colors';

export default function ExpenseCard({item}: any) {
    console.log(item);
    
  return (
    <TouchableOpacity style={styles.expenseItem}>
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
          <Text style={[textStyles.small, {color: Colors.gray, marginTop: 4}]}>
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
        {constants.RUPEES_SYMBOL}
        {item.amount}
      </Text>
    </TouchableOpacity>
  );
}
