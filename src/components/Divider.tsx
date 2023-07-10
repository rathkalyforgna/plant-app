import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {theme} from '../constants';

type Props = ViewProps & {
  color?: string;
};

export const Divider = ({color, style, ...props}: Props) => {
  return (
    <View
      style={[
        styles.divider,
        {backgroundColor: color || theme.colors.gray2},
        style,
      ]}
      {...props}
    />
  );
};

export const styles = StyleSheet.create({
  divider: {
    height: 0,
    margin: theme.sizes.base * 2,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
