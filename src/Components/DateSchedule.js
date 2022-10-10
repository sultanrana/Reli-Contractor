import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import { Text, View, Image, StyleSheet, useColorScheme, Dimensions, FlatList } from 'react-native';

import { FontSize } from '../Theme/FontSize';
import Colors, { colors } from '../Theme/Colors';
import Fonts from '../Assets/Fonts/Index';
import { GetStyles } from '../Theme/AppStyles';

const screenWidth = Dimensions.get('window').width

const DateSchedule = ({ Details }) => {

    const scheme = useColorScheme()
    const AppStyles = GetStyles(scheme)
    const AppColors = Colors(scheme)

    const styles = StyleSheet.create({

        dateContainer: {
            backgroundColor: AppColors.DateBackground,
            height: 165,
            width: screenWidth / 3.79,
            borderRadius: 10,
            paddingTop: 8
        },
        dateInnerContainer: {
            backgroundColor: AppColors.White,
            height: '75%',
            width: '100%',
            borderRadius: 10,
        },
        timeContainer: {
            height: '25%',
            backgroundColor: AppColors.Primary,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
        },
        time: {
            fontFamily: Fonts.Regular,
            fontSize: FontSize.small,
            color: AppColors.White,
        },



    })

    return (
        <View style={styles.dateContainer}>
            <View style={{ height: '75%', paddingHorizontal: 7, }}>
                <View style={styles.dateInnerContainer}>
                    <View style={{
                        height: '35%',
                        backgroundColor: AppColors.DarkGrey,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: Fonts.Regular,
                            fontSize: FontSize.medium,
                            color: AppColors.White,
                        }}>{Details.day}</Text>
                    </View>

                    <Text style={{
                        fontFamily: Fonts.Regular,
                        fontSize: 40,
                        color: AppColors.TextTitle,
                        alignSelf: 'center'
                    }}>{Details.date}</Text>
                </View>
                <Text style={{
                    fontFamily: Fonts.SemiBold,
                    fontSize: FontSize.medium,
                    color: AppColors.TextTitle,
                    alignSelf: 'center',
                    marginTop: 5
                }}>{Details.month}</Text>
            </View>
            <View style={styles.timeContainer}>
                <Text style={styles.time}>{Details.time}</Text>
            </View>
        </View>
    );


}

export default DateSchedule;


