export const Colors = {
  // Example colors:
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
  white: '#ffffff',
  text: '#212529',
  primary: '#FDAA63',
  success: '#28a745',
  error: '#dc3545',
  grey: '#979797',
  black: '#000000',
};

export const NavigationColors = {
  primary: Colors.primary,
};

/**
 * FontSize
 */
export const FontSize = {
  small: 14,
  regular: 18,
  large: 36,
};

/**
 * Metrics Sizes
 */
const tiny = 5; // 10
const small = tiny * 2; // 10
const regular = tiny * 3; // 15
const large = regular * 2; // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
};

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
};
