import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Pressable,
} from 'react-native';
import {theme, mocks} from '../../constants';
import {useNavigation} from '@react-navigation/native';

type Props = {
  categories: any;
};

const {width} = Dimensions.get('window');

export const Browse = (props: Props) => {
  const profile = mocks.profile;
  const navigation = useNavigation<any>();
  const [active, setActive] = React.useState('Products');
  const [categories, setCategories] = React.useState(mocks.categories);

  const handleTab = (tab: string) => {
    const {categories} = props;
    const filtered = categories.filter(category =>
      category.tags.includes(tab.toLowerCase()),
    );

    setActive(tab);
    setCategories(filtered);
  };

  const tabs = ['Products', 'Inspirations', 'Shop'];

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
        <Text
          style={{fontSize: theme.sizes.h1, fontWeight: theme.weights.bold}}>
          Browse
        </Text>
        <Pressable onPress={() => navigation.navigate('Settings')}>
          <Image source={profile.avatar} style={styles.avatar} />
        </Pressable>
      </View>

      <View style={[styles.tabs, {flexDirection: 'row'}]}>
        {tabs.map(tab => {
          const isActive = active === tab;
          return (
            <Pressable
              key={`tab-${tab}`}
              onPress={() => handleTab(tab)}
              style={[styles.tab, isActive ? styles.active : null]}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: theme.weights.semibold,
                  color: isActive ? theme.colors.secondary : theme.colors.gray,
                }}>
                {tab}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingVertical: theme.sizes.base * 2}}>
        <View
          //  flex={false} row space="between"
          style={[
            styles.categories,
            {flexDirection: 'row', justifyContent: 'space-between'},
          ]}>
          {categories.map(category => (
            <Pressable
              key={category.name}
              onPress={() => navigation.navigate('Explore', {category})}>
              {/* Card */}
              <View
                style={[
                  styles.category,
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...theme.shadow,
                  },
                ]}>
                {/* Badge */}
                <View
                  style={{
                    alignContent: 'center',
                    justifyContent: 'center',
                    marginBottom: 15,
                    width: 50,
                    height: 50,
                    backgroundColor: 'rgba(41,216,143,0.20)',
                  }}>
                  <Image source={category.image} />
                </View>
                <Text style={{fontWeight: theme.weights.medium, height: 20}}>
                  {category.name}
                </Text>
                <Text
                  style={{
                    color: theme.colors.gray,
                    ...theme.fonts.caption,
                  }}>
                  {category.count} products
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Browse;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base,
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
});
