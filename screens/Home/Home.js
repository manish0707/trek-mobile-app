import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {images} from '../../images';
import {styles} from './Home.styles';
import {commonStyles} from '../../styles/commonstyles';
import Card from '../../components/Card/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Strings} from '../../utils/constants';

const EmptyCard = ({navigation}) => {
  return (
    <>
      <Image style={styles.image} resizeMode="contain" source={images.void} />

      <Text style={styles.text}>Please add a card to get started</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('AddAndEditCard')}
        style={[commonStyles.button, styles.addCard]}>
        <Text style={commonStyles.buttonText}>Add Card</Text>
      </TouchableOpacity>
    </>
  );
};

export default function Home({navigation}) {
  const [cardsList, setCardsList] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cards = await AsyncStorage.getItem(Strings.cardsListKey);
        if (cards) {
          setCardsList(JSON.parse(cards));
        }
      } catch (e) {
        console.log(e);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetchCards();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const ListEmptyComponent = useMemo(
    () => <EmptyCard navigation={navigation} />,
    [navigation],
  );

  return (
    <View style={styles.wrap}>
      <View style={styles.screen}>
        <FlatList
          contentContainerStyle={styles.listWrap}
          data={cardsList}
          renderItem={({item}) => (
            <Card
              cardDetails={{
                bankName: item.bankName,
                cardHolderName: 'Manish Sharma',
                cardLastDigits: '2345',
                cardType: item.cardType,
                creditTime: 80,
              }}
              style={styles.cardSeperator}
            />
          )}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('AddAndEditCard')}
        style={styles.floatingAddCard}>
        <Image style={styles.plus} source={images.plus} />
      </TouchableOpacity>
    </View>
  );
}
