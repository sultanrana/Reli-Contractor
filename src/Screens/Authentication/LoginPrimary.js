import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SafeAreaView, Keyboard, Platform } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';

import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import { FontSize } from '../../Theme/FontSize';
import { LayoutStyles } from '../../Theme/Layout';
import Colors from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { setUserLocation } from '../../Redux/UserLocation';

const LoginPrimary = ({ navigation }) => {
  const EMAIL_REG = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const [email, setEmail] = useState('');
  const dispatch = useDispatch()
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)

  useEffect(() => {
    setTimeout(() => {
      checkIsPermission()
    }, 1500);
  }, [])

  const checkIsPermission = () => {
    check(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            requestPermission()
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        // …
      });
  }

  const requestPermission = () => {
    request(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            getCurrentLocation()
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        console.log("locationPermission-error", error);
      });
  }
  const getCurrentLocation = async () => {

    try {
      Geolocation.getCurrentPosition(info => {
        console.log('current location lat,long', info)
        dispatch(setUserLocation(info))
      });
    } catch (err) {
      console.log(err);
    }

  };

  const onSubmit = () => {
    if (email === '') {
      SimpleToast.show(`*Please enter your email to continue`);
      return;
    } if (EMAIL_REG.test(email) == false) {
      SimpleToast.show('*Please check your entry and try again')
      return;
    } else {
      navigation.navigate(References.LoginSecondary, {
        email: email
      });
    }
  }

  return (
    <SafeAreaView style={[AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} shouldShowBack={false} />
      <View style={[AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle]}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} >
          <Text allowFontScaling={false} style={[AppStyles.AuthScreenTitle]}>
            Contractor Sign In
          </Text>

          <InputField
            title="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="yourname@email.com"
            keyboardType='email-address'
            autoCapitalize={'none'}
            returnKeyType={'done'}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          <View style={{ marginVertical: 10 }} />
          <ContainedButton
            onPress={onSubmit}
            label="Continue"
          />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate(References.SignupPrimary)} style={{ alignSelf: 'center' }}>
            <Text allowFontScaling={false} style={{ marginTop: 30, color: Colors(scheme).Text, fontFamily: Fonts.SemiBold }}>
              Need an account?
              <Text allowFontScaling={false} style={{ color: Colors(scheme).Primary, fontFamily: Fonts.Medium }}> Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );

}

export default LoginPrimary;
