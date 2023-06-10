
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from './src/Background';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {

      const storedData = await AsyncStorage.getItem('userData');
      const userData = storedData ? JSON.parse(storedData) : [];

      const user = userData.find(user => user.email === email && user.password === password);
      if (user) {
        Alert.alert('Success', 'Login successful');
        navigation.navigate("Home");

      } else {
        Alert.alert('Error', 'Incorrect email or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
      console.log(error);
    }
  };
  const handleSignupLinkPress = () => {
    navigation.navigate('Registration');
  };

  return (
    <Background>
      <View style={{ alignItems: 'center', width: 350 }}>
        <Text style={{
          color: 'white', fontSize: 60, fontWeight: 'bold',
          marginVertical: 10, marginTop: 60,
        }}>Login</Text>
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
          <Button title="Login" onPress={handleLogin} />
          <View style={styles.linksContainer}>
            <Text style={styles.textLink}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={handleSignupLinkPress}>
              <Text style={[styles.textLink, styles.boldText]}> Sign up</Text>
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

export default LoginScreen;
