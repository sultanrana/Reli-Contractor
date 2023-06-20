import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SectionList, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';

import Colors, { colors } from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { FontSize } from '../../Theme/FontSize';
import { getFontSize } from '../../Helpers/Resposive';
import LogoOver from '../../Components/LogoOver';

const WebviewComponent = ({ navigation, route }) => {

  const { title } = route.params || ''

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const { userData } = useSelector(state => state.Index)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const styles = StyleSheet.create({
    DeleteBtn: {
      fontFamily: Fonts.Regular,
      fontSize: FontSize.xlarge,
      color: AppColors.Danger,
      alignSelf: 'center',
      marginTop: 25
    },
    Version: {
      fontFamily: Fonts.Regular,
      fontSize: getFontSize(14),
      color: AppColors.DarkGrey,
      alignSelf: 'center',
      marginVertical: 16
    }
  })




  return (
    <View
      pointerEvents={isLoading ? 'none' : 'auto'}
      style={[AppStyles.CommonScreenStyles, { backgroundColor: AppColors.White, paddingTop: 10,  }]}>
      <LogoOver navigation={navigation} shouldShowBack={true} bgWhite />

      {/* <WebView source={{ uri: 'http://www.africau.edu/images/default/sample.pdf' }} style={{ flex: 1 }} /> */}
      <Text style={{ fontSize: 30, alignSelf:'center', marginTop:'50%' }}>{title}</Text>
    </View>
  );

}

export default WebviewComponent;
