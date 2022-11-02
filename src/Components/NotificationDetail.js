import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, Image, View, useColorScheme } from 'react-native'
import Fonts from '../Assets/Fonts/Index'
import { Icons } from '../Assets/Images/Index'
import colors from '../Theme/Colors'
import { FontSize } from '../Theme/FontSize'

const NotificationDetail = ({ style, title, Details, labelStyle, label }) => {

    const scheme = useColorScheme()
    const AppColors = colors(scheme)


    const styles = StyleSheet.create({
        mainContainer: {
            paddingHorizontal: 8,
            paddingVertical: 10,
            backgroundColor: AppColors.Background,
            borderWidth: 1,
            borderColor: AppColors.DateBackground,
            borderRadius: 10,
            width: '99.5%',
            alignSelf: 'center'
        },
        dateContainer: {
            backgroundColor: AppColors.White,
            borderRadius: 10,
            width: '100%',
            height: 94,
            borderWidth: 1,
            borderColor: AppColors.DateBackground,
        },
        month: {
            color: AppColors.White,
            fontSize: 13,
            fontFamily: Fonts.Regular
        },
        date: {
            color: AppColors.Black,
            fontSize: 35,
            fontFamily: Fonts.Regular,
            alignSelf: 'center',
            marginTop: 10
        },
        time: {
            color: AppColors.Black,
            fontSize: FontSize.small,
            fontFamily: Fonts.Regular,
            alignSelf: 'flex-end',
            position: 'absolute',
            bottom: 0
            // marginTop: 10
        },
        title: {
            color: AppColors.Black,
            fontSize: FontSize.large,
            fontFamily: Fonts.SemiBold,
        },
        desc: {
            color: AppColors.Black,
            fontSize: FontSize.large,
            fontFamily: Fonts.Regular,
        },
    })
    return (

        <View style={[styles.mainContainer, style]} >

            <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                <View style={{ width: '24%', }}>
                    {
                        Details.type === 'new' ?
                            <View style={styles.dateContainer}>

                                <View style={{ height: '20%', justifyContent: 'center', alignItems: 'center', backgroundColor: AppColors.Primary, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                    <Text allowFontScaling={false} style={[styles.month]}>{'Oct'}</Text>
                                </View>
                                <Text allowFontScaling={false} style={[styles.date]}>{'10'}</Text>


                            </View>
                            :
                            <View style={[styles.dateContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                                <Image source={Icons.Cart} style={{ height: 40, width: 40, tintColor: AppColors.Primary }} resizeMode={'contain'} />
                            </View>
                    }

                </View>
                <View style={{ width: '74%', }}>
                    <Text allowFontScaling={false} style={[styles.title]}>{`${Details.title}`}</Text>
                    <Text allowFontScaling={false} style={[styles.desc]}>{`${Details.location}`}</Text>
                    <Text allowFontScaling={false} style={[styles.time]}>{`${Details.time} ago`}</Text>

                </View>
            </View>
        </View>

    )
}

export default NotificationDetail;

