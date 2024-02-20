import React, {useContext} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {webClientId} from '../../constants';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../../context/AuthContext';

GoogleSignin.configure({
  webClientId: webClientId,
  offlineAccess: true,
});

export default function Home() {
  const {user, setUser} = useContext(AuthContext);

  const signinWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const googleCredentials = await auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );

      await auth().signInWithCredential(googleCredentials);

      setUser(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(error);
      } else {
        // some other error happened
        console.log(error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      await GoogleSignin.signOut();
      setUser(null);
    } catch (e) {
      Alert.alert('Error', JSON.stringify(e));
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Icon name="home" size={100} />
      <Text>Home Screen</Text>
      <GoogleSigninButton onPress={signinWithGoogle} />
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
