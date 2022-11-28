import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {

  const navigation = useNavigation();
  useEffect(()=>{
    setTimeout(() => {
      navigateScreen();
    }, 3000);
  },[]);

  const navigateScreen=async()=>{
    const email = await AsyncStorage.getItem('email');
    console.log(email);
    if(email != null){
      navigation.replace('HomeScreen');
    }else{
      navigation.replace('LoginScreen');
    }
  }

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{color:'black'}}>SplashScreen</Text>
    </View>
  )
}

export default SplashScreen