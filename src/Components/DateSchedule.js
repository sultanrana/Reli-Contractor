import React from 'react';
import { Text, View, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';

import { FontSize } from '../Theme/FontSize';
import Colors from '../Theme/Colors';
import Fonts from '../Assets/Fonts/Index';
import { GetStyles } from '../Theme/AppStyles';
import { windowWidth } from '../Constants/Constants';
import moment from 'moment-timezone';


const DateSchedule = ({ item, index, selectedDateIndex, setSelectedDateIndex, clickable }) => {

    const scheme = useColorScheme()
    const AppStyles = GetStyles(scheme)
    const AppColors = Colors(scheme)

    const details = {
        day: moment(item).format('ddd'),
        date: moment(item).format('DD'),
        month: moment(item).format('MMM'),
        time: 'Time\nRequired',
    }

    const isSelected = (index === selectedDateIndex) 

    const styles = StyleSheet.create({
        dateContainer: {
            backgroundColor: isSelected? '#FDECDF': AppColors.DateBackground,
            height: 165,
            width: windowWidth / 3.79,
            borderRadius: 10,
            paddingTop: 8,
            borderColor: isSelected? AppColors.Primary: AppColors.White,
            borderWidth: isSelected? 2: 0,
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
        <TouchableOpacity style={styles.dateContainer} activeOpacity={0.75} onPress={() => {
            console.log('Date Selected', item);
            setSelectedDateIndex(index)
        }} disabled={!clickable}> 
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
                        <Text allowFontScaling={false} style={{
                            fontFamily: Fonts.Regular,
                            fontSize: FontSize.medium,
                            color: AppColors.White,
                        }}>{details.day}</Text>
                    </View>

                    <Text allowFontScaling={false} style={{
                        fontFamily: Fonts.Regular,
                        fontSize: 40,
                        color: AppColors.TextTitle,
                        alignSelf: 'center'
                    }}>{details.date}</Text>
                </View>
                <Text allowFontScaling={false} style={{
                    fontFamily: Fonts.SemiBold,
                    fontSize: FontSize.medium,
                    color: AppColors.TextTitle,
                    alignSelf: 'center',
                    marginTop: 5
                }}>{details.month}</Text>
            </View>
            <View style={styles.timeContainer}>
                <Text allowFontScaling={false} style={styles.time}>{details.time}</Text>
            </View>
        </TouchableOpacity>
    );


}

export default DateSchedule;


