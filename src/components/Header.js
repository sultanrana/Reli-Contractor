import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ThemeConstants } from '../theme';
import { orangeLogo } from '../theme/Images';

const Header = () => {
  return (
    <View style={styles.boxWithShadow}>
      <Image source={orangeLogo} />
    </View>
  );
};

export default Header;

Header.propTypes = {};

Header.defaultProps = {};

const styles = StyleSheet.create({
  boxWithShadow: {
    backgroundColor: ThemeConstants.Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
