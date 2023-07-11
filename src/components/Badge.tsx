import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {theme} from '../constants';

type Props = ViewProps;

export const Badge = ({children, ...props}: Props) => {
  // const badgeStyles = [styles.badge, style];

  return (
    <View style={styles.badge} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    backgroundColor: 'rgba(41, 216, 143, 0.20)',
    borderRadius: theme.sizes.padding,
    marginBottom: 15,
  },
});
