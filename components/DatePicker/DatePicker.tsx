import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput, TouchableOpacity} from 'react-native';
import {styles} from './DatePicker.styles';
import {textStyles} from '../../styles/textStyles';
import {formatDate} from '../../utils/date';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function DatePicker({
  date,
  getDate = () => {},
  style = {},
}: any) {
  const [open, setOpen] = useState(false);

  const handleChangeDate = (dateValue: string) => {
    const formatted = formatDate(dateValue);
    getDate(formatted);
  };

  const handleConfirmDate = (customDate: Date) => {
    setOpen(false);
    getDate(customDate);
  };

  return (
    <TouchableOpacity
      onPress={() => setOpen(true)}
      style={[styles.wrapper, style]}>
      <TextInput
        onChangeText={handleChangeDate}
        style={textStyles.small}
        placeholder="DD/MM/YYYY"
        keyboardType="number-pad"
        value={date}
        editable={false}
      />

      <Icon style={styles.icon} size={24} name="calendar-month" />

      <DateTimePickerModal
        isVisible={open}
        mode="date"
        date={new Date()}
        onConfirm={handleConfirmDate}
        onCancel={() => setOpen(false)}
      />
    </TouchableOpacity>
  );
}
