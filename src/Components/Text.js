import React from 'react';
import SimpleToast from 'react-native-simple-toast';

import {
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import colors from '../Theme/Colors';
import Fonts from '../Assets/Fonts/Index';
import { FontSize } from '../Theme/FontSize';
import { Images } from '../Assets/Images/Index';
import Colors from '../Theme/Colors';

const MText =
    (props) => {
        const scheme = useColorScheme()
        const isTitle = (props?.isTitle) ? props?.isTitle : false
        const styles = (props.style) ? props.style : {}
        
        return (

            <Text allowFontScaling={false} style={
                [styles, {
                    fontFamily: isTitle ? Fonts.SemiBold : Fonts.Regular,
                    fontSize: isTitle ? 14 : 11,
                    color: isTitle ? Colors(scheme).TextTitle : colors(scheme).Text
                }]
            }>
                {props.children}
            </Text>

        )
    };

export default MText;

