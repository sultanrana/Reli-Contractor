import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

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
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keyboard } from 'react-native';

const LoginSecondary = ({ navigation, route }) => {

  const [inputs, setInputs] = useState({
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const dispatch = useDispatch()

  const { email } = route?.params || ''

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
      handleLogin(email, inputs.password).then(async (data) => {
        if (data) {
          await AsyncStorage.setItem('token', '' + data?.token).then(() => {
            dispatch(setUserData(data.userData))
            dispatch(setAuthToken(data.token))
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
      height: 40,
      borderRadius: 50,
      backgroundColor: '#FDECDF',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.5,
      marginBottom: 20,
      alignSelf: 'center',
      padding: 8,
      paddingHorizontal: 16,


    },
    emailText: {
      textAlign: 'center',
      color: Colors(scheme).Primary,
      fontFamily: Fonts.SemiBold,
      fontSize: 14,
    },
  });

  return (
    <View pointerEvents={isLoading ? 'none' : 'auto'} style={[AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} shouldShowBack={true} />
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
          <View style={{ marginVertical: 10 }} />
          <ContainedButton
            onPress={onSubmit}
            label="Continue"
            loading={isLoading}
          />


          <TouchableOpacity onPress={() => navigation.navigate(References.ForgotPassword)} style={{ alignSelf: 'center' }}>
            <Text allowFontScaling={false} style={{ color: Colors(scheme).Primary, marginTop: 24, fontFamily: Fonts.Regular }}>
              Forgot Password
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );

}

export default LoginSecondary;
