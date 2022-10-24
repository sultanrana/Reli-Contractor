import { StyleSheet } from "react-native";
import Fonts from "../Assets/Fonts/Index";
import Colors from "./Colors";
import { FontSize } from "./FontSize";

const CommonStyles = StyleSheet.create({
    AuthScreens: {
        paddingTop: 40
    },
    CommonScreenStyles: {
        flex: 1,
    },
    HorizontalStyle: {
        paddingHorizontal: 12,
    },
    ProjectDetailsScreen: {
        flex: 1,
        paddingTop: 21,
        paddingHorizontal: 12,
        backgroundColor: Colors('light').White,
    },
    MessagesScreen: {
        flex: 1,
        paddingTop: 21,
        backgroundColor: Colors('light').White,
    },

})

const LightStyles = StyleSheet.create({
    ...CommonStyles,
    Screen: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors('light').Background,
        flexDirection: 'column',
        // paddingBottom: 8
    },
    AuthScreenTitle: {
        margin: 24,
        fontSize: FontSize.xxxlarge,
        fontFamily: Fonts.SemiBold,
        color: Colors('light').TextTitle,
        textAlign: 'center'
    },
})


const DarkStyles = StyleSheet.create({
    ...CommonStyles,
    Screen: {
        ...LightStyles.Screen,
        backgroundColor: Colors('dark').Background
    },
    AuthScreenTitle: {
        ...LightStyles.AuthScreenTitle,
        color: Colors('dark').TextTitle
    }
})

const GetStyles = (scheme = 'light') => (scheme === 'light') ? LightStyles : DarkStyles

const AppStyles = GetStyles('light')

export default AppStyles
export { GetStyles, LightStyles, DarkStyles }