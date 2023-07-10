import React from 'react';
import {Animated, FlatList, Image, StyleSheet} from 'react-native';
import {Illustration} from '../../types';
import {theme} from '../../constants';

type Props = {
  illustrations: Array<Illustration>;
  scrollX: Animated.Value;
};

export const Illustrations = ({illustrations, scrollX}: Props) => {
  return (
    <FlatList
      horizontal
      pagingEnabled
      scrollEnabled
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      snapToAlignment="center"
      data={illustrations}
      // extraDate={this.state}
      keyExtractor={item => `${item.id}`}
      renderItem={({item}) => (
        <Image source={item.source} resizeMode="contain" style={styles.image} />
      )}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {contentOffset: {x: scrollX}},
          },
        ],
        {useNativeDriver: false},
      )}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: theme.sizes.width,
    height: theme.sizes.height / 2,
    overflow: 'visible',
  },
});
