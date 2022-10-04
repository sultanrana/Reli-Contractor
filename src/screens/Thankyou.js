import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, InputField } from '../components';
import { orangeLogo } from '../theme/Images';
import { FontStyles } from '../theme/styles/Fonts';
import { LayoutStyles } from '../theme/styles/Layout';
import ThemeConstants, { Colors, FontSize } from '../theme/ThemeConstants';

const Thankyou = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [step, setStep] = useState(1);
  const navigation = useNavigation();

  const onSubmit = () => {
    setLoading(true);
    setButtonDisabled(true);
    alert('Login');
    setLoading(false);
    setButtonDisabled(false);
  };

  return (
    <View style={[LayoutStyles.colCenter, { marginTop: 80, flex: 1 }]}>
      <Image source={orangeLogo} />
      <Text
        style={[
          { marginTop: '50%', marginBottom: 20 },
          FontStyles.titleSmallOrange,
        ]}
      >
        Thank You!
      </Text>
      <Text
        style={[
          { marginBottom: '50%', textAlign: 'center', width: '80%' },
          FontStyles.titleSmall,
        ]}
      >
        We will be getting back to you...
      </Text>

      <View style={{ margin: 10 }} />
      <Button
        onPress={onSubmit}
        title="Refresh"
        disabled={buttonDisabled}
        loading={loading}
      />

      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text style={{ color: Colors.primary, marginTop: 30 }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Thankyou;

const styles = StyleSheet.create({
  thankyouText: {},
});
