import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './MultiSelect.styles';
import {Colors} from '../../styles/Colors';

const categories = [
  'Food',
  'Entertaiment',
  'Subscription',
  'Pet',
  'Wellness',
  'Education',
  'Eat',
];

export default function MultiSelect({items = categories, onSelect = () => {}}) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = item => {
    setSelectedItem(item);
    onSelect(item);
  };

  return (
    <View style={styles.wrapper}>
      {items.map((item, index) => {
        const isSelected = selectedItem === item;
        return (
          <TouchableOpacity
            onPress={() => handleSelect(item)}
            key={`${index}-${item}`}
            style={[
              styles.capsule,
              isSelected ? {backgroundColor: Colors.brand} : {},
            ]}>
            <Text style={[styles.text, isSelected ? {color: 'white'} : {}]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
