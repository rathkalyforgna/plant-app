import React from 'react';
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {Input} from '../components';
import {theme} from '../constants';

const VALID_EMAIL = 'contact@react-ui-kit.com';

export const Forgot = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = React.useState(VALID_EMAIL);
  const [errors, setErros] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleForgot = () => {
    const _errors = [];

    Keyboard.dismiss();
    setLoading(true);

    // check with backend API or with some static data
    if (email !== VALID_EMAIL) {
      _errors.push('email');
    }

    setErros(_errors);
    setLoading(false);

    if (!_errors.length) {
      Alert.alert(
        'Password sent!',
        'Please check you email.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        'Error',
        'Please check you Email address.',
        [{text: 'Try again'}],
        {cancelable: false},
      );
    }
  };
  const hasErrors = (key: string) =>
    errors.includes(key) ? styles.hasErrors : null;

  return (
    <KeyboardAvoidingView style={styles.forgot} behavior="padding">
      <View style={{flex: 1, paddingHorizontal: theme.sizes.base * 2}}>
        <Text style={{...theme.fonts.h1, fontWeight: theme.weights.bold}}>
          Forgot
        </Text>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Input
            label="Email"
            error={hasErrors('email')}
            style={[styles.input, hasErrors('email')]}
            defaultValue={email}
            onChangeText={text => setEmail(text)}
          />
          <Pressable style={styles.button} onPress={handleForgot}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              locations={[0.1, 0.9]}
              colors={[theme.colors.primary, theme.colors.secondary]}
              style={styles.button}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text
                  style={{
                    fontWeight: theme.weights.bold,
                    color: theme.colors.white,
                    textAlign: 'center',
                  }}>
                  Forgot
                </Text>
              )}
            </LinearGradient>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                color: theme.colors.gray,
                ...theme.fonts.caption,
                textAlign: 'center',
                textDecorationLine: 'underline',
              }}>
              Back to Login
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  forgot: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
  button: {
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    marginVertical: theme.sizes.padding / 3,
  },
});
