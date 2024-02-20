import React, {useContext} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {LoaderContext} from '../../context/LoaderContext';
import {Colors} from '../../styles/Colors';

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
    opacity: 0.4,
  },
});

export default function FullScreenLoader() {
  const {isLoading} = useContext(LoaderContext);
  return isLoading ? (
    <ActivityIndicator size={50} style={styles.loader} />
  ) : null;
}
