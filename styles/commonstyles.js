import {StyleSheet} from 'react-native';
import {Colors} from './Colors';

export const commonStyles = StyleSheet.create({
  button: {
    backgroundColor: Colors.brand,
    padding: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  categoryTag: {
    borderWidth: 1,
    borderColor: Colors.brand,
    borderRadius: 20,
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 2,
  }
});
