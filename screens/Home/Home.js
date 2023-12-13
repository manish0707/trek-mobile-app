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
          setCardsList(JSON.parse(cards).sort(({days: a}, {days: b}) => b - a));
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

  const handleDeleteCard = async id => {
    try {
      const cards = await AsyncStorage.getItem(Strings.cardsListKey);
      const udpatedCardsList = JSON.parse(cards).filter(item => item.id !== id);
      await AsyncStorage.setItem(
        Strings.cardsListKey,
        JSON.stringify(udpatedCardsList),
      );
      setCardsList(udpatedCardsList);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.screen}>
        <FlatList
          contentContainerStyle={styles.listWrap}
          data={cardsList}
          renderItem={({item}) => {
            return (
              <Card
                cardDetails={item}
                creditTime={item.days}
                style={styles.cardSeperator}
                handleDeleteCard={handleDeleteCard}
              />
            );
          }}
          ListEmptyComponent={ListEmptyComponent}
          keyExtractor={item => item.id}
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
