/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  StatusBar
} from 'react-native';
import Posts from './src/screens/Posts';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from './src/screens/Profile';
import Comments from './src/screens/Comments';
import AddPost from './src/screens/AddPost';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function App() {
  const [initialScreen, setInitialScreen] = useState('login');

  
  const getUserId = async () => {
      const value = await AsyncStorage.getItem('userId');
      if(value!==null){
        setInitialScreen("home");
      }
  };

  useEffect(()=>{
    getUserId();
  },[])

  

  return (
    <>
      <StatusBar backgroundColor="black"/>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen
            name="login"
            options={{headerShown: false}}
            component={Login}
          />
          <Stack.Screen
            name="home"
            component={Posts}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="signup"
            options={{headerShown: false}}
            component={SignUp}
          />
          <Stack.Screen
            name="profile"
            options={{headerShown: false}}
            component={Profile}
          />
          <Stack.Screen
            name="comments"
            options={{headerShown: false}}
            component={Comments}
          />
          <Stack.Screen
            name="addpost"
            options={{headerShown: false}}
            component={AddPost}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
