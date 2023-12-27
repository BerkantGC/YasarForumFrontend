import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginPage from "./pages/loginPage/LoginPage"
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/auth";
import MainPage from "./pages/mainPage/MainPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Ionicons from "react-native-vector-icons/Ionicons";
import ProfilePage from "./pages/profilePage/ProfilePage";
import Colors from "./utilites/Colors";
import { AUTHENTICATED, NOT_AUTHENTICATED } from "./redux/auth/authTypes";
import NotesPage from "./pages/notesPage/NotesPage";
import CommentPage from "./pages/commentPage/CommentPage";
import RegisterPage from "./pages/register/RegisterPage";
import { initialWindowSafeAreaInsets } from "react-native-safe-area-context";

function Home() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({ headerShown: false, tabBarStyle: {height: 80} ,tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Ana Sayfa') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Profil') {
              iconName = focused ? 'person' : 'person-outline';
            } else if(route.name === 'Notlar')
            {
              iconName = focused ? 'reader' : 'reader-outline'
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.BACKGROUND,
          tabBarInactiveTintColor: Colors.DARKGREY,
        })}
      >
        <Tab.Screen name="Ana Sayfa"  component={MainPage} />
        <Tab.Screen name="Notlar" component={NotesPage}/>
        <Tab.Screen name="Profil" component={ProfilePage}/>
      </Tab.Navigator>
  );
}

const AuthStack = () => {
    const dispatch = useDispatch();
  
    const token = useSelector(selector => selector.token)
    
    const readData = async () => {
        try {
          const tokenValue = await AsyncStorage.getItem("@TOKEN");
          const emailValue = await AsyncStorage.getItem("@EMAIL");
          console.log(tokenValue)
          if (tokenValue !== null) {
            dispatch({type: AUTHENTICATED, payload: {token: tokenValue, currentUser: {email: emailValue}}})
          }
        } catch (e) {
          console.log('Cannot login.');
        }
      };
      useEffect( ()=> {
        readData();
      },[])

    return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {
                token !== null ? <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/> : <Stack.Screen name="Login" component={LoginPage}/>
            }
            <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }}/>
            <Stack.Screen name="Comment" component={CommentPage} options={{ headerShown: false }}/>
        </Stack.Navigator>
    </NavigationContainer>
    )
}

const Router = () => {
    return(
    <Provider store={store}>
        <AuthStack/>
    </Provider>
    )
}

export default Router;