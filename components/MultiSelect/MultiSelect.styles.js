import {StyleSheet} from 'react-native';
import { Colors } from '../../styles/Colors';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  capsule: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: '#ecf0f1',
    borderColor: Colors.lightGray,
  },
  capsuleImage: {height: 24, width: 24, marginRight: 6},
});
