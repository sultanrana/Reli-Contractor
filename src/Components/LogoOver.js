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

const LogoOver =
    ({
        navigation,
        // scheme = 'light',
        isBack = false,
        shouldShowBack = true

    }) => {

        const scheme = useColorScheme()
        const AppColors = colors(scheme)
      

        isBack = navigation.canGoBack()

        const styles = StyleSheet.create({
            mainContainer: {
                width: '100%',
                height:90,
                // alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                borderBottomWidth:1,
                borderBottomColor:AppColors.DateBackground,
                // backgroundColor:'pink'
            },
            image: {
                width: 100,
                height: 100,
                tintColor: AppColors.Primary
            },
            backContainer: {
                position: 'absolute',
                left: 16,
                height: 32,
                width: 32,
                borderRadius: 32,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: AppColors.Primary
            },
            icon: {
                width: 25,
                height: 25,
                tintColor: AppColors.White,
                position:'absolute',
                right:4
            },

        });

        return (

            <View style={[styles.mainContainer]}>
                {shouldShowBack && isBack &&
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { navigation.goBack() }}
                        style={styles.backContainer}>
                        <Image source={Icons.Backward} style={styles.icon} />
                    </TouchableOpacity>
                }
                <Image source={Images.Logo} style={styles.image} resizeMode='contain' resizeMethod='resize' />

                {/* {shouldShowBack && isBack &&
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '10%' }}>

                    </View>
                } */}
            </View>

        )
    };

export default LogoOver;

