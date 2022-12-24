import React, { useRef, useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SafeAreaView, Keyboard } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import { FontSize } from '../../Theme/FontSize';
import { LayoutStyles } from '../../Theme/Layout';
import Colors from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { handleUpdateUserDetails } from '../../API/Config';
import { useSelector } from 'react-redux';
import { EMAIL_REG } from '../../Constants/Constants';

const AccountDetails = ({ navigation }) => {

    const { userData } = useSelector(state => state.Index)
    const [inputs, setInputs] = useState({
        firstname: '',
        lastname: '',
        email: '',
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const fNameRef = useRef()
    const lNameRef = useRef()
    const emailRef = useRef()
    const scheme = useColorScheme()
    const AppStyles = GetStyles(scheme)
    const AppColors = Colors(scheme)

    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }))
    }

    const handleError = (errorMsg, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMsg }))
    }

    const updateUserDetails = () => {
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

        if (valid) {
            setIsLoading(true)
            handleUpdateUserDetails(userData?._id, inputs.firstname, inputs.lastname, inputs.email).then((res) => {
                if (res.code === 200) {
                    setTimeout(() => {
                        navigation.pop()
                    }, 250);
                }
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setIsLoading(false)
            })

        }
    }

    return (
        <View
            pointerEvents={isLoading ? 'none' : 'auto'}
            style={[AppStyles.CommonScreenStyles, { backgroundColor: AppColors.Background }]}>
            <LogoOver navigation={navigation} shouldShowBack />
            {/* <Text style={[AppStyles.AuthScreenTitle]}>
                Contractor Sign In
            </Text> */}
            <View style={[AppStyles.HorizontalStyle, { paddingTop: 16 }]}>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    showsVerticalScrollIndicator={false}>

                    <InputField
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
                        returnKeyType={'next'}
                        fieldRef={fNameRef}
                        onSubmitEditing={() => {
                            lNameRef?.current?.focus()
                        }}
                    />
                    <InputField
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
                        returnKeyType={'next'}
                        fieldRef={lNameRef}
                        onSubmitEditing={() => {
                            emailRef?.current?.focus()
                        }}
                    />
                    <InputField
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
                        returnKeyType={'done'}
                        fieldRef={emailRef}
                        onSubmitEditing={() => {
                            Keyboard.dismiss()
                        }}
                    />
                    <ContainedButton
                        onPress={updateUserDetails}
                        label="Confirm Changes"
                        style={{ marginTop: 22 }}
                        loading={isLoading}
                    />
                </KeyboardAwareScrollView>
            </View>
        </View>

    );

}

export default AccountDetails;
