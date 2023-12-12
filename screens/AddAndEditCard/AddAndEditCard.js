import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';
import {styles} from './AddAndEditCard.styles';
import SelectModal from '../../components/SelectModal/SelectModal';
import {bankNames} from '../../utils/bankNames';
import {images} from '../../images';
import {commonStyles} from '../../styles/commonstyles';
import {Strings} from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';

const cardTypes = ['visa', 'mastercard', 'rupay'];

const dates = Array.from({length: 31}, (_, index) => ({
  name: index + 1,
  code: index + 1,
}));

export default function AddAndEditCard({navigation}) {
  const {params} = useRoute();
  const {cardDetails} = params || {};

  const isEditing = !!cardDetails;

  const [selectedBank, setSelectedBank] = useState(null);
  const [cardType, setCardType] = useState(null);
  const [billPaymentDate, setBillPaymentDate] = useState(null);
  const [billGenerationDate, setBillGenerationDate] = useState(null);
  const [errorFields, setErrorFields] = useState({});

  console.log(cardDetails);

  useEffect(() => {
    if (isEditing) {
      setSelectedBank({name: cardDetails.bankName});
      setCardType(cardDetails.cardType);
      setBillGenerationDate(cardDetails.billGenerationDate);
      setBillPaymentDate(cardDetails.billPaymentDate);
    }
  }, [isEditing]);

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

    if (!billGenerationDate) {
      return setErrorFields({billGenerationDate: true});
    }

    if (!billPaymentDate) {
      return setErrorFields({billPaymentDate: true});
    }

    const card = {
      id: uuid.v4(),
      bankName: selectedBank.name,
      cardType,
      billPaymentDate,
      billGenerationDate,
    };

    try {
      const cardsList = await AsyncStorage.getItem(Strings.cardsListKey);
      let cards = [];

      if (cardsList === null) {
        cards.push(card);
      } else {
        const updatedCards = JSON.parse(cardsList);

        // In case of editin the card
        if (isEditing) {
          const tempCards = updatedCards.map(item =>
            item.id === cardDetails.id ? card : item,
          );
          cards = tempCards;
        } else {
          updatedCards.push(card);
          cards = updatedCards;
        }
      }
      console.log(cards);
      await AsyncStorage.setItem(Strings.cardsListKey, JSON.stringify(cards));
      navigation.navigate('Home');
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelectBank = value => {
    setSelectedBank(value);
    if (errorFields.bankName) {
      setErrorFields({...errorFields, bankName: false});
    }
  };

  const handleBillGenFocus = () => {
    if (errorFields.billGenerationDate) {
      setErrorFields({billGenerationDate: false});
    }
  };

  const handleBillPayFocus = () => {
    if (errorFields.billPaymentDate) {
      setErrorFields({billPaymentDate: false});
    }
  };

  console.log(cardDetails, isEditing);

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.content}>
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
          Bill Generation Day
        </Text>
        <TextInput
          keyboardType="number-pad"
          onFocus={handleBillGenFocus}
          defaultValue={billGenerationDate}
          maxLength={2}
          placeholder="Enter day of the month"
          style={styles.input}
          onChangeText={value => setBillGenerationDate(value)}
        />
        <Text style={styles.inputInfo}>Ex: 20th of every month</Text>

        {errorFields.billGenerationDate ? (
          <Text style={styles.errorText}>This is required</Text>
        ) : null}

        <Text style={[styles.fieldHeading, styles.fieldSeperator]}>
          Bill Payment Day
        </Text>
        <TextInput
          keyboardType="number-pad"
          onFocus={handleBillPayFocus}
          defaultValue={billPaymentDate}
          maxLength={2}
          placeholder="Enter day of the month"
          style={styles.input}
          onChangeText={value => setBillPaymentDate(value)}
        />
        <Text style={styles.inputInfo}>Ex: 5th of every month</Text>

        {errorFields.billPaymentDate ? (
          <Text style={styles.errorText}>This is required</Text>
        ) : null}
      </ScrollView>
      <TouchableOpacity
        onPress={handleSaveCard}
        style={[commonStyles.button, styles.saveBtn]}>
        <Text style={commonStyles.buttonText}>Save Card</Text>
      </TouchableOpacity>
    </View>
  );
}
