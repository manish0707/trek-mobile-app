import React, {useContext} from 'react';
import {Image, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {webClientId} from '../../constants';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../../context/AuthContext';
import {images} from '../../images';
import {LoaderContext} from '../../context/LoaderContext';
import {saveDataInFirebase} from '../../utils/auth';
import {userCollection} from '../../firebaseConfig';
import {textStyles} from '../../styles/textStyles';

GoogleSignin.configure({
  webClientId: webClientId,
  offlineAccess: true,
});

export default function Login() {
  const {setUser} = useContext(AuthContext);
  const {setIsLoading, isLoading} = useContext(LoaderContext);

  const signinWithGoogle = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const googleCredentials = await auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );

      await auth().signInWithCredential(googleCredentials);

      const userExists = await firestore()
        .collection(userCollection)
        .doc(userInfo.user?.email)
        .get();

      const currentUser = auth().currentUser || {};

      if (!userExists._exists) {
        saveDataInFirebase(
          userCollection,
          userInfo.user?.email,
          userInfo.user,
          () => {
            setUser(currentUser);
            setIsLoading(false);
          },
          error => {
            console.log(error);
            setIsLoading(false);
          },
        );
      } else {
        setUser(currentUser);
        setIsLoading(false);
      }
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
      setIsLoading(false);
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={images.brandLogoPng}
        style={{borderWidth: 1, height: 250, width: 250, marginBottom: 20}}
      />

      <Text style={[textStyles.Xlarge, {paddingTop: 10}]}>TREK</Text>
      <Text
        style={[
          textStyles.large,
          {marginVertical: 10, marginBottom: 20, fontStyle: 'italic'},
        ]}>
        Financial Trekking
      </Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signinWithGoogle}
        disabled={isLoading}
      />
    </View>
  );
}
