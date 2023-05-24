import React, { useEffect, useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SafeAreaView, Keyboard } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import Colors from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { FontSize } from '../../Theme/FontSize';
import { handleResendOTP, handleVerifyOTP } from '../../API/Config';
import { setAuthToken, setUserData } from '../../Redux/Actions';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { vs } from 'react-native-size-matters';
import { dynamicSize } from '../../Helpers/Resposive';

const VerifyOTP = ({ navigation, route }) => {

  const { email } = route?.params || ''
  const [inputs, setInputs] = useState({
    code: ''
  })
  const [errors, setErrors] = useState({})
  const [timer, setTimer] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const MAX_CODE_LENGTH = 6;


  useEffect(() => {
    timerFunc()

    return () => (
      timerFunc()
    )
  }, [])

  const timerFunc = () => {
    setTimer(60);
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && (
          clearInterval(interval)
        )
        return lastTimerCount - 1;

      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => {
      clearInterval(interval)
    }
  };

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }))
  }

  const handleError = (errorMsg, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMsg }))
  }

  const verifyOTP = () => {
    let valid = true
    Keyboard.dismiss()

    if (!inputs.code) {
      handleError('*Please enter your verification code to reset your password', 'code')
      valid = false
    }

    if (valid) {
      setIsLoading(true)
      handleVerifyOTP(email, inputs.code).then(async (data) => {

        if (data?.code === 200) {
          SimpleToast.show('OTP verified successfully')

          await AsyncStorage.setItem('token', '' + data?.data?.token).then(() => {
            dispatch(setUserData(data?.data?.userData))
            dispatch(setAuthToken(data?.data?.token))
            setTimeout(() => {
              navigation.navigate(References.ResetPassword, {
                email: email,
                code: inputs.code
              });
            }, 350);
          })
        }
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setIsLoading(false)
      })
    }
  }

  const resendOTP = () => {
    timerFunc()

    handleResendOTP(email).then(async (data) => {
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setIsLoading(false)
    })
  }




  return (
    <View
      pointerEvents={isLoading ? 'none' : 'auto'}
      style={[AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation}  border={false} />
      <View style={[AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle,]}>
        <Text allowFontScaling={false} style={[AppStyles.AuthScreenTitle]}>
          Enter Verification Code
        </Text>


        <InputField
          title="Verification Code"
          value={inputs.code}
          onChangeText={(val) => {
            handleOnChange(val, 'code')
          }}
          error={errors.code}
          onFocus={() => {
            handleError(null, 'code')
          }}
          placeholder="Enter your verification code here"
          maxLength={MAX_CODE_LENGTH}
          returnKeyType={'done'}
          onSubmitEditing={() => {
            Keyboard.dismiss()
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: !!(errors?.code)? 0: dynamicSize(-16) }}>
          <Text allowFontScaling={false} style={{
            fontSize: FontSize.medium,
            fontFamily: Fonts.Light,
            color: Colors(scheme).Grey
          }}>
            {'Check your email for a verification code'}

          </Text>
          {
            timer > 0 ?
              <Text allowFontScaling={false} style={{
                fontSize: FontSize.medium,
                fontFamily: Fonts.Medium,
                color: Colors(scheme).Primary
              }}>
                {timer}
              </Text>
              :
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={resendOTP}
              >
                <Text allowFontScaling={false} style={{
                  fontSize: FontSize.medium,
                  fontFamily: Fonts.Medium,
                  color: Colors(scheme).Primary
                }}>
                  {'Resend'}

                </Text>
              </TouchableOpacity>
          }
        </View>
        <View style={{ marginVertical: dynamicSize(8) }} />
        <ContainedButton
          onPress={verifyOTP}
          label="Continue"
          loading={isLoading}
        />
      </View>
    </View>
  );

}

export default VerifyOTP;
