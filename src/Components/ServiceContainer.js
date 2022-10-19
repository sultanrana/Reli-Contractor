import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, useColorScheme, Dimensions, FlatList } from 'react-native';

import { FontSize } from '../Theme/FontSize';
import Colors, { colors } from '../Theme/Colors';
import Fonts from '../Assets/Fonts/Index';
import { GetStyles } from '../Theme/AppStyles';
import { Images } from '../Assets/Images/Index';

const screenWidth = Dimensions.get('window').width

const ServiceContainer = ({ Details }) => {

    const scheme = useColorScheme()
    const AppStyles = GetStyles(scheme)
    const AppColors = Colors(scheme)



    const styles = StyleSheet.create({
        serviceContainer: {
            width: '100%',
            backgroundColor: AppColors.Background,
            paddingHorizontal: 13,
            paddingVertical: 17,
            borderRadius: 10,
            marginTop: 16,
            // elevation:
        },
        serviceNameContainer: {
            width: '100%',
            borderBottomWidth: 0.2,
            borderBottomColor: AppColors.border,
            flexDirection: 'row',
            paddingVertical: 10
        },
        mainTitle: {
            fontFamily: Fonts.SemiBold,
            fontSize: FontSize.xlarge,
            color: AppColors.TextTitle,
            marginHorizontal: 15
        },
        imageContainer: {
            height: 60,
            width: 60,
            borderRadius: 10,
            backgroundColor: AppColors.White,
            justifyContent: 'center',
            alignItems: 'center'
        },
        serviceImage: {
            height: 50,
            width: 50,
        },
        serviceName: {
            fontFamily: Fonts.SemiBold,
            fontSize: FontSize.medium,
            color: AppColors.TextTitle,
        },
        seriveDesc: {
            fontFamily: Fonts.Regular,
            fontSize: FontSize.medium,
            color: AppColors.TextTitle,
        },
    })

    return (
        <View style={styles.serviceContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <View style={styles.imageContainer}>
                    <Image resizeMode='contain' style={{
                        height: 50,
                        width: 50,
                        alignSelf: 'center'
                    }} source={Images.SideWindow} />
                </View>
                <Text style={styles.mainTitle}>{'Premium Window'}</Text>
            </View>
            <View style={styles.serviceNameContainer}>
                <Text style={styles.serviceName}>{'Stacked: '}</Text>
                <Text style={styles.seriveDesc}>{Details.stacked}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text style={styles.serviceName}>{'Top Section: '}</Text>
                <Text style={styles.seriveDesc}>{Details.topSection}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text style={styles.serviceName}>{'Bottom Section: '}</Text>
                <Text style={styles.seriveDesc}>{Details.bottomSection}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text style={styles.serviceName}>{'Color: '}</Text>
                <Text style={styles.seriveDesc}>{Details.color}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text style={styles.serviceName}>{'Grid: '}</Text>
                <Text style={styles.seriveDesc}>{Details.grid}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text style={styles.serviceName}>{'Safety: '}</Text>
                <Text style={styles.seriveDesc}>{Details.safety}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text style={styles.serviceName}>{'Fire Safety: '}</Text>
                <Text style={styles.seriveDesc}>{Details.fireSafety}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text style={styles.serviceName}>{'Privacy: '}</Text>
                <Text style={styles.seriveDesc}>{Details.privacy}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text style={styles.serviceName}>{'Floor: '}</Text>
                <Text style={styles.seriveDesc}>{Details.floor}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text style={styles.serviceName}>{'Room: '}</Text>
                <Text style={styles.seriveDesc}>{Details.room}</Text>
            </View>
        </View>
    );


}

export default ServiceContainer;


