import 'react-native-gesture-handler';
import React from 'react';
import { LogBox, Platform, StatusBar } from 'react-native';
import FlashMessage from "react-native-flash-message";
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from 'react-redux'

import { store, persistor } from './src/Redux/Store/Index'
import MainStack from './src/Stacks/MainStack'
import { deviceHeight, deviceId, StatusbarHeight, windowHeight, windowWidth } from './src/Constants/Constants';
import { FontSize } from './src/Theme/FontSize';
import Fonts from './src/Assets/Fonts/Index';

LogBox.ignoreAllLogs()
const App = () => {
  ((Platform.OS === 'android') ? () => {
    StatusBar.setTranslucent(true)
    StatusBar.setBackgroundColor('transparent')
    StatusBar.setBarStyle('dark-content')
  } : () => { })()
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainStack />
      </PersistGate>
      <FlashMessage position="top" animated hideStatusBar={Platform.OS === 'ios' ? true : false}  textStyle={{ fontSize: FontSize.medium, fontFamily: Fonts.Bold }} titleStyle={{ marginTop: deviceId === ('iPhone15,2' || 'iPhone15,3' || 'iPhone15,4') ? ((windowWidth*10)/100): deviceHeight - windowHeight, fontSize: FontSize.medium, fontFamily: Fonts.Medium }} />
    </Provider>

  );
};

export default App;