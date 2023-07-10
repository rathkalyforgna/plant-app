import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {theme} from '../constants';

type Props = ViewProps & {
  size?: number;
  color?: string;
};

export const Badge = ({children, style, size, color, ...props}: Props) => {
  return (
    <View
      style={[
        styles.badge,
        {backgroundColor: color, height: size, width: size, borderRadius: size},
        style,
      ]}
      {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.sizes.base,
    width: theme.sizes.base,
    borderRadius: theme.sizes.base, //theme.sizes.border,
  },
});
