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
    Platform,
} from 'react-native';
import colors from '../Theme/Colors';
import Fonts from '../Assets/Fonts/Index';
import { FontSize } from '../Theme/FontSize';
import { Icons, Images } from '../Assets/Images/Index';
import { deviceHeight, StatusbarHeight, windowHeight, windowWidth } from '../Constants/Constants';
import { SvgXml } from 'react-native-svg';

let headerHeight = deviceHeight - windowHeight + StatusbarHeight;
headerHeight += (Platform.OS === 'ios') ? 70 : -6

// console.log('.......', Platform.OS, headerHeight);

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
                width: windowWidth,
                height: headerHeight + StatusbarHeight,
                borderBottomWidth: 1,
                borderBottomColor: AppColors.DateBackground,
                paddingTop: StatusbarHeight + ((windowHeight * 2) / 100),
                // position:'absolute',
                top:0
                // backgroundColor: 'pink'
            },
            image: {
                width: (windowWidth * 20) / 100,
                height: (windowWidth * 20) / 100,
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
                position: 'absolute',
                right: 4
            },

        });

        return (

            <View style={[styles.mainContainer]}>

                <View style={{ flexDirection: 'row', width: '100%',position: 'absolute', bottom: (windowWidth * 5) / 100, alignItems: 'center', justifyContent:'center' }}>
                    <SvgXml xml={
                        `<svg width="127" height="44" viewBox="0 0 127 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M56.2421 0.00218932C44.6331 0.16167 35.162 9.61091 35.0022 21.1932C34.8323 33.2041 44.5431 43.0022 56.5518 43.0022C62.1865 43.0022 67.3216 40.8392 71.168 37.3008C71.9173 36.613 71.9373 35.4468 71.2179 34.7291L67.0719 30.5926C66.4025 29.9248 65.3335 29.8949 64.6242 30.5228C62.4862 32.4266 59.6589 33.5928 56.5618 33.5928C52.0161 33.5928 48.0498 31.091 45.9718 27.393C45.5922 26.7152 46.0717 25.8879 46.841 25.8879H76.1133C77.0225 25.8879 77.7917 25.2301 77.9116 24.333C78.0315 23.406 78.1014 22.4591 78.1014 21.5022C78.0915 9.5212 68.2807 -0.167259 56.2421 0.00218932ZM66.2626 17.1065H46.841C46.0717 17.1065 45.5922 16.2792 45.9718 15.6014C48.0498 11.9034 52.0061 9.40159 56.5618 9.40159C61.1175 9.40159 65.0738 11.9034 67.1518 15.6014C67.5314 16.2792 67.0519 17.1065 66.2826 17.1065H66.2626Z" fill="#FDAA63"/>
                    <path d="M111.964 32.9947H91.8333C90.8842 32.9947 90.1149 32.2272 90.1149 31.2803V2.38441C90.1149 1.39762 89.3157 0.60022 88.3266 0.60022H82.4822C81.4931 0.60022 80.6938 1.39762 80.6938 2.38441V33.4433C80.6938 38.3872 84.7101 42.3941 89.6654 42.3941H111.964C112.953 42.3941 113.753 41.5967 113.753 40.61V34.7789C113.753 33.7922 112.953 32.9947 111.964 32.9947Z" fill="#FDAA63"/>
                    <path d="M31.2704 0.60022H8.97152C4.0162 0.60022 0 4.61714 0 9.56104V40.6199C0 41.6067 0.799245 42.4041 1.78831 42.4041H7.63279C8.62185 42.4041 9.4211 41.6067 9.4211 40.6199V11.714C9.4211 10.7671 10.1904 9.99962 11.1395 9.99962H31.2704C32.2595 9.99962 33.0588 9.20221 33.0588 8.21543V2.38441C33.0588 1.39762 32.2595 0.60022 31.2704 0.60022Z" fill="#FDAA63"/>
                    <path d="M125.202 0.60022H119.357C118.37 0.60022 117.569 1.39903 117.569 2.38441V40.61C117.569 41.5953 118.37 42.3941 119.357 42.3941H125.202C126.189 42.3941 126.99 41.5953 126.99 40.61V2.38441C126.99 1.39903 126.189 0.60022 125.202 0.60022Z" fill="#FDAA63"/>
                    </svg>`
                    }
                        style={{}}
                    />

                    {shouldShowBack && isBack &&
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => { navigation.goBack() }}
                            style={styles.backContainer}>
                            <Image source={Icons.Backward} style={styles.icon} />
                        </TouchableOpacity>
                    }
                </View>



                {/* <Image source={Images.Logo} style={styles.image} resizeMode='contain' resizeMethod='resize' /> */}


            </View>

        )
    };

export default LogoOver;

