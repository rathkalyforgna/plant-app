import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {theme} from '../constants';

type Props = ViewProps;

export const Card = ({style, children, ...props}: Props) => {
  const cardStyles = [styles.card, style];

  return (
    <View style={cardStyles} {...props}>
      {children}
    </View>
  );
};

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.sizes.radius,
    padding: theme.sizes.base + 4,
    marginBottom: theme.sizes.base,
    ...theme.shadow,
  },
});
