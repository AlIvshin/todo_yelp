import {TextStyle} from 'react-native';

interface Fonts {
  [key: string]: TextStyle;
}

export const fonts: Fonts = {
  h6: {
    fontWeight: '700',
    fontSize: 20,
  },
  subtitle1: {
    fontWeight: '500',
    fontSize: 16,
  },
  error: {
    fontSize: 16,
    fontWeight: '500',
    color: 'red',
  },
};
