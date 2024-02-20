import {StyleSheet} from 'react-native';
import {Colors} from '../../styles/Colors';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  addExpenseButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: Colors.brand,
    padding: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});
