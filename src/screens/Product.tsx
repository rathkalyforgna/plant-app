import React from 'react';
import {
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';

import {Divider} from '../components';
import {theme, mocks} from '../constants';

const {width, height} = Dimensions.get('window');

export const Product = () => {
  const product = mocks.products[0];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* {this.renderGallery()} */}
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        data={product.images}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item}) => (
          <Image
            source={item}
            resizeMode="contain"
            style={{width, height: height / 2.8}}
          />
        )}
      />

      <View style={styles.product}>
        <Text style={{...theme.fonts.h2, fontWeight: theme.weights.bold}}>
          {product.name}
        </Text>
        <View style={{flexDirection: 'row', marginVertical: theme.sizes.base}}>
          {product.tags.map(tag => (
            <Text
              key={`tag-${tag}`}
              style={[
                {...theme.fonts.caption, color: theme.colors.gray},
                styles.tag,
              ]}>
              {tag}
            </Text>
          ))}
        </View>
        <Text
          style={{
            color: theme.colors.gray,
            fontWeight: theme.weights.light,
            lineHeight: 22,
          }}>
          {product.description}
        </Text>

        <Divider style={{marginVertical: theme.sizes.padding * 0.9}} />

        <View>
          <Text style={{fontWeight: theme.weights.semibold}}>Gallery</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginVertical: theme.sizes.padding * 0.9,
            }}>
            {product.images.slice(1, 3).map((image, index) => (
              <Image
                key={`gallery-${index}`}
                source={image}
                style={styles.image}
              />
            ))}
            <View
              style={[
                {
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(197,204,214,0.20)',
                },
                styles.card,
                styles.more,
              ]}>
              <Text style={{color: theme.colors.gray}}>
                +{product.images.slice(3).length}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  product: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.padding,
  },
  tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.625,
  },
  image: {
    width: width / 3.26,
    height: width / 3.26,
    marginRight: theme.sizes.base,
  },
  more: {
    width: 55,
    height: 55,
  },
  card: {
    borderRadius: theme.sizes.radius,
  },
});
