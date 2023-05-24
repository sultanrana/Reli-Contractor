import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SectionList } from 'react-native';
import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import ProjectBoxWithDate from '../../Components/ProjectBoxWithDate';
import { Images } from '../../Assets/Images/Index';
import { useSelector } from 'react-redux';
import { handleGetAllActiveProjects } from '../../API/Config';
import Loader from '../../Components/Loader';
import { vs } from 'react-native-size-matters';
import moment from 'moment-timezone';
import { useIsFocused } from '@react-navigation/native';

const ActiveProjects = ({ navigation }) => {

  const { id, details } = useSelector(({ Projects }) => Projects)
  const { token } = useSelector(({ Index }) => Index)
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const [loading, setLoading] = useState(true)
  const [projectData, setProjectData] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
      handleGetAllActiveProjects(token).then(({ data }) => {
        setProjectData(data?.length > 0 ? data : [])
      }).finally(() => {
        setLoading(false)
      })
  }, [])

  const renderDateItem = ({ item, index }) => {
    const details = item?.orderdetails[0]
    const dateMap = item?.dateSelection.map((d, i) => {
      return (i === item?.dateSelection?.length - 1 ? 'or ' : '') + (moment(d).format('MMM DD'))
    }).join(', ')

    return (
      <ProjectBoxWithDate
        navigation={navigation}
        id={item?._id}
        title={details?.serviceName}
        subtitle1={item?.orderdetails[0]?.property?.addressOne}
        subtitle2={dateMap}
        imageURL1={Images.House}
        calenderData={{
          date: moment(details?.createdAt).format('DD'),
          month: moment(details?.createdAt).format('MMM'),
          day: moment(details?.createdAt).format('ddd')
        }}
      />
    )
  }

  const Data = [
    {
      title: '',
      renderItem: renderDateItem,
      data: projectData
    }
  ]

  return (
    <View style={[AppStyles.HorizontalStyle, AppStyles.CommonScreenStyles, { backgroundColor: AppColors.Background, paddingTop: 10 }]}>
      <Loader loading={loading} />

      <SectionList
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        sections={Data}
        keyExtractor={(item, index) => 'ci' + index}
        renderItem={({ section: { renderItem } }) => { renderItem }}
        ItemSeparatorComponent={() => {
          return <View style={{ marginVertical: 4 }} />
        }}
        contentContainerStyle={{ paddingBottom: 10 }}
        renderSectionFooter={({ section }) => {
          if (section.data.length == 0 && !loading) {
            return (
              <Text allowFontScaling={false} style={{
                fontFamily: Fonts.Light,
                fontSize: FontSize.medium,
                color: AppColors.DarkGrey,
                marginTop: vs(50),
                textAlign: 'center',
              }}>
                {'No Active Projects'}
              </Text>
            )
          }
          return (
            <></>
          )
        }}
      />
    </View>
  );

}

export default ActiveProjects;
