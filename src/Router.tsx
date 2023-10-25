import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginPage from "./pages/loginPage/LoginPage"
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/auth";
import MainPage from "./pages/mainPage/MainPage";

const Stack = createStackNavigator();

const AuthStack = () => {
    const loggedIn = useSelector(selector => selector.loggedIn);

    return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {
                loggedIn ? <Stack.Screen name="MAIN" component={MainPage}/> : <Stack.Screen name="LOGIN" component={LoginPage}/>
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