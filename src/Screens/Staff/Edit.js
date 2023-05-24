import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

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
import { useSelector } from 'react-redux';
import { IMAGES_URL } from '../../API/Constants';
import { handleUpdateStaffMember } from '../../API/Config';
import { ShowErrorMessage, ShowSuccessMessage } from '../../Components/InfoMsg';
import MediaOptions from '../../Components/MediaOptions';
import { Media } from '../../Helpers/MediaProvider';
import { dynamicSize, dynamicVerticalSize } from '../../Helpers/Resposive';

const Edit = ({ navigation }) => {

  const { userData, token } = useSelector(state => state.Index)
  const { list, current } = useSelector(({ Staff }) => Staff)

  const [firstName, setFirstName] = useState(current?.firstName);
  const [lastName, setLastName] = useState(current?.lastName);
  const [email, setEmail] = useState(current?.email);
  const [number, setNumber] = useState(current?.phoneNumber);
  const [openRole, setOpenRole] = useState(false);
  const [role, setRole] = useState(current?.accountType);
  const [mediaOptions, setMediaOptions] = useState(false)
  const [popupVisible, setPopupVisible] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [roleLsist, setRolesList] = useState([
    { label: 'Standard', value: 'standard_contractor' },
    { label: 'Admin', value: 'admin_contractor' }
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
      borderWidth: 0.5,
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
      width: 50,
      tintColor: AppColors.DarkGrey
    }
  })

  const CheckCameraPermission = () => {
    check(PERMISSIONS.ANDROID.CAMERA)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            RequestCameraPermission()
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            CheckStoragePermission()
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        // …
      });
  }

  const RequestCameraPermission = () => {
    request(PERMISSIONS.ANDROID.CAMERA)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            CheckStoragePermission()
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            SimpleToast.show('Go to settings to enable camera permission')
            break;
        }
      })
      .catch((error) => {
        // …
      });
  }

  const CheckStoragePermission = () => {
    check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            RequestStoragePermission()
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            setMediaOptions(true)
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        // …
      });
  }

  const RequestStoragePermission = () => {
    request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            setMediaOptions(true)
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            SimpleToast.show('Go to settings to enable storage permission')
            break;
        }
      })
      .catch((error) => {
        // …
      });
  }

  const addOrUpdateProfileLocalImage = (isExisting) => {
    // Add Android Permission Check here and call the below function setMediaOptions(true) after granted permissions
    if (Platform.OS === 'android') {
      CheckCameraPermission()
    } else {
      setMediaOptions(true)
    }

  }

  const onUpdateStaff = async () => {
    setIsButtonLoading(true)
    handleUpdateStaffMember(current?._id, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: number,
      accountType: role,
      userType: current?.userType,
      image: selectedImage
    }).then(({ message }) => {
      ShowSuccessMessage(message)
    }).catch(({ message }) => {
      ShowErrorMessage(message)
    }).finally(() => {
      setIsButtonLoading(false)
    })
  }


  const Galleryopen = () => {
    setMediaOptions(false)
    Media
      .OpenGalery(true)
      .then((obj) => {
        // console.log('Galleryopen..............', obj);
        const fileName = obj?.path.split('/')
        const source = {
          name: Platform.OS == 'ios' ? obj.filename : fileName[fileName.length - 1],
          type: obj.mime,
          uri: obj?.path,
        };
        setSelectedImage(source)
      })
      .catch((error) => {
        console.log('Galleryopen-error', error);
      });

  };

  const Camerapopen = async () => {
    setMediaOptions(false)
    Media
      .OpenCamera(true)
      .then((obj) => {
        const fileName = obj?.path.split('/')
        const source = {
          name: fileName[fileName.length - 1],
          type: obj.mime,
          uri: obj?.path,
        };
        setSelectedImage(source)
      }).catch((error) => {
        console.log('Camerapopen..............', error);
      });
  };


  return (
    <View style={[AppStyles.Screen, AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle]}>
      <MediaOptions
        visible={mediaOptions}
        onRequestClose={() => {
          setMediaOptions(false)
        }}
        selectedOption={(val) => {
          if (val == '2') {
            Camerapopen()
          } else if (val == '3') {
            Galleryopen()
          }
        }}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{ paddingVertical: 35 }}
        showsVerticalScrollIndicator={false}>

        <View style={{ alignSelf: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={styles.addImage} disabled={(current?.profileImage !== null || selectedImage)} onPress={() => { addOrUpdateProfileLocalImage(false) }}>
            <Image source={(current?.profileImage == null && !selectedImage) ? Icons.Add :
              { uri: selectedImage ? selectedImage?.uri : IMAGES_URL + current?.profileImage }} style={(current?.profileImage == null && !selectedImage) ? styles.addIcon : {
                height: 150,
                width: 150,
                borderRadius: 150,
              }} resizeMode={'contain'} />
          </TouchableOpacity>
          <TouchableOpacity disabled={(current?.profileImage == null && !selectedImage)} onPress={() => { addOrUpdateProfileLocalImage(true) }} >
            <Text allowFontScaling={false} style={[styles.title, {
              color: (current?.profileImage == null && !selectedImage) ? AppColors.BackgroundInverse : AppColors.Primary
            }]}>{(current?.profileImage == null && !selectedImage) ? 'Add Image' : 'Change Image'}</Text>
          </TouchableOpacity>
        </View>

        <InputField
          title="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter First Name"
          keyboardType='default'
          maxLength={16}
        />
        <View style={{ marginVertical: 2 }} />

        <InputField
          title="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter Last Name"
          keyboardType='default'
          maxLength={16}
        />
        <View style={{ marginVertical: 2 }} />

        <InputField
          title="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Contractor Email"
          keyboardType='email-address'
        />
        <View style={{ marginVertical: 2 }} />

        <InputField
          title="Phone Number"
          value={number}
          onChangeText={setNumber}
          placeholder="Enter Contractor Phone Number"
          keyboardType='default'
          maxLength={16}
        />

        <View style={{ marginVertical: 2 }} />
        <Text allowFontScaling={false} style={{ fontSize: FontSize.medium, color: Colors(scheme).Black, fontFamily: Fonts.SemiBold, marginHorizontal: 4 }}>{'Role'}</Text>
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
          arrowIconContainerStyle={{
            backgroundColor: AppColors.White,
            justifyContent: 'center',
          }}
          dropDownContainerStyle={{
            backgroundColor: AppColors.White,
            width: "100%",
            alignSelf: 'center',
            borderWidth: dynamicSize(1),
            borderColor: Colors(scheme).DarkGrey,
          }}
          style={{
            backgroundColor: AppColors.White,
            width: "100%",
            alignSelf: 'center',
            borderWidth: dynamicSize(1),
            borderColor: Colors(scheme).DarkGrey,
            paddingHorizontal: dynamicSize(12),
            elevation: 0,
            borderRadius: dynamicSize(10),
            height: dynamicVerticalSize(55)
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
          onPress={onUpdateStaff}
          label="Save Changes"
          loading={isButtonLoading}
        />
      </KeyboardAwareScrollView>

      <Popup
        visible={popupVisible}
        onRequestClose={() => setPopupVisible(false)}
        Icon={Icons.Confirm}
        IconBackground={'#FDECDF'}
        Title={'Confirmation'}
        TitleStyle={{ color: AppColors.Primary }}
      />
    </View>
  );

}

export default Edit;
