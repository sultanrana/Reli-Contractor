import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { Message } from '../Schemas/MessageRoomSchema'
import { vs, s } from 'react-native-size-matters'
import moment from 'moment-timezone'
import { useSelector } from 'react-redux'
import { windowWidth } from '../Constants/Constants'
import { GetStyles } from '../Theme/AppStyles'
import Colors, { colors } from '../Theme/Colors'
import Fonts from '../Assets/Fonts/Index'
import { FontSize } from '../Theme/FontSize'


const ChatMessage = ({ Item }) => {

    const scheme = useColorScheme()
    const AppStyles = GetStyles(scheme || 'light')
    const AppColors = Colors(scheme)

    const { userData } = useSelector(state => state.Index)

    const [textShown, setTextShown] = useState(false);
    const [lengthMore, setLengthMore] = useState(false);
    const toggleNumberOfLines = () => {
        setTextShown(!textShown);
    }

    // const {
    //     loginUserData,
    // } = useSelector(({ Auth }) => Auth)

    const messageItem = new Message(Item?.MessageDetails)
    const { MessageDetails, isSentByMe } = messageItem
    // console.log({MessageDetails});
    const { Body, SYSTEM } = MessageDetails
    const isMine = isSentByMe(userData?._id,)

    var str = moment(MessageDetails.Milliseconds).format('hh:mm A, DD MMM YY')

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 4);
    }, []);
    return (

        <View style={{
            width: '100%',
            alignItems: SYSTEM ? 'center' : isMine ? 'flex-end' : 'flex-start',
            justifyContent: 'center',
            zIndex: 5,
        }}>
            <View style={{
                maxWidth: SYSTEM ? (windowWidth / 1.3) : (windowWidth / 1.2),
                alignItems: SYSTEM ? 'center' : isMine ? 'flex-end' : 'flex-start',
                // backgroundColor: 'pink'

            }}>
                {
                    !SYSTEM &&
                    <Text
                        onTextLayout={onTextLayout}
                        numberOfLines={textShown ? undefined : 1}
                        style={{
                            textAlign: 'left',
                            color: colors.Black,
                            fontFamily: Fonts.Regular,
                            fontSize: FontSize.small,
                            marginBottom: 3

                        }} >{userData?.firstName}</Text>
                }
                <View style={{
                    backgroundColor: SYSTEM ? '#FFF2D9' : isMine ? '#E0E0E0' : '#FDECDF',
                    padding: 8,
                    borderTopLeftRadius: 7,
                    borderBottomLeftRadius:7,
                    borderBottomRightRadius:7
                }}>

                    <Text
                        onTextLayout={onTextLayout}
                        numberOfLines={textShown ? undefined : 8}
                        style={{
                            textAlign: 'left',
                            color: SYSTEM ? '#A47C32' : isMine ? colors.Black : '#0C1016',
                            fontFamily: Fonts.Regular,
                            fontSize: SYSTEM ? FontSize.small : FontSize.medium,


                        }} >{Body}</Text>
                    {
                        lengthMore ?
                            <Text
                                onPress={toggleNumberOfLines}
                                style={{
                                    fontSize: FontSize.small,
                                    fontFamily: Fonts.Regular,
                                    marginTop: 10,
                                    color: SYSTEM ? '#A47C32' : isMine ? '#FFFFFF' : '#0C1016',
                                }}>{textShown ? 'Read less' : 'Read more'}</Text>
                            : null
                    }
                </View>

                {!SYSTEM &&
                    <Text style={{
                        textAlign: isMine ? 'right' : 'left',
                        color: '#8F98A7',
                        fontFamily: Fonts.Regular,
                        fontSize: FontSize.xsmall,
                        width: '100%',
                        marginTop: vs(3),


                    }}>
                        {str}
                    </Text>
                }

            </View>

        </View>

    )

}

const styles = StyleSheet.create({
    msgImg: {
        height: (windowWidth * 40) / 100,
        width: '92%',
        maxWidth: '92%',

    }
})
export default ChatMessage;