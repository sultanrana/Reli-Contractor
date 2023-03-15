import React, { useEffect, useState } from 'react';
import { View, useColorScheme, SectionList, Text } from 'react-native';
import Colors, { colors } from '../../Theme/Colors';
import { GetStyles } from '../../Theme/AppStyles';
import ProjectBoxWithService from '../../Components/ProjectBoxWithService';
import { Images } from '../../Assets/Images/Index';
import { useSelector } from 'react-redux';
import { handleGetAllAvailableProjects } from '../../API/Config';
import { IMAGES_URL } from '../../API/Constants';
import moment from 'moment-timezone';
import Loader from '../../Components/Loader'
import { vs } from 'react-native-size-matters';
import Fonts from '../../Assets/Fonts/Index';
import { FontSize } from '../../Theme/FontSize';

const AvailableProjects = ({ navigation }) => {

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const [loading, setLoading] = useState(true)
  const [projectData, setProjectData] = useState([])
  const { id, details } = useSelector(({ Projects }) => Projects)
  const { token } = useSelector(({ Index }) => Index)


  useEffect(() => {
    handleGetAllAvailableProjects(token).then(({ data }) => {
      setProjectData(data?.length > 0 ? data : [])
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  const renderServiceItem = ({ item, index }) => {

    const details = item?.orderdetails[0]
    const dateMap = item?.dateSelection.map((d, i) => {
      return (i === item?.dateSelection?.length - 1 ? 'or ' : '') + (moment(d).format('MMM DD'))
    }).join(', ')

    return (
      <ProjectBoxWithService
        navigation={navigation}
        id={item?._id}
        title={details?.serviceName}
        subtitle1={'-'}
        subtitle2={dateMap}
        imageURL1={Images.House}
        imageURL2={details?.images?.length > 0 ? IMAGES_URL + details?.images[0] : ''}
      />
    )
  }

  const Data = [
    {
      title: '',
      renderItem: renderServiceItem,
      data: projectData
    },
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
                {'No Available Projects'}
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

export default AvailableProjects;
