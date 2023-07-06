import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, useColorScheme } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';
import RangeSlider from '../../Components/Slider/Index';
import { FontSize } from '../../Theme/FontSize';
import Colors from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { Keyboard } from 'react-native';
import { dynamicSize, dynamicVerticalSize, getFontSize } from '../../Helpers/Resposive';

const SignupSecondary = ({ navigation, route }) => {

  const { email, password, firstname, lastname } = route?.params || ''
  const [inputs, setInputs] = useState({
    address: '',
    apartment: '',
    company:'',
    travel: '0',
  })
  const [errors, setErrors] = useState({
    address: null,
    apartment: null,
    travel: null,
    company:null
  })
  const [isKO, setIsKO] = useState(false)
  const addressRef = useRef()
  const unitRef = useRef()
  const companyRef = useRef()
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)


  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }))
  }

  const handleError = (errorMsg, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMsg }))
  }

  const onSubmit = () => {
    let valid = true
    Keyboard.dismiss()
    if (!!!inputs.address) {
      handleError('*Please provide valid address', 'address')
      valid = false
    } 
    if (!!!inputs.apartment) {
      handleError('*Please provide valid apartment', 'apartment')
      valid = false
    }
    if (!!!inputs.company) {
      handleError('*Please select your company', 'company')
      valid = false
    }
    if (inputs.travel === '0') {
      handleError('*Travel Radius is required to continue the sign up process', 'travel')
      valid = false
    }
    if (valid) {
      navigation.navigate(References.SignupTertiary, {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        // accountType: accountType,
        company: inputs.company,
        address: inputs.address,
        apartment: inputs.apartment,
        travel: inputs.travel
      });
    }

  }

  const renderBottom = useCallback(() => {
    return (
      <View style={[AppStyles.HorizontalStyle, { width: '100%', marginTop: dynamicSize(24), bottom: 0, flex: 1 }]}>
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
    )
  }, [scheme, onSubmit, isKO])

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setIsKO(true)
    })
    Keyboard.addListener('keyboardDidHide', () => {
      setIsKO(false)
    })
    return () => {
      Keyboard.removeAllListeners()
    }
  }, [])

  return (
    <View style={[AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} shouldShowBack={true} border={false} />
      <View style={[AppStyles.HorizontalStyle]}>

        <KeyboardAwareScrollView
          enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View>
            <Text allowFontScaling={false} style={[AppStyles.AuthScreenTitle]}>
              Where do you work?
            </Text>

            <InputField
              fieldRef={companyRef}
              title="Company Name"
              value={inputs.company}
              onChangeText={(val) => {
                handleOnChange(val, 'company')
              }}
              error={errors.company}
              onFocus={() => {
                handleError(null, 'company')
              }}
              placeholder="Construction Co"
              returnKeyType={'done'}
              onSubmitEditing={() => {
                Keyboard.dismiss()
              }}
            />

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

            <Text allowFontScaling={false} style={{ fontSize: getFontSize(13), color: Colors(scheme).Black, fontFamily: Fonts.SemiBold, fontWeight: '500', marginTop: 20 }}>
              Willing to travel
            </Text>

            <RangeSlider
              from={0}
              to={150}
              step={5}
              distance={(val) => {
                handleOnChange(`${val}`, 'travel')
                handleError(null, 'travel')
              }}
            />

            {
              (!!errors?.travel) &&
              <Text
                allowFontScaling={false}
                style={{ fontSize: FontSize.small, color: 'red', fontFamily: Fonts.Medium, marginTop: dynamicSize(8) }}>
                {`* Travel Radius is required to continue the sign up process`}
              </Text>
            }

            <View style={{
              marginVertical: dynamicVerticalSize(16)
            }}>

              {
                renderBottom()
              }

            </View>
          </View>
        </KeyboardAwareScrollView>

      </View>

    </View>
  );

}

export default SignupSecondary;
