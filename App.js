import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import SplashScreen from './src/SplashScreen';
import LoginScreen from './src/LoginScreen';
import SignUpScreen from './src/SignUpScreen';
import AddNewBlog from './src/AddNewBlog';
import ProductDetailsScreen from './src/ProductDetailsScreen';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown:false}} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{title:'BLOG APP'}} />
      <Stack.Screen name="AddNewBlog" component={AddNewBlog} options={{title:'Add blog'}} />
      <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} options={{title:'Poduct details'}} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App