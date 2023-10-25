import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";

import LoginPageStyle from "./LoginPageStyle";

import { Provider, createStoreHook, useDispatch, useSelector } from "react-redux";
import authReducer from "../../redux/auth/authReducer";

import axios from "axios"
import { createStore,applyMiddleware } from "redux";
import {createLogger} from 'redux-logger'

import { store } from "../../redux/auth";
import { BASE_URL } from "../../utilites/BaseURL";
import checkEmail from "../../components/checkEmail";
import { AUTHENTICATED, NOT_AUTHENTICATED } from "../../redux/auth/authTypes";

const LoginForm = () => {
  const dispatch = useDispatch();
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async() => {
  
    const data = {
      "email" : email,
      "password": password
    }
  
    await axios.post(`${BASE_URL}/api/v1/auth/login`, data).
    then(res => dispatch({type: AUTHENTICATED, payload: {token: res.data.token, currentUser: data}}))
    .catch(failure => dispatch({type: NOT_AUTHENTICATED}));
  }
  
  function SubmitButton(props: any)  {
    return(
        <TouchableOpacity onPress={loginUser} disabled={props.disabled}>
          <View style={LoginPageStyle.button}>
            <Text style={LoginPageStyle.button_text}>LOGIN</Text>
          </View>
        </TouchableOpacity>
    )
  }
  return(
    <SafeAreaView style={LoginPageStyle.main}>
      <View id="container" style={LoginPageStyle.container}>
        <View id="logo_container" style={LoginPageStyle.logo_container}>
          <Image id="logo" source={require("../../images/MUGLogo.png")} style={LoginPageStyle.logo} />  
        </View>
        <TextInput id="text_input_email" onChangeText={(value) => setEmail(value)} style={LoginPageStyle.text_input} placeholder="Student email" />
        <TextInput id="text_input_password" onChangeText={(value) => setPassword(value)} style={LoginPageStyle.text_input} placeholder="Password" secureTextEntry />
        {
          checkEmail(email) ?  <SubmitButton disabled={false}/> : <SubmitButton disabled={true}/>
        }
      </View>

    </SafeAreaView>
    )
}

const App = () => {

  const logger = createLogger();

  return(
    <Provider store={store}>
      <LoginForm/>
    </Provider>
    )
}

export default App;