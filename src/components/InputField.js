import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from '../Theme/Colors';
import Fonts from '../Assets/Fonts/Index';
import { FontSize } from '../Theme/FontSize';

const InputField =
  ({
    leftIcon,
    rightIcon,
    placeholder,
    value,
    onChangeText,
    password,
    autoCapitalize,
    isRightIcon,
    labelStyle,
    keyboardType,
    returnKeyType,
    onSubmitEditing,
    fieldRef,
    customStyle,
    rightIconOnPress,
    label,
    multiline,
    rightIconStyle,
    editable,
    maxLength,
    isTitle = true,
    title,
    error,
    scheme = 'light',
    onFocus = () => { }
  }) => {

    const [isFocused, setIsFocused] = useState(true)


    const styles = StyleSheet.create({

      mainContainer: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: Colors(scheme).White,
        borderWidth: 0.75,
        borderColor: Colors(scheme).Black,
        paddingHorizontal: 8,
        elevation: 0,
        borderRadius: 8,
        height: 56
      },
      icon: {
        height: '100%',
        width: '12%',
        paddingVertical: 12,
        alignItems: 'center',
      },
      passwordIcon: {
        height: '100%',
        width: '12%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      input: {
        height: '100%',
      },
      leftIconStyle: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        tintColor: Colors(scheme).Primary
      },
      rightIconStyle: {
        height: 19,
        width: 19,
        resizeMode: 'contain',
        tintColor: Colors(scheme).Secondary
      },
    });

    return (

      <View style={{ height: multiline? 190: 110, justifyContent: 'flex-start', flexDirection: 'column'}}>
        {
          (isTitle && title !== '') &&
          <View style={{
            margin: 4,

          }}>
            <Text allowFontScaling={false} style={{ fontSize: FontSize.medium, color: Colors(scheme).Black, fontFamily: Fonts.SemiBold }}>{title}</Text>
          </View>
        }
        <View style={[styles.mainContainer, customStyle]}>

          {
            leftIcon &&
            <View style={[styles.icon, { justifyContent: multiline ? 'flex-start' : 'center' }]}>
              <Image source={leftIcon} style={styles.leftIconStyle} />
            </View>
          }
          {
            label &&
            <Text allowFontScaling={false}>{label}</Text>
          }
          <View style={[styles.input, {
            width: isRightIcon ? '88%' : '100%',
            justifyContent: multiline ? 'flex-start' : 'center'
          }]}>
            <TextInput
              allowFontScaling={false}
              style={{ fontSize: 14, fontFamily: Fonts.Regular, color: Colors(scheme).TextTitle }}
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeText}
              onFocus={() => {
                onFocus()
                setIsFocused(true)
              }}
              onBlur={()=>{
                setIsFocused(false)
              }}
              secureTextEntry={password}
              placeholderTextColor={Colors(scheme).Grey}
              autoCapitalize={autoCapitalize}
              keyboardType={keyboardType}
              returnKeyType={returnKeyType}
              onSubmitEditing={onSubmitEditing}
              multiline={multiline}
              editable={editable}
              ref={fieldRef}
              blurOnSubmit={false}
              maxLength={maxLength}

            />
          </View>

          {
            isRightIcon &&
            <View style={styles.passwordIcon}>
              <TouchableOpacity
                onPress={rightIconOnPress}
                activeOpacity={0.4}
              >
                <Image source={rightIcon} style={[styles.rightIconStyle]} />
              </TouchableOpacity>
            </View>
          }

        </View>
        {
         error &&
          <View style={{
            margin: 4,
          }}>
            <Text allowFontScaling={false} style={{ fontSize: FontSize.small, color: 'red', fontFamily: Fonts.Medium }}>{error}</Text>
          </View>
        }

      </View>



    )
  };

export default InputField;

