import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SafeAreaView, Keyboard, Platform } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";


const InfoMsg = ({ msg }) => {
    return (
        showMessage({
            message: "Simple message",
            type: 'danger',
        })
    );

}
export default InfoMsg;
