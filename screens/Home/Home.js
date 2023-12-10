import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header/Header';
import {images} from '../../images';
import {styles} from './Home.styles';
import {commonStyles} from '../../styles/commonstyles';
import Card from '../../components/Card/Card';
import {Colors} from '../../styles/Colors';

const EmptyCard = ({navigation}) => {
  return (
    <>
      <Image style={styles.image} resizeMode="contain" source={images.void} />

      <Text style={styles.text}>Please add a card to get started</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={[commonStyles.button, styles.addCard]}>
        <Text style={commonStyles.buttonText}>Add Card</Text>
      </TouchableOpacity>
    </>
  );
};

export default function Home({navigation}) {
  return (
    <View style={styles.wrap}>
      <View style={styles.screen}>
        <FlatList
          contentContainerStyle={styles.listWrap}
          data={[{}, {}, {}]}
          renderItem={() => <Card style={styles.cardSeperator} />}
          ListEmptyComponent={EmptyCard}
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
