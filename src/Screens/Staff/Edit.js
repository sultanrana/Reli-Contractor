import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';

import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import Popup from '../../Components/Popup';

import { FontSize } from '../../Theme/FontSize';
import { LayoutStyles } from '../../Theme/Layout';
import Colors from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { Icons } from '../../Assets/Images/Index';

const Edit = ({ navigation }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [openRole, setOpenRole] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [role, setRole] = useState(false);
  const [status, setStatus] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [roleLsist, setRolesList] = useState([
    { label: 'Contractor', value: 'Contractor' },
    { label: 'Client', value: 'Client' }
  ])
  const [statusList, setStatusList] = useState([
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' }
  ])
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const styles = StyleSheet.create({
    addImage: {
      height: 150,
      width: 150,
      borderRadius: 150,
      backgroundColor: AppColors.White,
      borderWidth: 1,
      borderColor: AppColors.Grey,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontSize: FontSize.medium,
      color: Colors(scheme).Black,
      fontFamily: Fonts.SemiBold,
      marginVertical: 10
    },
    addIcon: {
      height: 50,
      width: 50
    }
  })



  return (
    <View style={[AppStyles.Screen, AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle]}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ paddingVertical: 35 }}
        showsVerticalScrollIndicator={false}
      >

        <View style={{ alignSelf: 'center', alignItems: 'center' }}>
          <View style={styles.addImage}>
            <Image source={Icons.Add} style={styles.addIcon} resizeMode={'contain'} />
          </View>
          <Text style={styles.title}>{'Add Image'}</Text>
        </View>

        <InputField
          title="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter Contractor Name"
          keyboardType='default'
          maxLength={16}
        />
        <View style={{ marginVertical: 8 }} />

        <InputField
          title="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Contractor Email"
          keyboardType='email-address'
        />
        <View style={{ marginVertical: 8 }} />

        <InputField
          title="Phone Number"
          value={number}
          onChangeText={setNumber}
          placeholder="Enter Contractor Phone Number"
          keyboardType='default'
          maxLength={16}
        />

        <View style={{ marginVertical: 12 }} />
        <Text style={{ fontSize: FontSize.medium, color: Colors(scheme).Black, fontFamily: Fonts.SemiBold }}>{'Role'}</Text>
        <DropDownPicker
          closeAfterSelecting={true}
          open={openRole}
          setOpen={setOpenRole}
          value={role}
          setValue={setRole}
          items={roleLsist}
          setItems={setRolesList}
          listMode="SCROLLVIEW"
          dropDownMaxHeight={50}
          // scrollViewProps={{
          //     nestedScrollEnabled: true,
          // }}
          placeholder={"Employee Role"}
          placeholderStyle={{ color: AppColors.Grey }}
          arrowIconStyle={{
            width: 20,
            height: 20,
            tintColor: AppColors.Grey,
            alignSelf: 'center',
          }}
          tickIconStyle={{
            width: 20,
            height: 20,
            tintColor: AppColors.Primary
          }}
          dropDownContainerStyle={{
            backgroundColor: AppColors.White,
            // borderColor: valueRequired ? colors.Reddish : "#4B5563",
            width: "100%",
            alignSelf: 'center',
          }}
          arrowIconContainerStyle={{
            backgroundColor: AppColors.White,
            justifyContent: 'center',
          }}
          style={{
            // borderColor: valueRequired ? colors.Reddish : colors.grayish,
            backgroundColor: AppColors.White,
            width: "100%",
            minHeight: 40,
            height: 56,
            alignSelf: 'center',
            borderRadius: 8
          }}
          containerStyle={{
            marginTop: 3,
            zIndex: 999
          }}
          textStyle={{
            color: AppColors.Black,
            fontSize: 14,
          }}
        />

        <View style={{ marginVertical: 12 }} />
        <Text style={{ fontSize: FontSize.medium, color: Colors(scheme).Black, fontFamily: Fonts.SemiBold }}>{'Status'}</Text>
        <DropDownPicker
          closeAfterSelecting={true}
          open={openStatus}
          setOpen={setOpenStatus}
          value={status}
          setValue={setStatus}
          items={statusList}
          setItems={setStatusList}
          listMode="SCROLLVIEW"
          dropDownMaxHeight={50}
          // scrollViewProps={{
          //     nestedScrollEnabled: true,
          // }}
          placeholder={"Employee Status"}
          placeholderStyle={{ color: AppColors.Grey }}
          arrowIconStyle={{
            width: 20,
            height: 20,
            tintColor: AppColors.Grey,
            alignSelf: 'center',
          }}
          tickIconStyle={{
            width: 20,
            height: 20,
            tintColor: AppColors.Primary
          }}
          dropDownContainerStyle={{
            backgroundColor: AppColors.White,
            // borderColor: valueRequired ? colors.Reddish : "#4B5563",
            width: "100%",
            alignSelf: 'center',
          }}
          arrowIconContainerStyle={{
            backgroundColor: AppColors.White,
            justifyContent: 'center',
          }}
          style={{
            backgroundColor: AppColors.White,
            width: "100%",
            minHeight: 40,
            height: 56,
            alignSelf: 'center',
            borderRadius: 8
          }}
          containerStyle={{
            marginTop: 3,
            zIndex: 999
          }}
          textStyle={{
            color: AppColors.Black,
            fontSize: 14,
          }}
        />

        <View style={{ marginVertical: 12 }} />
        <ContainedButton
          onPress={() => { setPopupVisible(true) }}
          label="Save Changes"
        />
      </KeyboardAwareScrollView>

      <Popup
        visible={popupVisible}
        onRequestClose={() => setPopupVisible(false)}
        Icon={Icons.Confirm}
        IconBackground={'#FDECDF'}
        Title={'Confirmation'}
        TitleStyle={{color:AppColors.Primary}}
      />
    </View>
  );

}

export default Edit;
