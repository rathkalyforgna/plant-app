import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../constants';

type Props = TextInputProps & {
  label?: string;
  email?: boolean;
  phone?: boolean;
  number?: string;
  secure?: boolean;
  error?: any;
  rightLabel?: any;
  rightStyle?: any;
  onRightPress?: any;
};

export const Input = ({
  label,
  email,
  phone,
  number,
  secure,
  error,
  style,
  rightLabel,
  rightStyle,
  onRightPress,
  ...props
}: Props) => {
  const [toggleSecure, setToggleSecure] = React.useState(false);

  // renderLabel() {
  //   const {label, error} = this.props;

  //   return (
  //     <Block flex={false}>
  //       {label ? (
  //         <Text gray2={!error} accent={error}>
  //           {label}
  //         </Text>
  //       ) : null}
  //     </Block>
  //   );
  // }

  // renderToggle() {
  //   const {secure, rightLabel} = this.props;
  //   const {toggleSecure} = this.state;

  //   if (!secure) return null;

  //   return (
  //     <Button
  //       style={styles.toggle}
  //       onPress={() => this.setState({toggleSecure: !toggleSecure})}>
  //       {rightLabel ? (
  //         rightLabel
  //       ) : (
  //         <Icon.Ionicons
  //           color={theme.colors.gray}
  //           size={theme.sizes.font * 1.35}
  //           name={!toggleSecure ? 'md-eye' : 'md-eye-off'}
  //         />
  //       )}
  //     </Button>
  //   );
  // }

  // renderRight() {
  //   const {rightLabel, rightStyle, onRightPress} = this.props;

  //   if (!rightLabel) return null;

  //   return (
  //     <Button
  //       style={[styles.toggle, rightStyle]}
  //       onPress={() => onRightPress && onRightPress()}>
  //       {rightLabel}
  //     </Button>
  //   );
  // }

  const isSecure = toggleSecure ? false : secure;

  const inputStyles = [
    styles.input,
    error && {borderColor: theme.colors.accent},
    style,
  ];

  const inputType = email
    ? 'email-address'
    : number
    ? 'numeric'
    : phone
    ? 'phone-pad'
    : 'default';

  return (
    <View style={{marginVertical: theme.sizes.base}}>
      {/* Label */}
      <View>
        {label ? (
          <Text
            style={{color: error ? theme.colors.accent : theme.colors.gray2}}>
            {label}
          </Text>
        ) : null}
      </View>
      <TextInput
        style={inputStyles}
        secureTextEntry={isSecure}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={inputType}
        {...props}
      />
      {/* Toggle */}
      {secure ? (
        <Pressable
          style={styles.toggle}
          onPress={() => setToggleSecure(!toggleSecure)}>
          {rightLabel ? (
            rightLabel
          ) : (
            <Icon
              color={theme.colors.gray}
              size={theme.sizes.font * 1.35}
              name={!toggleSecure ? 'md-eye' : 'md-eye-off'}
            />
          )}
        </Pressable>
      ) : null}
      {/* Right */}
      {rightLabel ? (
        <Pressable
          style={[styles.toggle, rightStyle]}
          onPress={() => onRightPress && onRightPress()}>
          {rightLabel}
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.black,
    borderRadius: theme.sizes.radius,
    fontSize: theme.sizes.font,
    fontWeight: '500',
    color: theme.colors.black,
    height: theme.sizes.base * 3,
  },
  toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: theme.sizes.base * 2,
    height: theme.sizes.base * 2,
    top: theme.sizes.base,
    right: 0,
  },
});
