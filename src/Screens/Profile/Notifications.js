import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SectionList } from 'react-native';


import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import Notification from '../../Components/Notification';

const Notifications = ({ navigation }) => {

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const Data = [
    {
      title: 'Push Notifications',
      data: [
        {
          title: 'New msg from customer',
        },
        {
          title: 'New Order',
        },
        {
          title: 'Upcoming Delivery',
        },
      ]
    },
    {
      title: 'Email',
      data: [
        {
          title: 'New msg from customer',
        },
        {
          title: 'Project Updates',
        },
        {
          title: 'Cancellations',
        },
        {
          title: 'Reschedule Requests',
        },
        {
          title: 'Reminders',
        },
      ]
    },
  ]

  return (
    <View style={[AppStyles.HorizontalStyle, AppStyles.CommonScreenStyles, { backgroundColor: AppColors.White, paddingTop: 10 }]}>

      <SectionList
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        sections={Data}
        keyExtractor={(item, index) => 'ci' + index}
        renderItem={({ item }) => {
          return (
            <Notification
              title={item.title}
              radioBtnState={(state) => {
                console.log(item.title + 'is:  ' + state);
              }}
            />
          )
        }}
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


        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </View>
  );

}

export default Notifications;
