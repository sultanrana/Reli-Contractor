import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Button, InputField } from '../components';
import { backArrow } from '../theme/Icons';
import {
  glassDoors,
  interiorDoors,
  orangeLogo,
  windows,
} from '../theme/Images';
import { FontStyles } from '../theme/styles/Fonts';
import { LayoutStyles } from '../theme/styles/Layout';
import ThemeConstants, { Colors, FontSize } from '../theme/ThemeConstants';
import { Slider } from 'native-base';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [travel, setTravel] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [step, setStep] = useState(1);
  const navigation = useNavigation();

  const servicesList = [windows, glassDoors, interiorDoors];

  const onSubmit = () => {
    if (step === 1) {
      if (firstName === '') {
        alert('First Name cannot be empty');
        return;
      }
      if (lastName === '') {
        alert('Last Name cannot be empty');
        return;
      }
      if (email === '') {
        alert('Email cannot be empty');
        return;
      }
      if (password === '') {
        alert('Password cannot be empty');
        return;
      } else {
        setStep(2);
      }
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setLoading(true);
      setButtonDisabled(true);
      alert('Sign Up');
    }
    setLoading(false);
    setButtonDisabled(false);
  };

  const renderView = () => {
    if (step === 1) {
      return (
        <>
          <InputField
            labelText="First Name"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First Name"
          />
          <View style={{ margin: 10 }} />
          <InputField
            labelText="Last Name"
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last Name"
          />
          <View style={{ margin: 10 }} />

          <InputField
            labelText="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="yourname@email.com"
          />
          <View style={{ margin: 10 }} />

          <InputField
            labelText="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
          />
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <InputField
            labelText="Address"
            value={address}
            onChangeText={setAddress}
            placeholder="Address"
          />
          <View style={{ margin: 10 }} />

          <InputField
            labelText="Apartment / Unit"
            value={apartment}
            onChangeText={setApartment}
            placeholder="Apartment"
          />
          <View style={{ margin: 10 }} />

          <Text style={{ textAlign: 'left', width: '90%' }}>
            Wiling to travel
          </Text>
          {/* <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          /> */}
          <Slider defaultValue={70} style={{ width: '90%' }}>
            <Slider.Track>
              <Slider.FilledTrack bgColor={ThemeConstants.Colors.primary} />
            </Slider.Track>
            <Slider.Thumb bgColor={ThemeConstants.Colors.primary} />
          </Slider>
        </>
      );
    } else if (step === 3) {
      return (
        <FlatList
          scrollEnabled={false}
          data={servicesList}
          renderItem={({ item, index }) => (
            <Image source={item} key={index} style={styles.flatlistImage} />
          )}
          numColumns={'2'}
        />
      );
    }
  };

  const renderTitle = () => {
    if (step === 1) {
      return 'Sign Up';
    } else if (step === 2) {
      return 'Where do you work';
    } else if (step === 3) {
      return 'What services can you offer?';
    }
  };

  const onBackPress = () => {
    if (step === 1) {
      navigation.goBack();
    } else {
      setStep(step - 1);
    }
  };

  return (
    <View style={[LayoutStyles.colCenter, { marginTop: 40 }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ position: 'absolute', left: 20 }}
          onPress={() => onBackPress()}
        >
          <Image source={backArrow} />
        </TouchableOpacity>
        <Image source={orangeLogo} />
      </View>
      <Text style={[{ margin: 50 }, FontStyles.titleSmall]}>
        {renderTitle()}
      </Text>
      {renderView()}
      <View style={{ margin: 20 }} />
      <Button
        onPress={onSubmit}
        title="Continue"
        disabled={buttonDisabled}
        loading={loading}
      />
      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text style={{ marginTop: 30 }}>
          Already have an account?{' '}
          <Text style={{ color: Colors.primary }}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  flatlistImage: {
    margin: 5,
    height: 160,
    width: 160,
    resizeMode: 'contain',
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
