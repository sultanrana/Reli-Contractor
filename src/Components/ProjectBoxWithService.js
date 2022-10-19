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

const ProjectBoxWithService =
    ({
        navigation,
        title,
        subtitle1,
        subtitle2,
        imageURL1,
        imageURL2

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
                elevation:1,
                // height:90,
            },
            image: {
                width: 90,
                height: 88,
                zIndex: 0,
                borderRadius: 16
            }

        });

        return (

            <TouchableOpacity
                activeOpacity={1}
                onPress={()=>navigation.navigate(References.ProjectDetails)}
                style={[styles.mainContainer]}>

                <View style={{ alignItems: 'center', width: '35%', flexDirection: 'row' }}>
                    <Image source={imageURL1} style={styles.image} resizeMethod='resize' />
                    <View style={{
                        justifyContent: 'center',
                        width: 60,
                        height: 70,
                        backgroundColor: AppColors.White,
                        borderColor: AppColors.Primary,
                        borderWidth: 1,
                        borderRadius: 10,
                        zIndex: 1,
                        position: 'absolute',
                        right: 0
                    }}>
                        <Image source={Images.SlidingDoor} style={{
                            zIndex: 2,
                            height: 40,
                            width: 40,
                            alignSelf: 'center'
                        }} resizeMode='contain' resizeMethod='resize' />
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

export default ProjectBoxWithService;

