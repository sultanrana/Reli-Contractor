import React from 'react';
import {
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Colors from '../Theme/Colors';
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
  }) => {
    const scheme = useColorScheme()
    const AppColors = Colors(scheme)


    const styles = StyleSheet.create({

      input: {
        width: '100%',
        backgroundColor: AppColors.White,
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


      // <View style={{ height:110, justifyContent: 'flex-start', flexDirection: 'column', backgroundColor:'yellow'}}>


        <TextInput
          // style={{ fontSize: 14, fontFamily: Fonts.Regular, color: Colors(scheme).TextTitle }}
          ref={fieldRef}
          allowFontScaling={false}
          label={placeholder}
          returnKeyType={returnKeyType}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
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

