import {StyleSheet} from 'react-native';
import {Colors} from '../../styles/Colors';

export const styles = StyleSheet.create({
  wrapper: {flex: 1},
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  fieldSeperator: {
    marginTop: 30,
  },
  fieldHeading: {
    fontSize: 20,
    color: 'black',
  },
  cardTypeWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  cardTypeButton: {
    borderWidth: 1,
    padding: 6,
    borderRadius: 10,
    borderColor: Colors.lightGray,
  },
  cardTypeImage: {
    height: 40,
    width: 100,
  },
  selectedCardType: {borderColor: 'green', borderWidth: 2},
  paymentWrap: {flexDirection: 'row'},
  paymentDate: {marginRight: 10},
  saveBtn: {margin: 20},
  errorText: {color: 'red', fontSize: 16}
});
