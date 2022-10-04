import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, InputField } from '../components';
import { orangeLogo } from '../theme/Images';
import { FontStyles } from '../theme/styles/Fonts';
import { LayoutStyles } from '../theme/styles/Layout';
import ThemeConstants, { Colors, FontSize } from '../theme/ThemeConstants';
import { Icon } from 'native-base';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [step, setStep] = useState(1);
  const navigation = useNavigation();

  const onSubmit = () => {
    if (step === 1) {
      if (email === '') {
        alert('Email cannot be empty');
        return;
      } else {
        setStep(2);
      }
    } else {
      setLoading(true);
      setButtonDisabled(true);
      navigation.replace('appStack');
    }
    setLoading(false);
    setButtonDisabled(false);
  };

  const renderView = () => {
    if (step === 1) {
      return (
        <InputField
          labelText="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="yourname@email.com"
        />
      );
    } else {
      return (
        <>
          <View style={styles.emailTextView}>
            <Text style={styles.emailText}>{email}</Text>
          </View>
          <InputField
            labelText="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={true}
            // rightIcon={<Icon as={FontAwesome} name="home" />}
          />
        </>
      );
    }
  };

  const renderBottomLabel = () => {
    if (step === 1) {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <Text style={{ marginTop: 30 }}>
            Need an account?
            <Text style={{ color: Colors.primary }}> Sign Up</Text>
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}>
          <Text style={{ color: Colors.primary, marginTop: 30 }}>
            Forgot Password
          </Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={[LayoutStyles.colCenter, { marginTop: 40 }]}>
      <Image source={orangeLogo} />
      <Text style={[{ margin: 50 }, FontStyles.titleSmall]}>
        Contractor Sign In
      </Text>
      {renderView()}
      <View style={{ margin: 10 }} />
      <Button
        onPress={onSubmit}
        title="Continue"
        disabled={buttonDisabled}
        loading={loading}
      />
      {renderBottomLabel()}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  emailTextView: {
    width: '60%',
    height: 40,
    borderRadius: 50,
    backgroundColor: ThemeConstants.Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
    marginBottom: 20,
  },
  emailText: {
    textAlign: 'center',
    color: ThemeConstants.Colors.text,
  },
});
