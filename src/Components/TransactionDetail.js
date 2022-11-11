import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native'
import Fonts from '../Assets/Fonts/Index'
import colors from '../Theme/Colors'
import { Images } from '../Assets/Images/Index'

const TransactionDetail = ({ style, Details, labelStyle, scheme = 'light' }) => {



    const styles = StyleSheet.create({
        mainContainer: {
            width: '99%',
            height: 218,
            alignItems: 'center',
            backgroundColor: colors(scheme).Background,
            flexDirection: 'row',
            borderRadius: 10,
            elevation: 1,
            alignSelf: 'center',
            paddingHorizontal: 10,
            paddingVertical: 15
        },
        detailContainer: {
            width: '65%',
            height: '100%',
            paddingRight: 5
        },
        imageContainer: {
            width: '35%',
            height: '100%',
            backgroundColor: colors(scheme).DateBackground,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 10
        },
        imageInnerContainer: {
            width: '100%',
            height: '100%',
            backgroundColor: colors(scheme).White,
            borderRadius: 10,
        },
        image: {
            height: 75,
            width: 60
        },
        statusContainer: {
            height: '20%',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: Details.status === 'Finished' ? '#00C389' : colors(scheme).Primary,
            justifyContent: 'center',
            alignItems: 'center',
        },
        titleText: {
            color: colors(scheme).Black,
            fontSize: 14,
            fontFamily: Fonts.SemiBold,
            marginTop:10
        },
        statusText: {
            color: colors(scheme).White,
            fontSize: 13,
            fontFamily: Fonts.Regular
        },
        order: {
            color: colors(scheme).Primary,
            fontSize: 18,
            fontFamily: Fonts.SemiBold
        },
        generalTitles: {
            color: colors(scheme).Black,
            fontSize: 14,
            fontFamily: Fonts.SemiBold,
            marginVertical: 5
        },
        generalDesc: {
            color: colors(scheme).Black,
            fontSize: 14,
            fontFamily: Fonts.Regular,
            marginVertical: 5

        },
        detailsBtn: {
            width: 120,
            height: 34,
            borderRadius: 5,
            backgroundColor: colors(scheme).Primary,
            position: 'absolute',
            bottom: 0,
            justifyContent:'center',
            alignItems:'center'
        },
        detailBtnTitle: {
            color: colors(scheme).White,
            fontSize: 14,
            fontFamily: Fonts.Regular,

        },

    })
    return (

        <View
            style={[styles.mainContainer, style]} >
            {/* 
            <TouchableOpacity
                style={styles.radioBtnContainer}
                activeOpacity={0.8}
                onPress={() => setIsActive(!isActive)}
            >
                <View style={styles.radioDot}>

                </View>

            </TouchableOpacity> */}
            <View style={styles.detailContainer}>

                <Text allowFontScaling={false} style={styles.order}>{Details.title}</Text>
                <Text allowFontScaling={false} style={styles.generalTitles}>{'Date Assigned: '}
                    <Text allowFontScaling={false} style={styles.generalDesc}>{Details.assigned}</Text>
                </Text>
                <Text allowFontScaling={false} style={styles.generalTitles}>{'Date Completed: '}
                    <Text allowFontScaling={false} style={styles.generalDesc}>{Details.completed}</Text>
                </Text>
                <Text allowFontScaling={false} style={styles.generalTitles}>{'Amount: '}
                    <Text allowFontScaling={false} style={styles.generalDesc}>{Details.amount}</Text>
                </Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.detailsBtn}
                >
                    <Text allowFontScaling={false} style={styles.detailBtnTitle}>{'More Details'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <View style={styles.imageInnerContainer}>
                    <View style={{ height: '80%', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={styles.image}
                            resizeMode='contain'
                            source={Images.Window} />
                        <Text allowFontScaling={false} style={[styles.titleText, labelStyle]}>{'Status'}</Text>
                    </View>
                    <View style={styles.statusContainer}>
                        <Text allowFontScaling={false} style={[styles.statusText]}>{Details.status}</Text>
                    </View>
                </View>

            </View>
        </View>

    )
}

export default TransactionDetail;

