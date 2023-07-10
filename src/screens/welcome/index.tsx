import React from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import {theme} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {TermService} from './TermService';
import {Illustrations} from './Illustrations';
import {Steps} from './Steps';
import LinearGradient from 'react-native-linear-gradient';

const illustrations = [
  {id: 1, source: require('../../assets/images/illustration_1.png')},
  {id: 2, source: require('../../assets/images/illustration_2.png')},
  {id: 3, source: require('../../assets/images/illustration_3.png')},
];

export const Welcome = () => {
  const navigation = useNavigation<any>();
  const scrollX = new Animated.Value(0);

  const [showTerms, setShowTerms] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Your home.
          <Text style={{color: theme.colors.primary, ...theme.fonts.h1}}>
            {' '}
            Greener.
          </Text>
        </Text>
        <Text
          style={{
            marginTop: theme.sizes.padding / 2,
            color: theme.colors.gray2,
            ...theme.fonts.h3,
          }}>
          Enjoy the experience.
        </Text>
      </View>
      <View style={styles.illustration}>
        <Illustrations illustrations={illustrations} scrollX={scrollX} />
        <Steps illustrations={illustrations} scrollX={scrollX} />
      </View>
      <View style={styles.buttons}>
        <Pressable
          style={styles.buttonStyles}
          onPress={() => navigation.navigate('Login')}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            locations={[0.1, 0.9]}
            colors={[theme.colors.primary, theme.colors.secondary]}
            style={styles.buttonStyles}>
            <Text style={styles.loginTextStyle}>Log in</Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          style={[
            styles.buttonStyles,
            styles.shadow,
            {backgroundColor: theme.colors.white},
          ]}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupTextStyle}>Sign up</Text>
        </Pressable>
        <Pressable
          style={[styles.buttonStyles]}
          onPress={() => setShowTerms(true)}>
          <Text style={styles.termTextStyle}>Terms of service</Text>
        </Pressable>
      </View>
      <TermService showTerms={showTerms} onShowTerms={setShowTerms} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {alignItems: 'center', justifyContent: 'flex-end', flex: 0.4},
  title: {
    alignItems: 'center',
    fontWeight: theme.weights.bold,
    ...theme.fonts.h1,
  },
  illustration: {alignItems: 'center', justifyContent: 'center'},
  buttons: {
    justifyContent: 'center',
    flex: 0.5,
    marginHorizontal: theme.sizes.padding * 2,
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  buttonStyles: {
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    marginVertical: theme.sizes.padding / 3,
  },
  loginTextStyle: {
    textAlign: 'center',
    fontWeight: theme.weights.semibold,
    color: theme.colors.white,
  },
  signupTextStyle: {
    textAlign: 'center',
    fontWeight: theme.weights.semibold,
  },
  termTextStyle: {
    textAlign: 'center',
    color: theme.colors.gray,
    ...theme.fonts.caption,
  },
});
