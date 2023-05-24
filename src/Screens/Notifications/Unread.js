import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, FlatList } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import NotificationDetail from '../../Components/NotificationDetail';
import { useSelector } from 'react-redux';
import { handleGetListOfNotifications } from '../../API/Config';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment-timezone';
import Loader from '../../Components/Loader';

const Unread = ({ navigation }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)
  const isFocused = useIsFocused()

  // const staffID = route?.params?.staffID

  const [loading, setLoading] = useState(true)
  const [listLoading, setListLoading] = useState(false)
  const [notifications, setNotifications] = useState([])

  const { token, userData } = useSelector(({ Index }) => Index)

  const loadData = () => {
    handleGetListOfNotifications(token).then(({ data }) => {
      setNotifications(data)
    }).finally(() => {
      setListLoading(false)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (isFocused) {
      loadData()
    }
  }, [isFocused])

  const renderNotification = ({ item }) => {
    return (
      <NotificationDetail Details={item} />
    )
  }

  return (
    <View style={[AppStyles.Screen, AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle, { backgroundColor: AppColors.White }]}>

      {/* <Loader loading={loading}/> */}

      <FlatList
        showsVerticalScrollIndicator={false}
        data={notifications}
        renderItem={({item, index}) => {
          return (
            <NotificationDetail Details={{
              title: item?.title,
              location: item?.user?.address,
              date: moment(item?.createdAt).format('DD'),
              month: moment(item?.createdAt).format('MMM'),
              time: '45m',
              type: 'new',
            }} />
          )
        }}
        keyExtractor={(item, index) => 'noti' + index}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 16 }} />
        }}
        contentContainerStyle={{ paddingVertical: 20 }}
        refreshing={listLoading}
        onRefresh={() => {
          setListLoading(true)
          loadData()
        }}
      />

    </View>
  );

}

export default Unread;
