import React from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet, Dimensions, useColorScheme, } from "react-native";
import Modal from "react-native-modal";

import colors from '../Theme/Colors';
import Fonts from '../Assets/Fonts/Index';
import { FontSize } from '../Theme/FontSize';
import { Icons, Images } from '../Assets/Images/Index';


const deviceWidth = Dimensions.get('window').width


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
            deviceWidth={deviceWidth}
            animationInTiming={350}
            animationOutTimixng={350}
            onBackButtonPress={onRequestClose}
            hasBackdrop={true}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            backdropColor='rgba(0,0,0,0.9)'
        >


            <View style={styles.modalContainer}>

                <View style={[styles.iconContainer]}>
                    <Image source={Icon} style={styles.popupIcon} resizeMode={'contain'} />
                </View>
                <Text style={[styles.Title, TitleStyle]}>{Title}</Text>
                <Text style={styles.Desc}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. \n\nIt has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`}</Text>

                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        onPress={onRequestClose}
                        activeOpacity={0.8}
                        style={styles.negativeBtn}
                    >
                        <Text style={styles.btnTitle}>{'Cancel'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onRequestClose}
                        activeOpacity={0.8}
                        style={styles.positiveBtn}
                    >
                        <Text style={styles.btnTitle}>{'Okay'}</Text>
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 16,
                        top: 16
                    }}
                    activeOpacity={0.6}
                    onPress={onRequestClose}
                >
                    <Image source={Images.Close} resizeMode='contain' style={styles.cross} />
                </TouchableOpacity>
                <Text style={styles.Title}>{'Please provide the following Info!'}</Text>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.Desc}>{'Name'}</Text>
                    <Text style={styles.Desc}>{'Phone No'}</Text>
                    <Text style={styles.Desc}>{'Tax filing address'}</Text>
                    <Text style={styles.Desc}>{'Date Of Birth (must be at least 15 years)'}</Text>
                </View> */}


            </View>




        </Modal>
    )
}


export default ConfirmationPopup;


