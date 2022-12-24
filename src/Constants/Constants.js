import { Dimensions, Platform, StatusBar } from "react-native";
import { DeviceType, getModel, getDeviceId } from "react-native-device-info";
let deviceId = getDeviceId();
console.log(deviceId);

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const StatusbarHeight = (Platform.OS === 'ios' ? (deviceId === 'iPhone10,5' ? windowHeight * 0.03 : deviceId === ('iPhone15,2' || 'iPhone15,3' || 'iPhone15,4') ? windowHeight * 0.05 : windowHeight * 0.04) : StatusBar.currentHeight)
const REGEX_PASS_1 = /(.*[a-z].*)/
const REGEX_PASS_2 = /(.*[A-Z].*)/
const REGEX_PASS_3 = /(.*\d.*)/
const EMAIL_REG = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


export {
    deviceHeight,
    deviceWidth,
    windowHeight,
    windowWidth,
    StatusbarHeight,
    deviceId,
    REGEX_PASS_1,
    REGEX_PASS_2,
    REGEX_PASS_3,
    EMAIL_REG
}