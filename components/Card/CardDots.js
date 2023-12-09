import React from 'react';
import {styles} from './Card.styles';
import {Text, View} from 'react-native';

export default function CardDots({lastDigits = '0000'}) {
  return (
    <View style={styles.dotWrap}>
      <View style={styles.dotInner}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      <View style={styles.dotInner}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      <View style={styles.dotInner}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      <View>
        <Text style={styles.cardDigit}>{lastDigits}</Text>
      </View>
    </View>
  );
}
