import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {User} from '../context/AuthContext';

export const signout = async () => {
  await auth().signOut();
  await GoogleSignin.signOut();
};

export const createUserInFirebase = async (
  user: User,
  successCb: () => void,
  errorCb: (error: any) => void,
) => {
  firestore().collection('users').add(user).then(successCb).catch(errorCb);
};
