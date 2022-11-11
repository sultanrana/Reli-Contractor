import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SectionList, FlatList } from 'react-native';

import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import ProjectBoxWithService from '../../Components/ProjectBoxWithService';
import ContainedButton from '../../Components/ContainedButton';
import FinanceBox from '../../Components/FinanceBox';


const Types = {
  WindowProject: "WINDOW_PROJECT",
  Property: "PROPERTY",
  Materials: "MATERIALS",
  Labor: "LABOR",
}


const FINANCES_DATA = [
  {
    type: Types.WindowProject,
    payload: {
      project_id: 'A6544477',
      ordered: '01/07/2022',
      scheduled: '12/07/2022',
      completed: '01/08/2022'
    }
  },
  {
    type: Types.Property,
    payload: {
      property_id: 'A652177435',
      address1: '2972 Westheimer Rd.',
      address2: 'Santa Ana, Illinois',
      address3: '85489',
      address4: 'Floor: 2nd'
    }
  },
  {
    type: Types.Materials,
    payload: {
      total: '$800.00',
      windows: '04 windows',
    }
  },
  {
    type: Types.Labor,
    payload: {
      total: '$600.00'
    }
  },
]

const Finances = ({ navigation }) => {

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  return (
    <View style={[AppStyles.ProjectDetailsScreen]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={FINANCES_DATA}
        renderItem={({ item }) => (
          <FinanceBox navigation={navigation} item={item} />
        )}
        keyExtractor={(item, index) => 'ser' + index}

        contentContainerStyle={{ paddingBottom: 80, }}
        style={{
          flexGrow: 0,
        }}
        ItemSeparatorComponent={()=> (
          <View style={{margin: 4}}/>
        )}
      />
      <View style={{
        paddingHorizontal: 8,
        position: 'absolute',
        right: 8,
        bottom: 10,
        width: '30%'
      }}>
        <ContainedButton
          label="Claim"
          style={{  }}

        />
      </View>
    </View>
  );

}

export default Finances;
