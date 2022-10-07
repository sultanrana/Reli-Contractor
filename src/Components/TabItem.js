import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

import { AppStylesLight, AppStylesDark } from '../Theme/AppStyles'
import Colors from '../Theme/Colors'
import { useColorScheme } from "react-native";

const TabItemSimple = ({ navigation, icon, path, index, activeIndex, reset = false }) => {
    const appColors = Colors(useColorScheme())
    const AppStyles = (useColorScheme() === 'light') ? AppStylesLight : AppStylesDark;


    return (
        <TouchableOpacity onPress={reset ? () => {
            navigation.reset({
                index: 0,
                routes: [{ name: path }],
            })
        } :
            () => {
                navigation.navigate(path)
            }} style={[{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }]}>

            <Image source={icon} style={{
                tintColor: (index === activeIndex) ? appColors.Primary : appColors.Text,
                height: 20,
                width: 20

            }} resizeMode='contain' />

        </TouchableOpacity>
    )
}

export default TabItemSimple
