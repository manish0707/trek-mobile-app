import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './MultiSelect.styles';
import {Colors} from '../../styles/Colors';
import {textStyles} from '../../styles/textStyles';

export default function MultiSelect({
  items = [],
  defaultValue = null,
  onSelect = _item => {},
  selectedItemText = '',
  style = {},
}) {
  const [selectedItem, setSelectedItem] = useState(defaultValue);

  const handleSelect = item => {
    setSelectedItem(item.name);
    onSelect(item.name);
  };

  return (
    <View style={[styles.wrapper, style]}>
      {items.map((item, index) => {
        const isSelected = selectedItem === item.name;
        return (
          <TouchableOpacity
            onPress={() => handleSelect(item)}
            key={`${index}-${item.name}`}
            style={[
              styles.capsule,
              isSelected ? {borderColor: Colors.brand} : {},
            ]}>
            {item.image && (
              <Image style={styles.capsuleImage} source={item.image} />
            )}
            <Text style={[textStyles.small]}>
              {isSelected && selectedItemText ? selectedItemText : item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
