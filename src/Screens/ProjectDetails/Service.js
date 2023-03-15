import React, { useEffect, useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SectionList, FlatList } from 'react-native';

import Popup from '../../Components/Popup'
import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import ProjectBoxWithService from '../../Components/ProjectBoxWithService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ServiceContainer from '../../Components/ServiceContainer';
import ContainedButton from '../../Components/ContainedButton';
import OutlinedButton from '../../Components/OutlinedButton';
import { Icons } from '../../Assets/Images/Index';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetProjectDetails, handleProjectStatusChange } from '../../API/Config';
import { ProjectStatuses } from '../../Constants/ProjectStatus';
import { vs } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../Components/Loader';
import { setProjectDetails } from '../../Redux/Actions';

const Service = ({ navigation }) => {

  const scheme = useColorScheme()
  const dispatch = useDispatch()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)
  const [popupVisible, setPopupVisible] = useState(false);

  const [loading, setLoading] = useState(true)
  const [projectData, setProjectData] = useState(null)

  const { id, details } = useSelector(({ Projects }) => Projects)
  const { token } = useSelector(({ Index }) => Index)

  const onComplete = () => {
    setLoading(true)
    handleProjectStatusChange(token, id, ProjectStatuses.Completed).finally(() => {
      loadData()
    })
  }

  let buttonTitle = ''
  let isButtonDisabled = false
  const isFocused = useIsFocused()

  if (projectData) {
    if (projectData?.orderStatus === ProjectStatuses.Scheduled) {
      buttonTitle = 'Assign Staff'
    } else if (projectData?.orderStatus === ProjectStatuses.Assigned) {
      buttonTitle = 'Confirm Materials Ordered'
    } else if (projectData?.orderStatus === ProjectStatuses.Ordered) {
      buttonTitle = 'En route'
    } else if (projectData?.orderStatus === ProjectStatuses.Enroute) {
      buttonTitle = 'Arrived'
    } else if (projectData?.orderStatus === ProjectStatuses.Arrived) {
      buttonTitle = 'Project Completed'
    } else {
      buttonTitle = 'Claim'
      isButtonDisabled = true
    }
  }

  const onAssign = () => {
    navigation.navigate('Assignment', {
      id: id,
      date: projectData?.orderStatusDate?.split('T')[0],
      location: '-'
    })
  }

  const changeStatus = async () => {
    let newStatus = ''
    let newAssignee = null

    if ((projectData?.orderStatus === ProjectStatuses.Pending || projectData?.orderStatus === ProjectStatuses.Unassigned)) {
      return
    }

    if (buttonTitle === 'Assign Staff') {
      onAssign()
      return
    }

    if (projectData?.orderStatus === ProjectStatuses.Unassigned) {
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
      // if (projectData?.orderStatus === ProjectStatuses.Pending || projectData?.orderStatus === ProjectStatuses.Unassigned) {
      //   handlePostClaimData(token, id, newStatus, projectData?.dateSelection[selectedDateIndex]).finally(() => {
      //     loadData()
      //   })
      // } 
      // else if (projectData?.orderStatus === ProjectStatuses.Scheduled) {
      //   handlePostAssigneeData(token, id, newStatus, projectData?.dateSelection[selectedDateIndex], newAssignee).finally(() => {
      //     loadData()
      //   })
      // } 
      handleProjectStatusChange(token, id, newStatus).finally(() => {
        loadData()
      })
    }

  }

  const loadData = () => {
    handleGetProjectDetails(token, id).then(({ data }) => {
      setProjectData(data?.length > 0 ? data[0] : null)
      dispatch(setProjectDetails(data?.length > 0 ? data[0] : null))
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    loadData()
  }, [isFocused])

  const listHeaderComponent = () => {
    return (
      <>
        <Text allowFontScaling={false} style={styles.title}>{'Service Details'}</Text>
        {/* <Text allowFontScaling={false} style={[styles.title, { marginTop: 15 }]}>{'Service: ' + serviceName}</Text> */}
      </>
    )
  }

  const listFooterComponent = () => {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
      }}>
        {details?.orderStatus !== ProjectStatuses.Completed &&
          <OutlinedButton
            label={'Mark as Completed'}
            style={{ borderColor: AppColors.Primary, marginVertical: 16, width: !isButtonDisabled? '60%': '99%' }}
            labelStyle={{ color: AppColors.Primary, fontSize: vs(11) }}
            onPress={onComplete}
          />
        }

        { !isButtonDisabled && 
          <ContainedButton
          onPress={changeStatus}
          label={buttonTitle}
          style={{ width: '30%' }}
          disabled={isButtonDisabled}
        />
        }
      </View>
    )
  }

  const styles = StyleSheet.create({
    title: {
      fontFamily: Fonts.SemiBold,
      fontSize: FontSize.xlarge,
      color: AppColors.TextTitle,
      textAlignVertical: 'center'
    }
  })

  return (
    <View style={[AppStyles.ProjectDetailsScreen]}>
      <Loader loading={loading}/>
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
        Icon={Icons.Congrats}
        IconBackground={AppColors.DateBackground}
        Title={'Thank You!'}
        TitleStyle={{ color: '#00C389' }} />

    </View>
  );


}

export default Service;
