import 'react-native-gesture-handler';
import React from 'react';
import { LogBox} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import MainStack from './src/Stacks/MainStack'

LogBox.ignoreAllLogs(true)
import {
  View,
  Text
} from 'react-native';

const App = () => {

  return (
    <MainStack />
  );
};

export default App;