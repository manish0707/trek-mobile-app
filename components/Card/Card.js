import React, {useRef} from 'react';
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {images} from '../../images';
import {styles} from './Card.styles';
import CardDots from './CardDots';
import {Swipeable} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Strings} from '../../utils/constants';

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

export default function Card({
  style,
  handleDeleteCard,
  creditTime,
  cardDetails = defaultValues,
}) {
  const swipeableRef = useRef(null);

  const navigation = useNavigation();

  const {
    bankName,
    cardHolderName = defaultValues.cardHolderName,
    cardLastDigits,
    cardType,
    id,
  } = cardDetails;

  const showAlert = () =>
    Alert.alert('Delete Card', 'Are you sure you want to delete this card?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Yes',
        onPress: () => handleDeleteCard(id),
      },
    ]);

  const handleEdit = () => {
    navigation.navigate('AddAndEditCard', {cardDetails});
  };

  const renderActions = () => {
    return (
      <View style={styles.actionWrapper}>
        <TouchableOpacity
          onPress={handleEdit}
          style={[styles.actionButton, {backgroundColor: '#10ac84'}]}>
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={showAlert}
          style={[styles.actionButton, {backgroundColor: '#eb4d4b'}]}>
          <Text style={[styles.actionButtonText]}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleLongPress = () => {
    swipeableRef.current?.openRight();
  };

  const {image, color} = getImageBasedonCardType(cardType);

  console.log(id);

  return (
    <GestureHandlerRootView>
      <Swipeable ref={swipeableRef} renderRightActions={renderActions}>
        <TouchableWithoutFeedback onLongPress={handleLongPress}>
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
        </TouchableWithoutFeedback>
      </Swipeable>
    </GestureHandlerRootView>
  );
}
