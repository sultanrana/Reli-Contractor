import React, { useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import { Text, View, StyleSheet, useColorScheme, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import moment from 'moment-timezone';
import { useIsFocused } from '@react-navigation/native';
import { vs } from 'react-native-size-matters';
import SimpleToast from 'react-native-simple-toast';

import ContainedButton from '../../Components/ContainedButton'
import { FontSize } from '../../Theme/FontSize';
import Colors from '../../Theme/Colors';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import Popup from '../../Components/Popup';
import ServiceContainer from '../../Components/ServiceContainer';
import OutlinedButton from '../../Components/OutlinedButton';
import DateSchedule from '../../Components/DateSchedule';
import { Icons } from '../../Assets/Images/Index';
import { windowWidth } from '../../Constants/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { handleChangeProjectStatusRequest, handleGetProjectDetails, handlePostAssigneeData, handlePostClaimData, handleProjectStatusChange } from '../../API/Config';
import Loader from '../../Components/Loader'
import { ProjectStatuses } from '../../Constants/ProjectStatus';
import { References } from '../../Constants/References';
import { setProjectDetails } from '../../Redux/Actions';
import { Message, MessageRoom } from '../../Schemas/MessageRoomSchema';

const Overview = ({ navigation }) => {

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  // const [step, setStep] = useState(0)
  const [popupVisible, setPopupVisible] = useState(false);

  const [loading, setLoading] = useState(true)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [projectData, setProjectData] = useState(null)
  const [selectedDateIndex, setSelectedDateIndex] = useState(-1)

  const [buttonTitle, setButtonTitle] = useState("")
  const [primaryButtonVisible, setPrimaryButtonVisible] = useState(true)
  const [step, setStep] = useState(0)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const { id, details } = useSelector(({ Projects }) => Projects)
  const { token, userData, fcmToken } = useSelector(({ Index }) => Index)


  const isAdmin = (userData?.accountType == 'admin_contractor')
  const STEP_MAX = isAdmin ? 1.5 : 1.25

  const dispatch = useDispatch()

  const projectDetails = (projectData?.orderdetails != null) ? (projectData?.orderdetails[0]) : {
    _id: '',
    serviceName: '',
    serviceType: '',
    roomType: '',
    distanceFromGround: '',
    floorType: '',
    measureType: '',
    width: '',
    heigh: '',
    currectMeasurement: true,
    images: [
      ''
    ],
    temperedGlassType: '',
    glassType: '',
    designType: "",
    colorSelection: "",
    styleSelection: "",
    openingType: "",
    openingDirection: "",
    totalAmount: 0,
    statusBit: true,
    delBit: false,
    order: "",
    createdAt: "2020-01-01T00:00:00.438Z",
    updatedAt: "2020-01-01T00:00:00.438Z",
    __v: 0
  }

  const isFocused = useIsFocused()

  const newRoom = new MessageRoom({
    ProjectID: id,
    Created: new Date(),
    Expired: false,
    ID: '',
    LastOpened: new Date(),
    Messages: [
      new Message({
        Body: `Order created on ${moment().format('hh:mm A, ddd, DD MMM YYYY')}`,
        DateTime: new Date(),
        Milliseconds: moment().valueOf(),
        ReceiverID: '',
        SenderID: userData?._id,
        Shown: true,
        SYSTEM: true,
        
      })
    ],
    Contractor: {
      ID: userData?._id,
      Image: '',
      IsTyping: false,
      FCM: fcmToken
    },
    Customer: {
      ID: '',
      Image: '',
      IsTyping: false,
      FCM: ''
    }
  })

  useEffect(() => {
    setIsButtonDisabled(false)

    if (projectData?.requestStatus !== 'Accepted' && ((projectData?.orderStatus === ProjectStatuses.Pending || projectData?.orderStatus === ProjectStatuses.Unassigned))) {
      setPrimaryButtonVisible(true)
      setButtonTitle(isAdmin ? 'Claim' : 'Confirm Sizes')

    } else if (projectData?.requestStatus === 'Accepted') {
      setStep(isAdmin ? 0 : 0.25)
      if ((selectedDateIndex === -1) && isAdmin && ((projectData?.orderStatus === ProjectStatuses.Pending || projectData?.orderStatus === ProjectStatuses.Unassigned))) {
        setPrimaryButtonVisible(!isAdmin)
      } else {
        setPrimaryButtonVisible(true)
        if ((projectData?.orderStatus === ProjectStatuses.Unassigned || projectData?.orderStatus === ProjectStatuses.Pending) && (selectedDateIndex !== -1 || !isAdmin)) {
          setButtonTitle(isAdmin ? 'Schedule' : 'Confirm Materials Ordered')
          setStep(isAdmin ? 0 : 0.25)
        } else if (projectData?.orderStatus === ProjectStatuses.Scheduled) {
          setButtonTitle(isAdmin ? 'Assign Staff' : 'Confirm Materials Ordered')
          setStep(isAdmin ? 0.25 : 0.25)
        } else if (projectData?.orderStatus === ProjectStatuses.Assigned) {
          setButtonTitle('Confirm Materials Ordered')
          setStep(isAdmin ? 0.5 : 0.25)
        } else if (projectData?.orderStatus === ProjectStatuses.Ordered) {
          setButtonTitle('En route')
          setStep(isAdmin ? 0.75 : 0.5)
        } else if (projectData?.orderStatus === ProjectStatuses.Enroute) {
          setButtonTitle('Arrived')
          setStep(isAdmin ? 1 : 0.75)
        } else if (projectData?.orderStatus === ProjectStatuses.Arrived) {
          setButtonTitle('Project Completed')
          setStep(isAdmin ? 1.25 : 1)
        } else if (projectData?.orderStatus === ProjectStatuses.Completed) {
          setButtonTitle('Project is Completed')
          setStep(isAdmin ? 1.5 : 1.25)
          setPrimaryButtonVisible(false)

        } else {
        }
      }
    }



  }, [selectedDateIndex, projectData?.orderStatus, projectData?.requestStatus])

  const loadData = () => {
    handleGetProjectDetails(token, id).then(({ data }) => {
      if (data[0]?.orderStatusDate != null && data[0]?.orderStatusDate != undefined && data[0]?.orderStatusDate != '' && (data[0]?.orderStatus !== ProjectStatuses.Pending && data[0]?.orderStatus !== ProjectStatuses.Unassigned)) {
        data[0].dateSelection = new Array(data[0]?.orderStatusDate?.split('T')[0])
      } else if (data[0]?.orderStatus !== ProjectStatuses.Unassigned && data[0]?.orderStatus !== ProjectStatuses.Pending) {
        data[0].dateSelection = new Array(data[0]?.dateSelection[0])
      }
      dispatch(setProjectDetails(data?.length > 0 ? data[0] : null))
      setProjectData(data?.length > 0 ? data[0] : null)
      console.log('Details', data);
      // console.log('Details', data[0].orderStatus);
    }).finally(() => {
      setLoading(false)
      setIsFirstTime(false)
    })
  }

  useEffect(() => {
    if (isFocused)
      loadData()
  }, [isFocused])

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
      fontSize: FontSize.large,
      color: AppColors.TextTitle,
    },
    dateContainer: {
      backgroundColor: AppColors.DateBackground,
      height: 165,
      width: windowWidth / 3.79,
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
      paddingVertical: 17,
      borderRadius: 10,
      marginVertical: 16,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })

  const editAssignment = () => {
    console.log('Edit');
    navigation.navigate('Assignment', {
      id: id,
      date: projectData?.orderStatusDate?.split('T')[0],
      location: '-'
    })
  }

  const onAssign = () => {
    navigation.navigate('Assignment', {
      id: id,
      date: projectData?.orderStatusDate?.split('T')[0],
      location: '-'
    })
  }

  const onAcceptProject = async () => {
    setLoading(true)
    handleChangeProjectStatusRequest(token, id, 'Accepted').finally(() => {
      loadData()
      firestore().collection(`Chats-test`).doc(newRoom.MessageRoomDetails.ProjectID).set(newRoom).finally(() => {
        loadData()
      })
    })
  }

  const changeStatus = async () => {
    let newStatus = ''

    if ((projectData?.requestStatus !== 'Accepted') && (projectData?.orderStatus === ProjectStatuses.Pending || projectData?.orderStatus === ProjectStatuses.Unassigned)) {
      onAcceptProject()
      return
    }

    if (projectData?.orderStatus === ProjectStatuses.Scheduled && isAdmin) {
      onAssign()
      return
    }

    if ((projectData?.orderStatus === ProjectStatuses.Pending || projectData?.orderStatus === ProjectStatuses.Unassigned)) {
      newStatus = isAdmin ? ProjectStatuses.Scheduled : ProjectStatuses.Ordered
    } else if (projectData?.orderStatus === ProjectStatuses.Scheduled) {
      newStatus = isAdmin ? ProjectStatuses.Assigned : ProjectStatuses.Ordered
    } else if (projectData?.orderStatus === ProjectStatuses.Assigned) {
      newStatus = ProjectStatuses.Ordered
    } else if (projectData?.orderStatus === ProjectStatuses.Ordered) {
      newStatus = ProjectStatuses.Enroute
    } else if (projectData?.orderStatus === ProjectStatuses.Enroute) {
      newStatus = ProjectStatuses.Arrived
    } else if (projectData?.orderStatus === ProjectStatuses.Arrived) {
      newStatus = ProjectStatuses.Completed
    } else {
      newStatus = ProjectStatuses.Scheduled
    }

    if (newStatus !== '') {
      setLoading(true)
      if (projectData?.orderStatus === ProjectStatuses.Pending || projectData?.orderStatus === ProjectStatuses.Unassigned) {
        handlePostClaimData(token, id, newStatus, projectData?.dateSelection[selectedDateIndex]).finally(() => {
          setTimeout(loadData, 400)
          loadData()
        })
      } else {
        handleProjectStatusChange(token, id, newStatus, projectData?.dateSelection[0]).finally(() => {
          loadData()
        })
      }
    }

  }


  const listHeaderComponent = () => {
    return (
      <>
        <Text allowFontScaling={false} style={styles.mainTitle}>{projectDetails?.serviceName}</Text>
        <View style={styles.projectStatusContainer}>
          <Text allowFontScaling={false} style={styles.title}>{'Project Status: '}
            <Text allowFontScaling={false} style={{ fontFamily: Fonts.Regular }}>{projectData?.requestStatus == 'Pending' ? projectData?.requestStatus : (projectData?.requestStatus == 'Accepted' && projectData?.orderStatus == 'Pending') ? projectData?.requestStatus : projectData?.orderStatus}</Text>
          </Text>

          <View style={styles.progressMainCon}>
            <View style={styles.stepsContainer}>
              <View style={[styles.stepCircle, { backgroundColor: (step >= 0 && step <= STEP_MAX) ? AppColors.Primary : AppColors.DarkGrey }]}></View>
              <View style={[styles.stepCircle, { backgroundColor: (step >= 0.25 && step <= STEP_MAX) ? AppColors.Primary : AppColors.DarkGrey }]}></View>
              <View style={[styles.stepCircle, { backgroundColor: (step >= 0.50 && step <= STEP_MAX) ? AppColors.Primary : AppColors.DarkGrey }]}></View>
              <View style={[styles.stepCircle, { backgroundColor: (step >= 0.75 && step <= STEP_MAX) ? AppColors.Primary : AppColors.DarkGrey }]}></View>
              <View style={[styles.stepCircle, { backgroundColor: (step >= 1 && step <= STEP_MAX) ? AppColors.Primary : AppColors.DarkGrey }]}></View>
              {
                //There's a difference of 0.25 in Bar for Admin>Standard Contractor
                isAdmin &&
                <View style={[styles.stepCircle, { backgroundColor: (step >= 1.25 && step <= STEP_MAX) ? AppColors.Primary : AppColors.DarkGrey }]}></View>
              }
              <View style={[styles.stepCircle, { backgroundColor: step == STEP_MAX ? AppColors.Primary : AppColors.DarkGrey }]}></View>
            </View>
            <Progress.Bar animated progress={step / STEP_MAX} height={2.5} width={windowWidth - 70} borderColor={'transparent'} unfilledColor={AppColors.DarkGrey} color={Colors('light').Primary} />
          </View>
          {
            projectData?.orderStatus != 'Pending' &&
            <Text allowFontScaling={false} style={[styles.title, { marginTop: 16 }]}>{'Scheduling Windows:'}</Text>
          }
          <View style={{ width: '100%', marginVertical: 16 }}>
            {
              projectData?.requestStatus != 'Pending' &&
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={projectData?.dateSelection}
                renderItem={({ item, index }) => (
                  <DateSchedule {...{ index, selectedDateIndex, setSelectedDateIndex, item, clickable: (projectData?.requestStatus === 'Accepted' && (projectData?.orderStatus === ProjectStatuses.Pending || projectData?.orderStatus === ProjectStatuses.Unassigned || projectData?.orderStatus === 'Accepted')) }} />
                )}
                keyExtractor={(item, index) => 'sch' + index}
                ItemSeparatorComponent={() => {
                  return <View style={{ width: vs(8) }} />
                }}
                contentContainerStyle={{
                  width: projectData?.dateSelection?.length > 1 ? '100%' : '40%'
                }}
              />}

            {
              projectData?.dateSelection?.length < 2 && projectData?.assignedorder != null && projectData?.assignedorder != undefined &&

              <View style={{
                width: '100%',
                marginTop: vs(5)
              }}>
                <Text allowFontScaling={false} style={{
                  fontFamily: Fonts.SemiBold,
                  fontSize: FontSize.large,
                  color: AppColors.BackgroundInverse
                }}>
                  {`Assigned to: `}
                  <Text allowFontScaling={false} style={{
                    fontFamily: Fonts.Medium,
                    fontSize: FontSize.medium,
                    color: AppColors.BackgroundInverse
                  }}>
                    {`${projectData?.assignedorder?.userTo?.firstName} ${projectData?.assignedorder?.userTo?.lastName}`}
                  </Text>
                </Text>
              </View>
            }

          </View>
          {primaryButtonVisible &&
            <ContainedButton
              onPress={() => {
                changeStatus()
                // step == 1 ? setStep(0) : setStep(step + 0.25)
              }}
              label={buttonTitle}
              disabled={isButtonDisabled}
            />

          }
          <View style={styles.reminderContainer}>
            <Text allowFontScaling={false} style={styles.reminderTitle}>{'Reminder'}</Text>
            <Text allowFontScaling={false} style={styles.reminderDesc}>{'You must be able to schedule the project in a period listed above'}</Text>
          </View>
        </View>

        {
          (projectData?.orderdetails != null && projectData?.orderdetails?.length > 0) &&
          <Text allowFontScaling={false} style={styles.mainTitle}>{'Service'}</Text>
        }
      </>
    )
  }

  const listFooterComponent = () => {
    return (
      <>
        {(projectData?.orderStatus === ProjectStatuses.Assigned) && isAdmin &&
          <OutlinedButton
            label={'Edit Assignment'}
            style={{ borderColor: AppColors.Primary, marginVertical: 16 }}
            labelStyle={{ color: AppColors.Primary }}
            onPress={() => {
              editAssignment()
            }}
          />
        }
        <View style={styles.locationContainer}>
          <Text
            numberOfLines={1}
            allowFontScaling={false} style={styles.title}>{'Location: '}
            <Text allowFontScaling={false} style={[styles.title, { fontFamily: Fonts.Regular }]}>{projectData?.orderdetails[0]?.property?.addressOne}</Text>
          </Text>
        </View>
        <View style={styles.paymentContainer}>
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '23%' }}>
            <Text allowFontScaling={false} style={styles.title}>{'Paid: '}</Text>
            <Text allowFontScaling={false} style={[styles.title]}>{`$ ${projectData?.totalAmount}`}</Text>
          </View>
          <View style={{ marginTop: 15, paddingHorizontal: '22%' }}>
            <Text allowFontScaling={false} style={[styles.title, { fontFamily: Fonts.Regular }]}>{'Can click to see details'}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
          <OutlinedButton
            label={'Get Support'}
            style={{ width: primaryButtonVisible ? '45%' : '99%', borderColor: AppColors.Primary }}
            labelStyle={{ color: AppColors.Primary }}
            onPress={() => {
              navigation.navigate(References.AccountStack)
            }}
          />

          {primaryButtonVisible &&
            <ContainedButton
              onPress={changeStatus}
              label={buttonTitle}
              style={{ width: '45%' }}
              disabled={isButtonDisabled}
            />
          }
        </View>
      </>
    )
  }

  return (
    <View style={[AppStyles.ProjectDetailsScreen]}>
      {/* <Progress.Bar animated progress={0.5} height={5} width={screenWidth - 70} borderColor={'transparent'} unfilledColor={AppColors.DarkGrey} color={Colors('light').Primary} /> */}

      {
        (loading && isFirstTime) ?
          <Loader loading={loading} />
          :
          <>
            <Loader loading={loading} />
            <FlatList
              showsVerticalScrollIndicator={false}
              data={(projectData?.orderdetails != null) ? (projectData?.orderdetails) : []}
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
          </>

      }

      <Popup
        visible={popupVisible}
        onRequestClose={() => setPopupVisible(false)}
        Icon={Icons.Alert}
        IconBackground={AppColors.DateBackground}
        Title={'Alert'}
        TitleStyle={{ color: '#BA1A1A' }}
      />

    </View>
  );

}

export default Overview;


