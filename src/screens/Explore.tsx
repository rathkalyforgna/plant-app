import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  View,
  Text,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {Input} from '../components';
import {theme, mocks} from '../constants';

const {width, height} = Dimensions.get('window');

export const Explore = () => {
  const images = mocks.explore;
  const mainImage = images[0];
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [searchFocus] = React.useState(new Animated.Value(0.6));
  const [searchString, setSearchString] = React.useState<string>();

  const isEditing = searchFocus && searchString;

  const handleSearchFocus = (status: boolean) => {
    Animated.timing(searchFocus, {
      toValue: status ? 0.8 : 0.6,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
          styles.header,
        ]}>
        <Text style={{...theme.fonts.h1, fontWeight: theme.weights.bold}}>
          Explore
        </Text>
        {/* {this.renderSearch()} */}
        <Animated.View
          style={[
            {flex: searchFocus ? 1 : 0, justifyContent: 'center'},
            styles.search,
          ]}>
          <Input
            placeholder="Search"
            placeholderTextColor={theme.colors.gray2}
            style={styles.searchInput}
            onFocus={() => handleSearchFocus(true)}
            onBlur={() => handleSearchFocus(false)}
            onChangeText={text => setSearchString(text)}
            value={searchString}
            onRightPress={() => (isEditing ? setSearchString('') : null)}
            rightStyle={styles.searchRight}
            rightLabel={
              <Icon
                name={isEditing ? 'close' : 'search'}
                size={theme.sizes.base / 1.6}
                color={theme.colors.gray2}
                style={styles.searchIcon}
              />
            }
          />
        </Animated.View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.explore}>
        {/* {this.renderExplore()} */}
        <View style={{marginBottom: height / 3}}>
          <Pressable
            style={[styles.image, styles.mainImage]}
            onPress={() => navigation.navigate('Product')}>
            <Image
              source={mainImage}
              style={[styles.image, styles.mainImage]}
            />
          </Pressable>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            {images.slice(1).map((img, index) => {
              const sizes = Image.resolveAssetSource(img);
              const fullWidth = width - theme.sizes.padding * 2.5;
              const resize = (sizes.width * 100) / fullWidth;
              const imgWidth = resize > 75 ? fullWidth : sizes.width * 1;

              return (
                <Pressable
                  key={`img-${index}`}
                  onPress={() => navigation.navigate('Product')}>
                  <Image
                    source={img}
                    style={[
                      styles.image,
                      {minWidth: imgWidth, maxWidth: imgWidth},
                    ]}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* {this.renderFooter()} */}
      <LinearGradient
        locations={[0.5, 1]}
        style={[styles.footer, {bottom: insets.bottom}]}
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.6)']}>
        <Pressable style={[styles.button, {width: width / 2.678}]}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            locations={[0.1, 0.9]}
            colors={[theme.colors.primary, theme.colors.secondary]}
            style={styles.button}>
            <Text
              style={{
                fontWeight: theme.weights.bold,
                color: theme.colors.white,
                textAlign: 'center',
              }}>
              Filter
            </Text>
          </LinearGradient>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    marginVertical: theme.sizes.padding / 3,
  },
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2,
  },
  search: {
    height: theme.sizes.base * 2,
    width: width - theme.sizes.base * 2,
  },
  searchInput: {
    fontSize: theme.sizes.caption,
    height: theme.sizes.base * 2,
    backgroundColor: 'rgba(142, 142, 147, 0.06)',
    borderColor: 'rgba(142, 142, 147, 0.06)',
    paddingLeft: theme.sizes.base / 1.333,
    paddingRight: theme.sizes.base * 1.5,
  },
  searchRight: {
    top: 0,
    marginVertical: 0,
    backgroundColor: 'transparent',
  },
  searchIcon: {
    position: 'absolute',
    right: theme.sizes.base / 1.333,
    top: theme.sizes.base / 1.6,
  },
  explore: {
    marginHorizontal: theme.sizes.padding * 1.25,
  },
  image: {
    minHeight: 100,
    maxHeight: 130,
    maxWidth: width - theme.sizes.padding * 2.5,
    marginBottom: theme.sizes.base,
    borderRadius: 4,
  },
  mainImage: {
    minWidth: width - theme.sizes.padding * 2.5,
    minHeight: width - theme.sizes.padding * 2.5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.1,
    width,
    paddingBottom: theme.sizes.base * 4,
  },
});
