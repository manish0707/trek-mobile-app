import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const signout = async () => {
  await auth().signOut();
  await GoogleSignin.signOut();
};
