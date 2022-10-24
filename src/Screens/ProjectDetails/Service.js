import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SectionList, FlatList } from 'react-native';

import Popup from '../../Components/Popup'
import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import ProjectBoxWithService from '../../Components/ProjectBoxWithService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ServiceContainer from '../../Components/ServiceContainer';
import ContainedButton from '../../Components/ContainedButton';
import OutlinedButton from '../../Components/OutlinedButton';
import { Icons } from '../../Assets/Images/Index';


const serviceData = [
  {
    stacked: 'Yes',
    topSection: 'L 36" x H 48"',
    bottomSection: 'L 36" x H 48"',
    color: 'Brown',
    grid: 'Yes',
    safety: 'Yes',
    fireSafety: 'Yes',
    privacy: 'Yes',
    floor: '2',
    room: 'Bedroom',
  },
  {
    stacked: 'Yes',
    topSection: 'L 36" x H 48"',
    bottomSection: 'L 36" x H 48"',
    color: 'Brown',
    grid: 'Yes',
    safety: 'Yes',
    fireSafety: 'Yes',
    privacy: 'Yes',
    floor: '2',
    room: 'Bedroom',
  },


]

const Service = ({ navigation }) => {

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)
  const [popupVisible, setPopupVisible] = useState(false);


  const serviceName = 'Window Replacement';

  const listHeaderComponent = () => {
    return (
      <>
        <Text style={styles.title}>{'Service Details'}</Text>
        <Text style={[styles.title, { marginTop: 15 }]}>{'Service: ' + serviceName}</Text>
      </>
    )
  }

  const listFooterComponent = () => {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
      }}>
        <OutlinedButton
          label={'Mark as Ordered'}
          style={{ borderColor: AppColors.Primary, marginVertical: 16, width: '60%' }}
          labelStyle={{ color: AppColors.Primary }}
        />
        <ContainedButton
          onPress={() => { setPopupVisible(true) }}
          label="Claim"
          style={{ width: '30%' }}
        />
      </View>
    )
  }

  const styles = StyleSheet.create({
    title: {
      fontFamily: Fonts.SemiBold,
      fontSize: FontSize.xlarge,
      color: AppColors.TextTitle,
      textAlignVertical: 'center'
    }
  })

  return (
    <View style={[AppStyles.ProjectDetailsScreen]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={serviceData}
        renderItem={({ item }) => {
          return (
            <ServiceContainer Details={item} />
          )
        }}
        keyExtractor={(item, index) => 'ser' + index}
        ListHeaderComponent={listHeaderComponent}
        ListFooterComponent={listFooterComponent}
        contentContainerStyle={{ paddingBottom: '10%' }}
      />

      <Popup
        visible={popupVisible}
        onRequestClose={() => setPopupVisible(false)}
        Icon={Icons.Congrats}
        IconBackground={AppColors.DateBackground}
        Title={'Thank You!'}
        TitleStyle={{ color: '#00C389' }} />

    </View>
  );


}

export default Service;
