import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SafeAreaView } from 'react-native';
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

const SignupSecondary = ({ navigation, route }) => {

  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [travel, setTravel] = useState(0.2);

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const { email, password, firstname, lastname } = route?.params

  const onSubmit = () => {
    navigation.navigate(References.SignupTertiary, {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      address: address,
      apartment: apartment,
      travel: travel
    });
  }

  return (
    <SafeAreaView style={[AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} shouldShowBack={true} />
      <View style={[AppStyles.HorizontalStyle]}>

        <KeyboardAwareScrollView contentContainerStyle={{height:'100%'}} showsVerticalScrollIndicator={false} >
          <>
            <Text style={[AppStyles.AuthScreenTitle]}>
              Where do you work?
            </Text>

            <InputField
              title="Address"
              value={address}
              onChangeText={setAddress}
              placeholder="Address"
            />


            <View style={{ marginVertical: 8 }} />

            <InputField
              title="Apartment / Unit"
              value={apartment}
              onChangeText={setApartment}
              placeholder="Apartment"
            />

            <View style={{ marginVertical: 8 }} />

            <Text style={{ textAlign: 'left', width: '90%', fontFamily: Fonts.Regular, color: AppColors.BlackGreyish }}>
              Wiling to travel
            </Text>

            <View style={{ marginVertical: 4 }} />
            <RangeSlider from={4} to={3000} />
            <View style={{ marginVertical: 16 }} />


          </>

          <View style={{ width: '100%', paddingHorizontal: 12, position: 'absolute', bottom: '15%', alignSelf: 'center' }}>
            <ContainedButton
              onPress={onSubmit}
              label="Continue"
            />

            <TouchableOpacity onPress={() => navigation.navigate(References.LoginPrimary)} style={{ alignSelf: 'center' }}>
              <Text style={{ marginTop: 30, color: Colors(scheme).Text, fontFamily: Fonts.Light }}>
                Already have an account?
                <Text style={{ color: Colors(scheme).Primary, fontFamily: Fonts.Medium }}> Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>

      </View>

    </SafeAreaView>
  );

}

export default SignupSecondary;
