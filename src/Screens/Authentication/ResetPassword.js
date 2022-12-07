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

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/

const ResetPassword = ({ navigation, route }) => {

  const { userData } = useSelector(state => state.Index)

  const [password, setPassword] = useState('');
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)


  const setNewPassword = () => {
    if (password === '') {
      SimpleToast.show('Please enter your new password')
      return;
    } else if (PASSWORD_REGEX.test(password) == false) {
      SimpleToast.show('*Please check your password\nPassword should contain minimum 6 characters, 1 UPPERCASE, 1 lowercase, and 1 number')
      return;
    } else if (password.length < 6) {
      SimpleToast.show('Password should be at least 6 characters');
      return
    } else {
      setIsLoading(true)
      handleChangePassword(userData?._id, password).then((res) => {
        if (res.code === 200) {
          SimpleToast.show('Password changed successfully')
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
    <SafeAreaView
      pointerEvents={isLoading ? 'none' : 'auto'}
      style={[AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} shouldShowBack={false} />
      <View style={[AppStyles.HorizontalStyle]}>
        <Text allowFontScaling={false} style={[AppStyles.AuthScreenTitle]}>
          Set Password
        </Text>

        <InputField
          title="New Password"
          value={password}
          onChangeText={setPassword}
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
    </SafeAreaView>
  );

}

export default ResetPassword;
