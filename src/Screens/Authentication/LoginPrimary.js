import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SafeAreaView, Keyboard, Platform } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { showMessage, hideMessage } from "react-native-flash-message";

import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';
import Colors from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { setUserLocation } from '../../Redux/UserLocation';
import { EMAIL_REG } from '../../Constants/Constants';
import { setCompaniesData } from '../../Redux/Actions';
import { handleGetAllCompanies } from '../../API/Config';

const LoginPrimary = ({ navigation }) => {

  const [inputs, setInputs] = useState({
    email: '',
  })
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)


  const getCompanies = async () => {
    const companiesData = await handleGetAllCompanies()
    console.log({companiesData})
    dispatch(setCompaniesData(companiesData?.data))
}


  useEffect(() => { getCompanies() }, [])

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

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }))
  }

  const handleError = (errorMsg, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMsg }))
  }
  const onSubmit = () => {
    Keyboard.dismiss()
    let valid = true
    if (!inputs.email) {
      handleError('*Please provide your email', 'email')
      valid = false
    } else if (EMAIL_REG.test(inputs.email) == false) {
      handleError('*Please provide your email and try again', 'email')
      valid = false
    }
    if (valid) {
      navigation.navigate(References.LoginSecondary, {...inputs});
    }
  }


  return (
    <View style={[AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} shouldShowBack={false} />
      <View style={[AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle]}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} >
          <Text allowFontScaling={false} style={[AppStyles.AuthScreenTitle]}>
            Contractor Sign In
          </Text>

          <InputField
            title="Email"
            value={inputs.email}
            onChangeText={(val) => {
              handleOnChange(val, 'email')
            }}
            error={errors.email}
            onFocus={() => {
              handleError(null, 'email')
            }}
            placeholder="yourname@email.com"
            keyboardType='email-address'
            autoCapitalize={'none'}
            returnKeyType={'done'}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          <View style={{ marginVertical: 10 }} />
          <ContainedButton
            onPress={() => {
              onSubmit()
            }}
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
    </View>
  );

}

export default LoginPrimary;
