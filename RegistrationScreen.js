import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from './src/Background';

const RegistrationScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {

      const storedData = await AsyncStorage.getItem('userData');
      const userData = storedData ? JSON.parse(storedData) : [];

      const isEmailRegistered = userData.some(user => user.email === email);
      if (isEmailRegistered) {
        Alert.alert('Error', 'Email already registered');
        return;
      }

      const newUser = { email, password };
      userData.push(newUser);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      Alert.alert('Success', 'Registration successful');
      navigation.navigate('Login');

    } catch (error) {
      Alert.alert('Error', 'Registration failed');
      console.log(error);
    }
  };

  const handleLoginLinkPress = () => {
    navigation.navigate('Login');
  };

  return (
    <Background>
      <View style={{ alignItems: 'center', width: 350 }}>
        <Text style={{
          color: 'white', fontSize: 60, fontWeight: 'bold',
          marginVertical: 10, marginTop: 60,
        }}>Signup</Text>
        <View style={{
          backgroundColor: 'white',
          height: 450,
          width: 370,
          borderTopLeftRadius: 150,
          borderBottomRightRadius: 150,
          marginTop: 20,
          paddingTop: 100,
          alignItems: 'center',
        }}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <Button  title="Register" onPress={handleRegister} />
          <View style={styles.linksContainer}>
            <Text style={styles.textLink}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={handleLoginLinkPress}>
              <Text style={[styles.textLink, styles.boldText]}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderColor: '#c0c',
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  linksContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  textLink: {
    fontSize: 16,
    marginTop: 20,
  },
  boldText: {
    fontWeight: 'bold',
    color: 'blue',
  },

});

export default RegistrationScreen;
