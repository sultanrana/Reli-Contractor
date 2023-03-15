import React, { Component } from "react"
import {
    View, Dimensions,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Platform,
    useColorScheme
} from "react-native"
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';
import Colors from "../Theme/Colors";

export default Loader = ({ loading }) => {
    const scheme = useColorScheme()
    return (
        <Modal
            transparent={true}
            animationType='fade'
            visible={loading}>

            <TouchableOpacity
                activeOpacity={1}
                style={styles.container}>

                {/* <WaveIndicator color={Colors(scheme).Primary} style={styles.activityIndicatorWrapper} />
                <WaveIndicator color={Colors(scheme).Primary} style={styles.activityIndicatorWrapper} />
                <WaveIndicator color={Colors(scheme).Primary} style={styles.activityIndicatorWrapper} /> */}
                <SkypeIndicator color={Colors(scheme).Primary} style={styles.activityIndicatorWrapper} />
                {/* <WaveIndicator color={Colors(scheme).Primary} style={styles.activityIndicatorWrapper} />
                <WaveIndicator color={Colors(scheme).Primary} style={styles.activityIndicatorWrapper} />
                <WaveIndicator color={Colors(scheme).Primary} style={styles.activityIndicatorWrapper} /> */}

            </TouchableOpacity>

        </Modal>
    )

}
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        // justifyContent: "space-evenly",
        backgroundColor: '#00000040',
        top: 0, left: 0, bottom: 0, right: 0,
        flexDirection: 'row',
        alignItems: 'center'

    },

    activityIndicatorWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center",
    }
})
