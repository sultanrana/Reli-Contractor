import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, FlatList } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import NotificationDetail from '../../Components/NotificationDetail';

const Read = ({ navigation }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const Data = [


    {
      title: "New Project, Window Replacement",
      location: '1234, House Costa, Mesa CA29481',
      time: '30m',
      type: 'new'
    },
    {
      title: "New Project, Window Replacement",
      location: '1234, House Costa, Mesa CA29481',
      time: '30m',
      type: 'new'
    },
    {
      title: "Reminder: Order Materials",
      location: '1234, House Costa, Mesa CA29481',
      time: '45m',
      type: 'reminder'
    },
  ]

  const renderNotification = ({ item }) => {
    return (
      <NotificationDetail Details={item} />
    )
  }

  return (
    <View style={[AppStyles.Screen, AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle,{backgroundColor:AppColors.White}]}>


      <FlatList
        showsVerticalScrollIndicator={false}
        data={Data}
        renderItem={renderNotification}
        keyExtractor={(item, index) => 'noti' + index}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 16 }} />
        }}
        contentContainerStyle={{ paddingVertical: 20 }}
      />

    </View>
  );

}

export default Read;
