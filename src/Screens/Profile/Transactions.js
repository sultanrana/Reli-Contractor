import React, { useEffect, useState } from 'react';
import { Text, View, useColorScheme, SectionList } from 'react-native';
import { FontSize } from '../../Theme/FontSize';
import Colors from '../../Theme/Colors';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import TransactionDetail from '../../Components/TransactionDetail';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { handleGetListOfTransactions } from '../../API/Config';
import Loader from '../../Components/Loader'
import { setUnpaidTransactions, setPaidTransactions } from '../../Redux/Actions'
import moment from 'moment-timezone';
import { vs } from 'react-native-size-matters';

const Transactions = ({ navigation }) => {

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)
  const isFocused = useIsFocused()

  const { token, userData } = useSelector(({ Index }) => Index)
  const { unpaid, paid } = useSelector(({ Transactions }) => Transactions)

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)

  const loadData = async () => {
    handleGetListOfTransactions(token).then(({ data }) => {
      const tPaid = []
      const tUnpaid = []
      data.forEach(element => {
        if (element?.stripePaymentId != null && element?.stripePaymentId != '' && element?.stripePaymentId != undefined) {
          tPaid.push(element)
        } else tUnpaid.push(element)
      });

      dispatch(setUnpaidTransactions(tUnpaid))
      dispatch(setPaidTransactions(tPaid))

    }).finally(() => {
      setIsLoading(false)
    })
  }

  useEffect(() => {
    if (isFocused) {
      setIsLoading(unpaid.length === 0 && paid.length === 0)
      loadData()
    }
  }, [isFocused])

  const Data = [
    {
      title: unpaid.length > 0 && 'Unpaid',
      data: unpaid
    },
    {
      title: paid.length > 0 && 'Paid',
      data: paid
    },
  ]

  return (
    <View style={[AppStyles.HorizontalStyle, AppStyles.CommonScreenStyles, { backgroundColor: AppColors.White, paddingTop: 10 }]}>

      <Loader loading={isLoading} />

      <SectionList
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        sections={(Data[0]?.data.length > 0 || Data[1]?.data.length>0 ) ? Data: []}
        keyExtractor={(item, index) => 'ci' + index}
        renderItem={({ item }) => {
          return (
            <TransactionDetail
              Details={{
                title: item?.name,
                created: moment(item?.createdAt).format('DD/MM/YYYY'),
                updated: moment(item?.orderStatusDate).format('DD/MM/YYYY'),
                amount: `$${parseFloat(item?.totalAmount).toFixed(2)}`,
                status: item?.orderStatus
              }}
            />
          )
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text allowFontScaling={false} style={{
            fontFamily: Fonts.SemiBold,
            fontSize: FontSize.xxlarge,
            color: AppColors.TextTitle,
            // marginTop:50
          }}>
            {title}
          </Text>
        )}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 18 }} />
        }}
        contentContainerStyle={{ paddingBottom: 10 }}
        SectionSeparatorComponent={() => {
          return <View style={{ marginTop: 8 }} />
        }}
        ListEmptyComponent={() => {
          if(!isLoading){
           return (
             <Text style={{
               fontFamily: Fonts.Light,
               fontSize: FontSize.large,
               color: AppColors.DarkGrey,
               marginTop: vs(150),
               textAlign: 'center',
               alignSelf: 'center',
             }}>
               {'No Transactions Found'}
             </Text>
           )
          }
          return null
         }}
      />
    </View>
  );

}

export default Transactions;
