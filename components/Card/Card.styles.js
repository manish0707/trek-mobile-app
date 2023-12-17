import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../styles/Colors';

export const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    padding: 20,
    paddingBottom: 0,
    width: Dimensions.get('screen').width - 40,
  },
  bankName: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
  },
  cardName: {
    fontSize: 18,
    color: 'white',
  },
  nameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  cardTypeLogo: {height: 25, width: 40},
  chip: {
    height: 50,
    width: 50,
    marginVertical: 10,
  },
  dotWrap: {flexDirection: 'row', alignItems: 'center'},
  dotInner: {flexDirection: 'row', marginRight: 10},
  dot: {
    height: 10,
    width: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 4,
  },
  cardDigit: {fontSize: 20, color: 'white', letterSpacing: 3},
  tagWrap: {marginTop: 10},
  creditTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    borderRadius: 16,
    marginVertical: 10,
  },
  creditDays: {fontSize: 22, fontWeight: 'bold', color: 'white'},
  creditDaysText: {
    fontSize: 14,
    color: 'white',
    paddingVertical: 10,
    marginRight: 10,
  },
  actionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    width: 120,
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 20,
  },
  actionButtonText: {
    textAlign: 'center',
    color: 'white',
  },
  textWrap: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payDate: {
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16,
  },
});
