import React from 'react';
import SimpleToast from 'react-native-simple-toast';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
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

const ProjectBoxWithDate =
    ({
        navigation,
        title,
        subtitle1,
        subtitle2,
        imageURL1,
        imageURL2,
        clickable = true

    }) => {

        const scheme = useColorScheme()
        const AppColors = Colors(scheme)
        const AppStyles = GetStyles(scheme)

        const styles = StyleSheet.create({
            mainContainer: {
                width: '99.5%',
                flexDirection: 'row',
                // backgroundColor: 'pink',
                backgroundColor: (scheme === 'light') ? AppColors.White : AppColors.BlackGreyish,
                borderRadius: 16,
                zIndex: 0,
                elevation: 1,
                // height:90,
            },
            image: {
                width: 90,
                height: 88,
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
                onPress={clickable ? ()=>navigation.navigate(References.ProjectDetails) : ()=> {}}
                style={[styles.mainContainer]}>

                <View style={{ alignItems: 'center', width: '35%', flexDirection: 'row' }}>
                    <Image source={{ uri: imageURL1 }} style={styles.image} resizeMode='contain' resizeMethod='resize' />
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
                                <Text style={{
                                    fontFamily: Fonts.Regular,
                                    fontSize: FontSize.small,
                                    color: AppColors.Background,
                                    alignSelf: 'center'
                                }}>
                                    {'Wed'}
                                </Text>
                            </View>
                            <Text style={{
                                fontFamily: Fonts.Medium,
                                fontSize: FontSize.large,
                                color: AppColors.TextTitle,
                                textAlignVertical: 'center',
                                alignSelf: 'center'
                            }}>
                                {'06'}
                            </Text>
                        </View>
                        <Text style={{
                            fontFamily: Fonts.Medium,
                            fontSize: FontSize.small,
                            color: AppColors.TextTitle,
                            textAlignVertical: 'center',
                            position: 'absolute',
                            bottom: 0
                        }}>
                            {'Oct'}
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
                        <Text style={{
                            fontFamily: Fonts.SemiBold,
                            fontSize: FontSize.xlarge,
                            color: AppColors.TextTitle,
                            textAlignVertical: 'center'
                        }}>
                            {title}
                        </Text>
                        <Text style={{
                            fontFamily: Fonts.Light,
                            fontSize: FontSize.small,
                            color: AppColors.Text,
                            textAlignVertical: 'center'
                        }}>
                            {subtitle1}
                        </Text>
                        <Text style={{
                            fontFamily: Fonts.Light,
                            fontSize: FontSize.small,
                            color: AppColors.Text,
                            marginVertical: 1,
                            textAlignVertical: 'center'
                        }}>
                            {subtitle2}
                        </Text>
                    </View>

                </View>

            </TouchableOpacity>
        )
    };

export default ProjectBoxWithDate;

