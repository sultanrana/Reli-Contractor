import React, { useEffect, useRef, useState } from 'react'
import SimpleToast from 'react-native-simple-toast';
import {
  Text,
  View,
  Image, StyleSheet,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
  FlatList,
  Keyboard,
  TouchableOpacity
} from 'react-native';
import firestore from '@react-native-firebase/firestore'

import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { Icons } from '../../Assets/Images/Index';
import { windowHeight, windowWidth } from '../../Constants/Constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Message, MessageRoom } from '../../Schemas/MessageRoomSchema';
import { s, vs } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import moment from 'moment-timezone';
import ChatMessage from '../../Components/ChatMessage';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../Components/Loader';
import { Dimensions } from 'react-native';

const Chat = ({ navigation }) => {

  const { token, userData, fcmToken } = useSelector(state => state.Index)
  const { id, details } = useSelector(state => state.Projects)

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)
  const insets = useSafeAreaInsets()

  const [loading, setLoading] = useState(true)
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [room, setRoom] = useState<MessageRoom>()
  const [isAutoResendable, setIsAutoResendable] = useState<Boolean>(true)
  const [messageInput, setMessageInput] = useState<string>('')
  const [isExpired, setIsExpired] = useState(false)
  const [isRoom, setIsRoom] = useState(false)
  const messageInputRef = useRef()
  const isFocused = useIsFocused()

  const { height, width } = Dimensions.get('window');
  const isIPhone8 = height === 667 && width === 375;

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: AppColors.Background,
    },
    content: {
      flex: 1,
      paddingHorizontal: s(2)
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      padding: 10,
      marginBottom: Platform.select({ ios: 0, android: 10 }),
    },
    input: {
      flex: 1,
      height: 40,
      marginRight: 10,
    },
    button: {
      backgroundColor: '#2196F3',
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    flatListView: {
      flex: 1,
      width: '100%',
      paddingHorizontal: 16,
      alignSelf: "center",
      paddingTop: 5,
      paddingBottom: 70
    },
    msgImg: {
      height: (windowWidth * 40) / 100,
      width: (windowWidth * 40) / 100,

    },
    bottomContainer: {
      width: '100%',
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: AppColors.White,
      shadowColor: AppColors.BlackGreyish,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.16,
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      shadowRadius: 6,
      paddingVertical: 14,
      paddingHorizontal: 18,
    },
    mainTitle: {
      fontFamily: Fonts.SemiBold,
      fontSize: FontSize.xlarge,
      color: AppColors.TextTitle,
    },
    send: {
      paddingVertical: 10,
      height: '100%',
      width: '15%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    sendIcon: {
      height: 20,
      width: 20
    }

  })

  useEffect(() => {
    // if (isFocused) {
    // messageInputRef?.current?.focus()
    console.log({ details: details.orderdetails });

    if (details?.orderStatus == 'Completed') {
      setIsExpired(true)
    }
    firestore()
      .collection(`Chats-test`)
      .doc(id)
      .onSnapshot(documentSnapshot => {
        if (!documentSnapshot.exists) {
          // const thisRoom = new MessageRoom({
          //   ProjectID: id,
          //   ID: '',
          //   Created: new Date(),
          //   Expired: false,
          //   Messages: [
          //     new Message({
          //       Body: `Order created on ${moment().format('hh:mm A, ddd, DD MMM YYYY')}`,
          //       DateTime: new Date(),
          //       Milliseconds: moment().valueOf(),
          //       ReceiverID: '',
          //       SenderID: userData?._id,
          //       Shown: true,
          //       SYSTEM: true,
          //     })
          //   ],
          //   Contractor: {
          //     ID: userData?._id,
          //     Image: '',
          //     IsTyping: false,
          //     FCM: fcmToken
          //   },
          //   Customer: {
          //     ID: '',
          //     Image: '',
          //     IsTyping: false,
          //     FCM: ''
          //   },
          // })
          // firestore()
          //   .collection(`Chats-test`)
          //   .doc(id)
          //   .set(thisRoom)
          //   .then(() => {
          //     console.log('posted');
          //   })
          setIsRoom(false)
          setTimeout(() => {
            setLoading(false)
          }, 1000);
        } else {
          setIsRoom(true)
          const roomDetails = documentSnapshot?.data()
          // console.log({ roomDetails });
          roomDetails?.MessageRoomDetails?.Messages?.reverse()
          // console.log('Room', roomDetails?.MessageRoomDetails.Messages);
          setRoom(roomDetails)
          setTimeout(() => {
            setLoading(false)
          }, 1000);
        }
      })
    // }
  }, [])

  useEffect(() => {
    if (isFocused) {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
        const keyboardHeight = event.endCoordinates.height;
        setKeyboardHeight(windowHeight - keyboardHeight);

      });

      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardHeight(0);
      });

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }
  }, []);

  const onSendMessage = async () => {

    const data = {
      fcmToken: 'd36A0BbjRLGx0mwJBbB-Lj:APA91bGlq8Cm3MpH36KhazDqGLWHg2cNz0iXukd7ng0129vy5WR0LWOCQ2mxd4VuUSt5WN3VfD2E6OW-4V21UW4XbFRzQloRbEAondbGXV_IiUq7Fk-PbZDa1fkgLEtrhtIAh4RdeGhp',
      title: 'New Message',
      message: messageInput,
      details: {
        projectId: id
      }

    }

    if (isAutoResendable) {
      setIsAutoResendable(false)

      const newMessage = new Message({
        Body: messageInput,
        DateTime: new Date(),
        Milliseconds: moment().valueOf(),
        ReceiverID: '',
        SenderID: userData?._id,
        Shown: true,
        SYSTEM: false
      })
      setRoom(r => {
        r?.MessageRoomDetails.Messages.unshift(newMessage)
        return r
      })
      setMessageInput('')
      await firestore()
        .collection(`Chats-test`)
        .doc(id)
        .update({ 'MessageRoomDetails.Messages': firestore.FieldValue.arrayUnion(newMessage) })
        .finally(() => {
          setIsAutoResendable(true)
          // setTimeout(() => {
          //   NotificationController.sendNotificationWithFCM(data)
          // }, 7500);
        })
    }
  }

  const renderMessageItem = ({ item, index }) => {
    return (
      <ChatMessage Item={item} />
    )
  }

  return (
    <View style={[AppStyles.Screen, AppStyles.CommonScreenStyles]}>

      {
        loading ?
          <Loader loading={loading} />
          :
          isRoom ?
            // <KeyboardAvoidingView
            //   style={styles.mainContainer}
            //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            //   keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -vs(105)}
            // >
            <View style={styles.mainContainer} >
              <View style={styles.content}>
                <FlatList
                  // style={{ flex: 1, zIndex: 2 }}
                  contentContainerStyle={{ paddingHorizontal: '2%', zIndex: 3, paddingBottom: '10%', paddingTop: vs(32) }}
                  data={room?.MessageRoomDetails?.Messages}
                  keyExtractor={(i, _i) => 'message' + _i}
                  inverted={true}
                  renderItem={renderMessageItem}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => (<View style={{ marginVertical: vs(6) }} />)}
                // ListEmptyComponent={() => (<Text style={{ width: '100%', alignSelf: 'center', textAlign: 'center' }} >No Messages</Text>)}
                />
              </View>

              <View style={{
                width: '100%',
                backgroundColor: AppColors.White,
                paddingBottom: (Platform.OS === 'ios' && isIPhone8) ? vs(9) : (Platform.OS == 'ios') ? insets.bottom - (windowWidth * 3) / 100 : vs(9),
                paddingVertical: vs(9),
                paddingHorizontal: s(13),
              }}>

                {
                  isExpired ?

                    <Text style={{
                      fontFamily: Fonts?.Medium,
                      fontSize: FontSize.medium,
                      color: AppColors.Black,
                      textAlign: 'center',
                      alignSelf: 'center',
                      paddingHorizontal: '12%'
                    }}>
                      {'This project has been completed! 🎉'}
                    </Text>
                    :
                    <View
                      style={{
                        width: '100%',
                      }}
                    >

                      {/* --------------------------------- */}
                      <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        borderRadius: Platform.OS === 'ios' ? vs(20) : vs(20),
                        backgroundColor: AppColors.Background,
                        paddingHorizontal: vs(12),
                        paddingVertical: Platform.OS == 'ios' ? vs(7) : 0,
                        justifyContent: 'space-between',
                        maxHeight: (windowWidth * 35) / 100,
                      }}>
                        <View style={{
                          width: '88%',
                          justifyContent: 'center',
                        }}>
                          <TextInput
                            placeholder='Write your message here..'
                            placeholderTextColor={'#515C6F'}
                            style={{ width: '100%', color: AppColors.Black, fontSize: FontSize.small }}
                            multiline
                            value={messageInput}
                            returnKeyType='next'
                            onChangeText={setMessageInput}
                          />
                        </View>

                        <View style={{
                          justifyContent: 'flex-end',
                          width: '12%',
                          alignItems: 'flex-end',
                          // alignSelf: 'flex-end',
                          // paddingBottom:(windowWidth*1)/100,

                        }}>
                          <Pressable style={{
                            height: windowWidth * 0.09,
                            marginBottom: Platform.OS === 'ios' ? vs(0.5) : vs(4),
                            width: '80%',
                            borderRadius: windowWidth * 0.1,
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                            disabled={false}
                            onPress={() => {
                              onSendMessage()
                            }}>
                            <Image source={Icons.Send} style={styles.sendIcon} resizeMode={'contain'} />
                          </Pressable>


                        </View>

                      </View>
                    </View>
                }


              </View>
            </View>
            // </KeyboardAvoidingView>
            :
            <Text style={{
              fontFamily: Fonts?.SemiBold,
              fontSize: FontSize.large,
              color: AppColors.Black,
              marginTop: vs(150),
              textAlign: 'center',
              alignSelf: 'center',
              paddingHorizontal: '12%'
            }}>
              {'Once your project has been scheduled, you can chat with your customer here.'}
            </Text>
      }


    </View>
  );


}

export default Chat;
