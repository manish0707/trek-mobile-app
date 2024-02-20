import React, {useContext} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import {signout} from '../../utils/auth';

export default function Home() {
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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logut</Text>
      </TouchableOpacity>
    </View>
  );
}
