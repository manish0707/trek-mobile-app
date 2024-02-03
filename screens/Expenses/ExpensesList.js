import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ExpensesList() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Icon name="wallet" size={100} />
      <Text>Home Screen</Text>
    </View>
  );
}
