import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, FlatList } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import { FontSize } from '../../Theme/FontSize';
import { LayoutStyles } from '../../Theme/Layout';
import Colors from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeBaseProvider } from 'native-base';

const servicesList = [
  {
    key: '1',
    title: 'Windows',
    image: 'https://icon-library.com/images/open-windows-icon/open-windows-icon-9.jpg'
  },
  {
    key: '2',
    title: 'Glass Doors',
    image: 'https://cdn3.vectorstock.com/i/1000x1000/82/97/glass-door-icon-image-vector-19068297.jpg'
  },
  {
    key: '3',
    title: 'Interior Doors',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7feXDTg1C4M-etlgJPBLw58boVDIMis4-HoHfElg5N0_rbeLuyvi_4WwuxfuhrjE-R4&usqp=CAU'
  },
];

const SignupTertiary = ({ navigation, route }) => {

  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [travel, setTravel] = useState('');

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)



  const ServiceBox = ({
    imageURL,
    title,
  }) => {
    return (
      <View style={{
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
        backgroundColor: '#E0E0E0',
        padding: 4,
        width: '45%',
        height: 164,
        borderRadius: 16
      }}>

        <View style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: AppColors.White,
          padding: 1
        }}>
          <Image source={{ uri: imageURL }} resizeMode='contain' resizeMethod='resize' style={{
            height: 96,
            width: 96
          }} />
        </View>

        <View style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 2
        }}>
          <Text style={{
            color: AppColors.TextTitle,
            fontSize: FontSize.xxlarge,
            fontFamily: Fonts.Bold,
            textAlign: 'center',
            textAlignVertical: 'center'
          }}>{title}</Text>
        </View>

      </View>
    )
  }

  const { email, password, firstname, lastname } = route?.params

  const onSubmit = () => {
    navigation.navigate(References.InfoSubmitted);
  }

  return (
    <View style={[AppStyles.Screen, AppStyles.AuthScreens]}>
      <LogoOver navigation={navigation} shouldShowBack={true} />
      <Text style={[AppStyles.AuthScreenTitle]}>
        What services can you offer?
      </Text>

      <FlatList
            scrollEnabled={true}
            data={servicesList}
            style={{
              alignSelf: 'center'
            }}
            renderItem={({ item }) => (
              <ServiceBox title={item?.title} imageURL={item?.image} />
            )}
            numColumns={'2'}
            ListFooterComponent={
              () => {
                return (
                  <View style={{
                    marginVertical: 16
                  }}>
                    <ContainedButton
                      onPress={onSubmit}
                      label="Continue"
                    />
                    <TouchableOpacity onPress={() => navigation.replace(References.LoginPrimary)} style={{ alignSelf: 'center' }}>
                      <Text style={{ marginTop: 30, color: Colors(scheme).Text, fontFamily: Fonts.Light }}>
                        Already have an account?
                        <Text style={{ color: Colors(scheme).Primary, fontFamily: Fonts.Medium }}> Sign In</Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              }
            }
          />

    </View>
  );

}

export default SignupTertiary;
