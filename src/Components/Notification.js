import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native'
import Fonts from '../Assets/Fonts/Index'
import colors from '../Theme/Colors'

const Notification = ({ style, title, onPress, labelStyle, radioBtnState = () => { }, label, scheme = 'light' }) => {

    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        radioBtnState(isActive)
    }, [isActive])

    const styles = StyleSheet.create({
        mainContainer: {
            height: 55,
            justifyContent: 'space-between',
            alignItems: 'center',
            // backgroundColor: colors(scheme).White,
            flexDirection: 'row',
        },
        titleText: {
            color: colors(scheme).Black,
            fontSize: 14,
            fontFamily: Fonts.Regular
        },
        radioBtnContainer: {
            height: 20,
            width: 40,
            borderRadius: 50,
            backgroundColor: isActive ? colors(scheme).Primary : colors(scheme).Grey,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 3,
        },
        radioMainContainer: {
            height: 28,
            width: 60,
            justifyContent: 'center',
            alignItems: 'flex-end',
            position: 'absolute',
            right: 15,
        },
        radioDot: {
            height: 14,
            width: 14,
            borderRadius: 14,
            backgroundColor: colors(scheme).White,
            alignSelf: isActive ? 'flex-end' : 'flex-start'
        }
    })
    return (

        <View
            style={[styles.mainContainer, style]} >
            <Text allowFontScaling={false} style={[styles.titleText, labelStyle]}>{title}</Text>
            <TouchableOpacity
                style={styles.radioMainContainer}
                activeOpacity={0.8}
                onPress={() => setIsActive(!isActive)}
            >
                <TouchableOpacity
                    style={styles.radioBtnContainer}
                    activeOpacity={0.8}
                    onPress={() => setIsActive(!isActive)}
                >
                    <View style={styles.radioDot} />
                </TouchableOpacity>
            </TouchableOpacity>
        </View>

    )
}

export default Notification;

