import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import DropDownPicker from 'react-native-dropdown-picker';
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

const ContactUs = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [openSubject, setOpenSubject] = useState(false);
    const [subject, setSubject] = useState(false);
    const [subjectList, setSubjectList] = useState([
        { label: 'Subject 1', value: 'Subject 1' },
        { label: 'Subject 2', value: 'Subject 2' }
    ])
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
        <SafeAreaView style={[AppStyles.CommonScreenStyles, { backgroundColor: AppColors.Background }]}>
            <LogoOver navigation={navigation} shouldShowBack />
            <View style={[AppStyles.HorizontalStyle,{paddingTop:16}]}>
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
                    dropDownContainerStyle={{
                        backgroundColor: AppColors.White,
                        // borderColor: valueRequired ? colors.Reddish : "#4B5563",
                        width: "100%",
                        alignSelf: 'center',
                    }}
                    arrowIconContainerStyle={{
                        backgroundColor: AppColors.White,
                        justifyContent: 'center',
                    }}
                    style={{
                        // borderColor: valueRequired ? colors.Reddish : colors.grayish,
                        backgroundColor: AppColors.White,
                        width: "100%",
                        minHeight: 40,
                        height: 56,
                        alignSelf: 'center',
                        borderRadius: 8
                    }}
                    containerStyle={{
                        marginTop: 3,
                        zIndex: 999
                    }}
                    textStyle={{
                        color: AppColors.Black,
                        fontSize: 14,
                    }}
                />
                <View style={{ marginVertical: 8 }} />
                <InputField
                    title="Message"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Type your message here..."
                    keyboardType='default'
                    multiline={true}
                    customStyle={{ height: 124 }}
                />
                <ContainedButton
                    onPress={onSubmit}
                    label="Submit"
                    style={{ marginTop: 22 }}
                />
            </View>
        </SafeAreaView>

    );

}

export default ContactUs;
