import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    useColorScheme,
} from 'react-native';
import colors from '../Theme/Colors';
import Fonts from '../Assets/Fonts/Index';
import { FontSize } from '../Theme/FontSize';
import { Icons, Images } from '../Assets/Images/Index';
import Colors from '../Theme/Colors';
import { GetStyles } from '../Theme/AppStyles';
import { References } from '../Constants/References';
import { useDispatch } from 'react-redux';
import { setProjectID } from '../Redux/Actions';

const ProjectBoxWithDate =
    ({
        id,
        navigation,
        title,
        subtitle1,
        subtitle2,
        imageURL1,
        staff,
        calenderData = { date: '01', day: 'Mon', month: 'Jan' }

    }) => {

        const scheme = useColorScheme()
        const AppColors = Colors(scheme)
        const AppStyles = GetStyles(scheme)

        const dispatch = useDispatch()

        const styles = StyleSheet.create({
            mainContainer: {
                width: '99.5%',
                flexDirection: 'row',
                // backgroundColor: (scheme === 'light') ? AppColors.White : AppColors.BlackGreyish,
                backgroundColor: AppColors.White,
                borderRadius: 16,
                zIndex: 0,
                elevation: 2,
                shadowColor: AppColors.BlackGreyish,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.16,
                // shadowRadius: 6
            },
            image: {
                width: 90,
                height: 90,
                zIndex: 0,
                borderRadius: 16
            },
            dateContainer: {
                height: '70%',
                width: '100%',
                backgroundColor: AppColors.Background,
                borderRadius: 10,
                position: 'absolute',
                top: 3,
                // justifyContent: 'center',
                // alignItems: 'center'
            }

        });

        return (

            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    dispatch(setProjectID(id))
                    navigation.navigate(References.ProjectDetails, {
                        projectID: id
                    })
                }}
                style={[styles.mainContainer]}>

                <View style={{ alignItems: 'center', width: '35%', flexDirection: 'row' }}>
                    <Image source={imageURL1} style={styles.image} resizeMethod='resize' />
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 60,
                        height: 70,
                        backgroundColor: AppColors.DateBackground,
                        borderRadius: 10,
                        zIndex: 1,
                        position: 'absolute',
                        right: 0,
                        // paddingVertical: 4,
                        paddingHorizontal: 3.5
                    }}>
                        <View style={styles.dateContainer}>

                            <View style={{
                                height: '40%',
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                backgroundColor: AppColors.Primary,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text allowFontScaling={false} style={{
                                    fontFamily: Fonts.Regular,
                                    fontSize: FontSize.small,
                                    color: AppColors.Background,
                                    alignSelf: 'center'
                                }}>
                                    {calenderData.day}
                                </Text>
                            </View>
                            <Text allowFontScaling={false} style={{
                                fontFamily: Fonts.Medium,
                                fontSize: FontSize.large,
                                color: AppColors.TextTitle,
                                textAlignVertical: 'center',
                                alignSelf: 'center'
                            }}>
                                {calenderData.date}
                            </Text>
                        </View>
                        <Text allowFontScaling={false} style={{
                            fontFamily: Fonts.Medium,
                            fontSize: FontSize.small,
                            color: AppColors.TextTitle,
                            textAlignVertical: 'center',
                            position: 'absolute',
                            bottom: 0
                        }}>
                            {calenderData.month}
                        </Text>

                    </View>
                </View>

                <View style={{ alignItems: 'center', width: '65%', flexDirection: 'row' }}>



                    <View style={{
                        justifyContent: 'center',
                        backgroundColor: AppColors.White,
                        zIndex: 1,
                        marginHorizontal: 8,
                        flexDirection: 'column'
                    }}>
                        {(title?.trim() !== '') &&
                            <Text allowFontScaling={false} style={{
                                fontFamily: Fonts.SemiBold,
                                fontSize: FontSize.xlarge,
                                color: AppColors.TextTitle,
                                textAlignVertical: 'center'
                            }}>
                                {title}
                            </Text>
                        }
                        {(subtitle1 !== '') &&
                            <Text
                                numberOfLines={1}
                                allowFontScaling={false} style={{
                                    fontFamily: Fonts.Light,
                                    fontSize: FontSize.small,
                                    color: AppColors.Text,
                                    textAlignVertical: 'center'
                                }}>
                                {subtitle1}
                            </Text>
                        }
                        {
                            staff ?
                                <>
                                    <Text allowFontScaling={false} style={{
                                        fontFamily: Fonts.Light,
                                        fontSize: FontSize.small,
                                        color: AppColors.Text,
                                        marginVertical: 1,
                                        textAlignVertical: 'center'
                                    }}>
                                        {'Project Status: Materials Ordered'}
                                    </Text>
                                    <Text allowFontScaling={false} style={{
                                        fontFamily: Fonts.Light,
                                        fontSize: FontSize.small,
                                        color: AppColors.Text,
                                        marginVertical: 1,
                                        textAlignVertical: 'center'
                                    }}>
                                        {'Staff Assigned: Robert Fox'}
                                    </Text>
                                </>
                                :
                                <Text allowFontScaling={false} style={{
                                    fontFamily: Fonts.Light,
                                    fontSize: FontSize.small,
                                    color: AppColors.Text,
                                    marginVertical: 1,
                                    textAlignVertical: 'center'
                                }}>
                                    {subtitle2}
                                </Text>
                        }

                    </View>

                </View>

            </TouchableOpacity>
        )
    };

export default ProjectBoxWithDate;

