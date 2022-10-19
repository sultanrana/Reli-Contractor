import React from 'react'
import { TouchableOpacity, Image, StyleSheet, Text } from 'react-native'

import { AppStylesLight, AppStylesDark } from '../Theme/AppStyles'
import Colors from '../Theme/Colors'
import { useColorScheme } from "react-native";
import { References } from '../Constants/References';
import { Images } from '../Assets/Images/Index';
import { FontSize } from '../Theme/FontSize';
import Fonts from '../Assets/Fonts/Index';

const StaffItemBox = ({ navigation, image, name }) => {
    const AppColors = Colors(useColorScheme())
    const AppStyles = (useColorScheme() === 'light') ? AppStylesLight : AppStylesDark;

    const styles = StyleSheet.create({
        mainView: {
            height: 56,
            flexDirection: 'row',
            width: '100%',
            backgroundColor: AppColors.PrimaryOutline,
            borderColor: '#E0E0E0',
            borderWidth: 0.25,
            borderRadius: 8,
            alignItems: 'center',
            paddingHorizontal: 8,
            elevation: 2
        }
    })

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
                navigation.navigate(References.StaffTabs)
            }} style={styles.mainView}>

            <Image source={image} style={{
                height: 32,
                width: 32,
                borderRadius: 32

            }} resizeMode='contain' resizeMethod='resize' />

            <Text style={{
                fontSize: FontSize.large,
                fontFamily: Fonts.SemiBold,
                color: AppColors.TextTitle,
                paddingHorizontal: 16
            }}>{name}</Text>

        </TouchableOpacity>
    )
}

export default StaffItemBox
