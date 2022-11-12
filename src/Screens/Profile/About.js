import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SectionList, FlatList } from 'react-native';


import Colors, { colors } from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import OutlinedButton from '../../Components/OutlinedButton';
import ContainedButton from '../../Components/ContainedButton';
import { FontSize } from '../../Theme/FontSize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/Actions';

const About = ({ navigation }) => {

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)
  const dispatch = useDispatch()

  const onLogout = async () => {
    await AsyncStorage.removeItem('token').then(() => {
      dispatch(logout())
      navigation.reset({
        index: 0,
        routes: [{ name: References.AuthenticationStack }],
      })
    })
  }

  const onDeleteAccount = () => {

  }

  const styles = StyleSheet.create({
    DeleteBtn: {
      fontFamily: Fonts.Regular,
      fontSize: FontSize.xlarge,
      color: AppColors.Danger,
      alignSelf: 'center',
      marginTop: 25
    }
  })

  const ButtonsData = [
    {
      id: '1',
      title: 'Location'
    },
    {
      id: '2',
      title: 'Account Details'
    },
    {
      id: '3',
      title: 'Change Password'
    },
    {
      id: '4',
      title: 'Phone Number'
    },
  ]

  const renderBtn = ({ item }) => {
    return (
      <OutlinedButton
        label={item.title}
        rightIcon={true}
        navigation={navigation}
      />
    )
  }

  const listFooterComponent = () => {
    return (
      <>
        <ContainedButton
          label="FAQ"
          style={{ marginTop: 29 }}
        />
        <ContainedButton
          label="Contact Us"
          style={{ marginTop: 16, backgroundColor: AppColors.Black }}
          onPress={() => navigation.navigate(References.ContactUs)}
        />
        <OutlinedButton
          label={'Privacy'}
          style={{ marginTop: 16, }}
        />
        <OutlinedButton
          label={'Terms'}
          style={{ marginTop: 16, }}
        />
        <TouchableOpacity onPress={onLogout}>
          <Text allowFontScaling={false} style={[styles.DeleteBtn, {
            color: AppColors.Primary
          }]}>
            {'Logout'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDeleteAccount}>
          <Text allowFontScaling={false} style={styles.DeleteBtn}>{'Delete Account'}</Text>
        </TouchableOpacity>
      </>
    )
  }

  return (
    <View style={[AppStyles.HorizontalStyle, AppStyles.CommonScreenStyles, { backgroundColor: AppColors.White, paddingTop: 10 }]}>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={ButtonsData}
        renderItem={renderBtn}
        keyExtractor={(item, index) => 'btn' + index}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 16 }} />
        }}
        ListFooterComponent={listFooterComponent}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </View>
  );

}

export default About;
