import firestore from '@react-native-firebase/firestore';

export const getMyExpenses = (
  userId: string,
  startDate: any, // Pass your start date here
  endDate: any, // Pass your end date here
  limit: number | undefined,
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

  if (limit) {
    userExpensesQuery = userExpensesQuery
      .orderBy('createdAt', 'desc')
      .limit(limit);
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

// Assuming you have a collection named 'yourCollection' and a document with a specific ID to delete
export const deleteDocumentFromCollection = async (
  collectionId: string,
  documentId: string,
) => {
  // Reference to the document to delete
  const documentRef = firestore().collection(collectionId).doc(documentId);

  // Delete the document
  await documentRef.delete();
};
