import React from 'react'
import { useState } from 'react'
import { useColorScheme } from 'react-native'
import { Dimensions } from 'react-native'
import { StyleSheet, Text, TouchableOpacity, Image, View, ActivityIndicator } from 'react-native'
import * as Animatable from 'react-native-animatable'

import Fonts from '../Assets/Fonts/Index'
import { Icons, Images } from '../Assets/Images/Index'
import Colors from '../Theme/Colors'
import { FontSize } from '../Theme/FontSize'

const screenWidth = Dimensions.get('window').width

const SelectService = ({
    imageURL,
    Item,
    Index,
    selectedService = () => { }
}) => {
    const [select, setSelect] = useState(-1)
    const scheme = useColorScheme()
    const AppColors = Colors(scheme)

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
                if (Index === select) {
                    setSelect(-1)
                    selectedService(Item)
                } else {
                    setSelect(Index)
                    selectedService(Index)
                }
            }}
            style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '1.9%',
                backgroundColor: '#E0E0E0',
                width: screenWidth / 2.3,
                borderRadius: 16,
                height: 200,
                paddingHorizontal: 8,
                paddingVertical: 8
            }}>

            <View style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: AppColors.White,
                height: '65%',
                width: '100%',
                borderRadius: 12
            }}>
                {
                    Index === select &&
                    <Animatable.View
                        style={{
                            position: 'absolute',
                            top: 5,
                            right: 5
                        }}
                        animation="bounceIn">
                        <Image source={Icons.Confirm} style={{
                            height: 25,
                            width: 25,
                        }}
                            resizeMode={'contain'} />
                    </Animatable.View>
                }
                <Image source={Index == 0 ? Images.Window : Index == 1 ? Images.SlidingDoor : Images.InteriorDoor}
                    resizeMode='contain'
                    resizeMethod='resize'
                    style={{
                        height: 96,
                        width: 96
                    }} />
            </View>

            <View style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                height: '35%',
                width: '100%',
            }}>
                <Text allowFontScaling={false} style={{
                    color: AppColors.TextTitle,
                    fontSize: FontSize.xlarge,
                    fontFamily: Fonts.Bold,
                    textAlign: 'center',
                    textAlignVertical: 'center'
                }}>{Item?.title}</Text>
            </View>

        </TouchableOpacity>
    )
}

export default SelectService

