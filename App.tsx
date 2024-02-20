import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Naviation from './navigation/navigation';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Naviation />
    </GestureHandlerRootView>
  );
}
