import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SectionList } from 'react-native';


import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import Notification from '../../Components/Notification';
import TransactionDetail from '../../Components/TransactionDetail';

const Transactions = ({ navigation }) => {

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const Data = [
    {
      title: 'Unpaid',
      data: [
        {
          title: 'Order # 01',
          assigned: '01/10/2022',
          completed: '06/10/2022',
          amount: '$1249.00',
          status: 'Finished'
        },
        {
          title: 'Order # 02',
          assigned: '01/10/2022',
          completed: '07/10/2022',
          amount: '$1249.00',
          status: 'In Progress'
        },
        {
          title: 'Order # 03',
          assigned: '01/10/2022',
          completed: '09/10/2022',
          amount: '$1249.00',
          status: 'Finished'
        },
      ]
    },
    {
      title: 'Paid',
      data: [
        {
          title: 'Order # 01',
          assigned: '01/10/2022',
          completed: '03/10/2022',
          amount: '$1249.00',
          status: 'Finished'
        },
        {
          title: 'Order # 02',
          assigned: '01/10/2022',
          completed: '03/10/2022',
          amount: '$1249.00',
          status: 'Finished'
        },
        {
          title: 'Order # 03',
          assigned: '01/10/2022',
          completed: '03/10/2022',
          amount: '$1249.00',
          status: 'Finished'
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
            <TransactionDetail
              Details={item}
            />
          )
        }}
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
          return <View style={{ height: 18 }} />
        }}
        contentContainerStyle={{ paddingBottom: 10 }}
        SectionSeparatorComponent={() => {
          return <View style={{ marginTop: 8 }} />
        }}
      />
    </View>
  );

}

export default Transactions;
