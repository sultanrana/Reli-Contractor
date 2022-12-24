import React, { useRef, useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SafeAreaView, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';
import RangeSlider from '../../Components/Slider/Index';
import { FontSize } from '../../Theme/FontSize';
import { LayoutStyles } from '../../Theme/Layout';
import Colors from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { Keyboard } from 'react-native';
import { showMessage } from 'react-native-flash-message';

const SignupSecondary = ({ navigation, route }) => {

  const { email, password, firstname, lastname } = route?.params || ''
  const [inputs, setInputs] = useState({
    address: '',
    apartment: '',
    travel: '0',
  })
  const [errors, setErrors] = useState({})
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [travel, setTravel] = useState(0);
  const addressRef = useRef()
  const unitRef = useRef()
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)


  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }))
  }

  const handleError = (errorMsg, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMsg }))
  }
  const onSubmit = () => {
    let valid = true
    Keyboard.dismiss()
    if (!inputs.address) {
      handleError('*Please provide valid address', 'address')
      valid = false
    }
    if (!inputs.apartment) {
      handleError('*Please provide valid apartment', 'apartment')
      valid = false
    }
    if (inputs.travel === '0') {
      showMessage({
        message: '*Please choose a distance',
        type: 'danger',
      })
      valid = false
    }
    if (valid) {
      navigation.navigate(References.SignupTertiary, {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        address: inputs.address,
        apartment: inputs.apartment,
        travel: inputs.travel
      });
    }

  }

  return (
    <View style={[AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} shouldShowBack={true} />
      <View style={[AppStyles.HorizontalStyle]}>

        <KeyboardAwareScrollView
          enableOnAndroid={true}
          // extraHeight={130} extraScrollHeight={130}
          // contentContainerStyle={{ paddingBottom: 10, }}
          showsVerticalScrollIndicator={false} >
          <>
            <Text allowFontScaling={false} style={[AppStyles.AuthScreenTitle]}>
              Where do you work?
            </Text>

            <InputField
              fieldRef={addressRef}
              title="Address"
              value={inputs.address}
              onChangeText={(val) => {
                handleOnChange(val, 'address')
              }}
              error={errors.address}
              onFocus={() => {
                handleError(null, 'address')
              }}
              placeholder="Address"
              returnKeyType={'next'}
              onSubmitEditing={() => {
                unitRef.current.focus()
              }}
            />

            <InputField
              fieldRef={unitRef}
              title="Apartment / Unit"
              value={inputs.apartment}
              onChangeText={(val) => {
                handleOnChange(val, 'apartment')
              }}
              error={errors.apartment}
              onFocus={() => {
                handleError(null, 'apartment')
              }}
              placeholder="Apartment"
              returnKeyType={'done'}
              onSubmitEditing={() => {
                Keyboard.dismiss()
              }}
            />

            <Text allowFontScaling={false} style={{ textAlign: 'left', width: '100%', fontFamily: Fonts.Regular, color: AppColors.BlackGreyish, marginTop:20 }}>
              Wiling to travel
            </Text>

            <RangeSlider
              from={0}
              to={150}
              step={5}
              distance={(val) => {
                handleOnChange(JSON.stringify(val), 'travel')
              }}
            />

          </>

        </KeyboardAwareScrollView>
      </View>
      <View style={[AppStyles.HorizontalStyle, { width: '100%', position: 'absolute', bottom: '4%', alignSelf: 'center' }]}>
        <ContainedButton
          onPress={onSubmit}
          label="Continue"
        />

        <TouchableOpacity onPress={() => navigation.navigate(References.LoginPrimary)} style={{ alignSelf: 'center' }}>
          <Text allowFontScaling={false} style={{ marginTop: 30, color: Colors(scheme).Text, fontFamily: Fonts.Light }}>
            Already have an account?
            <Text allowFontScaling={false} style={{ color: Colors(scheme).Primary, fontFamily: Fonts.Medium }}> Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

}

export default SignupSecondary;
