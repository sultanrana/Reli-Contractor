import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SafeAreaView } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import { FontSize } from '../../Theme/FontSize';
import { LayoutStyles } from '../../Theme/Layout';
import Colors from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';

const NewNumber = ({ navigation }) => {

    const [number, setNumber] = useState('');
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
            <View style={[AppStyles.HorizontalStyle,{paddingTop:16}]}>

                <InputField
                    title="New Phone Number"
                    value={number}
                    onChangeText={setNumber}
                    placeholder="New Phone Number"
                    keyboardType='numeric'
                />
                <ContainedButton
                    // onPress={onSubmit}
                    label="Confirm Changes"
                    style={{ marginTop: 22 }}
                />
            </View>
        </SafeAreaView>

    );

}

export default NewNumber;
