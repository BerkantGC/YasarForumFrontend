import React, { useEffect, useState } from "react";
import { Button, Image, KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";

import RegisterPageStyle from "./RegisterStyle";

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

const RegisterForm = () => {
  const dispatch = useDispatch();
 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const navigation = useNavigation();

  const loginUser = async() => {
    if(checkPassword == password)
    {
        const data = {
        "firstName" : firstName,
        "lastName" : lastName,
        "email" : email,
        "password": password
        }
    
        await axios.post(`${BASE_URL}auth/register`, data).
        then(res => {
        dispatch({type: AUTHENTICATED, payload: {token: res.data.token, currentUser: data}})
        AsyncStorage.setItem("@TOKEN", res.data.token)
        AsyncStorage.setItem("@EMAIL", data.email)
        })
        .catch(failure => dispatch({type: NOT_AUTHENTICATED}));
    }
    else return null;
  }
  
  function SubmitButton(props: any)  {
    return(
        <TouchableOpacity onPress={loginUser} disabled={props.disabled}>
          <View style={RegisterPageStyle.button}>
            <Text style={RegisterPageStyle.button_text}>KAYIT OL</Text>
          </View>
        </TouchableOpacity>
    )
  }
  return(
    <SafeAreaView style={RegisterPageStyle.main}>
      <KeyboardAvoidingView behavior="padding" style={{width : '100%', height: '100%'}} enabled>
      <View id="container" style={RegisterPageStyle.container}>
        <View id="logo_container" style={RegisterPageStyle.logo_container}>
          <Image id="logo" source={require("../../images/MUGLogo.png")} style={RegisterPageStyle.logo} />  
        </View>
        <TextInput id="text_input_first_name" onChangeText={(value) => setFirstName(value)} style={RegisterPageStyle.text_input} placeholder="Ad" />
        <TextInput id="text_input_last_name" onChangeText={(value) => setLastName(value)} style={RegisterPageStyle.text_input} placeholder="Soyad" />
        <TextInput id="text_input_email" onChangeText={(value) => setEmail(value)} style={RegisterPageStyle.text_input} placeholder="Öğrenci maili" />
        <TextInput id="text_input_password" onChangeText={(value) => setPassword(value)} style={RegisterPageStyle.text_input} placeholder="Şifre" secureTextEntry />
        <TextInput id="text_input_check_password" onChangeText={(value) => setCheckPassword(value)} style={RegisterPageStyle.text_input} placeholder="Yeniden şifre" secureTextEntry />
        {
          checkEmail(email) ?  <SubmitButton disabled={false}/> : <SubmitButton disabled={true}/>
        }
        <View id="not_registered_button_view" style={RegisterPageStyle.not_registered_button_view}>
          <TouchableOpacity onPress={()=>navigation.navigate("Login")} id="not_registered_button" style={RegisterPageStyle.not_registered_button}>
                <Text id="not_registered_button_text" style={RegisterPageStyle.not_registered_button_text}>Zaten bir hesabın var mı?</Text>
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
      <RegisterForm/>
    </Provider>
    )
}

export default App;