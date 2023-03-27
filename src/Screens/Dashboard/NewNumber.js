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
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard } from 'react-native';
import { setUserData } from '../../Redux/Actions';

const NewNumber = ({ navigation }) => {

    const { userData } = useSelector(state => state.Index)

    const [inputs, setInputs] = useState({
        number: userData != null ? userData?.phoneNumber : ''
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    const scheme = useColorScheme()
    const AppStyles = GetStyles(scheme)
    const AppColors = Colors(scheme)
    const dispatch = useDispatch()

    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }))
    }

    const handleError = (errorMsg, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMsg }))
    }

    const updateNumber = () => {
        let valid = true
        Keyboard.dismiss()
        if (!inputs.number) {
            handleError('Please enter your new number', 'number')
            valid = false
        }
        if (valid) {
            setIsLoading(true)
            handleUpdateNumber(userData?._id, inputs.number).then((res) => {
                if (res.code === 200) {
                    dispatch(setUserData({
                        ...userData,
                        phoneNumber: inputs.number
                    }))
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
        <View
            pointerEvents={isLoading ? 'none' : 'auto'}
            style={[AppStyles.CommonScreenStyles, { backgroundColor: AppColors.Background }]}>
            <LogoOver navigation={navigation} shouldShowBack />
            {/* <Text style={[AppStyles.AuthScreenTitle]}>
                Contractor Sign In
            </Text> */}
            <View style={[AppStyles.HorizontalStyle, { paddingTop: 16 }]}>

                <InputField
                    title="New Phone Number"
                    value={inputs.number}
                    onChangeText={(val) => {
                        handleOnChange(val, 'number')
                    }}
                    error={errors.number}
                    onFocus={() => {
                        handleError(null, 'number')
                    }}
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
        </View>

    );

}

export default NewNumber;
