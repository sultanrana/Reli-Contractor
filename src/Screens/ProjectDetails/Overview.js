import React, { useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import { Text, View, StyleSheet, useColorScheme, FlatList } from 'react-native';
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
import { handleGetProjectDetails, handlePostAssigneeData, handlePostClaimData, handleProjectStatusChange } from '../../API/Config';
import Loader from '../../Components/Loader'
import { ProjectStatuses } from '../../Constants/ProjectStatus';
import { References } from '../../Constants/References';
import { setProjectDetails } from '../../Redux/Actions';
import { useIsFocused } from '@react-navigation/native';

const Overview = ({ navigation }) => {

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  // const [step, setStep] = useState(0)
  const [popupVisible, setPopupVisible] = useState(false);

  const [loading, setLoading] = useState(true)
  const [projectData, setProjectData] = useState(null)
  const [selectedDateIndex, setSelectedDateIndex] = useState(-1)

  const { id, details } = useSelector(({ Projects }) => Projects)
  const { token } = useSelector(({ Index }) => Index)

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

  const loadData = () => {
    handleGetProjectDetails(token, id).then(({ data }) => {
      if (data[0]?.orderStatusDate != null && data[0]?.orderStatusDate != undefined && data[0]?.orderStatusDate != '') {
        data[0].dateSelection = new Array(data[0]?.orderStatusDate?.split('T')[0])
      }
      dispatch(setProjectDetails(data?.length > 0 ? data[0] : null))
      setProjectData(data?.length > 0 ? data[0] : null)
      console.log('Details', data[0]);
    }).finally(() => {
      setLoading(false)
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
      paddingVertical: 17,
      borderRadius: 10,
      marginVertical: 16,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })

  let buttonTitle = '';
  let step = 0;
  let isButtonDisabled = false;

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

  if (selectedDateIndex === -1 && (projectData?.orderStatus === ProjectStatuses.Pending || projectData?.orderStatus === ProjectStatuses.Unassigned)) {
    buttonTitle = 'Claim'
    isButtonDisabled = true
  }

  if (projectData?.orderStatus === ProjectStatuses.Unassigned || selectedDateIndex !== -1) {
    buttonTitle = 'Schedule and Claim'
    step = 0
  } else if (projectData?.orderStatus === ProjectStatuses.Scheduled) {
    buttonTitle = 'Assign Staff'
    step = 0.25
  } else if (projectData?.orderStatus === ProjectStatuses.Assigned) {
    buttonTitle = 'Confirm Materials Ordered'
    step = 0.5
  } else if (projectData?.orderStatus === ProjectStatuses.Ordered) {
    buttonTitle = 'En route'
    step = 0.75
  } else if (projectData?.orderStatus === ProjectStatuses.Enroute) {
    buttonTitle = 'Arrived'
    step = 1
  } else if (projectData?.orderStatus === ProjectStatuses.Arrived) {
    buttonTitle = 'Project Completed'
    step = 1.25
  } else if (projectData?.orderStatus === ProjectStatuses.Completed) {
    buttonTitle = 'Project is Completed'
    step = 1.5
  } else {
    buttonTitle = 'Claim'
    isButtonDisabled = (selectedDateIndex === -1)
  }

  const changeStatus = async () => {
    let newStatus = ''
    let newDate = null
    let newAssignee = null

    if (selectedDateIndex === -1 && (projectData?.orderStatus === ProjectStatuses.Pending || projectData?.orderStatus === ProjectStatuses.Unassigned)) {
      return
    }

    if (buttonTitle === 'Assign Staff') {
      onAssign()
      return
    }

    if (projectData?.orderStatus === ProjectStatuses.Unassigned || selectedDateIndex !== -1) {
      newStatus = ProjectStatuses.Scheduled
    } else if (projectData?.orderStatus === ProjectStatuses.Scheduled) {
      newStatus = ProjectStatuses.Assigned
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
        })
        setProjectDetails(p=>p)
      } else if (projectData?.orderStatus === ProjectStatuses.Scheduled) {
        handlePostAssigneeData(token, id, newStatus, projectData?.dateSelection[selectedDateIndex], newAssignee).finally(() => {
          loadData()
        })
      } else {
        handleProjectStatusChange(token, id, newStatus).finally(() => {
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
            <Text allowFontScaling={false} style={{ fontFamily: Fonts.Regular }}>{projectData?.orderStatus}</Text>
          </Text>

          <View style={styles.progressMainCon}>
            <View style={styles.stepsContainer}>
              <View style={[styles.stepCircle, { backgroundColor: (step >= 0 && step <= 1.5) ? AppColors.Primary : AppColors.DarkGrey }]}></View>
              <View style={[styles.stepCircle, { backgroundColor: (step >= 0.25 && step <= 1.5) ? AppColors.Primary : AppColors.DarkGrey }]}></View>
              <View style={[styles.stepCircle, { backgroundColor: (step >= 0.50 && step <= 1.5) ? AppColors.Primary : AppColors.DarkGrey }]}></View>
              <View style={[styles.stepCircle, { backgroundColor: (step >= 0.75 && step <= 1.5) ? AppColors.Primary : AppColors.DarkGrey }]}></View>
              <View style={[styles.stepCircle, { backgroundColor: (step >= 1 && step <= 1.5) ? AppColors.Primary : AppColors.DarkGrey }]}></View>
              <View style={[styles.stepCircle, { backgroundColor: (step >= 1.25 && step <= 1.5) ? AppColors.Primary : AppColors.DarkGrey }]}></View>
              <View style={[styles.stepCircle, { backgroundColor: step == 1.5 ? AppColors.Primary : AppColors.DarkGrey }]}></View>
            </View>
            <Progress.Bar animated progress={step/1.5} height={2.5} width={windowWidth - 70} borderColor={'transparent'} unfilledColor={AppColors.DarkGrey} color={Colors('light').Primary} />
          </View>
          <Text allowFontScaling={false} style={[styles.title, { marginTop: 16 }]}>{'Scheduling Windows:'}</Text>
          <View style={{ width: '100%', marginVertical: 16 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={projectData?.dateSelection}
              renderItem={({ item, index }) => (
                <DateSchedule {...{ index, selectedDateIndex, setSelectedDateIndex, item, clickable: (projectData?.dateSelection?.length > 1 && (projectData?.orderStatus === ProjectStatuses.Pending || projectData?.orderStatus === ProjectStatuses.Unassigned || projectData?.orderStatus === 'Accepted')) }} />
              )}
              keyExtractor={(item, index) => 'sch' + index}
              ItemSeparatorComponent={() => {
                return <View style={{ width: 10 }} />
              }}
            />
          </View>
          {projectData?.orderStatus !== ProjectStatuses.Completed &&
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
        {(projectData?.orderStatus === ProjectStatuses.Assigned) &&
          <OutlinedButton
            label={'Edit Assignment'}
            style={{ borderColor: AppColors.Primary, marginVertical: 16 }}
            labelStyle={{ color: AppColors.Primary }}
            onPress={()=>{
              editAssignment()
            }}
          />
        }
        <View style={styles.locationContainer}>
          <Text allowFontScaling={false} style={styles.title}>{'Location: '}
            <Text allowFontScaling={false} style={[styles.title, { fontFamily: Fonts.Regular }]}>{'[Required from backend]'}</Text>
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
            label={'Get Suport'}
            style={{ width: projectData?.orderStatus !== ProjectStatuses.Completed ? '45%' : '99%', borderColor: AppColors.Primary }}
            labelStyle={{ color: AppColors.Primary }}
          />

          {projectData?.orderStatus !== ProjectStatuses.Completed &&
            <ContainedButton
              onPress={() => { setPopupVisible(true) }}
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


