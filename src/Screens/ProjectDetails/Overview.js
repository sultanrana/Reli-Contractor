import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import * as Progress from 'react-native-progress';
import { Text, View, Image, StyleSheet, useColorScheme, Dimensions, FlatList } from 'react-native';

import ContainedButton from '../../Components/ContainedButton'
import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import ProjectBoxWithDate from '../../Components/ProjectBoxWithDate';
import ServiceContainer from '../../Components/ServiceContainer';
import OutlinedButton from '../../Components/OutlinedButton';

const screenWidth = Dimensions.get('window').width

const Overview = ({ navigation }) => {

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const [step, setStep] = useState(0)

  const schedulesData = [
    {
      day: 'Thurs',
      date: '04',
      month: 'Oct',
      time: '12pm - 3pm',

    },
    {
      day: 'Fri',
      date: '05',
      month: 'Oct',
      time: '12pm - 3pm',

    },
    {
      day: 'Sat',
      date: '06',
      month: 'Oct',
      time: '12pm - 3pm',

    },
    {
      day: 'Sat',
      date: '06',
      month: 'Oct',
      time: '12pm - 3pm',

    },

  ]
  const serviceData = [
    {
      stacked: 'yes',
      topSection: 'L 36" x H 48"',
      bottomSection: 'L 36" x H 48"',
      color: 'Brown',
      grid: 'Yes',
      safety: 'Yes',
      fireSafety: 'Yes',
      privacy: 'Yes',
      floor: '2',
      room: 'Bedroom',
    },
    {
      stacked: 'yes',
      topSection: 'L 36" x H 48"',
      bottomSection: 'L 36" x H 48"',
      color: 'Brown',
      grid: 'Yes',
      safety: 'Yes',
      fireSafety: 'Yes',
      privacy: 'Yes',
      floor: '2',
      room: 'Bedroom',
    },


  ]

  const styles = StyleSheet.create({
    mainTitle: {
      fontFamily: Fonts.SemiBold,
      fontSize: FontSize.xlarge,
      color: AppColors.TextTitle,
    },
    progressMainCon: {
      width: "100%",
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'pink',
      height: 25,
      marginTop: 22
    },
    stepsContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      zIndex: 999
    },
    stepCircle: {
      height: 20,
      width: 20,
      borderRadius: 20,

    },
    projectStatusContainer: {
      width: '100%',
      backgroundColor: AppColors.Background,
      paddingHorizontal: 13,
      paddingVertical: 17,
      borderRadius: 10,
      marginVertical: 16
    },
    title: {
      fontFamily: Fonts.SemiBold,
      fontSize: FontSize.medium,
      color: AppColors.TextTitle,
    },
    dateContainer: {
      backgroundColor: AppColors.DateBackground,
      height: 165,
      width: screenWidth / 3.79,
      borderRadius: 10,
      paddingTop: 8
    },
    dateInnerContainer: {
      backgroundColor: AppColors.White,
      height: '75%',
      width: '100%',
      borderRadius: 10,
    },
    reminderContainer: {
      width: '100%',
      marginTop: 16
    },
    reminderTitle: {
      fontFamily: Fonts.SemiBold,
      fontSize: FontSize.small,
      color: AppColors.TextTitle,
    },
    reminderDesc: {
      fontFamily: Fonts.Regular,
      fontSize: FontSize.small,
      color: AppColors.TextTitle,
    },
    timeContainer: {
      height: '25%',
      backgroundColor: AppColors.Primary,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    time: {
      fontFamily: Fonts.Regular,
      fontSize: FontSize.small,
      color: AppColors.White,
    },
    serviceContainer: {
      width: '100%',
      backgroundColor: AppColors.Background,
      paddingHorizontal: 13,
      paddingVertical: 17,
      borderRadius: 10,
      marginTop: 16
    },
    locationContainer: {
      width: '100%',
      backgroundColor: AppColors.Background,
      paddingHorizontal: 13,
      paddingVertical: 17,
      borderRadius: 10,
      marginTop: 16
    },
    paymentContainer: {
      width: '100%',
      backgroundColor: AppColors.Background,
      paddingHorizontal: 13,
      paddingVertical: 17,
      borderRadius: 10,
      marginVertical: 16
    }
  })

  const listHeaderComponent = () => {
    return (
      <>
        <Text style={styles.mainTitle}>{'2x Windows'}</Text>
        <View style={styles.projectStatusContainer}>
          <Text style={styles.title}>{'Project Status: '}
            <Text style={{ fontFamily: Fonts.Regular }}>{'Pending Accetance'}</Text>
          </Text>

          <View style={styles.progressMainCon}>
            <View style={styles.stepsContainer}>
              <View style={[styles.stepCircle, { backgroundColor: (step >= 0 && step <= 1) ? AppColors.Primary : AppColors.DarkGrey }]}></View>
              <View style={[styles.stepCircle, { backgroundColor: (step >= 0.25 && step <= 1) ? AppColors.Primary : AppColors.DarkGrey }]}></View>
              <View style={[styles.stepCircle, { backgroundColor: (step >= 0.5 && step <= 1) ? AppColors.Primary : AppColors.DarkGrey }]}></View>
              <View style={[styles.stepCircle, { backgroundColor: (step >= 0.75 && step <= 1) ? AppColors.Primary : AppColors.DarkGrey }]}></View>
              <View style={[styles.stepCircle, { backgroundColor: step == 1 ? AppColors.Primary : AppColors.DarkGrey }]}></View>
            </View>
            <Progress.Bar animated progress={step} height={4} width={screenWidth - 70} borderColor={'transparent'} unfilledColor={AppColors.DarkGrey} color={Colors('light').Primary} />
          </View>
          <Text style={[styles.title, { marginTop: 16 }]}>{'Scheduling Windows:'}</Text>
          <View style={{ width: '100%', marginVertical: 16 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={schedulesData}
              renderItem={renderSchedule}
              keyExtractor={(item, index) => 'sch' + index}
              ItemSeparatorComponent={() => {
                return <View style={{ width: 10 }} />
              }}
            />
          </View>
          <ContainedButton
            onPress={() => step == 1 ? setStep(0) : setStep(step + 0.25)}
            label="Claim"
          />

          <View style={styles.reminderContainer}>
            <Text style={styles.reminderTitle}>{'Reminder'}</Text>
            <Text style={styles.reminderDesc}>{'You must be able to schedule the project in a period listed above'}</Text>
          </View>
        </View>

        <Text style={styles.mainTitle}>{'Service'}</Text>
      </>
    )
  }

  const listFooterComponent = () => {
    return (
      <>
        <OutlinedButton
          label={'Mark as Ordered'}
          style={{ borderColor: AppColors.Primary, marginVertical: 16 }}
          labelStyle={{ color: AppColors.Primary }}
        />
        <View style={styles.locationContainer}>
          <Text style={styles.title}>{'Location: '}
            <Text style={[styles.title, { fontFamily: Fonts.Regular }]}>{'123 Indus Park, California'}</Text>
          </Text>
        </View>
        <View style={styles.paymentContainer}>
          <Text style={styles.title}>{'Paid: '}
            <Text style={[styles.title, { fontFamily: Fonts.Regular }]}>{'$410'}</Text>
          </Text>
          <Text style={[styles.title, { fontFamily: Fonts.Regular }]}>{'Can click to see details'}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
          <OutlinedButton
            label={'Get Suport'}
            style={{ width: '45%', borderColor: AppColors.Primary }}
            labelStyle={{ color: AppColors.Primary }}
          />
          <ContainedButton
            label="Claim"
            style={{width:'25%'}}
          />
        </View>
      </>
    )
  }

  const renderSchedule = ({ item }) => {
    return (
      <View style={styles.dateContainer}>
        <View style={{ height: '75%', paddingHorizontal: 7, }}>
          <View style={styles.dateInnerContainer}>
            <View style={{
              height: '35%',
              backgroundColor: AppColors.DarkGrey,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{
                fontFamily: Fonts.Regular,
                fontSize: FontSize.medium,
                color: AppColors.White,
              }}>{item.day}</Text>
            </View>

            <Text style={{
              fontFamily: Fonts.Regular,
              fontSize: 40,
              color: AppColors.TextTitle,
              alignSelf: 'center'
            }}>{item.date}</Text>
          </View>
          <Text style={{
            fontFamily: Fonts.SemiBold,
            fontSize: FontSize.medium,
            color: AppColors.TextTitle,
            alignSelf: 'center',
            marginTop: 5
          }}>{item.month}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={[AppStyles.ProjectDetailsScreen]}>
      {/* <Progress.Bar animated progress={0.5} height={5} width={screenWidth - 70} borderColor={'transparent'} unfilledColor={AppColors.DarkGrey} color={Colors('light').Primary} /> */}

      <FlatList
        showsVerticalScrollIndicator={false}
        data={serviceData}
        renderItem={({ item }) => {
          return (
            <ServiceContainer Details={item} />
          )
        }}
        keyExtractor={(item, index) => 'ser' + index}
        ListHeaderComponent={listHeaderComponent}
        ListFooterComponent={listFooterComponent}
        contentContainerStyle={{ paddingBottom: '10%' }}
      />
    </View>
  );


}

export default Overview;


