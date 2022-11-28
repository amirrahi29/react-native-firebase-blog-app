import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = () => {

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const saveUser=async()=>{
    firestore()
    .collection('users')
    .add({
      name: name,
      email: email,
      password: password,
    })
    .then(() => {
      saveCredentials(email,password);
      navigation.replace('HomeScreen');
    })
    .catch((e)=>{
      alert(e);
    });
  }

  const saveCredentials=async(email,password)=>{
    AsyncStorage.setItem('email',email);
    AsyncStorage.setItem('password',password);
}

  return (
    <View style={styles.container}>

      <Text style={styles.titleText}>SignUp</Text>

      <TextInput
        value={name}
        onChangeText={(e) => setName(e)}
        placeholderTextColor='black'
        placeholder='Enter name'
        style={styles.inputStyle}
      />

      <TextInput
        value={email}
        onChangeText={(e) => setEmail(e)}
        placeholderTextColor='black'
        placeholder='Enter email id'
        style={styles.inputStyle}
      />

      <TextInput
        value={password}
        onChangeText={(e) => setPassword(e)}
        secureTextEntry={true}
        placeholderTextColor='black'
        placeholder='Enter password'
        style={styles.inputStyle}
      />

      <TouchableOpacity style={styles.authBtn} onPress={saveUser}>
        <Text style={{ fontSize: 24, color: 'white' }}>Continue</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', width: '60%', marginTop: 20 }}>
        <View style={styles.border}></View>
        <Text style={{ color: 'black', fontSize: 20 }}>OR</Text>
        <View style={styles.border}></View>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={{ color: 'black', fontSize: 16, textDecorationLine: 'underline' }}>Already have an account ?</Text>
      </TouchableOpacity>

    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    titleText: {
      color: 'black',
      fontSize: 32,
      fontWeight: '800',
      marginBottom: 30,
    },
    inputStyle: {
      borderColor: 'black',
      color: 'black',
      borderRadius: 8,
      height: 50,
      width: '90%',
      borderWidth: 1,
      padding: 8,
      marginTop: 16
    },
    authBtn: {
      backgroundColor: 'black',
      width: '90%',
      borderRadius: 8,
      marginTop: 16,
      padding: 8,
      alignItems: 'center'
    },
    border: {
      height: 1,
      width: '30%',
      borderColor: 'gray',
      borderWidth: 1,
      margin: 16
    }
  }
);