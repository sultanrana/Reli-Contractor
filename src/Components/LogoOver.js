import React from 'react';
import SimpleToast from 'react-native-simple-toast';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import colors from '../Theme/Colors';
import Fonts from '../Assets/Fonts/Index';
import { FontSize } from '../Theme/FontSize';
import { Icons, Images } from '../Assets/Images/Index';

const LogoOver =
    ({
        navigation,
        scheme = 'light',
        isBack = false,
        shouldShowBack = true

    }) => {

        isBack = navigation.canGoBack()

        const styles = StyleSheet.create({
            mainContainer: {
                width: '100%',
                paddingHorizontal: 8,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 16,
                flexDirection: 'row'
            },
            image: {
                width: 100,
                height: 100,
                tintColor: colors(scheme).Primary
            }

        });

        return (

            <View style={[styles.mainContainer]}>
                {shouldShowBack && isBack &&
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '10%' }}>
                        <TouchableOpacity
                            style={{}}
                            onPress={() => { navigation.goBack() }}
                        >
                            <Image source={Icons.Back} />
                        </TouchableOpacity>
                    </View>
                }
                <View style={{ justifyContent: 'center', alignItems: 'center', width: (shouldShowBack && isBack) ? '80%' : '100%' }}>
                    <Image source={Images.Logo} style={styles.image} resizeMode='contain' resizeMethod='resize' />
                </View>

                {shouldShowBack && isBack &&
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '10%' }}>

                    </View>
                }
            </View>

        )
    };

export default LogoOver;

