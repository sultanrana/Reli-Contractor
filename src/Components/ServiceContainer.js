import React from 'react';
import { Text, View, Image, StyleSheet, useColorScheme } from 'react-native';
import { FontSize } from '../Theme/FontSize';
import { GetStyles } from '../Theme/AppStyles';
import { Images } from '../Assets/Images/Index';
import { IMAGES_URL } from '../API/Constants';
import Colors from '../Theme/Colors';
import Fonts from '../Assets/Fonts/Index';

const ServiceContainer = ({ Details }) => {

    const scheme = useColorScheme()
    const AppStyles = GetStyles(scheme)
    const AppColors = Colors(scheme)

    const capitalizeFirstLetter = str => !!str ? str.charAt(0).toUpperCase() + str.slice(1): `-`

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
                    }} source={(Details?.images?.length <=0) ? Images.SideWindow: {
                        uri: IMAGES_URL + Details?.images[0]
                    }} />
                </View>
                <Text allowFontScaling={false} style={styles.mainTitle}>{Details?.serviceName}</Text>
            </View>
            <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Service Type: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{capitalizeFirstLetter(Details?.serviceType)}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Room Type: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{capitalizeFirstLetter(Details?.roomType)}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Distance from Ground: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{Details?.distanceFromGround}</Text>
            </View>
            

            <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Floor Type: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{capitalizeFirstLetter(Details?.floorType)}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Width: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{Details?.width}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Height: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{Details?.height}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Glass Type: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{capitalizeFirstLetter(Details?.glassType)}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Design Type: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{capitalizeFirstLetter(Details?.designType)}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Color Selection: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{capitalizeFirstLetter(Details?.colorSelection)}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Style Selection: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{capitalizeFirstLetter(Details?.styleSelection)}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Opening Type: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{capitalizeFirstLetter(Details?.openingType)}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Opening Direction: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{capitalizeFirstLetter(Details?.openingDirection)}</Text>
            </View>

            {/* <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Top Section: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{Details.topSection}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Bottom Section: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{Details.bottomSection}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Color: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{Details.color}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Grid: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{Details.grid}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Safety: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{Details.safety}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Fire Safety: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{Details.fireSafety}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Privacy: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{Details.privacy}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Floor: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{Details.floor}</Text>
            </View>

            <View style={styles.serviceNameContainer}>
                <Text allowFontScaling={false} style={styles.serviceName}>{'Room: '}</Text>
                <Text allowFontScaling={false} style={styles.seriveDesc}>{Details.room}</Text>
            </View> */}
        </View>
    );


}

export default ServiceContainer;


