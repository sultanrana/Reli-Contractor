import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import { FontSize } from '../../Theme/FontSize';
import { LayoutStyles } from '../../Theme/Layout';
import Colors from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';

const Email = ({ navigation }) => {

    const [email, setEmail] = useState('');
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
        <View style={[AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle, { backgroundColor: AppColors.Background }]}>
            <LogoOver navigation={navigation} shouldShowBack />
            {/* <Text style={[AppStyles.AuthScreenTitle]}>
                Contractor Sign In
            </Text> */}

            <InputField
                title="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="yourname@email.com"
                keyboardType='email-address'
            />
            <ContainedButton
                // onPress={onSubmit}
                label="Confirm Changes"
                style={{ marginTop: 22 }}
            />

        </View>

    );

}

export default Email;
