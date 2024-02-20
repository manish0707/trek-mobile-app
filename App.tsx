import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Naviation from './navigation/navigation';
import {AuthProvider} from './context/AuthContext';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthProvider>
        <Naviation />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
