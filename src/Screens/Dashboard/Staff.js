import React, { useEffect, useState } from 'react';
import { View, useColorScheme, FlatList } from 'react-native';
import LogoOver from '../../Components/LogoOver';
import Colors, { colors } from '../../Theme/Colors';
import { GetStyles } from '../../Theme/AppStyles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StaffItemBox from '../../Components/StaffItemBox'
import { setStaffList } from '../../Redux/Actions'
import { useIsFocused } from '@react-navigation/native';
import { handleGetStaffData } from '../../API/Config';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGES_URL } from '../../API/Constants';
import Loader from '../../Components/Loader';
import { Text } from 'react-native';
import Fonts from '../../Assets/Fonts/Index';
import { vs } from 'react-native-size-matters';
import { FontSize } from '../../Theme/FontSize';

const Tabs = createMaterialTopTabNavigator()

const Staff = ({ navigation }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const { list } = useSelector(({Staff}) => Staff)
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(list.length === 0)
  const [isListLoading, setIsListLoading] = useState(false)

  const { token, userData } = useSelector(state => state.Index)

  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) {
      getStaff()
    }
  }, [isFocused])

  const getStaff = async () => {
    console.log('Staff Data is Loading');
    handleGetStaffData(token, userData?.company).then(({ data }) => {
      dispatch(setStaffList(data))
    }).finally(() => {
      setIsLoading(false)
      setIsListLoading(false)
    })
  }

  return (
    <View style={[AppStyles.Screen, AppStyles.CommonScreenStyles, { backgroundColor: AppColors.White }]}>
      <LogoOver navigation={navigation} shouldShowBack={false} bgWhite />
      <Loader loading={isLoading} />
      <View style={[AppStyles.HorizontalStyle, { paddingTop: 16 }]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={list}
          renderItem={({ item }) => (
            <StaffItemBox navigation={navigation}
              name={item?.firstName + ' ' + item?.lastName}
              image={(item?.profileImage != null && item?.profileImage != '') ? { uri: IMAGES_URL + item?.profileImage } : ''}
              id={item?._id}
              Item={item}
            />
          )}
          keyExtractor={(item, index) => 'stf' + index}
          contentContainerStyle={{ paddingBottom: '30%' }}
          style={{
            flexGrow: 0,
          }}
          ItemSeparatorComponent={() => (
            <View style={{ marginVertical: 4 }} />
          )}
          refreshing={isListLoading}
          onRefresh={() => {
            setIsListLoading(true)
            getStaff()
          }}
          ListEmptyComponent={() => (
            <>
              {
                !isLoading &&
                <Text style={{
                  fontFamily: Fonts.Light,
                  fontSize: FontSize.medium,
                  color: AppColors.DarkGrey,
                  marginTop: vs(50),
                  textAlign: 'center',
                  alignSelf: 'center',
                }}>
                  {'No Staff Member Found'}
                </Text>
              }
            </>
          )}
        />
      </View>
    </View>
  );

}

export default Staff;
