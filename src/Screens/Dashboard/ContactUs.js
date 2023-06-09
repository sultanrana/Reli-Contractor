import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Text, View, Image, Keyboard, TouchableOpacity, useColorScheme, SafeAreaView } from 'react-native';

import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import { FontSize } from '../../Theme/FontSize';
import Colors from '../../Theme/Colors';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { handleContactUs } from '../../API/Config';
import { dynamicSize, dynamicVerticalSize } from '../../Helpers/Resposive';

const ContactUs = ({ navigation }) => {

    const [inputs, setInputs] = useState({
        msg: '',
    })
    const [subject, setSubject] = useState('')
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [openSubject, setOpenSubject] = useState(false);

    const [subjectList, setSubjectList] = useState([
        { label: 'General', value: 'General' },
        { label: 'Billing', value: 'Billing' },
        { label: 'Warranty', value: 'Warranty' },
        { label: 'Request a Feature', value: 'Request a Feature' },
        { label: 'Report a Technical Issue', value: 'Report a Technical Issue' }
    ])
    const scheme = useColorScheme()
    const AppStyles = GetStyles(scheme)
    const AppColors = Colors(scheme)

    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }))
    }

    const handleError = (errorMsg, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMsg }))
    }

    const contactUs = () => {
        let valid = true
        Keyboard.dismiss()
        if (!subject) {
            handleError('*Please choose a subject', 'subject')
            valid = false
        }
        if (!inputs.msg) {
            handleError('*Please write a message', 'msg')
            valid = false
        }
        if (valid) {
            setIsLoading(true)
            handleContactUs(subject, inputs.msg).then((res) => {
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

    return (
        <View
            pointerEvents={isLoading ? 'none' : 'auto'}
            style={[AppStyles.CommonScreenStyles, { backgroundColor: AppColors.Background }]}>
            <LogoOver navigation={navigation} shouldShowBack />
            <View style={[AppStyles.HorizontalStyle, { paddingTop: 16 }]}>

                <View style={{ height: 100, justifyContent: 'flex-start', flexDirection: 'column', zIndex: 99999 }}>
                    <Text allowFontScaling={false} style={{ fontSize: FontSize.medium, color: Colors(scheme).Black, fontFamily: Fonts.SemiBold }}>{'Subject'}</Text>
                    <DropDownPicker
                        closeAfterSelecting={true}
                        open={openSubject}
                        setOpen={setOpenSubject}
                        value={subject}
                        setValue={setSubject}
                        items={subjectList}
                        setItems={setSubjectList}
                        listMode="SCROLLVIEW"
                        dropDownMaxHeight={50}
                        onChangeValue={(val) => {
                            // setSubject(val)
                            handleError(null, 'subject')
                        }}
                        // scrollViewProps={{
                        //     nestedScrollEnabled: true,
                        // }}
                        placeholder={"Select Subject"}
                        placeholderStyle={{ color: AppColors.Grey }}
                        arrowIconStyle={{
                            width: 20,
                            height: 20,
                            tintColor: AppColors.Grey,
                            alignSelf: 'center',
                        }}
                        tickIconStyle={{
                            width: 20,
                            height: 20,
                            tintColor: AppColors.Primary
                        }}
                        
                        arrowIconContainerStyle={{
                            backgroundColor: AppColors.White,
                            justifyContent: 'center',
                        }}
                        dropDownContainerStyle={{
                            backgroundColor: AppColors.White,
                            width: "100%",
                            alignSelf: 'center',
                            borderWidth: dynamicSize(1),
                            borderColor: Colors(scheme).DarkGrey,
                        }}
                        style={{
                            backgroundColor: AppColors.White,
                            width: "100%",
                            alignSelf: 'center',
                            borderWidth: dynamicSize(1),
                            borderColor: Colors(scheme).DarkGrey,
                            paddingHorizontal: dynamicSize(12),
                            elevation: 0,
                            borderRadius: dynamicSize(10),
                            height: dynamicVerticalSize(55)
                        }}
                        containerStyle={{
                            marginTop: 3,
                            zIndex: 9999
                        }}
                        textStyle={{
                            color: AppColors.Black,
                            fontSize: 14,
                        }}
                    />
                    {
                        errors.subject &&
                        <View style={{
                            margin: 4,
                        }}>
                            <Text allowFontScaling={false} style={{ fontSize: FontSize.small, color: 'red', fontFamily: Fonts.Medium }}>{errors.subject}</Text>
                        </View>
                    }
                </View>
                <InputField
                    title="Message"
                    value={inputs.msg}
                    onChangeText={(val) => {
                        handleOnChange(val, 'msg')
                    }}
                    error={errors.msg}
                    onFocus={() => {
                        handleError(null, 'msg')
                    }}
                    placeholder="Type your message..."
                    keyboardType='default'
                    multiline={true}
                    customStyle={{ height: 124 }}
                    returnKeyType={'done'}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                />
                <ContainedButton
                    onPress={contactUs}
                    label="Submit"
                    style={{ marginTop: 22 }}
                    loading={isLoading}
                />
            </View>
        </View>

    );

}

export default ContactUs;
