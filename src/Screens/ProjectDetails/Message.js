import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import {
  Text,
  View,
  Image, StyleSheet,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from 'react-native';


import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { Icons } from '../../Assets/Images/Index';

const Message = ({ navigation }) => {

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const styles = StyleSheet.create({

    bottomContainer: {
      width: '100%',
      height:70,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: AppColors.White,
      shadowColor: AppColors.BlackGreyish,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.16,
      position: 'absolute',
      bottom: 0,
      right:0,
      left:0,
      shadowRadius: 6,
      paddingVertical: 14,
      paddingHorizontal: 18,
    },
    mainTitle: {
      fontFamily: Fonts.SemiBold,
      fontSize: FontSize.xlarge,
      color: AppColors.TextTitle,
    },
    inputContainer: {
      // height:50,
      width: '100%',
      flexDirection: 'row',
      borderRadius: 50,
      backgroundColor: AppColors.Background
    },
    input: {
      // paddingVertical: 10,
      maxHeight: 150,
      width: '85%',
      paddingHorizontal: 20,
      alignItems:'center'
      
    },
    send: {
      paddingVertical: 10,
      height: '100%',
      width: '15%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    sendIcon: {
      height: 25,
      width: 25
    }

  })

  return (
    <View style={[AppStyles.CommonScreenStyles, { backgroundColor: AppColors.White, }]}>

      <KeyboardAvoidingView
        style={styles.bottomContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >

          <View style={styles.inputContainer}>
            <TextInput
              multiline={true}
              placeholder={'Type your message here...'}
              style={styles.input}
            />
            <View style={styles.send}>
              <Image source={Icons.Send} style={styles.sendIcon} resizeMode={'contain'} />
            </View>
          </View>

      </KeyboardAvoidingView>
    </View>
  );


}

export default Message;
