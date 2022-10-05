import React, { useEffect } from 'react'
import { Text, View, Image, useColorScheme } from 'react-native'

import { Images } from '../Assets/Images/Index'
import Colors from '../Theme/Colors'
import Fonts from '../Assets/Fonts/Index'
import { FontSize } from '../Theme/FontSize'
import { References } from '../Constants/References'


const Splash = ({ navigation }) => {

    const scheme = useColorScheme()

    useEffect(()=> {
        setTimeout(()=> {
            navigation.reset({
                index: 0,
                routes: [{ name: References.AuthenticationStack }],
            })
        }, 1500)
    }, [])

    return (
        <View style={{ height: '100%', flexDirection: 'column', width: '100%', backgroundColor: Colors(scheme).Primary, alignItems: 'center', justifyContent: 'center' }}>

            <View style={{ flex: 1, flexDirection: 'column' }}>

            </View>

            <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>

                <Image source={Images.Logo} style={{
                    width: 200, height: 200, tintColor: 'white'
                }} resizeMode='contain' resizeMethod='resize'/>

            </View>


            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', paddingVertical: 24 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                    <Text style={{
                        fontFamily: Fonts.SemiBold,
                        textAlignVertical: 'center',
                        marginHorizontal: 2,
                        color: Colors(scheme).White,
                        fontSize: FontSize.xlarge
                    }}>
                        {'For Contractors'}
                    </Text>

                </View>


            </View>




        </View>
    )
}

export default Splash