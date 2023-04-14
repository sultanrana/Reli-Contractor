import React, { useEffect, useRef } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { useColorScheme, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import PushNotification, { Importance } from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
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
import { setDetailsTab, setProjectID } from '../Redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator()

const MainStack = () => {


    const { tab } = useSelector(state => state.Projects)
    const scheme = useColorScheme()
    const AppColors = Colors(scheme)
    const routeNameRef = useRef()
    const dispatch = useDispatch()

    const goToScreen = () => {
        setTimeout(() => {
            routeNameRef?.current?.navigate(References.ProjectDetails)
        }, 350);
    };

    const configureNotifications = () => {
        PushNotification.configure({
            onNotification: function (notification) {
                console.log({ notification });
                if (notification.userInteraction) {
                    console.log("notification.userInteraction", notification);
                    goToScreen()
                }

            },
            onAction: function (notification) {
                console.log("ACTION:", notification.action);
                console.log("NOTIFICATION:", notification);
                goToScreen()

            },
        });

    }

    const onRemoteNotification = (notification) => {
        const isClicked = notification.getData().userInteraction === 1;

        if (isClicked) {
            goToScreen()
        } else {
            // Do something else with push notification
        }
        // Use the appropriate result based on what you needed to do for this notification
        const result = PushNotificationIOS.FetchResult.NoData;
        notification.finish(result);
    };

    const showNotification = (remoteMessage) => {
        PushNotification.localNotification({
            channelId: "Reli-Contractor",
            title: remoteMessage.notification.title,
            message: remoteMessage.notification.body,
        });

    };

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
            dispatch(setProjectID(remoteMessage.data.projectId))

            // PushNotificationIOS.addEventListener(type, onRemoteNotification);
            // return () => {
            //   PushNotificationIOS.removeEventListener(type);
            // };
            let cS = await AsyncStorage.getItem('currentScreen')
            console.log({ cS });
            if (remoteMessage) {
                if (cS != 'Message') {
                    showNotification(remoteMessage)
                }
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
        configureNotifications()
        messageListener()
    }, [])

    useEffect(() => {
        const type = 'notification';
        PushNotificationIOS.addEventListener(type, onRemoteNotification);
        if (tab != 'Message') {
            PushNotificationIOS.removeEventListener(type);
        }
        return () => {
            PushNotificationIOS.removeEventListener(type);
        };
    }, []);

    useEffect(() => {
        // console.log({ tab });
    }, [tab])


    return (
        <NavigationContainer
            ref={routeNameRef}
            onReady={() => {
                // routeNameRef.current = navigationRef.getCurrentRoute().name;
                // console.log('................', routeNameRef.current.getCurrentRoute().name)
            }}
            onStateChange={(state) => {
                // console.log('................', routeNameRef.current.getCurrentRoute().name)
                dispatch(setDetailsTab(routeNameRef.current.getCurrentRoute().name))
                AsyncStorage.setItem('currentScreen', routeNameRef.current.getCurrentRoute().name)
            }}>
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