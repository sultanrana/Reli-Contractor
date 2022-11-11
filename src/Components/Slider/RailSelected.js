import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../Theme/Colors";

const RailSelected = () => <View style={styles.root} />;

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 4,
    backgroundColor: colors.Primary,
    borderRadius: 2
  }
});
