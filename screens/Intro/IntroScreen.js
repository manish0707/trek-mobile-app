import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './IntroScreen.styles';
import {images} from '../../images';
import {commonStyles} from '../../styles/commonstyles';

export default function IntroScreen({navigation}) {
  return (
    <View style={styles.wrapper}>
      <View style={{flex: 1}}>
        <Text style={styles.heading}>MAX CREDIT</Text>
        <Image source={images.card} resizeMode="contain" style={styles.image} />
        <Text style={styles.heading1}>Get Maximum Credit</Text>
        <Text style={styles.subheading}>
          This app will tell you which card to use to get maximum credit.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={commonStyles.button}>
        <Text style={commonStyles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
