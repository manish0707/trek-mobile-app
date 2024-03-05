import React, {useContext} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import {signout} from '../../utils/auth';
import {AuthContext} from '../../context/AuthContext';

export default function MyAccount() {
  const {setUser} = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signout();
      setUser(null);
    } catch (e) {
      Alert.alert('ERROR', JSON.stringify(e));
    }
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={textStyles.medium}>My Account</Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          borderWidth: 1,
          paddingHorizontal: 20,
          paddingVertical: 6,
          marginTop: 20,
          borderRadius: 10,
        }}>
        <Text style={textStyles.medium}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
