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
import { handleUpdateNumber } from '../../API/Config';
import { useSelector } from 'react-redux';
import { Keyboard } from 'react-native';

const NewNumber = ({ navigation }) => {

    const { userData } = useSelector(state => state.Index)

    const [number, setNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const scheme = useColorScheme()
    const AppStyles = GetStyles(scheme)
    const AppColors = Colors(scheme)

    const updateNumber = () => {
        if (number === '') {
            SimpleToast.show('Please enter your new number')
            return;
        } else {
            setIsLoading(true)
            handleUpdateNumber(userData?._id, number).then((res) => {
                if (res.code === 200) {
                    SimpleToast.show('Phone Number updated successfully')
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

                <InputField
                    title="New Phone Number"
                    value={number}
                    onChangeText={setNumber}
                    placeholder="New Phone Number"
                    keyboardType='numeric'
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                />
                <ContainedButton
                    onPress={updateNumber}
                    label="Confirm Changes"
                    style={{ marginTop: 22 }}
                    loading={isLoading}
                />
            </View>
        </SafeAreaView>

    );

}

export default NewNumber;
