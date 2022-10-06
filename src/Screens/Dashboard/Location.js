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

import { Slider } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Location = ({ navigation }) => {

    const [address, setAddress] = useState('');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [travel, setTravel] = useState('');
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const scheme = useColorScheme()



    const styles = StyleSheet.create({
        header: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    const onSubmit = () => {
        if (step === 1) {
            if (address === '') {
                SimpleToast.show('Address cannot be empty');
                return;
            }
            if (apartment === '') {
                SimpleToast.show('Apartment cannot be empty');
                return;
            }
            if (city === '') {
                SimpleToast.show('City cannot be empty');
                return;
            }
            if (state === '') {
                SimpleToast.show('State cannot be empty');
                return;
            } if (zip === '') {
                SimpleToast.show('Zip cannot be empty');
                return;
            }
        }
        setLoading(false);
        setButtonDisabled(false);
    };



    const renderTitle = () => {
        if (step === 1) {
            return 'Sign Up';
        } else if (step === 2) {
            return 'Where do you work';
        } else if (step === 3) {
            return 'What services can you offer?';
        }
    };

    const onBackPress = () => {
        if (step === 1) {
            navigation.goBack();
        } else {
            setStep(step - 1);
        }
    };

    return (

        <View style={[{ paddingTop: 40, backgroundColor: Colors(scheme).Background, width: '100%', height: '100%', alignItems: 'center' }]}>
            <View style={styles.header}>
                <LogoOver navigation={navigation} shouldShowBack />
            </View>
            <KeyboardAwareScrollView>
                <>
                    <Text style={[{
                        margin: 24,
                        fontSize: FontSize.xlarge + 4,
                        fontFamily: Fonts.SemiBold,
                        color: Colors(scheme).TextTitle,
                        textAlign: 'center'
                    }]}>
                        {renderTitle()}
                    </Text>

                </>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default Location;

