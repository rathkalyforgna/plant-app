import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {Illustration} from '../../types';
import {theme} from '../../constants';

type Props = {
  illustrations: Array<Illustration>;
  scrollX: Animated.Value;
};

export const Steps = ({illustrations, scrollX}: Props) => {
  const stepPosition = Animated.divide(scrollX, theme.sizes.width);

  return (
    <View style={styles.container}>
      {illustrations.map((item, index) => {
        const opacity = stepPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={`step-${index}`}
            style={[
              styles.steps,
              {opacity, backgroundColor: theme.colors.gray},
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
});
