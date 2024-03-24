import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {commonStyles} from '../../styles/commonstyles';
import {Colors} from '../../styles/Colors';

interface Props {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  style?: StyleProp<ViewStyle>;
  title: string;
  isLoading?: boolean;
}

export default function Button({onPress, style, title, isLoading}: Props) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      style={[commonStyles.button, style]}>
      {isLoading ? (
        <ActivityIndicator color={Colors.white} size={24} />
      ) : (
        <Text style={commonStyles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
