import React, {useContext} from 'react';
import {
  Alert,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import {signout} from '../../utils/auth';
import {textStyles} from '../../styles/textStyles';
import {Colors} from '../../styles/Colors';
import {constants} from '../../constants';
import {images} from '../../images';

export default function Home() {
  const {user, setUser} = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signout();
      setUser(null);
    } catch (e) {
      Alert.alert('ERROR', JSON.stringify(e));
    }
  };

  return (
    <View style={{flex: 1, padding: 10, marginTop: 20}}>
      <View>
        <Text style={[textStyles.Xlarge]}>Hello, {user.displayName}</Text>
      </View>

      <ImageBackground
        source={images.background}
        imageStyle={{borderRadius: 20}}
        style={{
          marginTop: 20,
          padding: 14,
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'white'}}>Total Expense</Text>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 10,
              padding: 10,
            }}>
            <Text style={{color: 'white'}}>This Month</Text>
          </TouchableOpacity>
        </View>
        <Text style={[textStyles.largeHeading, {marginVertical: 10}]}>
          {constants.RUPEES_SYMBOL}120
        </Text>
        <Text style={{color: 'white'}}>Amount for this month</Text>
      </ImageBackground>
    </View>
  );
}
