import { View, FlatList, Dimensions, StatusBar, Platform, TextInput, KeyboardAvoidingView, Pressable, StyleSheet, useColorScheme } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { Message, MessageRoom } from '../../Schemas/MessageRoomSchema'
import { vs, s } from 'react-native-size-matters'
import moment from 'moment-timezone'
import { useSelector } from 'react-redux'
import { SvgXml } from 'react-native-svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Send, _Cross } from '../../Assets/SvgIcons'
import ChatMessage from '../../Components/ChatMessage'
import { FontSize } from '../../Theme/FontSize'
import { GetStyles } from '../../Theme/AppStyles'
import Colors from '../../Theme/Colors'

const windowHeight = Math.round(Dimensions.get("window").height);
const windowWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Dimensions.get('screen').height;
const StatusbarHeight = (Platform.OS === 'ios' ? windowHeight * 0.03695 : StatusBar.currentHeight)
let headerHeight = deviceHeight - windowHeight + StatusbarHeight;
headerHeight += (Platform.OS === 'ios') ? 28 : -60
const mode = 'test'

const Chat = ({ navigation, route }) => {

    const scheme = useColorScheme()
    const AppStyles = GetStyles(scheme || 'light')
    const AppColors = Colors(scheme)

    const [room, setRoom] = useState<MessageRoom>()
    const [isAutoResendable, setIsAutoResendable] = useState<Boolean>(true)
    const [messageInput, setMessageInput] = useState<string>('')
    const insets = useSafeAreaInsets()
    const messageInputRef = useRef()
    const { chatOptions } = route?.params
    const { id, details } = useSelector(({ Projects }) => Projects)
    const { token, userData } = useSelector(({ Index }) => Index)
    const { provider, patient, appointment } = chatOptions
    !chatOptions ? (() => { navigation.canGoBack() && navigation.goBack(); return (<></>) })() : true
    const isNextChatEnabled = true

    useEffect(() => {
        messageInputRef?.current?.focus()
        firestore()
            .collection(`Chats-${mode}`)
            .doc(appointment?.order)
            .onSnapshot(documentSnapshot => {
                if (!documentSnapshot.exists) {
                    const thisRoom = new MessageRoom({
                        ID: appointment?.order,
                        OrderID: appointment?.id,
                        Created: new Date(),
                        Expired: isNextChatEnabled,
                        Customer: {
                            ID: patient?.id,
                            Image: patient?.image
                        },
                        Contractor: {
                            ID: provider?.id,
                            Image: provider?.image,
                            UserType: 'Doctor'
                        },
                        Messages: []
                    })
                    // console.log(room.MessageRoomDetails);
                    firestore()
                        .collection(`Chats-${mode}`)
                        .doc(appointment?.order)
                        .set(thisRoom)
                        .then(() => {
                            console.log('posted');
                        })
                } else {
                    const roomDetails = documentSnapshot?.data()
                    // console.log({ roomDetails });
                    roomDetails?.MessageRoomDetails?.Messages?.reverse()
                    console.log('Room', room?.MessageRoomDetails.Messages);

                    setRoom(roomDetails)
                }
            })
    }, [])

    const onSendMessage = async () => {

        if (isAutoResendable) {
            setIsAutoResendable(false)

            const newMessage = new Message({
                Body: messageInput,
                DateTime: new Date(),
                Milliseconds: moment().valueOf(),
                ReceiverID: patient?.id,
                SenderID: userData?.user_id,
                Shown: true,
                SYSTEM: false
            })
            setRoom(r => {
                r?.MessageRoomDetails.Messages.unshift(newMessage)
                return r
            })
            setMessageInput('')
            await firestore()
                .collection(`Chats-${mode}`)
                .doc(appointment?.order)
                .update({ 'MessageRoomDetails.Messages': firestore.FieldValue.arrayUnion(newMessage) })
                .finally(() => {
                    setIsAutoResendable(true)
                })
        }
    }

    const renderMessageItem = ({ item, index }) => {
        return (
            <ChatMessage Item={item} />
        )
    }
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
        closeContainer: {
            height: s(20),
            width: s(20),
            borderRadius: s(20),
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: AppColors.DarkGrey,
            zIndex: 999
        },
    })

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: AppColors.Background,
            }}>
            <KeyboardAvoidingView
                style={styles.mainContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? vs(28) : 0}
            >
                <View style={styles.content}>
                    <FlatList
                        style={{ flex: 1, zIndex: 2 }}
                        contentContainerStyle={{ paddingHorizontal: '2%', zIndex: 3, paddingBottom: vs(28), paddingTop: vs(32) }}
                        data={room?.MessageRoomDetails?.Messages}
                        keyExtractor={(i, _i) => 'message' + _i}
                        inverted={true}
                        renderItem={renderMessageItem}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => (<View style={{ marginVertical: vs(6) }} />)}
                    />
                </View>
                <View style={{
                    width: '100%',
                    backgroundColor: AppColors.White,
                    paddingBottom: (Platform.OS == 'ios') ? insets.bottom - (windowWidth * 3) / 100 : vs(9),
                    paddingVertical: vs(9),
                    paddingHorizontal: s(13),
                }}>
                    <View
                        style={{
                            width: '100%',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                        }}
                    >
                        <View style={{
                            width: '88%',
                        }}>
                            <View style={{
                                width: '100%',
                                flexDirection: 'row',
                                borderRadius: Platform.OS === 'ios' ? vs(15) : vs(20),
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
                                        ref={messageInputRef}
                                        onChangeText={setMessageInput}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{
                            justifyContent: 'flex-end',
                            width: '12%',
                            alignItems: 'flex-end',

                        }}>
                            <Pressable style={{
                                backgroundColor: AppColors.Primary,
                                height: windowWidth * 0.09,
                                marginBottom: Platform.OS === 'ios' ? vs(0.5) : vs(4),
                                width: '80%',
                                borderRadius: windowWidth * 0.1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                                disabled={messageInput.trim().length <= 0}
                                onPress={() => {
                                    onSendMessage()
                                }}>
                                <SvgXml xml={Send} />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>

    )
}

export default Chat