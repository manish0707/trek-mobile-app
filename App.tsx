import 'react-native-get-random-values';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Naviation from './navigation/navigation';
import {AuthProvider} from './context/AuthContext';
import {LoaderProvider} from './context/LoaderContext';
import FullScreenLoader from './components/Loader/FullScreenLoader';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <LoaderProvider>
        <AuthProvider>
          <Naviation />
          <FullScreenLoader />
        </AuthProvider>
      </LoaderProvider>
    </GestureHandlerRootView>
  );
}
