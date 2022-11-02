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
    } else if (email != 't1@tepia.co' || password != '12345678') {
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
    <SafeAreaView style={[AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} shouldShowBack={true} />
      <View style={[AppStyles.CommonScreenStyles,AppStyles.HorizontalStyle]}>

        <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
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


          <TouchableOpacity onPress={() => navigation.navigate(References.ForgotPassword)} style={{ alignSelf: 'center' }}>
            <Text allowFontScaling={false} style={{ color: Colors(scheme).Primary, marginTop: 24, fontFamily: Fonts.Regular }}>
              Forgot Password
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );

}

export default LoginSecondary;
