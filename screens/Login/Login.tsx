import React, {useContext} from 'react';
import {Image, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {webClientId} from '../../constants';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../../context/AuthContext';
import {images} from '../../images';

GoogleSignin.configure({
  webClientId: webClientId,
  offlineAccess: true,
});

export default function Login() {
  const {setUser} = useContext(AuthContext);

  const signinWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const googleCredentials = await auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );

      await auth().signInWithCredential(googleCredentials);

      setUser(userInfo);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={images.brandLogoPng}
        style={{borderWidth: 1, height: 250, width: 250}}
      />

      <Text style={{fontSize: 30, fontWeight: '600', marginTop: 20}}>Trek</Text>
      <Text style={{fontSize: 20, marginBottom: 20, marginTop: 10}}>
        Financial Trekking
      </Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signinWithGoogle}
      />
    </View>
  );
}
