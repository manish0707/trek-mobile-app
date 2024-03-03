import {StyleSheet} from 'react-native';
import {Colors} from '../../styles/Colors';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
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
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.lightGray,
    padding: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  filterPopupWrap: {
    flex: 1,
    padding: 10,
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
