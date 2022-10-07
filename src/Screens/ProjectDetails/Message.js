import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SectionList } from 'react-native';


import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import ProjectBoxWithDate from '../../Components/ProjectBoxWithDate';

const Message = ({ navigation }) => {

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  return (
    <View style={[AppStyles.ProjectDetailsScreen]}>
      

    </View>
  );


}

export default Message;
