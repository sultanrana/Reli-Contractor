import { StyleSheet, View, TextInput, Text } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { ThemeConstants } from '../theme';

const InputField = ({
  placeholder,
  value,
  leftIcon,
  rightIcon,
  rightIconPress,
  onChangeText,
  labelText,
  keyboardType,
  show,
  secureTextEntry,
  onSubmit,
}) => {
  return (
    <View>
      <Text style={styles.label}>{labelText}</Text>
      <View style={styles.main}>
        {/* {leftIcon && (
          <Icon
            type="Ionicons"
            name={show ? 'ios-eye-off-outline' : 'ios-eye-outline'}
            style={{ color: AppStyles.color.COLOR_WHITE }}
          />
        )} */}
        <TextInput
          placeholder={placeholder}
          style={styles.textInput}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          secureTextEntry={show ? false : secureTextEntry}
          placeholderTextColor={ThemeConstants.Colors.grey}
          onSubmitEditing={onSubmit}
        />
        {/* {rightIcon && (
          <Icon
            type="Ionicons"
            name={show ? 'ios-eye-off-outline' : 'ios-eye-outline'}
            style={{ color: AppStyles.color.COLOR_WHITE }}
            onPress={rightIconPress}
          />
        )} */}
      </View>
    </View>
  );
};

export default InputField;

InputField.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  leftIcon: PropTypes.any,
  rightIcon: PropTypes.any,
  rightIconPress: PropTypes.func,
  onChange: PropTypes.func,
};

InputField.defaultProps = {
  placeholder: 'Please enter text here',
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0)',
  },
  label: {
    color: ThemeConstants.Colors.text,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: 'rgba(255,255,255,0)',
    width: '90%',
    color: ThemeConstants.Colors.text,
    paddingLeft: 10,
    height: 50,
  },
});
