import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import { FontSize } from '../../Theme/FontSize';
import { LayoutStyles } from '../../Theme/Layout';
import Colors from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';

import { Slider } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Signup = ({ navigation }) => {
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
  const scheme = useColorScheme()

  const servicesList = [
    {
      key: '1',
      title: 'Windows',
      image: ''
    },
    {
      key: '2',
      title: 'Glass Doors',
      image: ''
    },
    {
      key: '3',
      title: 'Interior Doors',
      image: ''
    },
  ];

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

  const onSubmit = () => {
    if (step === 1) {
      if (firstName === '') {
        SimpleToast.show('First Name cannot be empty');
        return;
      }
      if (lastName === '') {
        SimpleToast.show('Last Name cannot be empty');
        return;
      }
      if (email === '') {
        SimpleToast.show('Email cannot be empty');
        return;
      }
      if (password === '') {
        SimpleToast.show('Password cannot be empty');
        return;
      } else {
        setStep(2);
      }
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setLoading(true);
      setButtonDisabled(true);
      SimpleToast.show('Sign Up');
    }
    setLoading(false);
    setButtonDisabled(false);
  };

  const renderView = () => {
    if (step === 1) {
      return (
        <>
          <InputField
            title="First Name"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First Name"
          />
          <InputField
            title="Last Name"
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last Name"
          />

          <InputField
            title="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="yourname@email.com"
          />

          <InputField
            title="Password"
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
            title="Address"
            value={address}
            onChangeText={setAddress}
            placeholder="Address"
          />

          <InputField
            title="Apartment / Unit"
            value={apartment}
            onChangeText={setApartment}
            placeholder="Apartment"
          />

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
              <Slider.FilledTrack bgColor={Colors(scheme).primary} />
            </Slider.Track>
            <Slider.Thumb bgColor={Colors(scheme).primary} />
          </Slider>
        </>
      );
    } else if (step === 3) {
      return (
        <FlatList
          scrollEnabled={false}
          data={servicesList}
          renderItem={({ item, index }) => (
            <View style={{
              width: '40%',
              height: 128
            }}>

              <Text>{item?.title}</Text>

            </View>
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

    <View style={[{ paddingTop: 40, backgroundColor: Colors(scheme).Background, width: '100%', height: '100%', alignItems: 'center' }]}>
      <View style={styles.header}>
        <LogoOver navigation={navigation} shouldShowBack />
      </View>
      <KeyboardAwareScrollView>
        <>
          <Text style={[{
            margin: 24,
            fontSize: FontSize.xlarge + 4,
            fontFamily: Fonts.SemiBold,
            color: Colors(scheme).TextTitle,
            textAlign: 'center'
          }]}>
            {renderTitle()}
          </Text>
          <View style={{
            padding: 8,
            justifyContent: 'center',
            alignContent: 'center'
          }}>
            {renderView()}
            <View style={{ margin: 16 }} />
            <ContainedButton
              onPress={onSubmit}
              label="Continue"
              disabled={buttonDisabled}
              loading={loading}
            />
            <TouchableOpacity onPress={() => navigation.replace(References.Login)} style={{ alignSelf: 'center'}}>
              <Text style={{ marginTop: 30, color: Colors(scheme).Text, fontFamily: Fonts.Light }}>
                Already have an account?{' '}
                <Text style={{ color: Colors(scheme).Primary, fontFamily: Fonts.Medium }}>Sign In</Text>
              </Text>
            </TouchableOpacity>

            <View style={{ margin: 16 }} />

          </View>


        </>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Signup;

