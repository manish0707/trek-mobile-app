import firestore from '@react-native-firebase/firestore';

export const getMyExpenses = (
  userId: string,
  startDate: any, // Pass your start date here
  endDate: any, // Pass your end date here
  successCb: (data: any) => void,
  errorCb: (error: any) => void,
) => {
  let userExpensesQuery = firestore()
    .collection('expenses')
    .where('userId', '==', userId);

  // Add date range filter if both startDate and endDate are provided
  if (startDate && endDate) {
    userExpensesQuery = userExpensesQuery
      .where('date', '>=', startDate)
      .where('date', '<=', endDate);
  }

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
