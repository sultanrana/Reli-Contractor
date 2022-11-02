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

const ResetPassword = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)

  const { email, code } = route?.params

  const onSubmit = () => {
    if (password === '') {
      SimpleToast.show('Please enter your password');
      return;
    } else {
      //Login API here
      navigation.reset({
        index: 0,
        routes: [{ name: References.AuthenticationStack }],
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

        />
        <View style={{ marginVertical: 10 }} />
        <ContainedButton
          onPress={onSubmit}
          label="Save"
          disabled={buttonDisabled}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );

}

export default ResetPassword;
