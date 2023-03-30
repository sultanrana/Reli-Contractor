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
import { REGEX_PASS_1, REGEX_PASS_2, REGEX_PASS_3 } from '../../Constants/Constants';

const NewPassword = ({ navigation }) => {

    const { userData, token } = useSelector(state => state.Index)

    const [inputs, setInputs] = useState({
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const scheme = useColorScheme()
    const AppStyles = GetStyles(scheme)
    const AppColors = Colors(scheme)

    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }))
    }

    const handleError = (errorMsg, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMsg }))
    }

    const changePassword = () => {

        let valid = true
        Keyboard.dismiss()

        if (!inputs.password) {
            handleError('*Please provide your password', 'password')
            valid = false
        } else if (inputs.password.length < 6) {
            handleError('*Password should contain at least 6 characters', 'password')
            valid = false
        } else if ((REGEX_PASS_1.test(inputs.password) && REGEX_PASS_2.test(inputs.password) && REGEX_PASS_3.test(inputs.password)) == false) {
            handleError(`*Password doesn't match the criteria of 1 uppercase, 1 lowercase & number`, 'password')
            valid = false
        }
        if (valid) {
            setIsLoading(true)
            handleChangePassword(userData?._id, inputs.password).then((res) => {
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


    const styles = StyleSheet.create({
        Hint: {
            fontSize: FontSize.medium,
            fontFamily: Fonts.Regular,
            color: AppColors.TextTitle,
            marginTop: 15
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
        <View
            pointerEvents={isLoading ? 'none' : 'auto'}
            style={[AppStyles.CommonScreenStyles, { backgroundColor: AppColors.Background }]}>
            <LogoOver navigation={navigation} shouldShowBack />
            {/* <Text allowFontScaling={false} style={[AppStyles.AuthScreenTitle]}>
                Contractor Sign In
            </Text> */}
            <View style={[AppStyles.HorizontalStyle, { paddingTop: 16 }]}>

                <InputField
                    title="New Password"
                    value={inputs.password}
                    onChangeText={(val) => {
                        handleOnChange(val, 'password')
                    }}
                    error={errors.password}
                    onFocus={() => {
                        handleError(null, 'password')
                    }}
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
                        <Text allowFontScaling={false} style={styles.requirementTitle}>{'Numbers'}</Text>
                    </View>
                </View>
                <ContainedButton
                    onPress={changePassword}
                    label="Confirm Changes"
                    style={{ marginTop: 22 }}
                    loading={isLoading}
                />
            </View>
        </View>

    );

}

export default NewPassword;
