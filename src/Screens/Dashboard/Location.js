import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';
import { FontSize } from '../../Theme/FontSize';
import { LayoutStyles } from '../../Theme/Layout';
import Colors from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { Icons } from '../../Assets/Images/Index';
import FloatingLabelInput from '../../Components/FloatingLabelInput';
import RangeSlider from '../../Components/Slider/Index';

const Location = ({ navigation }) => {

    const [address, setAddress] = useState('');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [travel, setTravel] = useState(0);

    const scheme = useColorScheme()
    const AppStyles = GetStyles(scheme)
    const AppColors = Colors(scheme)

    const styles = StyleSheet.create({
        screenTitle: {
            fontSize: FontSize.xxxlarge,
            fontFamily: Fonts.SemiBold,
            color: AppColors.TextTitle,
            textAlign: 'center'

        },
        travel: {
            fontSize: FontSize.medium,
            fontFamily: Fonts.Regular,
            color: AppColors.TextTitle,
            marginTop: 30

        }
    })



    return (
        <View style={[AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle, { backgroundColor: AppColors.Background }]}>
            <LogoOver navigation={navigation} shouldShowBack />
            <Text style={styles.screenTitle}>{'Location'}</Text>
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: '5%' }}>
                <>
                    <FloatingLabelInput
                        value={address}
                        onChangeText={(val) => setAddress(val)}
                        placeholder="Address"
                        keyboardType='default'
                    />

                    <FloatingLabelInput
                        value={apartment}
                        onChangeText={(val) => setApartment(val)}
                        placeholder="Apartment/Unit"
                        keyboardType='default'
                    />

                    <FloatingLabelInput
                        value={city}
                        onChangeText={(val) => setCity(val)}
                        placeholder="City"
                        keyboardType='default'
                    />

                    <View style={{ paddingRight: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <FloatingLabelInput
                            value={state}
                            onChangeText={(val) => setState(val)}
                            placeholder="State"
                            keyboardType='default'
                            customStyle={{ width: '30%' }}
                        />

                        <FloatingLabelInput
                            value={zip}
                            onChangeText={(val) => setZip(val)}
                            placeholder="Zip"
                            keyboardType='default'
                            customStyle={{ width: '50%' }}
                        />
                    </View>

                    <Text style={styles.travel}>{'Wiling to travel:'}</Text>
                    <RangeSlider from={4} to={3000} />

                    <ContainedButton
                        // onPress={onSubmit}
                        label="Confirm Changes"
                        style={{marginTop:30}}
                    />
                </>
            </KeyboardAwareScrollView>
        </View >
    );

}

export default Location;
