import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SectionList } from 'react-native';


import { FontSize } from '../../Theme/FontSize';
import Colors from '../../Theme/Colors';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import Notification from '../../Components/Notification';
import { handleGetNotificationStatus, handleUpdateNotificationStatus } from '../../API/Config';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import Loader from '../../Components/Loader';
import { setReminders } from '../../Redux/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notifications = ({ navigation }) => {

  const { token } = useSelector(state => state.Index)
  const { userData } = useSelector(state => state.Index)
  const { options } = useSelector(state => state.Options)

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const styles = StyleSheet.create({
    mainContainer: {
      height: 55,
      justifyContent: 'space-between',
      alignItems: 'center',
      // backgroundColor: colors(scheme).White,
      flexDirection: 'row',
    },
    titleText: {
      color: Colors(scheme).Black,
      fontSize: 14,
      fontFamily: Fonts.Regular
    },
    radioBtnContainer: {
      height: 20,
      width: 40,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 3,
    },
    radioMainContainer: {
      height: 28,
      width: 60,
      justifyContent: 'center',
      alignItems: 'flex-end',
      position: 'absolute',
      right: 15,
    },
    radioDot: {
      height: 14,
      width: 14,
      borderRadius: 14,
      backgroundColor: Colors(scheme).White,
    }
  })


  const Data = [
    {
      title: 'Push Notifications',
      data: [
        {
          title: 'New message from customer',
        },
        {
          title: 'New Order',
        },
        {
          title: 'Upcoming Delivery',
        },
      ]
    },
    {
      title: 'Emails',
      data: [
        {
          title: 'New message from customer',
        },
        {
          title: 'Project Updates',
        },
        {
          title: 'Cancellations',
        },
        {
          title: 'Reschedule Requests',
        },
        {
          title: 'Reminders',
        },
      ]
    },
  ]



  const changeStatus = async (a, b, c, d, e, f, g, h) => {
    await AsyncStorage.setItem('newMsg', JSON.stringify(a))
    handleUpdateNotificationStatus(userData?._id, a, b, c, d, e, f, g, h).then((data) => {
      // console.log('changeStatus-res...',data);
    }).finally(() => {
      setLoading(false)
    })
  }

  // useEffect(() => {
  //   console.log({ options });
  // }, [options])

  return (
    <View style={[AppStyles.HorizontalStyle, AppStyles.CommonScreenStyles, { backgroundColor: AppColors.White, paddingTop: 10 }]}>

      {/* <SectionList
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        sections={Data}
        keyExtractor={(item, index) => 'ci' + index}
        renderItem={({ item }) => {
          return (
            <Notification
              title={item.title}
              radioBtnState={(state) => {
                console.log(item.title + ' is:  ' + state);
              }}
            />
          )
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text allowFontScaling={false} style={{
            fontFamily: Fonts.SemiBold,
            fontSize: FontSize.xxlarge,
            color: AppColors.TextTitle,
          }}>
            {title}
          </Text>
        )}
        contentContainerStyle={{ paddingBottom: 10 }}
      /> */}

      <ScrollView
        contentContainerStyle={{ paddingBottom: '10%' }}
      >

        <Text allowFontScaling={false} style={{
          fontFamily: Fonts.SemiBold,
          fontSize: FontSize.xxlarge,
          color: AppColors.TextTitle,
        }}>
          {'Push Notifications'}
        </Text>

        <View
          style={[styles.mainContainer]} >
          <Text allowFontScaling={false} style={[styles.titleText]}>{'New message from customer'}</Text>
          <TouchableOpacity
            style={styles.radioMainContainer}
            activeOpacity={0.8}
            onPress={() => {
              setLoading(true)
              let data = {
                ...options,
                newMessageFromCustomerNoti: options.newMessageFromCustomerNoti ? false : true
              }
              dispatch(setReminders(data))
              changeStatus(
                data?.newMessageFromCustomerNoti,
                data.newOrder,
                data.upcomingDelivery,
                data.newMessageFromCustomerEmail,
                data.projectUpdates,
                data.cancellation,
                data.rescheduleRequest,
                data.reminders
              )
            }}
          >
            <TouchableOpacity
              style={[styles.radioBtnContainer, { backgroundColor: options.newMessageFromCustomerNoti ? Colors(scheme).Primary : Colors(scheme).Grey, }]}
              activeOpacity={0.8}
              onPress={() => {
                setLoading(true)
                let data = {
                  ...options,
                  newMessageFromCustomerNoti: options.newMessageFromCustomerNoti ? false : true
                }
                dispatch(setReminders(data))
                changeStatus(
                  data?.newMessageFromCustomerNoti,
                  data.newOrder,
                  data.upcomingDelivery,
                  data.newMessageFromCustomerEmail,
                  data.projectUpdates,
                  data.cancellation,
                  data.rescheduleRequest,
                  data.reminders
                )
              }}
            >
              <View style={[styles.radioDot, { alignSelf: options.newMessageFromCustomerNoti ? 'flex-end' : 'flex-start' }]} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* --------------------------------------------- */}

        <View
          style={[styles.mainContainer]} >
          <Text allowFontScaling={false} style={[styles.titleText]}>{'New Order'}</Text>
          <TouchableOpacity
            style={styles.radioMainContainer}
            activeOpacity={0.8}
            onPress={() => {
              setLoading(true)
              let data = {
                ...options,
                newOrder: options.newOrder ? false : true
              }
              dispatch(setReminders(data))
              changeStatus(
                data?.newMessageFromCustomerNoti,
                data.newOrder,
                data.upcomingDelivery,
                data.newMessageFromCustomerEmail,
                data.projectUpdates,
                data.cancellation,
                data.rescheduleRequest,
                data.reminders
              )
            }}
          >
            <TouchableOpacity
              style={[styles.radioBtnContainer, { backgroundColor: options?.newOrder ? Colors(scheme).Primary : Colors(scheme).Grey, }]}
              activeOpacity={0.8}
              onPress={() => {
                setLoading(true)
                let data = {
                  ...options,
                  newOrder: options.newOrder ? false : true
                }
                dispatch(setReminders(data))
                changeStatus(
                  data?.newMessageFromCustomerNoti,
                  data.newOrder,
                  data.upcomingDelivery,
                  data.newMessageFromCustomerEmail,
                  data.projectUpdates,
                  data.cancellation,
                  data.rescheduleRequest,
                  data.reminders
                )
              }}
            >
              <View style={[styles.radioDot, { alignSelf: options?.newOrder ? 'flex-end' : 'flex-start' }]} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* --------------------------------------------- */}

        <View
          style={[styles.mainContainer]} >
          <Text allowFontScaling={false} style={[styles.titleText]}>{'Upcoming Delivery'}</Text>
          <TouchableOpacity
            style={styles.radioMainContainer}
            activeOpacity={0.8}
            onPress={() => {
              setLoading(true)
              let data = {
                ...options,
                upcomingDelivery: options?.upcomingDelivery ? false : true
              }
              dispatch(setReminders(data))
              changeStatus(
                data?.newMessageFromCustomerNoti,
                data.newOrder,
                data.upcomingDelivery,
                data.newMessageFromCustomerEmail,
                data.projectUpdates,
                data.cancellation,
                data.rescheduleRequest,
                data.reminders
              )
            }}
          >
            <TouchableOpacity
              style={[styles.radioBtnContainer, { backgroundColor: options?.upcomingDelivery ? Colors(scheme).Primary : Colors(scheme).Grey, }]}
              activeOpacity={0.8}
              onPress={() => {
                setLoading(true)
                let data = {
                  ...options,
                  upcomingDelivery: options?.upcomingDelivery ? false : true
                }
                dispatch(setReminders(data))
                changeStatus(
                  data?.newMessageFromCustomerNoti,
                  data.newOrder,
                  data.upcomingDelivery,
                  data.newMessageFromCustomerEmail,
                  data.projectUpdates,
                  data.cancellation,
                  data.rescheduleRequest,
                  data.reminders
                )
              }}
            >
              <View style={[styles.radioDot, { alignSelf: options?.upcomingDelivery ? 'flex-end' : 'flex-start' }]} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <Text allowFontScaling={false} style={{
          fontFamily: Fonts.SemiBold,
          fontSize: FontSize.xxlarge,
          color: AppColors.TextTitle,
        }}>
          {'Emails'}
        </Text>

        {/* --------------------------------------------- */}

        <View
          style={[styles.mainContainer]} >
          <Text allowFontScaling={false} style={[styles.titleText]}>{'New message from customer'}</Text>
          <TouchableOpacity
            style={styles.radioMainContainer}
            activeOpacity={0.8}
            onPress={() => {
              setLoading(true)
              let data = {
                ...options,
                newMessageFromCustomerEmail: options?.newMessageFromCustomerEmail ? false : true
              }
              dispatch(setReminders(data))
              changeStatus(
                data?.newMessageFromCustomerNoti,
                data.newOrder,
                data.upcomingDelivery,
                data.newMessageFromCustomerEmail,
                data.projectUpdates,
                data.cancellation,
                data.rescheduleRequest,
                data.reminders
              )
            }}
          >
            <TouchableOpacity
              style={[styles.radioBtnContainer, { backgroundColor: options?.newMessageFromCustomerEmail ? Colors(scheme).Primary : Colors(scheme).Grey, }]}
              activeOpacity={0.8}
              onPress={() => {
                setLoading(true)
                let data = {
                  ...options,
                  newMessageFromCustomerEmail: options?.newMessageFromCustomerEmail ? false : true
                }
                dispatch(setReminders(data))
                changeStatus(
                  data?.newMessageFromCustomerNoti,
                  data.newOrder,
                  data.upcomingDelivery,
                  data.newMessageFromCustomerEmail,
                  data.projectUpdates,
                  data.cancellation,
                  data.rescheduleRequest,
                  data.reminders
                )
              }}
            >
              <View style={[styles.radioDot, { alignSelf: options?.newMessageFromCustomerEmail ? 'flex-end' : 'flex-start' }]} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* --------------------------------------------- */}

        <View
          style={[styles.mainContainer]} >
          <Text allowFontScaling={false} style={[styles.titleText]}>{'Project Updates'}</Text>
          <TouchableOpacity
            style={styles.radioMainContainer}
            activeOpacity={0.8}
            onPress={() => {
              setLoading(true)
              let data = {
                ...options,
                projectUpdates: options?.projectUpdates ? false : true
              }
              dispatch(setReminders(data))
              changeStatus(
                data?.newMessageFromCustomerNoti,
                data.newOrder,
                data.upcomingDelivery,
                data.newMessageFromCustomerEmail,
                data.projectUpdates,
                data.cancellation,
                data.rescheduleRequest,
                data.reminders
              )
            }}
          >
            <TouchableOpacity
              style={[styles.radioBtnContainer, { backgroundColor: options?.projectUpdates ? Colors(scheme).Primary : Colors(scheme).Grey, }]}
              activeOpacity={0.8}
              onPress={() => {
                setLoading(true)
                let data = {
                  ...options,
                  projectUpdates: options?.projectUpdates ? false : true
                }
                dispatch(setReminders(data))
                changeStatus(
                  data?.newMessageFromCustomerNoti,
                  data.newOrder,
                  data.upcomingDelivery,
                  data.newMessageFromCustomerEmail,
                  data.projectUpdates,
                  data.cancellation,
                  data.rescheduleRequest,
                  data.reminders
                )
              }}
            >
              <View style={[styles.radioDot, { alignSelf: options?.projectUpdates ? 'flex-end' : 'flex-start' }]} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* --------------------------------------------- */}

        <View
          style={[styles.mainContainer]} >
          <Text allowFontScaling={false} style={[styles.titleText]}>{'Cancellations'}</Text>
          <TouchableOpacity
            style={styles.radioMainContainer}
            activeOpacity={0.8}
            onPress={() => {
              setLoading(true)
              let data = {
                ...options,
                cancellation: options?.cancellation ? false : true
              }
              dispatch(setReminders(data))
              changeStatus(
                data?.newMessageFromCustomerNoti,
                data.newOrder,
                data.upcomingDelivery,
                data.newMessageFromCustomerEmail,
                data.projectUpdates,
                data.cancellation,
                data.rescheduleRequest,
                data.reminders
              )
            }}
          >
            <TouchableOpacity
              style={[styles.radioBtnContainer, { backgroundColor: options?.cancellation ? Colors(scheme).Primary : Colors(scheme).Grey, }]}
              activeOpacity={0.8}
              onPress={() => {
                setLoading(true)
                let data = {
                  ...options,
                  cancellation: options?.cancellation ? false : true
                }
                dispatch(setReminders(data))
                changeStatus(
                  data?.newMessageFromCustomerNoti,
                  data.newOrder,
                  data.upcomingDelivery,
                  data.newMessageFromCustomerEmail,
                  data.projectUpdates,
                  data.cancellation,
                  data.rescheduleRequest,
                  data.reminders
                )
              }}
            >
              <View style={[styles.radioDot, { alignSelf: options?.cancellation ? 'flex-end' : 'flex-start' }]} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* --------------------------------------------- */}

        <View
          style={[styles.mainContainer]} >
          <Text allowFontScaling={false} style={[styles.titleText]}>{'Reschedule Requests'}</Text>
          <TouchableOpacity
            style={styles.radioMainContainer}
            activeOpacity={0.8}
            onPress={() => {
              setLoading(true)
              let data = {
                ...options,
                rescheduleRequest: options?.rescheduleRequest ? false : true
              }
              dispatch(setReminders(data))
              changeStatus(
                data?.newMessageFromCustomerNoti,
                data.newOrder,
                data.upcomingDelivery,
                data.newMessageFromCustomerEmail,
                data.projectUpdates,
                data.cancellation,
                data.rescheduleRequest,
                data.reminders
              )
            }}
          >
            <TouchableOpacity
              style={[styles.radioBtnContainer, { backgroundColor: options?.rescheduleRequest ? Colors(scheme).Primary : Colors(scheme).Grey, }]}
              activeOpacity={0.8}
              onPress={() => {
                setLoading(true)
                let data = {
                  ...options,
                  rescheduleRequest: options?.rescheduleRequest ? false : true
                }
                dispatch(setReminders(data))
                changeStatus(
                  data?.newMessageFromCustomerNoti,
                  data.newOrder,
                  data.upcomingDelivery,
                  data.newMessageFromCustomerEmail,
                  data.projectUpdates,
                  data.cancellation,
                  data.rescheduleRequest,
                  data.reminders
                )
              }}
            >
              <View style={[styles.radioDot, { alignSelf: options?.rescheduleRequest ? 'flex-end' : 'flex-start' }]} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* --------------------------------------------- */}

        <View
          style={[styles.mainContainer]} >
          <Text allowFontScaling={false} style={[styles.titleText]}>{'Reminders'}</Text>
          <TouchableOpacity
            style={styles.radioMainContainer}
            activeOpacity={0.8}
            onPress={() => {
              setLoading(true)
              let data = {
                ...options,
                reminders: options?.reminders ? false : true
              }
              dispatch(setReminders(data))
              changeStatus(
                data?.newMessageFromCustomerNoti,
                data.newOrder,
                data.upcomingDelivery,
                data.newMessageFromCustomerEmail,
                data.projectUpdates,
                data.cancellation,
                data.rescheduleRequest,
                data.reminders
              )
            }}
          >
            <TouchableOpacity
              style={[styles.radioBtnContainer, { backgroundColor: options?.reminders ? Colors(scheme).Primary : Colors(scheme).Grey, }]}
              activeOpacity={0.8}
              onPress={() => {
                setLoading(true)
                let data = {
                  ...options,
                  reminders: options?.reminders ? false : true
                }
                dispatch(setReminders(data))
                changeStatus(
                  data?.newMessageFromCustomerNoti,
                  data.newOrder,
                  data.upcomingDelivery,
                  data.newMessageFromCustomerEmail,
                  data.projectUpdates,
                  data.cancellation,
                  data.rescheduleRequest,
                  data.reminders
                )
              }}
            >
              <View style={[styles.radioDot, { alignSelf: options?.reminders ? 'flex-end' : 'flex-start' }]} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <Loader loading={loading} />
    </View>
  );

}


export default Notifications;
