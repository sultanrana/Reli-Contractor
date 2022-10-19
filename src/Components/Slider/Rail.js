import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

const Rail = () => <View style={styles.root} />;

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FDECDF"
  }
});
