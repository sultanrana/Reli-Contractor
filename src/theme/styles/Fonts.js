/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native';
import { Colors, FontSize } from '../ThemeConstants';

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export const FontStyles = StyleSheet.create({
  textSmall: {
    fontSize: FontSize.small,
    color: Colors.text,
  },
  textRegular: {
    fontSize: FontSize.regular,
    color: Colors.text,
  },
  textLarge: {
    fontSize: FontSize.large,
    color: Colors.text,
  },
  titleSmall: {
    fontSize: FontSize.small * 1.6,
    fontWeight: 'bold',
    color: Colors.text,
  },
  titleSmallOrange: {
    fontSize: FontSize.small * 2,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  titleRegular: {
    fontSize: FontSize.regular * 1.6,
    fontWeight: 'bold',
    color: Colors.text,
  },
  titleLarge: {
    fontSize: FontSize.large * 1.6,
    fontWeight: 'bold',
    color: Colors.text,
  },
  textCenter: {
    textAlign: 'center',
  },
  textJustify: {
    textAlign: 'justify',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
});
