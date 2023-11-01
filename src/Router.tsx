import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginPage from "./pages/loginPage/LoginPage"
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/auth";
import MainPage from "./pages/mainPage/MainPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Ionicons from "react-native-vector-icons/Ionicons";
import ProfilePage from "./pages/profilePage/ProfilePage";
import Colors from "./utilites/Colors";

function Home() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({ headerShown: false, tabBarStyle: {height: 80} ,tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Main') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.BACKGROUND,
          tabBarInactiveTintColor: Colors.DARKGREY,
        })}
      >
        <Tab.Screen name="Main" component={MainPage} />
        <Tab.Screen name="Profile" component={ProfilePage}/>
      </Tab.Navigator>
  );
}

const AuthStack = () => {
    const [token, setToken] = useState(null);

    const readData = async () => {
        try {
          const value = await AsyncStorage.getItem("@TOKEN");
      
          if (value !== null) {
            setToken(value);
          }
        } catch (e) {
          console.log('Failed to fetch the input from storage');
        }
      };
      useEffect( ()=> {
        readData();
      },[])

    return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {
                token !== null ? <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/> : <Stack.Screen name="LOGIN" component={LoginPage}/>
            }
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