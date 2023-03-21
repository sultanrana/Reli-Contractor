import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import { Text, View, Platform, StyleSheet, TouchableOpacity, useColorScheme, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service'
import { useDispatch, useSelector } from 'react-redux';

import ContainedButton from '../../Components/ContainedButton'
import LogoOver from '../../Components/LogoOver';
import { FontSize } from '../../Theme/FontSize';
import Colors from '../../Theme/Colors';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import FloatingLabelInput from '../../Components/FloatingLabelInput';
import RangeSlider from '../../Components/Slider/Index';
import { setUserLocation } from '../../Redux/UserLocation';
import { handleUpdateUserLocation } from '../../API/Config';
import { useRef } from 'react';
import { Keyboard } from 'react-native';
import { setUserData } from '../../Redux/Actions';

const Location = ({ navigation }) => {

    const { userData } = useSelector(state => state.Index)
    const { location } = useSelector(state => state.Location)

    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState(userData != null ? userData?.address : '');
    const [apartment, setApartment] = useState(userData != null ? userData?.appartment : '');
    const [city, setCity] = useState(userData != null ? userData?.city : '');
    const [state, setState] = useState(userData != null ? userData?.state : '');
    const [zip, setZip] = useState(userData != null ? userData?.zipCode : '');
    const [travel, setTravel] = useState(userData != null ? userData?.willingRange : '125');
    const addressRef = useRef()
    const apartmentRef = useRef()
    const cityRef = useRef()
    const stateRef = useRef()
    const zipRef = useRef()
    const dispatch = useDispatch()
    const scheme = useColorScheme()
    const AppStyles = GetStyles(scheme)
    const AppColors = Colors(scheme)


    const checkIsPermission = () => {
        if (address === '') {
            SimpleToast.show(`*Please provide valid Address`);
            return;
        } if (apartment === '') {
            SimpleToast.show(`*Please provide valid Apartment`);
            return;
        } if (city === '') {
            SimpleToast.show(`*Please provide valid City`);
            return;
        } if (state === '') {
            SimpleToast.show(`*Please provide valid State`);
            return;
        } if (zip === '') {
            SimpleToast.show(`*Please provide valid Zip code`);
            return;
        } if (travel === 0) {
            SimpleToast.show(`Please choose a distance`);
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
                            updateUserLocation()
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
                updateUserLocation(info)
            });
        } catch (err) {
            console.log(err);
        }

    };

    const updateUserLocation = (info = null) => {

        setIsLoading(true)
        handleUpdateUserLocation(
            userData?._id,
            address,
            apartment,
            travel,
            zip,
            state,
            city,
            info != null ? info.coords.latitude : location.coords.latitude,
            info != null ? info.coords.latitude : location.coords.latitude,
        ).then((res) => {
            if (res.code === 200) {
                SimpleToast.show('Location updated successfully')
                dispatch(setUserData(res?.data?.userData))
                setTimeout(() => {
                    navigation.pop()
                }, 1000);
            }
        }).catch((err) => {
            SimpleToast.show('Something went wrong')
            console.log(err);
        }).finally(() => {
            setIsLoading(false)
        })
    }




    const styles = StyleSheet.create({
        screenTitle: {
            fontSize: FontSize.xxxlarge,
            fontFamily: Fonts.SemiBold,
            color: AppColors.TextTitle,
            textAlign: 'center'

        },
        travel: {
            fontSize: FontSize.medium,
            fontFamily: Fonts.Regular,
            color: AppColors.TextTitle,
            marginTop: 30

        }
    })



    return (
        <View
            pointerEvents={isLoading ? 'none' : 'auto'}
            style={[AppStyles.CommonScreenStyles, { backgroundColor: AppColors.Background }]}>
            <LogoOver navigation={navigation} shouldShowBack />
            <View style={[AppStyles.HorizontalStyle, { paddingTop: 16 }]}>
                <Text allowFontScaling={false} style={styles.screenTitle}>{'Location'}</Text>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    contentContainerStyle={{ paddingBottom: 150 }}
                    showsVerticalScrollIndicator={false}
                // keyboardShouldPersistTaps={'always'}
                >
                    <>
                        <FloatingLabelInput
                            value={address}
                            onChangeText={(val) => setAddress(val)}
                            placeholder="Address"
                            keyboardType='default'
                            fieldRef={addressRef}
                            returnKeyType={'next'}
                            onSubmitEditing={() => {
                                apartmentRef.current.focus()
                            }}
                        />

                        <FloatingLabelInput
                            value={apartment}
                            onChangeText={(val) => setApartment(val)}
                            placeholder="Apartment/Unit"
                            keyboardType='default'
                            fieldRef={apartmentRef}
                            returnKeyType={'next'}
                            onSubmitEditing={() => {
                                cityRef.current.focus()
                            }}
                        />

                        <FloatingLabelInput
                            value={city}
                            onChangeText={(val) => setCity(val)}
                            placeholder="City"
                            keyboardType='default'
                            fieldRef={cityRef}
                            returnKeyType={'next'}
                            onSubmitEditing={() => {
                                stateRef.current.focus()
                            }}
                        />

                        <View style={{ paddingRight: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <FloatingLabelInput
                                value={state}
                                onChangeText={(val) => setState(val)}
                                placeholder="State"
                                keyboardType='default'
                                customStyle={{ width: '30%' }}
                                fieldRef={stateRef}
                                returnKeyType={'next'}
                                onSubmitEditing={() => {
                                    zipRef.current.focus()
                                }}
                            />

                            <FloatingLabelInput
                                value={zip}
                                onChangeText={(val) => setZip(val)}
                                placeholder="Zip"
                                keyboardType='default'
                                customStyle={{ width: '50%' }}
                                fieldRef={zipRef}
                                returnKeyType={'done'}
                                onSubmitEditing={() => {
                                    Keyboard.dismiss()
                                }}
                            />
                        </View>

                        <Text allowFontScaling={false} style={styles.travel}>{'Willing to travel:'}</Text>
                        <RangeSlider
                            from={0}
                            to={150}
                            step={5}
                            distance={(val) => {
                                setTravel(JSON.stringify(val))
                            }}
                        />

                        <ContainedButton
                            onPress={checkIsPermission}
                            label="Confirm Changes"
                            style={{ marginTop: 30 }}
                            loading={isLoading}
                        />
                    </>
                </KeyboardAwareScrollView>
            </View>
        </View>
    );

}

export default Location;
