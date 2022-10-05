import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SectionList, FlatList } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import ProjectBoxWithService from '../../Components/ProjectBoxWithService';

const Home = ({ navigation }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const ClaimProjects = [
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
    }];


  return (
    
    <View style={[AppStyles.Screen, AppStyles.DashboardScreens]}>
      <LogoOver navigation={navigation} shouldShowBack={false} bgWhite />

      
      <FlatList
        data={ClaimProjects}
        renderItem={({ item, index }) => {
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
        }}
        keyExtractor={(item, index) => {
          return 'ci-' + index
        }}
        showsVerticalScrollIndicator={false}
        style={{
          flexGrow: 0,
        }}
        ListHeaderComponent={() => {
          return <Text style={{
            fontFamily: Fonts.Bold,
            fontSize: FontSize.xxlarge,
            color: AppColors.TextTitle,
          }}>
            {'Claim Projects'}
          </Text>
        }}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center'
        }} 
        ItemSeparatorComponent = {
          () => {
            return <View style = {{marginVertical: 4}}/> 
          }
        }
        />

    </View>

    
  );

}

export default Home;
