import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, FlatList, Dimensions, SafeAreaView } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import { FontSize } from '../../Theme/FontSize';
import { Images } from '../../Assets/Images/Index';
import Colors from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';

const servicesList = [
  {
    key: '1',
    title: 'Windows',
    image: 'https://icon-library.com/images/open-windows-icon/open-windows-icon-9.jpg'
  },
  {
    key: '2',
    title: 'Sliding Glass Doors',
    image: 'https://cdn3.vectorstock.com/i/1000x1000/82/97/glass-door-icon-image-vector-19068297.jpg'
  },
  {
    key: '3',
    title: 'Interior Doors',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7feXDTg1C4M-etlgJPBLw58boVDIMis4-HoHfElg5N0_rbeLuyvi_4WwuxfuhrjE-R4&usqp=CAU'
  },

];
const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

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
    Index
  }) => {
    return (
      <View style={{
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1.9%',
        backgroundColor: '#E0E0E0',
        width: screenWidth / 2.3,
        borderRadius: 16,
        height: 200,
        paddingHorizontal: 8,
        paddingVertical: 8
      }}>

        <View style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: AppColors.White,
          height: '65%',
          width: '100%',
          borderRadius: 12
        }}>
          <Image source={Index == 0 ? Images.Window : Index == 1 ? Images.SlidingDoor : Images.InteriorDoor} resizeMode='contain' resizeMethod='resize' style={{
            height: 96,
            width: 96
          }} />
        </View>

        <View style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          height: '35%',
          width: '100%',
        }}>
          <Text style={{
            color: AppColors.TextTitle,
            fontSize: FontSize.xlarge,
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
    <SafeAreaView style={[AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} shouldShowBack={true} />
      <View style={[AppStyles.CommonScreenStyles,AppStyles.HorizontalStyle]}>

        <FlatList
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          data={servicesList}
          style={{
            width: '100%',
            alignSelf: 'center',
          }}
          renderItem={({ item, index }) => (
            <ServiceBox title={item?.title} imageURL={item?.image} Index={index} />
          )}
          contentContainerStyle={{ paddingBottom: 50 }}
          // ItemSeparatorComponent={()=>{
          //   return <View style={{height:24, width:24}}></View>
          // }}
          numColumns={2}
          ListHeaderComponent={() => {
            return (
              <Text style={[AppStyles.AuthScreenTitle]}>
                What services can you offer?
              </Text>
            )
          }}
          ListFooterComponent={
            () => {
              return (
                <View style={{ width: '100%', marginTop:12, alignSelf: 'center' }}>

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
    </SafeAreaView>
  );

}

export default SignupTertiary;
