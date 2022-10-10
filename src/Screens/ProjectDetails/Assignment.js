import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SectionList, FlatList } from 'react-native';

import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import ProjectBoxWithService from '../../Components/ProjectBoxWithService';

const Assignment = ({ navigation }) => {

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const Data = [
    {
      name: "Jhon Doe",
      isAssigned: false
    },
    {
      name: "Danny",
      isAssigned: false
    },
    {
      name: "Sasy Cacace",
      isAssigned: true
    },
    {
      name: "Starc",
      isAssigned: false
    },
  ]

  // const renderMember=()=>{
  //   return(

  //   )
  // }
  return (
    <View style={[AppStyles.ProjectDetailsScreen]}>

      {/* <FlatList
        showsVerticalScrollIndicator={false}
        data={Data}
        renderItem={renderNotification}
        keyExtractor={(item, index) => 'noti' + index}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 16 }} />
        }}
        contentContainerStyle={{ paddingVertical: 20 }}
      /> */}

    </View>
  );

}

export default Assignment;
