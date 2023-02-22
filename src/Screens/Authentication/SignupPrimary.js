import React, { useEffect, useRef, useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SafeAreaView, Dimensions, Keyboard } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import Colors from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icons } from '../../Assets/Images/Index';
import { handleEmailCheck } from '../../API/Config';
import { EMAIL_REG, REGEX_PASS_1, REGEX_PASS_2, REGEX_PASS_3 } from '../../Constants/Constants';
import { FontSize } from '../../Theme/FontSize';
import DropDownPicker from 'react-native-dropdown-picker';
import { vs } from 'react-native-size-matters';
import { useSelector } from 'react-redux';


const SignupPrimary = ({ navigation }) => {

  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const [openAccountType, setOpenAccountType] = useState(false);
  const [accountTypes, setAccountTypes] = useState([{ 'label': 'Admin', 'value': 'admin_contractor' }, { 'label': 'Standard', 'value': 'standard_contractor' }])
  const [selectedAccountType, setSelectedAccountType] = useState('')

  const [opeCompany, setOpenCompany] = useState(false);
  const [pickerCmpanies, setPickerCompanies] = useState([])
  const [selectedCompany, setSelectedCompany] = useState('')

  const { companies } = useSelector(state => state.CompaniesData)


  const [inputs, setInputs] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const fNameRef = useRef()
  const lNameRef = useRef()
  const emailRef = useRef()
  const passRef = useRef()

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  useEffect(() => {
    console.log({ companies });
    if (companies && companies?.length > 0) {

      const newCompaniesArr = companies.map(({ companyName, _id }) => ({
        label: companyName,
        value: _id
      }))
      setPickerCompanies(newCompaniesArr)
    }
  }, [])

  useEffect(() => {
    if (selectedCompany != '') {
      handleError(null, 'company')
      return
    } else if (selectedAccountType != '') {
      handleError(null, 'accountType')
      return
    }

  }, [selectedAccountType, selectedCompany])

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }))
  }

  const handleError = (errorMsg, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMsg }))
  }

  const onSubmit = () => {
    let valid = true
    Keyboard.dismiss()
    if (!inputs.firstname) {
      handleError('*Please provide your first name', 'firstname')
      valid = false
    }
    if (!inputs.lastname) {
      handleError('*Please provide your last name', 'lastname')
      valid = false
    }
    if (!inputs.email) {
      handleError('*Please provide your email', 'email')
      valid = false
    } else if (EMAIL_REG.test(inputs.email) == false) {
      handleError('*Please provide your email and try again', 'email')
      valid = false
    }
    if (!inputs.password) {
      handleError('*Please provide your password', 'password')
      valid = false
    } else if (inputs.password.length < 6) {
      handleError('*Password should contain at least 6 characters', 'password')
      valid = false
    } else if ((REGEX_PASS_1.test(inputs.password) && REGEX_PASS_2.test(inputs.password) && REGEX_PASS_3.test(inputs.password)) == false) {
      handleError(`*Password doesn't match the criteria of 1 uppercase, 1 lowercase & number`, 'password')
      valid = false
    } else if (selectedAccountType == '') {
      handleError(`*Please select your account type`, 'accountType')
      valid = false
    } else if (selectedCompany == '') {
      handleError(`*Please select your company`, 'company')
      valid = false
    }
    if (valid) {
      setIsLoading(true)
      handleEmailCheck(inputs.email).then((res) => {
        if (res) {
          setTimeout(() => {
            navigation.navigate(References.SignupSecondary, { ...inputs, accountType: selectedAccountType, company: selectedCompany });
          }, 250);
        }
      }).finally(() => {
        setIsLoading(false)
      })
    }
  }

  return (
    <View style={[AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} shouldShowBack={true} />
      <View style={[AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle]}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        // keyboardShouldPersistTaps={'always'}
        >
          <>
            <Text allowFontScaling={false} style={[AppStyles.AuthScreenTitle]}>
              Sign Up
            </Text>

            <InputField
              fieldRef={fNameRef}
              title="First Name"
              value={inputs.firstname}
              onChangeText={(val) => {
                handleOnChange(val, 'firstname')
              }}
              error={errors.firstname}
              onFocus={() => {
                handleError(null, 'firstname')
              }}
              placeholder="First Name"
              keyboardType='default'
              maxLength={16}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                lNameRef.current.focus()
              }}
            />

            <InputField
              fieldRef={lNameRef}
              title="Last Name"
              value={inputs.lastname}
              onChangeText={(val) => {
                handleOnChange(val, 'lastname')
              }}
              error={errors.lastname}
              onFocus={() => {
                handleError(null, 'lastname')
              }}
              placeholder="Last Name"
              keyboardType='default'
              maxLength={16}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                emailRef.current.focus()
              }}
            />


            <InputField
              fieldRef={emailRef}
              title="Email"
              value={inputs.email}
              onChangeText={(val) => {
                handleOnChange(val, 'email')
              }}
              error={errors.email}
              onFocus={() => {
                handleError(null, 'email')
              }}
              placeholder="yourname@email.com"
              keyboardType='email-address'
              autoCapitalize={'none'}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                passRef.current.focus()
              }}
            />

            <InputField
              fieldRef={passRef}
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
              returnKeyType={'done'}
              onSubmitEditing={() => {
                Keyboard.dismiss()
              }}
            />

            <View style={{ height: 100, justifyContent: 'flex-start', flexDirection: 'column', zIndex: 1, marginTop: 3 }}>
              <Text allowFontScaling={false} style={{ fontSize: FontSize.medium, color: Colors(scheme).Black, fontFamily: Fonts.SemiBold }}>{'Company'}</Text>
              <DropDownPicker
                closeAfterSelecting={true}
                open={opeCompany}
                setOpen={setOpenCompany}
                value={selectedCompany}
                setValue={setSelectedCompany}
                items={pickerCmpanies}
                setItems={setPickerCompanies}
                listMode="SCROLLVIEW"
                dropDownMaxHeight={50}
                onChangeValue={(val) => {
                  handleError(null, 'subject')
                }}
                placeholder={"Select Company"}
                placeholderStyle={{ color: AppColors.Grey }}
                arrowIconStyle={{
                  width: 20,
                  height: 20,
                  tintColor: AppColors.Grey,
                  alignSelf: 'center',
                }}
                tickIconStyle={{
                  width: 20,
                  height: 20,
                  tintColor: AppColors.Primary
                }}
                dropDownContainerStyle={{
                  backgroundColor: AppColors.White,
                  // borderColor: valueRequired ? colors.Reddish : "#4B5563",
                  width: "100%",
                  alignSelf: 'center'
                }}
                arrowIconContainerStyle={{
                  backgroundColor: AppColors.White,
                  justifyContent: 'center',
                }}
                style={{
                  // borderColor: valueRequired ? colors.Reddish : colors.grayish,
                  backgroundColor: AppColors.White,
                  width: "100%",
                  minHeight: 40,
                  height: 56,
                  alignSelf: 'center',
                  borderRadius: 8,
                  borderWidth: 0.75
                }}
                containerStyle={{
                  marginTop: 4,
                }}
                textStyle={{
                  color: AppColors.Black,
                  fontSize: 14,
                }}
              />

              {
                errors.company &&
                <View style={{
                  margin: 4,
                }}>
                  <Text allowFontScaling={false} style={{ fontSize: FontSize.small, color: 'red', fontFamily: Fonts.Medium }}>{errors.company}</Text>
                </View>
              }

            </View>

            <View style={{ height: 100, justifyContent: 'flex-start', flexDirection: 'column', zIndex: openAccountType ? 2 : 0, marginTop: 3 }}>
              <Text allowFontScaling={false} style={{ fontSize: FontSize.medium, color: Colors(scheme).Black, fontFamily: Fonts.SemiBold }}>{'Account Type'}</Text>
              <DropDownPicker
                closeAfterSelecting={true}
                open={openAccountType}
                setOpen={setOpenAccountType}
                value={selectedAccountType}
                setValue={setSelectedAccountType}
                items={accountTypes}
                setItems={setAccountTypes}
                listMode="SCROLLVIEW"
                dropDownMaxHeight={50}
                onChangeValue={(val) => {
                  handleError(null, 'subject')
                }}
                placeholder={"Select Account Type"}
                placeholderStyle={{ color: AppColors.Grey }}
                arrowIconStyle={{
                  width: 20,
                  height: 20,
                  tintColor: AppColors.Grey,
                  alignSelf: 'center',
                }}
                tickIconStyle={{
                  width: 20,
                  height: 20,
                  tintColor: AppColors.Primary
                }}
                dropDownContainerStyle={{
                  backgroundColor: AppColors.White,
                  // borderColor: valueRequired ? colors.Reddish : "#4B5563",
                  width: "100%",
                  alignSelf: 'center',
                }}
                arrowIconContainerStyle={{
                  backgroundColor: AppColors.White,
                  justifyContent: 'center',
                }}
                style={{
                  // borderColor: valueRequired ? colors.Reddish : colors.grayish,
                  backgroundColor: AppColors.White,
                  width: "100%",
                  minHeight: 40,
                  height: 56,
                  alignSelf: 'center',
                  borderRadius: 8,
                  borderWidth: 0.75,
                }}
                containerStyle={{
                  marginTop: 4,
                }}
                textStyle={{
                  color: AppColors.Black,
                  fontSize: 14,
                }}
              />

              {
                errors.accountType &&
                <View style={{
                  margin: 4,
                }}>
                  <Text allowFontScaling={false} style={{ fontSize: FontSize.small, color: 'red', fontFamily: Fonts.Medium }}>{errors.accountType}</Text>
                </View>
              }

            </View>



            <View style={{ width: '100%', marginTop: vs(60), alignSelf: 'center' }}>

              <ContainedButton
                onPress={onSubmit}
                label="Continue"
                loading={isLoading}
              />

              <TouchableOpacity onPress={() => navigation.navigate(References.LoginPrimary)} style={{ alignSelf: 'center' }}>
                <Text allowFontScaling={false} style={{ marginTop: 30, color: Colors(scheme).Text, fontFamily: Fonts.Light }}>
                  Already have an account?
                  <Text allowFontScaling={false} style={{ color: Colors(scheme).Primary, fontFamily: Fonts.Medium }}> Sign In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );

}

export default SignupPrimary;
