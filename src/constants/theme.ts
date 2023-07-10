import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const elevation = 3;

export const colors = {
  accent: '#F3534A',
  primary: '#0AC4BA',
  secondary: '#2BDA8E',
  tertiary: '#FFE358',
  black: '#323643',
  white: '#FFFFFF',
  gray: '#9DA3B4',
  gray2: '#C5CCD6',
};

export const sizes = {
  // global sizes
  base: 16,
  font: 14,
  radius: 6,
  padding: 25,

  // font sizes
  h1: 26,
  h2: 20,
  h3: 18,
  title: 18,
  header: 16,
  body: 14,
  caption: 12,

  // app dimensions
  width,
  height,
};

export const fonts = {
  h1: {
    fontSize: sizes.h1,
  },
  h2: {
    fontSize: sizes.h2,
  },
  h3: {
    fontSize: sizes.h3,
  },
  header: {
    fontSize: sizes.header,
  },
  title: {
    fontSize: sizes.title,
  },
  body: {
    fontSize: sizes.body,
  },
  caption: {
    fontSize: sizes.caption,
  },
};

export const weights = {
  regular: 'normal' as const,
  bold: 'bold' as const,
  semibold: '500' as const,
  medium: '400' as const,
  light: '300' as const,
};

export const shadow = {
  elevation,
  shadowColor: colors.black,
  shadowOffset: {width: 0, height: elevation - 1},
  shadowOpacity: 0.1,
  shadowRadius: elevation,
};
