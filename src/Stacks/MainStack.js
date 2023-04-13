import React, { useEffect, useRef } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { useColorScheme, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import PushNotification, { Importance } from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';


import { References } from '../Constants/References';
import Splash from '../Screens/Splash';
import AuthStack from './AuthStack';
import DashboardStack from './DashboardStack';
import ProjectDetails from '../Screens/Dashboard/ProjectDetails';
import Location from '../Screens/Dashboard/Location';
import AccountDetails from '../Screens/Dashboard/AccountDetails';
import NewNumber from '../Screens/Dashboard/NewNumber';
import NewPassword from '../Screens/Dashboard/NewPassword';
import ContactUs from '../Screens/Dashboard/ContactUs';
import Colors from '../Theme/Colors';
import { setProjectID } from '../Redux/Actions';
import { useDispatch } from 'react-redux';

const Stack = createStackNavigator()

const MainStack = () => {


    const scheme = useColorScheme()
    const AppColors = Colors(scheme)
    const routeNameRef = useRef()
    const dispatch = useDispatch()

    const goToScreen = () => {
        setTimeout(() => {
            routeNameRef?.current?.navigate(References.ProjectDetails)
        }, 350);
    };

    // const configureNotifications = () => {
    //     PushNotification.configure({
    //         onNotification: function (notification) {
    //             // console.log({ notification });
    //             if (notification.userInteraction) {
    //                 console.log("notification.userInteraction", notification);
    //                 goToScreen()
    //             }

    //             // notification.finish(PushNotificationIOS.FetchResult.NoData);
    //         },
    //         onAction: function (notification) {
    //             console.log("ACTION:", notification.action);
    //             console.log("NOTIFICATION:", notification);

    //             setTimeout(() => {
    //                 routeNameRef?.current?.navigate(References.ProjectDetails)
    //             }, 350);
    //         },
    //     });

    // }

    const messageListener = async () => {
        PushNotification.createChannel(
            {
                channelId: "Reli-Contractor", // (required)
                channelName: "Chat_Messasge", // (required)
                smallIcon: "app_icon",
                importance: Importance.HIGH, // (optional) default: 4. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
                ignoreInForeground: false,
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
        // --------------------------------------

        messaging().onMessage(async (remoteMessage) => {
            console.log("Notification msg****", remoteMessage);

            // PushNotificationIOS.addEventListener(type, onRemoteNotification);
            // return () => {
            //   PushNotificationIOS.removeEventListener(type);
            // };
            if (remoteMessage) {
                PushNotification.localNotification({
                    channelId: "Reli-Contractor",
                    title: remoteMessage.notification.title,
                    message: remoteMessage.notification.body,
                });
                dispatch(setProjectID(remoteMessage.data.projectId))
                // setTimeout(() => {
                //     routeNameRef?.current?.navigate(References.ProjectDetails)
                // }, 350);
            }

        });

        // --------------------------------------

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('setBackgroundMessageHandler', remoteMessage);
            if (remoteMessage) {
                PushNotification.localNotification({
                    channelId: "Reli-Contractor",
                    title: remoteMessage.notification.title,
                    message: remoteMessage.notification.body,
                });
            }

        });

        // When the application is opened from a quit state.
        messaging().getInitialNotification()
            .then(async remoteMessage => {
                console.log('getInitialNotification', remoteMessage);
                if (remoteMessage) {
                    PushNotification.localNotification({
                        channelId: "Reli-Contractor",
                        title: remoteMessage.notification.title,
                        message: remoteMessage.notification.body,
                    });
                }
            });

        // When the application is running, but in the background.
        messaging().onNotificationOpenedApp(async remoteMessage => {
            console.log('AppBackgroundNotification', remoteMessage);

            if (remoteMessage) {
                PushNotification.localNotification({
                    channelId: "Reli-Contractor",
                    title: remoteMessage.notification.title,
                    message: remoteMessage.notification.body,
                });
                dispatch(setProjectID(remoteMessage.data.projectId))
                // setTimeout(() => {
                //    ()=> routeNameRef?.current?.navigate(References.ProjectDetails)
                // }, 350);
            }
        });
    }

    useEffect(() => {
        // configureNotifications()
        messageListener()
    }, [])

    return (
        <NavigationContainer
            ref={routeNameRef}
        >
            {/* <StatusBar barStyle='light-content' translucent backgroundColor={AppColors.Background} /> */}
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
                    gestureDirection: 'horizontal',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }} initialRouteName={References.Splash}>

                <Stack.Screen
                    name={References.Splash}
                    component={Splash} />

                <Stack.Screen
                    name={References.AuthenticationStack}
                    component={AuthStack} />

                <Stack.Screen
                    name={References.DashboardStack}
                    component={DashboardStack} />

                <Stack.Screen
                    name={References.ProjectDetails}
                    component={ProjectDetails} />

                <Stack.Screen
                    name={References.Location}
                    component={Location} />

                <Stack.Screen
                    name={References.AccountDetails}
                    component={AccountDetails} />

                <Stack.Screen
                    name={References.NewNumber}
                    component={NewNumber} />

                <Stack.Screen
                    name={References.NewPassword}
                    component={NewPassword} />

                <Stack.Screen
                    name={References.ContactUs}
                    component={ContactUs} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack;