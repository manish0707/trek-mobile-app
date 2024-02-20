import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {User} from '../context/AuthContext';

export const signout = async () => {
  await auth().signOut();
  await GoogleSignin.signOut();
};

export const saveDataInFirebase = async (
  docunameName: string,
  data: any,
  successCb: () => void,
  errorCb: (error: any) => void,
) => {
  firestore().collection(docunameName).add(data).then(successCb).catch(errorCb);
};
