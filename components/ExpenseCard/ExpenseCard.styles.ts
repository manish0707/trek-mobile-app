import {StyleSheet} from 'react-native';
import {Colors} from '../../styles/Colors';

export const styles = StyleSheet.create({
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderColor: 'lightgray',
    borderRadius: 4,
  },
  categoryTag: {
    borderWidth: 1,
    borderColor: Colors.brand,
    borderRadius: 20,
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});
