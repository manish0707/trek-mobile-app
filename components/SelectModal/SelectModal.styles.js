import {StyleSheet} from 'react-native';
import {Colors} from '../../styles/Colors';

export const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    borderColor: Colors.lightGray
  },
  fieldText: {
    fontSize: 16,
    marginRight: 10,
    maxWidth: '90%',
  },
  heading: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },
  modalWrap: {
    height: 500,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  downImage: {height: 10, width: 20},
  selectOption: {
    borderWidth: 1,
    padding: 10,
    borderColor: Colors.lightGray,
    marginVertical: 4,
    borderRadius: 10,
  },
  selectText: {
    fontSize: 16,
    color: 'black',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 20,
  },
});