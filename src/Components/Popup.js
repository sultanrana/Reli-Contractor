import React from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet, Dimensions, useColorScheme, } from "react-native";
import Modal from "react-native-modal";

import colors from '../Theme/Colors';
import Fonts from '../Assets/Fonts/Index';
import { FontSize } from '../Theme/FontSize';
import { Icons, Images } from '../Assets/Images/Index';
import { windowWidth } from "../Constants/Constants";



const ConfirmationPopup = (props) => {

    const scheme = useColorScheme()
    const AppColors = colors(scheme)

    const {
        visible,
        onRequestClose,
        Icon,
        IconBackground,
        Title,
        TitleStyle
    } = props

    const styles = StyleSheet.create({
        modalContainer: {
            width: '100%',
            height: 535,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: AppColors.White,
            borderRadius: 12,
            paddingVertical: 16,
            paddingHorizontal: 20

        },
        iconContainer: {
            height: 142,
            width: 142,
            borderRadius: 142,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: IconBackground
        },
        popupIcon: {
            height: 75,
            width: 75
        },
        Title: {
            fontSize: FontSize.xxlarge,
            fontFamily: Fonts.Medium,
            marginTop: 36
        },
        Desc: {
            fontSize: FontSize.small,
            fontFamily: Fonts.Regular,
            textAlign: 'center',
            color: AppColors.Black,
            marginTop:16
        },
        btnContainer: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 42
        },
        positiveBtn: {
            width: '47%',
            height: 56,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: AppColors.Primary,
            borderRadius: 10,
            elevation: 2
        },
        negativeBtn: {
            width: '47%',
            height: 56,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: AppColors.Black,
            borderRadius: 10,
            elevation: 2
        },
        btnTitle: {
            fontSize: FontSize.large,
            fontFamily: Fonts.Regular,
            color: AppColors.White,
        }
    });
    return (
        <Modal
            isVisible={visible}
            animationIn='fadeInRight'
            animationOut='fadeOutLeft'
            deviceWidth={windowWidth}
            animationInTiming={350}
            animationOutTimixng={350}
            onBackButtonPress={onRequestClose}
            // hasBackdrop={true}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            // backdropColor='rgba(0,0,0,0.9)'
        >


            <View style={styles.modalContainer}>

                <View style={[styles.iconContainer]}>
                    <Image source={Icon} style={styles.popupIcon} resizeMode={'contain'} />
                </View>
                <Text allowFontScaling={false} style={[styles.Title, TitleStyle]}>{Title}</Text>
                <Text allowFontScaling={false} style={styles.Desc}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. \n\nIt has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`}</Text>

                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        onPress={onRequestClose}
                        activeOpacity={0.8}
                        style={styles.negativeBtn}
                    >
                        <Text allowFontScaling={false} style={styles.btnTitle}>{'Cancel'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onRequestClose}
                        activeOpacity={0.8}
                        style={styles.positiveBtn}
                    >
                        <Text allowFontScaling={false} style={styles.btnTitle}>{'Okay'}</Text>
                    </TouchableOpacity>
                </View>
                

            </View>




        </Modal>
    )
}


export default ConfirmationPopup;


