import React from 'react'
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native'

import { AppStylesLight, AppStylesDark } from '../Theme/AppStyles'
import Colors from '../Theme/Colors'
import { useColorScheme } from "react-native";
import { References } from '../Constants/References';
import { Icons, Images } from '../Assets/Images/Index';
import { FontSize } from '../Theme/FontSize';
import Fonts from '../Assets/Fonts/Index';
import { vs } from 'react-native-size-matters';
import ContainedButton from './ContainedButton';

const StaffItemBox = ({ navigation, id, image, name, onClaim, Item }) => {
    const AppColors = Colors(useColorScheme())
    const AppStyles = (useColorScheme() === 'light') ? AppStylesLight : AppStylesDark;

    // console.log({Item});
    const styles = StyleSheet.create({
        mainView: {
            height: 56,
            flexDirection: 'row',
            width: '100%',
            backgroundColor: AppColors.PrimaryOutline,
            borderColor: '#E0E0E0',
            borderWidth: 0.25,
            borderRadius: 8,
            alignItems: 'center',
            paddingHorizontal: 8,
            elevation: 1
        }
    })

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
                navigation.navigate(References.StaffTabs)
            }} style={styles.mainView}
            disabled={onClaim ? true : false} >

            {
                image ?
                    <Image source={image} style={{
                        height: 32,
                        width: 32,
                        borderRadius: 32,

                    }} resizeMode='contain' resizeMethod='resize' />
                    :
                    <Image source={Icons.Profile} style={{
                        height: 32,
                        width: 32,
                        borderRadius: 32,

                    }} resizeMode='contain' resizeMethod='resize' />
            }

            <Text 
            numberOfLines={1}
            allowFontScaling={false} style={{
                fontSize: FontSize.large,
                fontFamily: Fonts.SemiBold,
                color: AppColors.TextTitle,
                paddingHorizontal: 16,
                width:onClaim? '60%': '90%'
            }}>{name}</Text>

            {
                onClaim &&
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                }}>
                    <View style={{
                        width: vs(74),
                        justifyContent: 'center',
                        // alignItems:'center'
                    }}>

                        <ContainedButton
                            label={'Assign'}
                            onPress={() => {
                                onClaim(id)
                            }}
                            style={{
                                height: vs(28),
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#00C389'
                            }}
                            labelStyle={{
                                fontSize: vs(10)
                            }}
                            renderLeft={() => (
                                <View style={{
                                    backgroundColor: 'white',
                                    height: vs(14),
                                    width: vs(14),
                                    borderRadius: vs(14),
                                    marginRight: vs(6),
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{ color: '#00C389', fontFamily: Fonts.Regular }}>
                                        +
                                    </Text>
                                </View>
                            )} />

                    </View>
                </View>

            }

        </TouchableOpacity>
    )
}

export default StaffItemBox
