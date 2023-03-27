import React, { useEffect, useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SectionList } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import ProjectBoxWithDate from '../../Components/ProjectBoxWithDate';
import { Images } from '../../Assets/Images/Index';
import { useIsFocused } from '@react-navigation/native';
import { handleGetScheduledProjects } from '../../API/Config';
import { FlatList } from 'react-native';
import Loader from '../../Components/Loader';
import { useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { vs } from 'react-native-size-matters';




const Schedule = ({ navigation, route }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)
  const isFocused = useIsFocused()

  // const staffID = route?.params?.staffID

  const [loading, setLoading] = useState(true)
  const [listLoading, setListLoading] = useState(false)
  const [scheduledProjects, setScheduledProjects] = useState([])

  const { token, userData } = useSelector(({ Index }) => Index)

  const loadData = () => {
    handleGetScheduledProjects(token).then(({ data }) => {
      console.log('Scheduled', data);
      setScheduledProjects(data)
    }).finally(() => {
      setListLoading(false)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (isFocused) {
      loadData()
    }
  }, [isFocused])

  return (
    <View style={[AppStyles.Screen, AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle]}>

      <Loader loading={loading} />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={scheduledProjects}
        keyExtractor={(item, index) => 'cis' + index}
        renderItem={({ item, index }) => {
          const dateMap = item?.dateSelection.map((d, i) => {
            return (i === item?.dateSelection?.length - 1 ? 'or ' : '') + (moment(d).format('MMM DD'))
          }).join(', ')
          const details = (item?.orderdetails?.length > 1) ? item?.orderdetails[1] : (item?.orderdetails?.length > 0) ? item?.orderdetails[0] : { title: '' }

          return (
            <ProjectBoxWithDate
              navigation={navigation}
              id={item?._id}
              title={details?.serviceName}
              subtitle1={''}
              subtitle2={dateMap}
              imageURL1={Images.House}
              clickable
              calenderData={{
                date: moment(details?.createdAt).format('DD'),
                month: moment(details?.createdAt).format('MMM'),
                day: moment(details?.createdAt).format('ddd')
              }}
            />
          )
        }}
        ItemSeparatorComponent={() => {
          return <View style={{ marginVertical: 4 }} />
        }}
        contentContainerStyle={{ paddingBottom: 10 }}
        ListEmptyComponent={() => {
          return (
            <Text allowFontScaling={false} style={{
              fontFamily: Fonts.Light,
              fontSize: FontSize.medium,
              color: AppColors.DarkGrey,
              marginTop: vs(50),
              textAlign: 'center',
            }}>
              {'No Scheduled Projects'}
            </Text>
          )
        }}
        refreshing={listLoading}
        onRefresh={() => {
          setListLoading(true)
          loadData()
        }}
      />


    </View>
  );

}

export default Schedule;
