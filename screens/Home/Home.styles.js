import {StyleSheet} from 'react-native';
import {Colors} from '../../styles/Colors';

export const styles = StyleSheet.create({
  screen: {flex: 1},
  wrap: {flex: 1, backgroundColor: 'white'},
  image: {
    height: 400,
    width: 300,
    alignSelf: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
  addCard: {marginTop: 50},
  floatingAddCard: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: Colors.brand,
    padding: 14,
    right: 20,
    borderRadius: 30,
    elevation: 10,
  },
  cardSeperator: {marginVertical: 10},
  listWrap: {alignItems: 'center', paddingBottom: 100},
  plus: {height: 30, width: 30},
});
