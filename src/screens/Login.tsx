import React from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {theme} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Input} from '../components/Input';

const VALID_EMAIL = 'example@mail.com';
const VALID_PASSWORD = 'secret';

export const Login = () => {
  const navigation = useNavigation<any>();

  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState<string[]>([]);

  const handleLogin = () => {
    const _errors = [];

    Keyboard.dismiss();
    setLoading(true);

    // check with backend API or with some static data
    if (email !== VALID_EMAIL) {
      _errors.push('email');
    }
    if (password !== VALID_PASSWORD) {
      _errors.push('password');
    }

    setErrors(_errors);
    setLoading(false);

    if (!errors.length) {
      navigation.navigate('Browse');
    }
  };

  const hasErrors = (key: string) =>
    errors.includes(key) ? styles.hasErrors : null;

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: theme.sizes.base * 2,
        }}>
        <Text style={{fontWeight: theme.weights.bold, ...theme.fonts.h1}}>
          Login
        </Text>
        <View style={{justifyContent: 'center'}}>
          <Input
            label="Email"
            error={hasErrors('email')}
            style={[styles.input, hasErrors('email')]}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            secure
            label="Password"
            error={hasErrors('password')}
            style={[styles.input, hasErrors('password')]}
            value={password}
            onChangeText={setPassword}
          />
          <Pressable style={styles.buttonStyles} onPress={handleLogin}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              locations={[0.1, 0.9]}
              colors={[theme.colors.primary, theme.colors.secondary]}
              style={styles.buttonStyles}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.loginText}>Login</Text>
              )}
            </LinearGradient>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Forgot')}>
            <Text style={styles.forgotText}>Forgot your password?</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  buttonStyles: {
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    marginVertical: theme.sizes.padding / 3,
  },
  loginText: {
    fontWeight: theme.weights.bold,
    color: theme.colors.white,
    textAlign: 'center',
  },
  forgotText: {
    textDecorationLine: 'underline',
    color: theme.colors.gray,
    textAlign: 'center',
    ...theme.fonts.caption,
  },
});
