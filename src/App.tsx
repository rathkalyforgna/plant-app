import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, Pressable} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';
import {theme} from './constants';
import {Settings} from './screens/Settings';
import {Welcome} from './screens/welcome';
import {Login} from './screens/login';
import {Signup} from './screens/Signup';
import {Browse} from './screens/browse';
import {Explore} from './screens/Explore';
import {Product} from './screens/Product';

const Stack = createStackNavigator();

export const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShadowVisible: false,
            headerStyle: {
              // height: theme.sizes.base * 4,
              backgroundColor: theme.colors.white, // or 'white
              borderBottomColor: 'transparent',
              elevation: 0, // for android
            },
            headerBackImage: () => (
              <Image source={require('./assets/icons/back.png')} />
            ),
            headerBackTitleVisible: false,
            headerTitle: () => null,
            headerLeftContainerStyle: {
              alignItems: 'flex-start',
              marginLeft: theme.sizes.base * 2,
              paddingLeft: theme.sizes.base * 2,
            },
            headerRightContainerStyle: {
              alignItems: 'flex-end',
              marginRight: theme.sizes.base * 2,
              paddingRight: theme.sizes.base * 2,
            },
            cardStyle: {backgroundColor: theme.colors.white},
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Browse" component={Browse} />
          <Stack.Screen name="Explore" component={Explore} />
          <Stack.Screen
            name="Product"
            component={Product}
            options={{
              headerRight: () => (
                <Pressable onPress={() => {}}>
                  <Icon
                    name="dots-three-horizontal"
                    color={theme.colors.gray}
                  />
                </Pressable>
              ),
            }}
          />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
