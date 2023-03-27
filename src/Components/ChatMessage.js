import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { Message } from '../Schemas/MessageRoomSchema'
import { vs, s } from 'react-native-size-matters'
import moment from 'moment-timezone'
import { useSelector } from 'react-redux'
import { windowWidth } from '../Helpers/Utils'
import { GetStyles } from '../Theme/AppStyles'
import Colors from '../Theme/Colors'
import Fonts from '../Assets/Fonts/Index'
import { FontSize } from '../Theme/FontSize'


const ChatMessage = ({ Item }) => {

    const scheme = useColorScheme()
    const AppStyles = GetStyles(scheme || 'light')
    const AppColors = Colors(scheme)

    const [textShown, setTextShown] = useState(false);
    const [lengthMore, setLengthMore] = useState(false);
    const toggleNumberOfLines = () => {
        setTextShown(!textShown);
    }

    const {
        loginUserData,
    } = useSelector(({ Auth }) => Auth)

    const messageItem = new Message(Item?.MessageDetails)
    const { MessageDetails, isSentByMe } = messageItem
    const { Body, SYSTEM, ImagePaths, DocPaths } = MessageDetails
    const isMine = isSentByMe(loginUserData?.user_id)

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
            }}>
                <View style={{
                    backgroundColor: SYSTEM ? '#FFF2D9' : isMine ? AppColors.Primary : '#FDECDF',
                    padding: 8,
                    borderRadius: 8,
                }}>

                    <Text
                        onTextLayout={onTextLayout}
                        numberOfLines={textShown ? undefined : 8}
                        style={{
                            textAlign: 'left',
                            color: SYSTEM ? '#A47C32' : isMine ? '#E0E0E0' : '#0C1016',
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