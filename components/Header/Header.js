import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './Header.styles';
import {Strings} from '../../utils/constants';

export default function Header() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{Strings.appName}</Text>
    </View>
  );
}
