import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import Colors from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { Icons } from '../../Assets/Images/Index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginSecondary = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)

  const { email } = route?.params

  const onSubmit = () => {
    if (password === '') {
      SimpleToast.show('Please enter your password');
      return;
    } else if(email != 'Tester@gmail.com' || password != '12345678'){
      SimpleToast.show('Invalid Credentials')
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: References.DashboardStack }],
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
    <View style={[AppStyles.Screen, AppStyles.AuthScreens]}>
      <LogoOver navigation={navigation} shouldShowBack={false} />
      <Text style={[AppStyles.AuthScreenTitle]}>
        Contractor Sign In
      </Text>

      <KeyboardAwareScrollView>
        <View style={styles.emailTextView}>
          <Text style={styles.emailText}>{email}</Text>
        </View>
        <View style={{
          padding: 8
        }}>

          <InputField
            title="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            password={isPassVisible ? false : true}
            isRightIcon
            rightIcon={(isPassVisible) ? Icons.ShowPassword : Icons.HidePassword}
            rightIconOnPress={() => { setIsPassVisible(!isPassVisible) }}

          />
          <View style={{ marginVertical: 10 }} />
          <ContainedButton
            onPress={onSubmit}
            label="Continue"
            disabled={buttonDisabled}
            loading={loading}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate(References.ForgotPassword)} style={{ alignSelf: 'center' }}>
          <Text style={{ color: Colors(scheme).Primary, marginTop: 24, fontFamily: Fonts.Regular }}>
            Forgot Password
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>

    </View>
  );

}

export default LoginSecondary;