import React from 'react';
import SimpleToast from 'react-native-simple-toast';

import {
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import colors from '../Theme/Colors';
import Fonts from '../Assets/Fonts/Index';
import { FontSize } from '../Theme/FontSize';
import { TextInput } from 'react-native-paper';

const FloatingLabelInput =
  ({
    placeholder,
    value,
    onChangeText,
    autoCapitalize,
    labelStyle,
    keyboardType = 'default',
    returnKeyType = 'next',
    onSubmitEditing,
    fieldRef,
    customStyle,
    multiline,
    editable,
    maxLength,
    isError,
    errorText,
  }) => {
    const scheme = useColorScheme()
    const AppColors = colors(scheme)


    const styles = StyleSheet.create({

      input: {
        width: '100%',
        backgroundColor: colors(scheme).White,
        elevation: 0,
        borderRadius: 8,
        height: 56,
        marginTop: 30
      },
      icon: {
        height: '100%',
        width: '12%',
        paddingVertical: 12,
        alignItems: 'center',
      },
    });

    return (


      // <View style={[styles.mainContainer, customStyle]}>

      <TextInput
        allowFontScaling={false}
        label={placeholder}
        // placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        type='outlined'
        mode="outlined"
        outlineColor={AppColors.Black}
        activeOutlineColor={AppColors.Primary}
        style={[styles.input, customStyle]}
      />


      // </View>



    )
  };

export default FloatingLabelInput;

