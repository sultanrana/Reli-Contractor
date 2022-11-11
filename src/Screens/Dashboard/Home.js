import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SectionList, SafeAreaView, } from 'react-native';

// ------------------------------------------
import LogoOver from '../../Components/LogoOver';
import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import ProjectBoxWithService from '../../Components/ProjectBoxWithService';
import ProjectBoxWithDate from '../../Components/ProjectBoxWithDate';
import { Images } from '../../Assets/Images/Index';

const Home = ({ navigation }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const renderServiceItem = ({ item, index }) => {
    return (
      <ProjectBoxWithService
        navigation={navigation}
        title={item?.title}
        subtitle1={item?.subtitle1}
        subtitle2={item?.subtitle2}
        imageURL1={item?.image1}
        imageURL2={item?.image2}
      />
    )
  }
  const renderDateItem = ({ item, index }) => {
    return (
      <ProjectBoxWithDate
        navigation={navigation}
        title={item?.title}
        subtitle1={item?.subtitle1}
        subtitle2={item?.subtitle2}
        imageURL1={item?.image1}
        imageURL2={item?.image2}
      />
    )
  }

  const Data = [
    {
      title: 'Claim Projects',
      renderItem: renderServiceItem,
      data: [
        {
          title: "2x Sliding Glass Doors",
          subtitle1: "2900 Bristol St, Costa Mesa, CA 92626",
          subtitle2: "Aug 22 , Aug 23, or Sep 1",
          image1: Images.House,
          image2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7feXDTg1C4M-etlgJPBLw58boVDIMis4-HoHfElg5N0_rbeLuyvi_4WwuxfuhrjE-R4&usqp=CAU'
        },
        {
          title: "2x Sliding Glass Doors",
          subtitle1: "2900 Bristol St, Costa Mesa, CA 92626",
          subtitle2: "Aug 22 , Aug 23, or Sep 1",
          image1: Images.House,
          image2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7feXDTg1C4M-etlgJPBLw58boVDIMis4-HoHfElg5N0_rbeLuyvi_4WwuxfuhrjE-R4&usqp=CAU'
        },
        {
          title: "2x Sliding Glass Doors",
          subtitle1: "2900 Bristol St, Costa Mesa, CA 92626",
          subtitle2: "Aug 22 , Aug 23, or Sep 1",
          image1: Images.House,
          image2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7feXDTg1C4M-etlgJPBLw58boVDIMis4-HoHfElg5N0_rbeLuyvi_4WwuxfuhrjE-R4&usqp=CAU'
        },
      ]
    },
    {
      title: 'Action Needed',
      renderItem: renderDateItem,
      data: [
        {
          title: "2x Sliding Glass Doors",
          subtitle1: "2900 Bristol St, Costa Mesa, CA 92626",
          subtitle2: "Aug 22 , Aug 23, or Sep 1",
          image1: Images.House,
          image2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7feXDTg1C4M-etlgJPBLw58boVDIMis4-HoHfElg5N0_rbeLuyvi_4WwuxfuhrjE-R4&usqp=CAU'
        },
        {
          title: "2x Sliding Glass Doors",
          subtitle1: "2900 Bristol St, Costa Mesa, CA 92626",
          subtitle2: "Aug 22 , Aug 23, or Sep 1",
          image1: Images.House,
          image2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7feXDTg1C4M-etlgJPBLw58boVDIMis4-HoHfElg5N0_rbeLuyvi_4WwuxfuhrjE-R4&usqp=CAU'
        },
        {
          title: "2x Sliding Glass Doors",
          subtitle1: "2900 Bristol St, Costa Mesa, CA 92626",
          subtitle2: "Aug 22 , Aug 23, or Sep 1",
          image1: Images.House,
          image2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7feXDTg1C4M-etlgJPBLw58boVDIMis4-HoHfElg5N0_rbeLuyvi_4WwuxfuhrjE-R4&usqp=CAU'
        },
      ]
    }
  ]



  return (

    <SafeAreaView style={[AppStyles.CommonScreenStyles, { backgroundColor: AppColors.Background }]}>
      <LogoOver navigation={navigation} shouldShowBack={false} bgWhite />
      <View style={[AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle]}>
        <SectionList
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          sections={Data}
          keyExtractor={(item, index) => 'ci' + index}
          renderItem={({ section: { renderItem } }) => { renderItem }}
          renderSectionHeader={({ section: { title } }) => (
            <Text allowFontScaling={false} style={{
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
    </SafeAreaView>


  );

}

export default Home;
