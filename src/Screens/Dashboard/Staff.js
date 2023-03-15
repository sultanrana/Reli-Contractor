import React, { useEffect, useState } from 'react';
import { View, useColorScheme, FlatList } from 'react-native';
import LogoOver from '../../Components/LogoOver';
import Colors, { colors } from '../../Theme/Colors';
import { GetStyles } from '../../Theme/AppStyles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StaffItemBox from '../../Components/StaffItemBox'
import { Images } from '../../Assets/Images/Index';
import { useIsFocused } from '@react-navigation/native';
import { handleGetStaffData } from '../../API/Config';
import { useSelector } from 'react-redux';
import { IMAGES_URL } from '../../API/Constants';
import Loader from '../../Components/Loader';
import { Text } from 'react-native';
import Fonts from '../../Assets/Fonts/Index';
import { vs } from 'react-native-size-matters';
import { FontSize } from '../../Theme/FontSize';

const Tabs = createMaterialTopTabNavigator()

const STAFF_MEMBERS_DATA = [
  { image: Images.Dummy1, name: 'John Doe' },
  { image: Images.Dummy2, name: 'Jane Cooper' },
  { image: Images.Dummy3, name: 'Esther Howard' },
  { image: Images.Dummy4, name: 'Leslie Alexander' },
  { image: Images.Dummy5, name: 'Kristin Watson' },
  { image: Images.Dummy7, name: 'Cameron Williamson' },
  { image: Images.Dummy6, name: 'Robert Fox' },
  { image: Images.Dummy8, name: 'Cody Fisher' },
]

const Staff = ({ navigation }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const [isLoading, setIsLoading] = useState(false)
  const [isListLoading, setIsListLoading] = useState(false)
  const [staffData, setStaffData] = useState([])

  const { token, userData } = useSelector(state => state.Index)

  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) {
      getStaff()
    }
  }, [isFocused])

  console.log('User Data', userData);

  const getStaff = async () => {
    // setIsLoading(is => ((!actionNeeded || !claim) && !is))
    setIsLoading(true)
    handleGetStaffData(token, userData?.company).then(({ data }) => {
      console.log('Staff Data', data);
      setStaffData(data)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <View style={[AppStyles.Screen, AppStyles.CommonScreenStyles, { backgroundColor: AppColors.White }]}>
      <LogoOver navigation={navigation} shouldShowBack={false} bgWhite />
      <Loader loading={isLoading} />
      <View style={[AppStyles.HorizontalStyle, { paddingTop: 16 }]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={staffData}
          renderItem={({ item }) => (
            <StaffItemBox navigation={navigation} name={item?.name} image={{ uri: IMAGES_URL + item?.image }} id={item?._id} />
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
            handleGetStaffData(token, '6374e8ee44b48004449be4f5').then(({ data }) => {
              setStaffData(data)
            }).finally(() => {
              setIsListLoading(false)
            })
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
