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

const NewPassword = ({ navigation }) => {

    const [password, setPassword] = useState('');
    const scheme = useColorScheme()
    const AppStyles = GetStyles(scheme)
    const AppColors = Colors(scheme)


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
        <SafeAreaView style={[AppStyles.CommonScreenStyles, { backgroundColor: AppColors.Background }]}>
            <LogoOver navigation={navigation} shouldShowBack />
            {/* <Text style={[AppStyles.AuthScreenTitle]}>
                Contractor Sign In
            </Text> */}
            <View style={[AppStyles.HorizontalStyle, { paddingTop: 16 }]}>

                <InputField
                    title="New Password"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="New Password"
                    keyboardType='default'
                />

                <Text style={styles.Hint}>{'Requirements:'}</Text>

                <View style={{ marginTop: 16 }}>
                    <View style={styles.requirementSection}>
                        <View style={styles.requirementNumber}></View>
                        <Text style={styles.requirementTitle}>{'Uppercase Letters'}</Text>
                    </View>
                    <View style={styles.requirementSection}>
                        <View style={styles.requirementNumber}></View>
                        <Text style={styles.requirementTitle}>{'Lowercase Letters'}</Text>
                    </View>
                    <View style={styles.requirementSection}>
                        <View style={styles.requirementNumber}></View>
                        <Text style={styles.requirementTitle}>{'Symbols'}</Text>
                    </View>
                </View>
                <ContainedButton
                    // onPress={onSubmit}
                    label="Confirm Changes"
                    style={{ marginTop: 22 }}
                />
            </View>
        </SafeAreaView>

    );

}

export default NewPassword;
