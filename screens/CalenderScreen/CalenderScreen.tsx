import React from 'react';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import {StyleSheet, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function CalenderScreen() {
  const navigation = useNavigation();

  const route = useRoute();

  const handleSelect = (params: any) => {
    route.params?.getDataBack(params?.date);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <DateTimePicker mode="single" date={dayjs()} onChange={handleSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
