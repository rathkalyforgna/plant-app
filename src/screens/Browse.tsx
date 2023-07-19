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
import {useNavigation} from '@react-navigation/native';
import {theme, mocks} from '../constants';
import {Badge, Card} from '../components';

const {width} = Dimensions.get('window');

export const Browse = () => {
  const profile = mocks.profile;
  const navigation = useNavigation<any>();
  const [active, setActive] = React.useState('Products');
  const [categories, setCategories] = React.useState(mocks.categories);

  const handleTab = (tab: string) => {
    const filtered = mocks.categories.filter(category =>
      category.tags.includes(tab.toLowerCase()),
    );

    setActive(tab);
    setCategories(filtered);
  };

  const tabs = ['Products', 'Inspirations', 'Shop'];

  return (
    <View>
      <View style={styles.header}>
        <Text
          style={{fontSize: theme.sizes.h1, fontWeight: theme.weights.bold}}>
          Browse
        </Text>
        <Pressable onPress={() => navigation.navigate('Settings')}>
          <Image source={profile.avatar} style={styles.avatar} />
        </Pressable>
      </View>

      <View style={styles.tabs}>
        {tabs.map(tab => {
          const isActive = active === tab;
          return (
            <Pressable
              key={`tab-${tab}`}
              onPress={() => handleTab(tab)}
              style={[styles.tab, isActive ? styles.active : null]}>
              <Text
                style={{
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
        <View style={styles.categories}>
          {categories.map(category => (
            <Pressable
              key={category.name}
              onPress={() => navigation.navigate('Explore', {category})}>
              {/* Card */}
              <Card style={styles.category}>
                {/* Badge */}
                <Badge>
                  <Image source={category.image} />
                </Badge>
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
              </Card>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base,
  },
  tabText: {
    fontSize: 16,
    fontWeight: theme.weights.semibold,
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
