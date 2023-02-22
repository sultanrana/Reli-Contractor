import React, { useEffect } from 'react'
import { Text, View, Image, useColorScheme } from 'react-native'
import NetInfo from "@react-native-community/netinfo";

import { Images } from '../Assets/Images/Index'
import Colors from '../Theme/Colors'
import Fonts from '../Assets/Fonts/Index'
import { FontSize } from '../Theme/FontSize'
import { References } from '../Constants/References'
import { useDispatch, useSelector } from 'react-redux';
import { handleGetAllCompanies } from '../API/Config';
import { setCompaniesData } from '../Redux/Actions';


const Splash = ({ navigation }) => {

    const scheme = useColorScheme()
    const { token } = useSelector(state => state.Index)


    useEffect(() => {

        const checkConnectivity = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected ? ", state.isConnected);
        });

        setTimeout(() => {
            if (token) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: References.DashboardStack }],
                })
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: References.AuthenticationStack }],
                })
            }
        }, 1500)
    }, [])


    return (
        <View style={{ height: '100%', flexDirection: 'column', width: '100%', backgroundColor: Colors(scheme).Primary, alignItems: 'center', justifyContent: 'center' }}>

            <View style={{ flex: 1, flexDirection: 'column' }}>

            </View>

            <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>

                <Image source={Images.Logo} style={{
                    width: 200, height: 200, tintColor: 'white'
                }} resizeMode='contain' resizeMethod='resize' />

            </View>


            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', paddingVertical: 24 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                    <Text allowFontScaling={false} style={{
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