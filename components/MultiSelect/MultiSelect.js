import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './MultiSelect.styles';
import {Colors} from '../../styles/Colors';

export default function MultiSelect({
  items = [],
  defaultValue = null,
  onSelect = () => {},
  selectedItemText = '',
}) {
  const [selectedItem, setSelectedItem] = useState(defaultValue);

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
              {isSelected && selectedItemText ? selectedItemText : item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
