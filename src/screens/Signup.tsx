import React from 'react';
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {Input} from '../components';
import {theme} from '../constants';

export const SignUp = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = React.useState<string>();
  const [username, setUsername] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [errors, setErrors] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleSignUp = () => {
    const _errors = [];

    Keyboard.dismiss();
    setLoading(true);

    // check with backend API or with some static data
    if (!email) _errors.push('email');
    if (!username) _errors.push('username');
    if (!password) _errors.push('password');

    setErrors(_errors);
    setLoading(false);

    if (!_errors.length) {
      Alert.alert(
        'Success!',
        'Your account has been created',
        [
          {
            text: 'Continue',
            onPress: () => {
              navigation.navigate('Browse');
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  const hasErrors = (key: string) =>
    errors.includes(key) ? styles.hasErrors : null;

  return (
    <KeyboardAvoidingView style={styles.signup} behavior="padding">
      <View style={{flex: 1, paddingHorizontal: theme.sizes.base * 2}}>
        <Text style={{...theme.fonts.h1, fontWeight: theme.weights.bold}}>
          Sign Up
        </Text>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Input
            email
            label="Email"
            error={hasErrors('email')}
            style={[styles.input, hasErrors('email')]}
            defaultValue={email}
            onChangeText={text => setEmail(text)}
          />
          <Input
            label="Username"
            error={hasErrors('username')}
            style={[styles.input, hasErrors('username')]}
            defaultValue={username}
            onChangeText={text => setUsername(text)}
          />
          <Input
            secure
            label="Password"
            error={hasErrors('password')}
            style={[styles.input, hasErrors('password')]}
            defaultValue={password}
            onChangeText={text => setPassword(text)}
          />
          <Pressable style={styles.button} onPress={handleSignUp}>
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
                  Sign Up
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
  signup: {
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
