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
import { handleChangePassword } from '../../API/Config';
import { useSelector } from 'react-redux';
import { Keyboard } from 'react-native';
import { REGEX_PASS_1, REGEX_PASS_2, REGEX_PASS_3 } from '../../Constants/Constants';



const ResetPassword = ({ navigation, route }) => {

  const { userData } = useSelector(state => state.Index)

  const [inputs, setInputs] = useState({
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }))
  }

  const handleError = (errorMsg, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMsg }))
  }

  const setNewPassword = () => {
    let valid = true
    Keyboard.dismiss()

    if (!inputs.password) {
      handleError('*Please provide your password', 'password')
      valid = false
    } else if (inputs.password.length < 6) {
      handleError('*Password should contain at least 6 characters', 'password')
      valid = false
    } else if ((REGEX_PASS_1.test(inputs.password) && REGEX_PASS_2.test(inputs.password) && REGEX_PASS_3.test(inputs.password)) == false) {
      handleError(`*Password doesn't match the criteria of 1 uppercase, 1 lowercase & number`, 'password')
      valid = false
    }

    if (valid) {
      setIsLoading(true)
      handleChangePassword(userData?._id, inputs.password).then((res) => {
        if (res.code === 200) {
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: References.AuthenticationStack }],
            })
          }, 350);
        }
      }).catch((err) => {
        console.log(err);
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
    <View
      pointerEvents={isLoading ? 'none' : 'auto'}
      style={[AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} shouldShowBack={false} />
      <View style={[AppStyles.HorizontalStyle]}>
        <Text allowFontScaling={false} style={[AppStyles.AuthScreenTitle]}>
          Set Password
        </Text>

        <InputField
          title="New Password"
          value={inputs.password}
          onChangeText={(val) => {
            handleOnChange(val, 'password')
          }}
          error={errors.password}
          onFocus={() => {
            handleError(null, 'password')
          }}
          placeholder="New Password"
          password={isPassVisible ? false : true}
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
          onPress={setNewPassword}
          label="Save"
          loading={isLoading}
        />
      </View>
    </View>
  );

}

export default ResetPassword;
