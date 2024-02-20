import firestore from '@react-native-firebase/firestore';

export const getMyExpenses = (
  userId: string,
  successCb: (data: any) => void,
  errorCb: (error: any) => void,
) => {
  const userExpensesQuery = firestore()
    .collection('expenses')
    .where('userId', '==', userId);
  userExpensesQuery
    .get()
    .then(querySnapshot => {
      const data: any = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      successCb(data);
    })
    .catch(error => {
      errorCb(error);
    });
};
