import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './AddAndEditCard.styles';
import SelectModal from '../../components/SelectModal/SelectModal';
import {bankNames} from '../../utils/bankNames';
import {images} from '../../images';
import {commonStyles} from '../../styles/commonstyles';
import {Strings} from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const cardTypes = ['visa', 'mastercard', 'rupay'];

const dates = Array.from({length: 31}, (_, index) => ({
  name: index + 1,
  code: index + 1,
}));

const months = [
  {code: 'January', name: 'January'},
  {code: 'February', name: 'February'},
  {code: 'March', name: 'March'},
  {code: 'April', name: 'April'},
  {code: 'May', name: 'May'},
  {code: 'June', name: 'June'},
  {code: 'July', name: 'July'},
  {code: 'August', name: 'August'},
  {code: 'September', name: 'September'},
  {code: 'October', name: 'October'},
  {code: 'November', name: 'November'},
  {code: 'December', name: 'December'},
];

export default function AddAndEditCard({navigation}) {
  const [selectedBank, setSelectedBank] = useState(null);
  const [cardType, setCardType] = useState(null);
  const [billPaymentDate, setBillPaymentDate] = useState({});
  const [errorFields, setErrorFields] = useState({});

  const handleCardType = type => {
    setCardType(type);
    if (errorFields.cardType) {
      setErrorFields({...errorFields, cardType: false});
    }
  };

  const handleSaveCard = async () => {
    if (!selectedBank) {
      return setErrorFields({bankName: true});
    }

    if (!cardType) {
      return setErrorFields({cardType: true});
    }

    if (!billPaymentDate?.date || !billPaymentDate?.month) {
      return setErrorFields({billPaymentDate: true});
    }

    const card = {
      bankName: selectedBank.name,
      cardType,
      billPaymentDate,
    };

    try {
      const cardsList = await AsyncStorage.getItem(Strings.cardsListKey);
      let cards = [];

      if (cardsList === null) {
        cards.push(card);
      } else {
        const updatedCards = JSON.parse(cardsList);
        updatedCards.push(card);
        cards = updatedCards;
      }
      await AsyncStorage.setItem(Strings.cardsListKey, JSON.stringify(cards));
      navigation.navigate('Home');
    } catch (e) {
      console.log(e);
    }
  };

  console.log({errorFields});

  const handleSelectBank = value => {
    setSelectedBank(value);
    if (errorFields.bankName) {
      setErrorFields({...errorFields, bankName: false});
    }
  };

  const handleSelectDate = date => {
    setBillPaymentDate({...billPaymentDate, date: date.name});
    if (errorFields.billPaymentDate) {
      setErrorFields({...errorFields, billPaymentDate: false});
    }
  };

  const handleSelectMonth = month => {
    setBillPaymentDate({...billPaymentDate, month: month.name});
    if (errorFields.billPaymentDate) {
      setErrorFields({...errorFields, billPaymentDate: false});
    }
  };

  console.log(errorFields);

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <Text style={styles.heading}>Add Your Card Here</Text>

        <Text style={[styles.fieldHeading, styles.fieldSeperator]}>
          Select Bank
        </Text>
        <SelectModal
          list={bankNames}
          onSelect={handleSelectBank}
          modalHeading="Search Bank"
          placeholder="Select your bank"
          selectedValue={selectedBank?.name}
        />

        {errorFields.bankName ? (
          <Text style={styles.errorText}>This is required</Text>
        ) : null}

        <Text style={[styles.fieldHeading, styles.fieldSeperator]}>
          Select Card Type
        </Text>

        <View style={styles.cardTypeWrap}>
          {cardTypes.map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => handleCardType(item)}
              style={[
                styles.cardTypeButton,
                item === cardType ? styles.selectedCardType : {},
              ]}>
              <Image
                resizeMode="contain"
                style={styles.cardTypeImage}
                source={images[item]}
              />
            </TouchableOpacity>
          ))}
        </View>

        {errorFields.cardType ? (
          <Text style={styles.errorText}>This is required</Text>
        ) : null}

        <Text style={[styles.fieldHeading, styles.fieldSeperator]}>
          Bill Payment Date
        </Text>
        <View style={styles.paymentWrap}>
          <SelectModal
            list={dates}
            onSelect={handleSelectDate}
            modalHeading="Search Date"
            placeholder="Date"
            selectedValue={billPaymentDate?.date?.name}
            style={styles.paymentDate}
            enableSearch={false}
          />
          <SelectModal
            list={months}
            onSelect={handleSelectMonth}
            modalHeading="Search Month"
            placeholder="Month"
            selectedValue={billPaymentDate?.month?.name}
            enableSearch={false}
          />
        </View>
        {errorFields.billPaymentDate ? (
          <Text style={styles.errorText}>This is required</Text>
        ) : null}
      </View>
      <TouchableOpacity
        onPress={handleSaveCard}
        style={[commonStyles.button, styles.saveBtn]}>
        <Text style={commonStyles.buttonText}>Save Card</Text>
      </TouchableOpacity>
    </View>
  );
}
