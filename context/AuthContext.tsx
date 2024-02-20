import React, {createContext, useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type User = FirebaseAuthTypes.User;

export const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({children}: any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = auth().currentUser as User;

    if (!user && currentUser) {
      setUser(currentUser);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};
