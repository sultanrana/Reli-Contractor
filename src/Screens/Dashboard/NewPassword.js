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
import { handleChangePassword } from '../../API/Config';
import { Keyboard } from 'react-native';
import { useSelector } from 'react-redux';

const NewPassword = ({ navigation }) => {

    const { userData } = useSelector(state => state.Index)

    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scheme = useColorScheme()
    const AppStyles = GetStyles(scheme)
    const AppColors = Colors(scheme)

    const changePassword = () => {
        if (password === '') {
            SimpleToast.show('Please enter your new password')
            return;
        }
        if (password.length < 6) {
            SimpleToast.show('Password should be at least 6 characters');
            return;
        } else {
            setIsLoading(true)
            handleChangePassword(userData?._id, password).then((res) => {
                if (res.code === 200) {
                    SimpleToast.show('Password changed successfully')
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


    const styles = StyleSheet.create({
        Hint: {
            fontSize: FontSize.medium,
            fontFamily: Fonts.Regular,
            color: AppColors.TextTitle,
            marginTop: 22
        },
        requirementSection: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 8
        },
        requirementNumber: {
            height: 16,
            width: 16,
            borderRadius: 16,
            backgroundColor: AppColors.Primary
        },
        requirementTitle: {
            fontSize: FontSize.medium,
            fontFamily: Fonts.Regular,
            color: AppColors.TextTitle,
            marginHorizontal: 10
        },
    })
    return (
        <SafeAreaView
            pointerEvents={isLoading ? 'none' : 'auto'}
            style={[AppStyles.CommonScreenStyles, { backgroundColor: AppColors.Background }]}>
            <LogoOver navigation={navigation} shouldShowBack />
            {/* <Text allowFontScaling={false} style={[AppStyles.AuthScreenTitle]}>
                Contractor Sign In
            </Text> */}
            <View style={[AppStyles.HorizontalStyle, { paddingTop: 16 }]}>

                <InputField
                    title="New Password"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="New Password"
                    keyboardType='default'
                    password={true}
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                />

                <Text allowFontScaling={false} style={styles.Hint}>{'Requirements:'}</Text>

                <View style={{ marginTop: 16 }}>
                    <View style={styles.requirementSection}>
                        <View style={styles.requirementNumber}></View>
                        <Text allowFontScaling={false} style={styles.requirementTitle}>{'Uppercase Letters'}</Text>
                    </View>
                    <View style={styles.requirementSection}>
                        <View style={styles.requirementNumber}></View>
                        <Text allowFontScaling={false} style={styles.requirementTitle}>{'Lowercase Letters'}</Text>
                    </View>
                    <View style={styles.requirementSection}>
                        <View style={styles.requirementNumber}></View>
                        <Text allowFontScaling={false} style={styles.requirementTitle}>{'Symbols'}</Text>
                    </View>
                </View>
                <ContainedButton
                    onPress={changePassword}
                    label="Confirm Changes"
                    style={{ marginTop: 22 }}
                    loading={isLoading}
                />
            </View>
        </SafeAreaView>

    );

}

export default NewPassword;
