import React from 'react';
import {Switch, Platform, SwitchProps} from 'react-native';
import {theme} from '../constants';

const GRAY_COLOR = 'rgba(168, 182, 200, 0.30)';

export const SwitchInput = ({value, ...props}: SwitchProps) => {
  let thumbColor;

  if (Platform.OS === 'android') {
    thumbColor = GRAY_COLOR;
    if (value) {
      thumbColor = theme.colors.secondary;
    }
  }

  return (
    <Switch
      thumbColor={thumbColor}
      ios_backgroundColor={GRAY_COLOR}
      trackColor={{
        // false: GRAY_COLOR,
        true: theme.colors.secondary,
      }}
      value={value}
      {...props}
    />
  );
};
