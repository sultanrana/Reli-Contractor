import React, { useState } from 'react';
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




const Schedule = ({ navigation }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)


  const renderDateItem = ({ item, index }) => {
    return (
      <ProjectBoxWithDate
        navigation={navigation}
        title={item?.title}
        subtitle1={item?.subtitle1}
        subtitle2={item?.subtitle2}
        imageURL1={item?.image1}
        imageURL2={item?.image2}
        clickable={false}
      />
    )
  }


  const Data = [
    {
      title: 'Today',
      renderItem: renderDateItem,
      data: [
        {
          title: "2x Sliding Glass Doors",
          subtitle1: "2900 Bristol St, Costa Mesa, CA 92626",
          subtitle2: "Aug 22 , Aug 23, or Sep 1",
          image1: 'https://i.pinimg.com/originals/12/67/53/1267531a1311c4cee2f2dccf3c1e859f.jpg',
          image2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7feXDTg1C4M-etlgJPBLw58boVDIMis4-HoHfElg5N0_rbeLuyvi_4WwuxfuhrjE-R4&usqp=CAU'
        },
        {
          title: "2x Sliding Glass Doors",
          subtitle1: "2900 Bristol St, Costa Mesa, CA 92626",
          subtitle2: "Aug 22 , Aug 23, or Sep 1",
          image1: 'https://i.pinimg.com/originals/12/67/53/1267531a1311c4cee2f2dccf3c1e859f.jpg',
          image2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7feXDTg1C4M-etlgJPBLw58boVDIMis4-HoHfElg5N0_rbeLuyvi_4WwuxfuhrjE-R4&usqp=CAU'
        },
        {
          title: "2x Sliding Glass Doors",
          subtitle1: "2900 Bristol St, Costa Mesa, CA 92626",
          subtitle2: "Aug 22 , Aug 23, or Sep 1",
          image1: 'https://i.pinimg.com/originals/12/67/53/1267531a1311c4cee2f2dccf3c1e859f.jpg',
          image2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7feXDTg1C4M-etlgJPBLw58boVDIMis4-HoHfElg5N0_rbeLuyvi_4WwuxfuhrjE-R4&usqp=CAU'
        },
      ]
    },
    {
      title: 'Wednesday Oct,06',
      renderItem: renderDateItem,
      data: [
        {
          title: "2x Sliding Glass Doors",
          subtitle1: "2900 Bristol St, Costa Mesa, CA 92626",
          subtitle2: "Aug 22 , Aug 23, or Sep 1",
          image1: 'https://i.pinimg.com/originals/12/67/53/1267531a1311c4cee2f2dccf3c1e859f.jpg',
          image2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7feXDTg1C4M-etlgJPBLw58boVDIMis4-HoHfElg5N0_rbeLuyvi_4WwuxfuhrjE-R4&usqp=CAU'
        },
        {
          title: "2x Sliding Glass Doors",
          subtitle1: "2900 Bristol St, Costa Mesa, CA 92626",
          subtitle2: "Aug 22 , Aug 23, or Sep 1",
          image1: 'https://i.pinimg.com/originals/12/67/53/1267531a1311c4cee2f2dccf3c1e859f.jpg',
          image2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7feXDTg1C4M-etlgJPBLw58boVDIMis4-HoHfElg5N0_rbeLuyvi_4WwuxfuhrjE-R4&usqp=CAU'
        },
        {
          title: "2x Sliding Glass Doors",
          subtitle1: "2900 Bristol St, Costa Mesa, CA 92626",
          subtitle2: "Aug 22 , Aug 23, or Sep 1",
          image1: 'https://i.pinimg.com/originals/12/67/53/1267531a1311c4cee2f2dccf3c1e859f.jpg',
          image2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7feXDTg1C4M-etlgJPBLw58boVDIMis4-HoHfElg5N0_rbeLuyvi_4WwuxfuhrjE-R4&usqp=CAU'
        },
      ]
    }
  ]

  return (
    <View style={[AppStyles.Screen, AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle]}>

      <SectionList
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        sections={Data}
        keyExtractor={(item, index) => 'cis' + index}
        renderItem={({ section: { renderItem } }) => { renderItem }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{
            fontFamily: Fonts.SemiBold,
            fontSize: FontSize.xxlarge,
            color: AppColors.TextTitle,
            // marginTop:50
          }}>
            {title}
          </Text>
        )}
        ItemSeparatorComponent={() => {
          return <View style={{ marginVertical: 4 }} />
        }}
        SectionSeparatorComponent={() => {
          return <View style={{ marginTop: 8 }} />
        }}
        contentContainerStyle={{ paddingBottom: 10 }}
      />


    </View>
  );

}

export default Schedule;
