import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SafeAreaView, Keyboard, Platform } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";


const InfoMsg = ({ msg }) => {
    return (
        showMessage({
            message: "Simple message",
            type: 'success',
        })
    );

}

export const ShowSuccessMessage = (message) => {
    return (
        showMessage({
            message: message,
            type: 'success',
        })
    );
}

export const ShowErrorMessage = (message) => {
    return (
        showMessage({
            message: message,
            type: 'danger',
        })
    );
}

export default InfoMsg;


