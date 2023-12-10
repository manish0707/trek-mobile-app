import React from 'react';
import {Image, Text, View} from 'react-native';
import {images} from '../../images';
import {styles} from './Card.styles';
import CardDots from './CardDots';

const defaultValues = {
  bankName: 'Kotak Mahindra Bank',
  cardLastDigits: '0000',
  cardHolderName: 'Jhon Doe',
  creditTime: 100,
  cardType: 'visa',
};

const getImageBasedonCardType = cardType => {
  if (cardType === 'mastercard') {
    return {image: images.mastercard, color: '#ff6b6b'};
  }

  if (cardType === 'visa') {
    return {image: images.visa, color: '#8395a7'};
  }

  if (cardType === 'rupay') {
    return {image: images.rupay, color: '#1dd1a1'};
  }
};

export default function Card({style, cardDetails = defaultValues}) {
  const {bankName, cardHolderName, cardLastDigits, cardType, creditTime} =
    cardDetails;

  const {image, color} = getImageBasedonCardType(cardType);

  return (
    <View style={[styles.wrapper, {backgroundColor: color}, style]}>
      <View>
        <Text numberOfLines={1} style={styles.bankName}>
          {bankName}
        </Text>
        <Image style={styles.chip} source={images.chip} />
        <CardDots lastDigits={cardLastDigits} />
        <View style={styles.nameWrap}>
          <Text style={styles.cardName}>{cardHolderName}</Text>
          <Image style={styles.cardTypeLogo} source={image} />
        </View>
      </View>

      <View style={styles.tagWrap}>
        <View style={styles.creditTag}>
          <Text style={styles.creditDays}>{creditTime} </Text>
          <Text style={styles.creditDaysText}>days credit period</Text>
        </View>
      </View>
    </View>
  );
}
