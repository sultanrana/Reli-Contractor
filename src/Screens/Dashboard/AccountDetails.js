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

const AccountDetails = ({ navigation }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const fNameRef = useRef()
    const lNameRef = useRef()
    const emailRef = useRef()
    const scheme = useColorScheme()
    const AppStyles = GetStyles(scheme)
    const AppColors = Colors(scheme)

    const onSubmit = () => {
        // if (email === '') {
        //   SimpleToast.show('Email cannot be empty');
        //   return;
        // } else {
        navigation.navigate(References.LoginSecondary, {
            email: email
        });
        // }
    }

    return (
        <SafeAreaView style={[AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle, { backgroundColor: AppColors.Background }]}>
            <LogoOver navigation={navigation} shouldShowBack />
            {/* <Text style={[AppStyles.AuthScreenTitle]}>
                Contractor Sign In
            </Text> */}
            <View style={[AppStyles.HorizontalStyle, { paddingTop: 16 }]}>
                <KeyboardAwareScrollView>

                    <InputField
                        title="First Name"
                        value={firstName}
                        onChangeText={(val) => setFirstName(val)}
                        placeholder="First Name"
                        keyboardType='default'
                        ref={fNameRef}
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
                        ref={lNameRef}
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
                        ref={emailRef}
                        onSubmitEditing={() => {
                            Keyboard.dismiss()
                        }}
                    />
                    <ContainedButton
                        // onPress={onSubmit}
                        label="Confirm Changes"
                        style={{ marginTop: 22 }}
                    />
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>

    );

}

export default AccountDetails;
