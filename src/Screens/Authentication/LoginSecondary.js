import React, { useState } from 'react';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SafeAreaView } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import Colors from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { Icons } from '../../Assets/Images/Index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { handleLogin } from '../../API/Config';
import { setAuthToken, setUserData } from '../../Redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keyboard } from 'react-native';
import { useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { dynamicSize, dynamicVerticalSize, getFontSize } from '../../Helpers/Resposive';

const LoginSecondary = ({ navigation, route }) => {

  const { fcmToken } = useSelector(state => state.Index)
  const [inputs, setInputs] = useState({
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const dispatch = useDispatch()
  const passRef = useRef()
  const isFocused = useIsFocused()

  const { email } = route?.params || ''

  useEffect(() => {
    if (isFocused) {
      // passRef?.current?.focus()
    }
  }, [])

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }))
  }

  const handleError = (errorMsg, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMsg }))
  }

  const onSubmit = () => {
    let valid = true;
    if (!inputs.password) {
      handleError('*Please provide your password', 'password')
      valid = false
    }
    if (valid) {
      setIsLoading(true)
      handleLogin(email, inputs.password, fcmToken).then(async (data) => {
        if (data) {
          await AsyncStorage.setItem('token', '' + data?.token).then(() => {
            dispatch(setUserData(data?.userData))
            dispatch(setAuthToken(data?.token))
            navigation.reset({
              index: 0,
              routes: [{ name: References.DashboardStack }],
            })
          })
        }
      }).finally(() => {
        setIsLoading(false)
      })
    }

  }



  const styles = StyleSheet.create({
    emailTextView: {
      height: dynamicVerticalSize(53),
      minWidth: dynamicSize(108),
      borderRadius: dynamicSize(25),
      backgroundColor: '#FDECDF',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: dynamicVerticalSize(24),
      alignSelf: 'center',
      padding: 8,
      paddingHorizontal: 16,


    },
    emailText: {
      fontWeight: '400',
      textAlign: 'center',
      fontSize: getFontSize(18),
      color: Colors(scheme).Primary,
    },
  });

  return (
    <View pointerEvents={isLoading ? 'none' : 'auto'} style={[AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} shouldShowBack={true} border={false}/>
      <View style={[AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle]}>

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
        >
          <Text allowFontScaling={false} style={[AppStyles.AuthScreenTitle]}>
            Contractor Sign In
          </Text>
          {email ?
            <View style={styles.emailTextView}>
              <Text allowFontScaling={false} style={styles.emailText}>{email}</Text>
            </View>
            :
            null
          }

          <InputField
            fieldRef={passRef}
            title="Password"
            value={inputs.password}
            onChangeText={(val) => {
              handleOnChange(val, 'password')
            }}
            error={errors.password}
            onFocus={() => {
              handleError(null, 'password')
            }}
            placeholder="Password"
            password={isPassVisible ? false : true}
            isRightIcon
            rightIcon={(isPassVisible) ? Icons.ShowPassword : Icons.HidePassword}
            rightIconOnPress={() => { setIsPassVisible(!isPassVisible) }}
            autoCapitalize={'none'}
            returnKeyType={'done'}
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
          />
          <ContainedButton
            onPress={onSubmit}
            label="Continue"
            loading={isLoading}
          />


          <TouchableOpacity onPress={() => navigation.navigate(References.ForgotPassword)} style={{ alignSelf: 'center' }}>
            <Text allowFontScaling={false} style={{ color: Colors(scheme).Primary, marginTop: 24, fontFamily: Fonts.Regular, fontSize: getFontSize(16), fontWeight: '500' }}>
              Forgot Password
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );

}

export default LoginSecondary;
