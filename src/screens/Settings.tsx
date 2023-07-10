import React from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Text,
  Pressable,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {theme, mocks} from '../constants';
import {Divider, Switch} from '../components';

export const Settings = () => {
  const [budget, setBudget] = React.useState(850);
  const [monthly, setMonthly] = React.useState(1700);
  const [notifications, setNotifications] = React.useState(true);
  const [newsletter, setNewsletter] = React.useState(false);
  const [editing, setEditing] = React.useState<string | null>(null);
  const [profile, setProfile] = React.useState<Record<string, any>>(
    mocks.profile,
  );

  const handleEdit = (name: string, text: string) => {
    profile[name] = text;
    setProfile(profile);
  };

  const toggleEdit = (name: string) => {
    setEditing(!editing ? name : null);
  };

  return (
    <View>
      <View
        style={[
          {flexDirection: 'row', justifyContent: 'space-between'},
          styles.header,
        ]}>
        <Text style={{...theme.fonts.h1, fontWeight: theme.weights.bold}}>
          Settings
        </Text>
        <Pressable>
          <Image source={profile.avatar} style={styles.avatar} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inputs}>
          <View
            style={[
              {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              },
              styles.inputRow,
            ]}>
            <View>
              <Text style={{color: theme.colors.gray2, marginBottom: 10}}>
                Username
              </Text>
              <Edit
                name="username"
                editing={editing}
                profile={profile}
                onEdit={handleEdit}
              />
            </View>
            <Text
              style={{
                fontWeight: theme.weights.medium,
                color: theme.colors.secondary,
              }}
              onPress={() => toggleEdit('username')}>
              {editing === 'username' ? 'Save' : 'Edit'}
            </Text>
          </View>
          <View
            style={[
              {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              },
              styles.inputRow,
            ]}>
            <View>
              <Text style={{color: theme.colors.gray2, marginBottom: 10}}>
                Location
              </Text>
              <Edit
                name="location"
                editing={editing}
                profile={profile}
                onEdit={handleEdit}
              />
            </View>
            <Text
              style={{
                fontWeight: theme.weights.medium,
                color: theme.colors.secondary,
              }}
              onPress={() => toggleEdit('location')}>
              {editing === 'location' ? 'Save' : 'Edit'}
            </Text>
          </View>
          <View
            style={[
              {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              },
              styles.inputRow,
            ]}>
            <View>
              <Text style={{color: theme.colors.gray2, marginBottom: 10}}>
                E-mail
              </Text>
              <Text style={{fontWeight: theme.weights.bold}}>
                {profile.email}
              </Text>
            </View>
          </View>
        </View>

        <Divider
          style={{
            marginVertical: theme.sizes.base,
            marginHorizontal: theme.sizes.base * 2,
          }}
        />

        <View style={styles.sliders}>
          <View style={{marginVertical: 10}}>
            <Text style={{color: theme.colors.gray2, marginBottom: 10}}>
              Budget
            </Text>
            <Slider
              minimumValue={0}
              maximumValue={1000}
              style={{height: 19}}
              // thumbStyle={styles.thumb}
              // trackStyle={{height: 6, borderRadius: 6}}
              minimumTrackTintColor={theme.colors.secondary}
              maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
              value={budget}
              onValueChange={value => setBudget(value)}
            />
            <Text
              style={{
                ...theme.fonts.caption,
                color: theme.colors.gray,
                textAlign: 'right',
              }}>
              $1,000
            </Text>
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{color: theme.colors.gray2, marginBottom: 10}}>
              Monthly Cap
            </Text>
            <Slider
              minimumValue={0}
              maximumValue={5000}
              style={{height: 19}}
              // thumbStyle={styles.thumb}
              // trackStyle={{height: 6, borderRadius: 6}}
              minimumTrackTintColor={theme.colors.secondary}
              maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
              value={monthly}
              onValueChange={value => setMonthly(value)}
            />
            <Text
              style={{
                ...theme.fonts.caption,
                color: theme.colors.gray,
                textAlign: 'right',
              }}>
              $5,000
            </Text>
          </View>
        </View>

        <Divider />

        <View style={styles.toggles}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: theme.sizes.base * 2,
            }}>
            <Text style={{color: theme.colors.gray2}}>Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={value => setNotifications(value)}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: theme.sizes.base * 2,
            }}>
            <Text style={{color: theme.colors.gray2}}>Newsletter</Text>
            <Switch
              value={newsletter}
              onValueChange={value => setNewsletter(value)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const Edit = ({
  name,
  editing,
  profile,
  onEdit,
}: {
  name: string;
  editing: string | null;
  profile: Record<string, any>;
  onEdit: (name: string, text: string) => void;
}) => {
  if (editing === name) {
    return (
      <TextInput
        defaultValue={profile[name]}
        onChangeText={text => onEdit(name, text)}
      />
    );
  }

  return <Text style={{fontWeight: theme.weights.bold}}>{profile[name]}</Text>;
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: 'flex-end',
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: theme.colors.secondary,
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});
