import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const signout = async () => {
  await auth().signOut();
  await GoogleSignin.signOut();
};

export const saveDataInFirebase = async (
  docunameName: string,
  title: string | undefined,
  data: any,
  successCb: () => void,
  errorCb: (error: any) => void,
) => {
  firestore()
    .collection(docunameName)
    .doc(title)
    .set(data)
    .then(successCb)
    .catch(errorCb);
};
