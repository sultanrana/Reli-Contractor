import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const STANDARD_WIDTH = 390;
const CURRENT_WIDTH = width;
const K = CURRENT_WIDTH / STANDARD_WIDTH;

const USE_FOR_BIGGER_SIZE = true;

export const dynamicSize = size => {
  return K * size;
};

export const getFontSize = size => {
  if (USE_FOR_BIGGER_SIZE || CURRENT_WIDTH < STANDARD_WIDTH) {
    return dynamicSize(size);
  }
  return size;
};
export const getWidth = percentage => {
  return width * percentage;
};

const STANDARD_HEIGHT  = 844;
const CURRENT_HEIGHT = height;
const KH = CURRENT_HEIGHT / STANDARD_HEIGHT

export const dynamicVerticalSize = size => {
  return KH * size;
};