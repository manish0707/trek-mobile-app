import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from './CustomTextInput.styles';

export default function CustomTextInput({placeholder}) {
  return (
    <View>
      <Text style={styles.heading}>Title</Text>
      <TextInput style={styles.input} />

      <Text style={styles.heading}>Amount</Text>
      <TextInput keyboardType="number-pad" style={styles.input} />

      <TouchableOpacity>
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  );
}
