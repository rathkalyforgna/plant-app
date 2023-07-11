import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../constants';

const {width, height} = Dimensions.get('window');

export const Welcome = () => {
  const illustrations = [
    {id: 1, source: require('../assets/images/illustration_1.png')},
    {id: 2, source: require('../assets/images/illustration_2.png')},
    {id: 3, source: require('../assets/images/illustration_3.png')},
  ];
  const scrollX = new Animated.Value(0);
  const stepPosition = Animated.divide(scrollX, width);

  const navigation = useNavigation<any>();
  const [showTerms, setShowTerms] = React.useState(false);

  return (
    <View style={{flex: 1}}>
      <View
        style={{flex: 0.4, alignItems: 'center', justifyContent: 'flex-end'}}>
        <Text
          style={{
            ...theme.fonts.h1,
            textAlign: 'center',
            fontWeight: theme.weights.bold,
          }}>
          Your Home.
          <Text style={{...theme.fonts.h1, color: theme.colors.primary}}>
            {' '}
            Greener.
          </Text>
        </Text>
        <Text
          style={{
            ...theme.fonts.h3,
            color: theme.colors.gray2,
            marginTop: theme.sizes.padding / 2,
          }}>
          Enjoy the experience.
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {/* {this.renderIllustrations()} */}
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToAlignment="center"
          data={illustrations}
          // extraDate={{showTerms: false}}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => (
            <Image
              source={item.source}
              resizeMode="contain"
              style={{width, height: height / 2, overflow: 'visible'}}
            />
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
        {/* {this.renderSteps()} */}
        <View
          style={[
            {
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            },
            styles.stepsContainer,
          ]}>
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
      </View>
      <View
        style={{
          flex: 0.5,
          justifyContent: 'center',
          marginHorizontal: theme.sizes.padding * 2,
        }}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            locations={[0.1, 0.9]}
            colors={[theme.colors.primary, theme.colors.secondary]}
            style={styles.button}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: theme.weights.semibold,
                color: theme.colors.white,
              }}>
              Login
            </Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          style={theme.shadow}
          onPress={() => navigation.navigate('SignUp')}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: theme.weights.semibold,
            }}>
            Signup
          </Text>
        </Pressable>
        <Pressable onPress={() => setShowTerms(true)}>
          <Text
            style={{
              textAlign: 'center',
              ...theme.fonts.caption,
              color: theme.colors.gray,
            }}>
            Terms of service
          </Text>
        </Pressable>
      </View>
      {/* {this.renderTermsService()} */}
      <Modal
        animationType="slide"
        visible={showTerms}
        onRequestClose={() => setShowTerms(false)}>
        <View
          style={{
            paddingVertical: theme.sizes.padding * 2,
            paddingHorizontal: theme.sizes.padding,
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <Text style={{...theme.fonts.h2, fontWeight: theme.weights.light}}>
            Terms of Service
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginVertical: theme.sizes.padding}}>
            <Text
              style={{
                marginBottom: theme.sizes.base,
                lineHeight: 24,
                color: theme.colors.gray,
                ...theme.fonts.caption,
              }}>
              1. Your use of the Service is at your sole risk. The service is
              provided on an "as is" and "as available" basis.
            </Text>
            <Text
              style={{
                marginBottom: theme.sizes.base,
                lineHeight: 24,
                color: theme.colors.gray,
                ...theme.fonts.caption,
              }}>
              2. Support for Expo services is only available in English, via
              e-mail.
            </Text>
            <Text
              style={{
                marginBottom: theme.sizes.base,
                lineHeight: 24,
                color: theme.colors.gray,
                ...theme.fonts.caption,
              }}>
              3. You understand that Expo uses third-party vendors and hosting
              partners to provide the necessary hardware, software, networking,
              storage, and related technology required to run the Service.
            </Text>
            <Text
              style={{
                marginBottom: theme.sizes.base,
                lineHeight: 24,
                color: theme.colors.gray,
                ...theme.fonts.caption,
              }}>
              4. You must not modify, adapt or hack the Service or modify
              another website so as to falsely imply that it is associated with
              the Service, Expo, or any other Expo service.
            </Text>
            <Text
              style={{
                marginBottom: theme.sizes.base,
                lineHeight: 24,
                color: theme.colors.gray,
                ...theme.fonts.caption,
              }}>
              5. You may use the Expo Pages static hosting service solely as
              permitted and intended to host your organization pages, personal
              pages, or project pages, and for no other purpose. You may not use
              Expo Pages in violation of Expo's trademark or other rights or in
              violation of applicable law. Expo reserves the right at all times
              to reclaim any Expo subdomain without liability to you.
            </Text>
            <Text
              style={{
                marginBottom: theme.sizes.base,
                lineHeight: 24,
                color: theme.colors.gray,
                ...theme.fonts.caption,
              }}>
              6. You agree not to reproduce, duplicate, copy, sell, resell or
              exploit any portion of the Service, use of the Service, or access
              to the Service without the express written permission by Expo.
            </Text>
            <Text
              style={{
                marginBottom: theme.sizes.base,
                lineHeight: 24,
                color: theme.colors.gray,
                ...theme.fonts.caption,
              }}>
              7. We may, but have no obligation to, remove Content and Accounts
              containing Content that we determine in our sole discretion are
              unlawful, offensive, threatening, libelous, defamatory,
              pornographic, obscene or otherwise objectionable or violates any
              party's intellectual property or these Terms of Service.
            </Text>
            <Text
              style={{
                marginBottom: theme.sizes.base,
                lineHeight: 24,
                color: theme.colors.gray,
                ...theme.fonts.caption,
              }}>
              8. Verbal, physical, written or other abuse (including threats of
              abuse or retribution) of any Expo customer, employee, member, or
              officer will result in immediate account termination.
            </Text>
            <Text
              style={{
                marginBottom: theme.sizes.base,
                lineHeight: 24,
                color: theme.colors.gray,
                ...theme.fonts.caption,
              }}>
              9. You understand that the technical processing and transmission
              of the Service, including your Content, may be transferred
              unencrypted and involve (a) transmissions over various networks;
              and (b) changes to conform and adapt to technical requirements of
              connecting networks or devices.
            </Text>
            <Text
              style={{
                marginBottom: theme.sizes.base,
                lineHeight: 24,
                color: theme.colors.gray,
                ...theme.fonts.caption,
              }}>
              10. You must not upload, post, host, or transmit unsolicited
              e-mail, SMSs, or "spam" messages.
            </Text>
          </ScrollView>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingVertical: theme.sizes.base,
            }}>
            <Pressable
              style={styles.button}
              onPress={() => setShowTerms(false)}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                locations={[0.1, 0.9]}
                colors={[theme.colors.primary, theme.colors.secondary]}
                style={styles.button}>
                <Text style={{textAlign: 'center', color: theme.colors.white}}>
                  I understand
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  stepsContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
  button: {
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    marginVertical: theme.sizes.padding / 3,
  },
});
