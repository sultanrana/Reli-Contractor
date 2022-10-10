import React from 'react'
import { View, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from "react-native";
import { GetStyles } from '../Theme/AppStyles';
import Colors from '../Theme/Colors';
import { References } from '../Constants/References';
import { Icons } from '../Assets/Images/Index';
import TabItem from '../Components/TabItem'
const Tab = createBottomTabNavigator();

import HomeStack from './TabStacks/HomeStack'
import ProjectsStack from './TabStacks/ProjectsStack'
import StaffStack from './TabStacks/StaffStack'
import NotificationsStack from './TabStacks/NotificationsStack'
import AccountStack from './TabStacks/AccountStack'

const DashboardStack = ({ navigation }) => {
    const scheme = useColorScheme()
    const AppStyles = GetStyles(scheme)
    const AppColors = Colors(scheme)

    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: AppColors.Background
            }}
            initialRouteName={References.HomeStack}
            activeColor="#fff"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true
            }}
            tabBar={(props) => {
                const { navigation, state } = props
                return (

                    <View style={{
                        flexDirection: "row",
                        height: 80,
                        width: "100%",
                        elevation: 8,
                        backgroundColor: AppColors.White
                    }}>

                        <TabItem reset
                            icon={Icons.Home}
                            index={0}
                            activeIndex={state.index}
                            navigation={navigation}
                            path={References.HomeStack}
                            title='Home' />

                        <TabItem reset
                            icon={Icons.Projects}
                            index={1}
                            activeIndex={state.index}
                            navigation={navigation}
                            path={References.ProjectsStack}
                            title='Projects' />

                        <TabItem reset
                            icon={Icons.Staff}
                            index={2}
                            activeIndex={state.index}
                            navigation={navigation}
                            path={References.StaffStack}
                            title='Staff' />

                        <TabItem reset
                            icon={Icons.Notifications}
                            index={3}
                            activeIndex={state.index}
                            navigation={navigation}
                            path={References.NotificationsStack}
                            title='Notifications' />

                        <TabItem reset
                            icon={Icons.Profile}
                            index={4}
                            activeIndex={state.index}
                            navigation={navigation}
                            path={References.AccountStack}
                            title='Account' />

                    </View>

                )
            }}

        >

            <Tab.Screen
                name={References.HomeStack}
                component={HomeStack}
            />
            <Tab.Screen
                name={References.ProjectsStack}
                component={ProjectsStack}
            />
            <Tab.Screen
                name={References.StaffStack}
                component={StaffStack}
            />
            <Tab.Screen
                name={References.NotificationsStack}
                component={NotificationsStack}
            />
            <Tab.Screen
                name={References.AccountStack}
                component={AccountStack}
            />

        </Tab.Navigator>


    )
}



export default DashboardStack;

