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

const AccountDetails = ({ navigation }) => {

    const { userData } = useSelector(state => state.Index)

    const EMAIL_REG = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const fNameRef = useRef()
    const lNameRef = useRef()
    const emailRef = useRef()
    const scheme = useColorScheme()
    const AppStyles = GetStyles(scheme)
    const AppColors = Colors(scheme)


    const updateUserDetails = () => {
        if (firstName === '') {
            SimpleToast.show(`First Name cann't be empty`);
            return;
        }
        if (lastName === '') {
            SimpleToast.show(`Last Name cann't be empty`);
            return;
        }
        if (email === '') {
            SimpleToast.show(`Email cann't be empty`);
            return;
        }
        if (EMAIL_REG.test(email) == false) {
            SimpleToast.show('Invalid email')
            return;
        } else {
            setIsLoading(true)
            handleUpdateUserDetails(userData?._id, firstName, lastName, email).then((res) => {
                if (res.code === 200) {
                    SimpleToast.show('Details updated successfully')
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
        <SafeAreaView
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
                        value={firstName}
                        onChangeText={(val) => setFirstName(val)}
                        placeholder="First Name"
                        keyboardType='default'
                        returnKeyType={'next'}
                        fieldRef={fNameRef}
                        onSubmitEditing={() => {
                            lNameRef?.current?.focus()
                        }}
                    />
                    <View style={{ marginVertical: 8 }} />
                    <InputField
                        title="Last Name"
                        value={lastName}
                        onChangeText={(val) => setLastName(val)}
                        placeholder="Last Name"
                        keyboardType='default'
                        returnKeyType={'next'}
                        fieldRef={lNameRef}
                        onSubmitEditing={() => {
                            emailRef?.current?.focus()
                        }}
                    />
                    <View style={{ marginVertical: 8 }} />
                    <InputField
                        title="Email"
                        value={email}
                        onChangeText={setEmail}
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
        </SafeAreaView>

    );

}

export default AccountDetails;
