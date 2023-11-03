import React, { useEffect, useState } from "react";
import { Button, Image, KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";

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

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const LoginForm = ({navigation}) => {
  const dispatch = useDispatch();
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async() => {
  
    const data = {
      "email" : email,
      "password": password
    }
  
    await axios.post(`${BASE_URL}auth/login`, data).
    then(res => {
      dispatch({type: AUTHENTICATED, payload: {token: res.data.token, currentUser: data}})
      AsyncStorage.setItem("@TOKEN", res.data.token)
      AsyncStorage.setItem("@EMAIL", data.email)
    })
    .catch(failure => dispatch({type: NOT_AUTHENTICATED}));
  }
  
  function SubmitButton(props: any)  {
    return(
        <TouchableOpacity onPress={loginUser} disabled={props.disabled}>
          <View style={LoginPageStyle.button}>
            <Text style={LoginPageStyle.button_text}>GİRİŞ YAP</Text>
          </View>
        </TouchableOpacity>
    )
  }
  return(
    <SafeAreaView style={LoginPageStyle.main}>
      <KeyboardAvoidingView behavior="padding" style={{width : '100%', height: '100%'}} enabled>
      <View id="container" style={LoginPageStyle.container}>
        <View id="logo_container" style={LoginPageStyle.logo_container}>
          <Image id="logo" source={require("../../images/MUGLogo.png")} style={LoginPageStyle.logo} />  
        </View>
        <TextInput id="text_input_email" onChangeText={(value) => setEmail(value)} style={LoginPageStyle.text_input} placeholder="Öğrenci maili" />
        <TextInput id="text_input_password" onChangeText={(value) => setPassword(value)} style={LoginPageStyle.text_input} placeholder="Şifre" secureTextEntry />
        {
          checkEmail(email) ?  <SubmitButton disabled={false}/> : <SubmitButton disabled={true}/>
        }
        <View id="not_registered_button_view" style={LoginPageStyle.not_registered_button_view}>
          <TouchableOpacity id="not_registered_button" style={LoginPageStyle.not_registered_button}>
                <Text id="not_registered_button_text" style={LoginPageStyle.not_registered_button_text}>Henüz kayıt olmadın mı?</Text>
          </TouchableOpacity>
        </View>
      
      </View>
      </KeyboardAvoidingView>
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