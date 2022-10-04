import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, InputField } from '../components';
import { ThemeConstants } from '../theme';
import { backArrow } from '../theme/Icons';
import { orangeLogo } from '../theme/Images';
import { FontStyles } from '../theme/styles/Fonts';
import { LayoutStyles } from '../theme/styles/Layout';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    } else if (step === 2) {
      if (verificationCode === '') {
        alert('Verification code cannot be empty');
        return;
      } else {
        setStep(3);
      }
    } else if (step === 3) {
      if (password === '') {
        alert('Password cannot be empty');
        return;
      } else {
        setLoading(true);
        setButtonDisabled(true);
        alert('Password Changed');
      }
    }
    setLoading(false);
    setButtonDisabled(false);
  };

  const renderTitle = () => {
    if (step === 1) {
      return 'Forgot Password';
    } else if (step === 2) {
      return 'Enter Verification Code';
    } else if (step === 3) {
      return 'Set Password';
    }
  };

  const renderView = () => {
    if (step === 1) {
      return (
        <InputField
          labelText="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Your Email"
        />
      );
    } else if (step === 2) {
      return (
        <>
          <InputField
            labelText="Verification Code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            placeholder="Verification Code"
            show={showPassword}
          />
          <Text style={styles.emailText}>
            Check your email for a verification code
          </Text>
        </>
      );
    } else if (step === 3) {
      return (
        <InputField
          labelText="New Password"
          value={password}
          onChangeText={setPassword}
          placeholder="New Password"
          secureTextEntry={true}
        />
      );
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
      <View style={{ margin: 10 }} />
      <Button
        onPress={onSubmit}
        title={step === 3 ? 'Save' : 'Continue'}
        disabled={buttonDisabled}
        loading={loading}
      />
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  emailText: {
    textAlign: 'left',
    color: ThemeConstants.Colors.grey,
    width: '90%',
    marginTop: 10,
    fontStyle: 'italic',
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
