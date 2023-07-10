import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Image} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {theme} from './constants';
import {Settings} from './screens/Settings';
import {Welcome} from './screens/welcome';
import {Login} from './screens/login';
import {Signup} from './screens/Signup';
import {Browse} from './screens/browse';

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
              paddingLeft: theme.sizes.base * 2,
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
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
