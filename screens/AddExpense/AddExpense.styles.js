import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  heading: {
    fontSize: 24,
    color: 'black',
    fontWeight: '500',
  },
  subHeading: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '500',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    fontSize: 24,
    paddingLeft: 10,
    borderColor: 'lightgray',
    color: 'black',
  },
  btn: {
    margin: 10,
  },
});
