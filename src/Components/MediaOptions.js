import React from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet, Modal } from "react-native";
import { s, vs } from "react-native-size-matters";
import { SvgXml } from "react-native-svg";
import { _Cross } from "../Assets/SvgIcons";
import { windowHeight, windowWidth } from "../Constants/Constants";
import { useColorScheme } from "react-native";
import { GetStyles } from "../Theme/AppStyles";
import Colors from "../Theme/Colors";
import Fonts from "../Assets/Fonts/Index";
import { Icons } from "../Assets/Images/Index";


const MediaOptions = ({
    visible,
    onRequestClose,
    selectedOption = () => { }
}) => {

    const scheme = useColorScheme()
    const AppStyles = GetStyles(scheme)
    const AppColors = Colors(scheme)
  
    const styles = StyleSheet.create({

        mainContainer: {
            width: windowWidth,
            height: windowHeight,
            position: 'absolute',
            bottom: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.7)'
        },
        subContainer: {
            width: windowWidth,
            height: windowHeight / 3.7,
            position: 'absolute',
            bottom: 0,
            zIndex: 9999,
        },
        modalContainer: {
            width: windowWidth,
            height: windowHeight / 5,
            backgroundColor: AppColors.White,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: vs(20),
            paddingHorizontal: s(13),
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            zIndex: 9999
    
        },
        closeContainer: {
            height: s(42),
            width: s(42),
            borderRadius: s(42),
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: AppColors.Black,
            zIndex: 999
        },
        viewWrapper: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.2)'
        },
    
    });
    

    const options = [
        {
            id: '2',
            title: 'Camera',
            icon: Icons.Camera
        },
        {
            id: '3',
            title: 'Gallery',
            icon: Icons.Gallery
        }
    ]

    return (
        <Modal
            animationType='slide'
            visible={visible}
            transparent
            presentationStyle='overFullScreen'
        >

            <View style={styles.mainContainer}>

                <View style={styles.subContainer}>
                    <TouchableOpacity
                        onPress={onRequestClose}
                        style={styles.closeContainer}
                    >
                        <SvgXml xml={_Cross} height={vs(32)} width={s(32)} />
                    </TouchableOpacity>
                    <View style={styles.modalContainer}>

                        <View
                            style={{
                                flexDirection: 'row',
                                width: '100%',
                                flexWrap: 'wrap',
                                alignSelf: 'center',
                                justifyContent: 'center'
                            }}>
                            {
                                options.map((item, index) => {
                                    return (
                                        <View style={{ alignItems: 'center', marginLeft: index == 0 ? 0 : (windowWidth * 8) / 100 }}>
                                            <TouchableOpacity
                                                disabled={(item.id == '4') ? true : false}
                                                activeOpacity={0.8}
                                                onPress={() => {
                                                    selectedOption(item.id)
                                                }}
                                                style={{
                                                    marginBottom: (windowWidth * 2) / 100,
                                                    height: (windowWidth * 14) / 100,
                                                    width: (windowWidth * 14) / 100,
                                                    borderRadius: 100,
                                                    backgroundColor: AppColors.Background,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>

                                                <Image
                                                    resizeMode="contain"
                                                    source={item.icon}
                                                    style={{
                                                        width: (windowWidth * 6) / 100,
                                                        height: (windowWidth * 6) / 100,
                                                        tintColor:(item.id == '4') ? AppColors.Grey: AppColors.Primary
                                                    }}
                                                />
                                            </TouchableOpacity>
                                            <Text style={{
                                                fontFamily: Fonts.Medium,
                                                fontSize: 10,
                                                color: AppColors.Black
                                            }}>
                                                {item.title}
                                            </Text>
                                        </View>
                                    )
                                })
                            }
                        </View>

                    </View>
                </View>

            </View>

        </Modal>

    )
}

export default MediaOptions;


