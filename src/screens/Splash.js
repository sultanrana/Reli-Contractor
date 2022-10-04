import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { splashScreen } from '../theme/Images';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('authStack');
    }, 3000);
  }, [navigation]);

  return (
    <ImageBackground source={splashScreen} style={styles.imageBackground} />
  );
};

export default Splash;

const styles = StyleSheet.create({
  imageBackground: {
    height: '100%',
    width: '100%',
  },
});
