import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SectionList, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


import Colors, { colors } from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import OutlinedButton from '../../Components/OutlinedButton';
import ContainedButton from '../../Components/ContainedButton';
import { FontSize } from '../../Theme/FontSize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout, setAuthToken } from '../../Redux/Actions';
import { handleDeleteAccount } from '../../API/Config';
import { Alert } from 'react-native';

const About = ({ navigation }) => {

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const { userData } = useSelector(state => state.Index)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  //   console.log({userData});
  // }, [])

  const onLogout = async () => {
    setIsLoading(true)
    await AsyncStorage.removeItem('token').then(async () => {
      await AsyncStorage.removeItem('newMsg')
      dispatch(logout())
      dispatch(setAuthToken(null))
      setTimeout(() => {
        setIsLoading(false)
        navigation.reset({
          index: 0,
          routes: [{ name: References.AuthenticationStack }],
        })
      }, 1000);
    })
  }

  const showDeleteDialog = () => {
    Alert.alert(
      "Delete Account!",
      'Are you sure you want to delete your account?',
      [
        {
          text: 'NO',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            onDeleteAccount()
          },
        },
      ],
      { cancelable: false },
    )
  }

  const onDeleteAccount = async () => {
    await AsyncStorage.removeItem('newMsg')
    handleDeleteAccount(userData?._id).then((res) => {
      SimpleToast.show(res?.message)
      dispatch(logout())
      dispatch(setAuthToken(null))
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setIsLoading(false)
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: References.AuthenticationStack }],
        })
      }, 250);
    })
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
        {/* <TouchableOpacity onPress={onLogout}>
          <Text allowFontScaling={false} style={[styles.DeleteBtn, {
            color: AppColors.Primary
          }]}>
            {'Logout'}
          </Text>
        </TouchableOpacity> */}
        <ContainedButton
          label="Logout"
          style={{ marginTop: 16 }}
          onPress={onLogout}
          loading={isLoading}
        />
        <TouchableOpacity onPress={showDeleteDialog}>
          <Text allowFontScaling={false} style={styles.DeleteBtn}>{'Delete Account'}</Text>
        </TouchableOpacity>
      </>
    )
  }

  return (
    <View
      pointerEvents={isLoading ? 'none' : 'auto'}
      style={[AppStyles.HorizontalStyle, AppStyles.CommonScreenStyles, { backgroundColor: AppColors.White, paddingTop: 10 }]}>

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
