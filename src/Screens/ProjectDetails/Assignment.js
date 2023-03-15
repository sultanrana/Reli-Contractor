import React, { useEffect, useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SectionList, FlatList } from 'react-native';

import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import ProjectBoxWithService from '../../Components/ProjectBoxWithService';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import StaffItemBox from '../../Components/StaffItemBox';
import { handleGetStaffData, handlePostAssigneeData } from '../../API/Config';
import { IMAGES_URL } from '../../API/Constants';
import { vs } from 'react-native-size-matters';
import DateSchedule from '../../Components/DateSchedule';
import { ProjectStatuses } from '../../Constants/ProjectStatus';

const Assignment = ({ navigation, route }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const [isLoading, setIsLoading] = useState(false)
  const [isListLoading, setIsListLoading] = useState(false)
  const [staffData, setStaffData] = useState([])

  const { token, userData } = useSelector(state => state.Index)

  const { id, details } = useSelector(({ Projects }) => Projects)

  const isFocused = useIsFocused()


  useEffect(() => {
    if (isFocused) {

      if(details?.orderStatus === ProjectStatuses.Unassigned || details?.orderStatus === ProjectStatuses.Scheduled || details?.orderStatus === ProjectStatuses.Pending){
        getStaff()
      } else {
        SimpleToast.show(`Project has already been ${details?.orderStatus?.toLowerCase()}`)
        navigation.navigate('Overview')
      }

    }
  }, [isFocused])

  // const { id, date, location } = route?.params


  const getStaff = async () => {
    setIsLoading(true)
    handleGetStaffData(token, userData?.company).then(({ data }) => {
      console.log('Staff Data', data);
      setStaffData(data)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const onClaim = (staffID) => {
    setIsLoading(true)
    console.log({staffID});
    handlePostAssigneeData(token, id, ProjectStatuses.Assigned, details?.dateSelection[0], staffID).then(res => {
      console.log('Assignment Response', res);
      setIsLoading(false)
      navigation.navigate('Overview')
    }).catch(() => {
      setIsLoading(false)
    })
  }

  const renderHeader = () => {
    return (
      <View style={{
        height: vs(160),
        padding: vs(4),
        marginBottom: vs(16)
      }}>

        <View style={{
          height: '98%',
          width: '98%',
          borderRadius: vs(8),
          // backgroundColor: '#E0E0E0',
          backgroundColor: '#FAFAFA',
          padding: vs(8),
          flexDirection: 'row',
          alignItems: 'center'
        }}>

          <DateSchedule 
          clickable={false}
          index={1}
          selectedDateIndex={0}
          item={details?.dateSelection[0]}
          />

          <View style={{
            flex: 1,
            height: '100%',
            paddingLeft: vs(12),
            paddingRight: vs(6),
            paddingVertical: vs(18),
            justifyContent: 'space-evenly'
          }}>

            <Text style={{
              fontFamily: Fonts.SemiBold,
              color: AppColors.BackgroundInverse,
              fontSize: vs(11)
            }} allowFontScaling={false} >
              {`PROJECT ID\n${id}`}
            </Text>

            <Text style={{
              fontFamily: Fonts.Light,
              color: AppColors.BackgroundInverse,
              fontSize: vs(9)
            }} allowFontScaling={false} >
              {`[ Location Required from Backend ]`}
            </Text>

          </View>

        </View>

      </View>
    )
  }


  return (
    <View style={[AppStyles.ProjectDetailsScreen]}>

      <Loader loading={isLoading} />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={staffData}
        renderItem={({ item }) => (
          <StaffItemBox navigation={navigation} name={item?.name} image={{ uri: IMAGES_URL + item?.image }} onClaim={onClaim} id={item?._id} />
        )}
        keyExtractor={(item, index) => 'stf' + index}
        contentContainerStyle={{ paddingBottom: '30%' }}
        style={{
          flexGrow: 0,
        }}
        ItemSeparatorComponent={() => (
          <View style={{ marginVertical: 4 }} />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={() => (
          <>
            {
              !isLoading &&
              <Text style={{
                fontFamily: Fonts.Light,
                fontSize: FontSize.medium,
                color: AppColors.DarkGrey,
                marginTop: vs(50),
                alignSelf: 'center',
                textAlign: 'center'
              }}>
              {'No Staff Member Found'}
              </Text>
            }
          </>
        )}
      />

    </View>
  );

}

export default Assignment;
