import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SectionList, SafeAreaView, } from 'react-native';

// ------------------------------------------
import LogoOver from '../../Components/LogoOver';
import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import ProjectBoxWithService from '../../Components/ProjectBoxWithService';
import ProjectBoxWithDate from '../../Components/ProjectBoxWithDate';
import { Images } from '../../Assets/Images/Index';
import { handleGetDashboardData, handleUserProfile } from '../../API/Config';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActionNeededProjects, setClaimProjects, setUserData } from '../../Redux/Actions';
import Loader from '../../Components/Loader';
import { useIsFocused } from '@react-navigation/native';
import { API_URL, IMAGES_URL } from '../../API/Constants';
import moment from 'moment-timezone';
import { vs } from 'react-native-size-matters';
import OutlinedButton from '../../Components/OutlinedButton';

const Home = ({ navigation }) => {

  const dispatch = useDispatch()
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)
  const [isLoading, setIsLoading] = useState(true)
  const [sectionOne, setSectionOne] = useState([])

  const { claim, actionNeeded } = useSelector(state => state.Projects)
  const { token } = useSelector(state => state.Index)



  useEffect(() => {
    getUserDetails()
  }, [])
  const isFocused = useIsFocused()
  useEffect(() => {
    getProjects()
  }, [isFocused])

  const getUserDetails = () => {
    handleUserProfile().then((res) => {
      dispatch(setUserData(res))
    })
  }

  const getProjects = async () => {
    // setIsLoading(is => ((!actionNeeded || !claim) && !is))
    handleGetDashboardData(token).then(({ data }) => {
      // console.log('./././././',data);
      // console.log('./././././',data[0]?.actionNeededOrders);
      // console.log('./././././',data[0]?.claimOrders);
      const { actionNeededOrders, claimOrders } = data[0]
      setSectionOne(claimOrders)
      dispatch(setClaimProjects(claimOrders.length > 3 ? claimOrders.slice(0, 3) : claimOrders))
      dispatch(setActionNeededProjects(actionNeededOrders))
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const renderServiceItem = ({ item, index }) => {
    const details = item?.orderdetails[0]
    const dateMap = item?.dateSelection.map((d, i) => {
      return (i === item?.dateSelection?.length - 1 ? 'or ' : '') + (moment(d).format('MMM DD'))
    }).join(', ')

    return (
      <ProjectBoxWithService
        navigation={navigation}
        id={item?._id}
        title={details?.serviceName}
        subtitle1={item?.orderdetails[0]?.property?.addressOne}
        subtitle2={dateMap}
        imageURL1={Images.House}
        imageURL2={details?.images?.length > 0 ? IMAGES_URL + details?.images[0] : ''}

      />
    )
  }

  const renderDateItem = ({ item, index }) => {
    const details = (item?.orderdetails?.length > 1) ? item?.orderdetails[1] : (item?.orderdetails?.length > 0) ? item?.orderdetails[0] : { title: '' }
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const dateMap = item?.dateSelection.map((d, i) => {
      return (i === item?.dateSelection?.length - 1 ? 'or ' : '') + (moment(d).format('MMM DD'))
    }).join(', ')

    const createdAt = new Date(details?.createdAt)

    return (
      <ProjectBoxWithDate
        navigation={navigation}
        id={item?._id}
        title={details?.serviceName}
        subtitle1={item?.orderdetails[0]?.property?.addressOne}
        subtitle2={dateMap}
        imageURL1={Images.House}
        clickable
        calenderData={{
          date: moment(details?.createdAt).format('DD'),
          month: moment(details?.createdAt).format('MMM'),
          day: moment(details?.createdAt).format('ddd')
        }}
      />
    )
  }

  const Data = [
    {
      title: claim ? 'Claim Projects' : '',
      renderItem: renderServiceItem,
      data: claim ? claim : []
    },
    {
      title: actionNeeded ? 'Action Needed' : '',
      renderItem: renderDateItem,
      data: actionNeeded ? actionNeeded : []
    }
  ]

  const EmptySectionMessage = () => <Text style={{
    fontFamily: Fonts.Light,
    fontSize: FontSize.large,
    color: AppColors.DarkGrey,
    marginTop: Data[1].data.length > 0 ? '10%' : '25%',
    marginBottom: Data[1].data.length > 0 ? '10%' : '35%',
    textAlign: 'center',
    alignSelf: 'center',
  }}>
    {'No Projects Found'}
  </Text>;

  const renderSectionFooter = ({ section }) => {
    // console.log({section});
    // if (Data[0].data.length === 0 && Data[0].data.length === 0 && isLoading) {
    //   return <Loader loading={isLoading} />
    // }

    if (section.data.length === 0 && !isLoading) {
      return <EmptySectionMessage />
    }

    if (section.data[0] === 0 && !isLoading) {
      return <EmptySectionMessage />
    }

    if (section.title === 'Claim Projects' && sectionOne.length > Data[0].data.length) {
      return (
        <OutlinedButton
          label={'View More'}
          rightIcon={false}
          navigation={navigation}
        // onPress={()=>{}}
        />
      );
    }
    return null;
  };

  return (
    <View style={[AppStyles.CommonScreenStyles, { backgroundColor: AppColors.Background }]}>
      <LogoOver navigation={navigation} shouldShowBack={false} bgWhite />




      <View style={[AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle]}>
        <SectionList
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          sections={Data}
          keyExtractor={(item, index) => 'ci' + index}
          renderItem={({ section: { renderItem } }) => { renderItem }}
          renderSectionHeader={({ section: { title } }) => (
            <Text allowFontScaling={false} style={{
              fontFamily: Fonts.SemiBold,
              fontSize: FontSize.xxlarge,
              color: AppColors.TextTitle,
            }}>
              {title}
            </Text>
          )}
          ItemSeparatorComponent={() => (<View style={{ marginVertical: 4 }} />)}
          SectionSeparatorComponent={() => (<View style={{ marginTop: 8 }} />)}
          contentContainerStyle={{ paddingBottom: 10 }}
          renderSectionFooter={
            renderSectionFooter

          }
        // ListEmptyComponent={() => {
        //   if (!isLoading) {
        //     return (
        //       <Text style={{
        //         fontFamily: Fonts.Light,
        //         fontSize: FontSize.large,
        //         color: AppColors.DarkGrey,
        //         marginTop: vs(300),
        //         textAlign: 'center',
        //         alignSelf: 'center',
        //       }}>
        //         {'No Projects Found'}
        //       </Text>
        //     )
        //   }
        //   return null
        // }}
        />
      </View>


    </View>


  );

}

export default Home;
