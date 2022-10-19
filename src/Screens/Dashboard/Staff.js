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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StaffItemBox from '../../Components/StaffItemBox'
import { Images } from '../../Assets/Images/Index';

const Tabs = createMaterialTopTabNavigator()

const STAFF_MEMBERS_DATA = [
  { image: Images.Dummy1, name: 'John Doe' },
  { image: Images.Dummy2, name: 'Jane Cooper' },
  { image: Images.Dummy3, name: 'Esther Howard' },
  { image: Images.Dummy4, name: 'Leslie Alexander' },
  { image: Images.Dummy5, name: 'Kristin Watson' },
  { image: Images.Dummy7, name: 'Cameron Williamson' },
  { image: Images.Dummy6, name: 'Robert Fox' },
  { image: Images.Dummy8, name: 'Cody Fisher' },
]

const Staff = ({ navigation }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)


  return (
    <View style={[AppStyles.Screen, AppStyles.CommonScreenStyles, {backgroundColor:AppColors.White}]}>
      <LogoOver navigation={navigation} shouldShowBack={false} bgWhite/>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={STAFF_MEMBERS_DATA}
        renderItem={({ item }) => (
          <StaffItemBox navigation={navigation} name={item?.name} image={item?.image}/>
        )}
        keyExtractor={(item, index) => 'stf' + index}

        contentContainerStyle={{ paddingBottom: '10%', padding: 8 }}
        style={{
          flexGrow: 0,
        }}
        ItemSeparatorComponent={()=> (
          <View style={{marginVertical: 4}}/>
        )}
      />
      
    </View>
  );

}

export default Staff;
