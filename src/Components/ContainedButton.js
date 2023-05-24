import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Image, View, ActivityIndicator } from 'react-native'
import colors from '../Theme/Colors'
import { dynamicSize, dynamicVerticalSize, getFontSize } from '../Helpers/Resposive'
import Fonts from '../Assets/Fonts/Index'

const ContainedButton = ({ style, onPress, labelStyle, label, scheme = 'light', disabled = false, loading = false, renderLeft }) => {

    const styles = StyleSheet.create({
        mainContainer: {
            height: dynamicSize(64),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors(scheme).Primary,
            flexDirection: 'row',
            borderRadius: dynamicSize(10),
            elevation: 2
        },
        btnText: {
            color: colors(scheme).White,
            fontSize: getFontSize(18),
            fontFamily: Fonts.SemiBold,
            fontWeight: '500'
        },
        btnImage: {
            height: 35,
            width: 35,
            resizeMode: 'contain',
            tintColor: colors(scheme).White,
            marginRight: 12
        }
    })
    return (

        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.mainContainer, style]}
            disabled={disabled || loading}>

            {
                renderLeft && renderLeft()
            }

            {loading ?
                <ActivityIndicator size={'small'} color={'white'} style={{ marginRight: 16, marginLeft: 8 }} />
                :
                <Text allowFontScaling={false} style={[styles.btnText, labelStyle]}>{label}</Text>
            }


        </TouchableOpacity>

    )
}

export default ContainedButton

