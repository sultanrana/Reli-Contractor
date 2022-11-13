import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Image, View, ActivityIndicator } from 'react-native'
import Fonts from '../Assets/Fonts/Index'
import colors from '../Theme/Colors'

const ContainedButton = ({ style, onPress, labelStyle, label, scheme = 'light', disabled = false, loading = false }) => {

    const styles = StyleSheet.create({
        mainContainer: {
            height: 56,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors(scheme).Primary,
            flexDirection: 'row',
            borderRadius: 10,
            elevation: 2
        },
        btnText: {
            color: colors(scheme).White,
            fontSize: 15,
            fontFamily: Fonts.SemiBold
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

            {loading ?
                <ActivityIndicator size={'small'} color={'white'} style={{ marginRight: 16, marginLeft: 8 }} />
                :
                <Text allowFontScaling={false} style={[styles.btnText, labelStyle]}>{label}</Text>

            }


        </TouchableOpacity>

    )
}

export default ContainedButton

