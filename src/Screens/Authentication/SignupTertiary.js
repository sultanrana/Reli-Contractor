import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, FlatList, Dimensions, SafeAreaView, Platform } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service'
import { useDispatch, useSelector } from 'react-redux';

import ContainedButton from '../../Components/ContainedButton'
import LogoOver from '../../Components/LogoOver';
import Colors, { colors } from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { handleGetAllServices, handleRegister } from '../../API/Config';
import SelectService from '../../Components/SelectService';
import { setUserLocation } from '../../Redux/UserLocation';
import { showMessage } from 'react-native-flash-message';
import { vs } from 'react-native-size-matters';
import { Images } from '../../Assets/Images/Index';

// const servicesList = [
//   {
//     key: '1',
//     title: 'Windows',
//     image: 'https://icon-library.com/images/open-windows-icon/open-windows-icon-9.jpg'
//   },
//   {
//     key: '2',
//     title: 'Sliding Glass Doors',
//     image: 'https://cdn3.vectorstock.com/i/1000x1000/82/97/glass-door-icon-image-vector-19068297.jpg'
//   },
//   {
//     key: '3',
//     title: 'Interior Doors',
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7feXDTg1C4M-etlgJPBLw58boVDIMis4-HoHfElg5N0_rbeLuyvi_4WwuxfuhrjE-R4&usqp=CAU'
//   },


// ];

const SignupTertiary = ({ navigation, route }) => {

  const { email, password, firstname, lastname, address, apartment, travel, accountType, company } = route?.params || ''
  const { location } = useSelector(state => state.Location)
  const [services, setServices] = useState([])
  const [selectedServices, setSelectedServices] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const { companies } = useSelector(state => state.CompaniesData)

  const selectedCompany = companies.filter(c => c?._id === company)[0]

  // console.log({ selectedCompany });
  useEffect(() => {
    getServices()
  }, [])



  const getServices = async () => {
    // setIsLoading(is => ((!actionNeeded || !claim) && !is))
    handleGetAllServices().then(({ data }) => {
      // console.log('./././././', data);
      setServices(data)
    })
  }

  // servicesList = selectedCompany?.services?.map((item, index) => ({
  //   key: `${item}`,
  //   title: `${item}`.toUpperCase(),
  //   image: (item === 'window') ? Images.Window
  //     :
  //     (item === 'door') ? Images.Door
  //       :
  //       Images.GlassDoor
  // }))

  const checkIsPermission = () => {
    if (services.length === 0) {
      showMessage({
        message: '*Please choose at least one service',
        type: 'danger'
      })
      return;
    } else {
      check(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log('This feature is not available (on this device / in this context)');
              break;
            case RESULTS.DENIED:
              console.log('The permission has not been requested / is denied but requestable');
              requestPermission()
              break;
            case RESULTS.LIMITED:
              console.log('The permission is limited: some actions are possible');
              break;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              onSubmit()
              break;
            case RESULTS.BLOCKED:
              console.log('The permission is denied and not requestable anymore');
              break;
          }
        })
        .catch((error) => {
          console.log("locationPermission-error", error);
        });
    }
  }

  const requestPermission = () => {

    request(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
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
            getCurrentLocation()
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        console.log("locationPermission-error", error);
      });

  }
  const getCurrentLocation = async () => {

    try {
      Geolocation.getCurrentPosition(async info => {
        console.log('current location lat,long', info)
        dispatch(setUserLocation(info))
        onSubmit(info)
      });
    } catch (err) {
      console.log(err);
    }

  };

  const onSubmit = (info = null) => {
    console.log('creating account...');
    // console.log(
    //   email,
    //   password,
    //   firstname,
    //   lastname,
    //   'contractor',
    //   address,
    //   apartment,
    //   travel,
    //   info ? info.coords.latitude : location.coords.latitude,
    //   info ? info.coords.longitude : location.coords.longitude,
    //   services);
    setIsLoading(true)
    handleRegister(
      email,
      password,
      firstname,
      lastname,
      'contractor',
      address,
      apartment,
      travel,
      info != null ? info.coords.latitude : location.coords.latitude,
      info != null ? info.coords.latitude : location.coords.latitude,
      selectedServices,
      accountType,
      company
    ).then(async (data) => {
      if (data) {
        // console.log('...................', data);
        showMessage({
          message: data?.message,
          type: 'success',
        })
        setSelectedServices([])
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: References.InfoSubmitted }],
          })
        }, 500);
      }

    }).finally(() => {
      setIsLoading(false)
    })
  }






  return (
    <View
      pointerEvents={isLoading ? 'none' : 'auto'}
      style={[AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} shouldShowBack={true} />
      <View style={[AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle, { paddingBottom: '37%' }]}>

        <FlatList
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          data={services}
          style={{
            width: '100%',
            alignSelf: 'center',
          }}
          renderItem={({ item, index }) => (
            <SelectService
              Item={item}
              imageURL={item?.image}
              Index={index}
              selectedService={(data) => {
                let tempArray = selectedServices
                // console.log(data);
                if (typeof data === 'number') {
                  console.log('if');
                  tempArray.push(services[data])
                  console.log(',,,,,,,,,,,,,,,,,', tempArray);
                  setSelectedServices(tempArray)
                } else {
                  console.log('else');
                  tempArray = tempArray.filter((item, index) => {
                    return item._id != data._id
                  })
                  setSelectedServices(tempArray)
                  console.log(',,,,,,,,,,,,,,,,,', tempArray);
                }
              }}
            />
          )}
          // contentContainerStyle={{ paddingBottom: '30%' }}
          // ItemSeparatorComponent={()=>{
          //   return <View style={{height:24, width:24}}></View>
          // }}
          numColumns={2}
          ListHeaderComponent={() => {
            return (
              <Text allowFontScaling={false} style={[AppStyles.AuthScreenTitle]}>
                What services can you offer?
              </Text>
            )
          }}
          ListEmptyComponent={() => (
            <Text style={{
              fontFamily: Fonts.Medium,
              fontSize: vs(11),
              color: colors.Black,
              textAlign: 'center',
              alignSelf: 'center',
              marginTop: vs(20)
            }}>
              {'No services found in the company.'}
            </Text>
          )}
        />
      </View>


      <View style={[AppStyles.HorizontalStyle, { width: '100%', position: 'absolute', bottom: '4%', alignSelf: 'center' }]}>
        <ContainedButton
          onPress={checkIsPermission}
          label="Continue"
          loading={isLoading}
        />
        <TouchableOpacity onPress={() => navigation.replace(References.LoginPrimary)} style={{ alignSelf: 'center' }}>
          <Text allowFontScaling={false} style={{ marginTop: 30, color: Colors(scheme).Text, fontFamily: Fonts.Light }}>
            Already have an account?
            <Text allowFontScaling={false} style={{ color: Colors(scheme).Primary, fontFamily: Fonts.Medium }}> Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );

}

export default SignupTertiary;
