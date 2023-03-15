import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native'
import Fonts from '../Assets/Fonts/Index'
import colors from '../Theme/Colors'
import { FontSize } from '../Theme/FontSize'
import { Icons } from '../Assets/Images/Index'
import { References } from '../Constants/References'

const OutlinedButton = ({ style, onPress, navigation, labelStyle, label, rightIcon, scheme = 'light' }) => {

    const styles = StyleSheet.create({
        mainContainer: {
            height: 56,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors(scheme).Border,
            flexDirection: 'row',
            borderRadius: 10,
            paddingHorizontal: 20,
            justifyContent: rightIcon ? 'space-between' : 'center'
        },
        btnText: {
            fontFamily: Fonts.Medium,
            fontSize: FontSize.xlarge,
            color: colors(scheme).Border,
        },
        btnImage: {
            height: 30,
            width: 30,
            resizeMode: 'contain',
            tintColor: colors(scheme).Black,
            position: 'absolute',
            right: 10
        }
    })
    return (

        <TouchableOpacity
            onPress={onPress ? onPress : () => {
                navigation && (
                    label === 'Location' ?
                        navigation.navigate(References.Location)
                        :
                        label === 'Account Details' ?
                            navigation.navigate(References.AccountDetails)
                            :
                            label === 'Change Password' ?
                                navigation.navigate(References.NewPassword)
                                :
                                navigation.navigate(References.NewNumber)
                )
            }}
            activeOpacity={0.8}
            style={[styles.mainContainer, style]} >
            <Text allowFontScaling={false} style={[styles.btnText, labelStyle]}>{label}</Text>
            {
                rightIcon &&
                <Image source={Icons.Forward} style={styles.btnImage} />
            }
        </TouchableOpacity>

    )
}

export default OutlinedButton

