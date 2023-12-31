import React, { useEffect, useState } from "react";
import { Dimensions, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Colors from "../utilites/Colors";

import CloseModalButton from "./Buttons/CloseModalButton"
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../utilites/BaseURL";
import axios from "axios";

export default function({modalVisible, setModalVisible}){
    const [content, updateContent] = useState("");
    const [isAnonymous, updateAnonymous] = useState(false);

    const postData = async() =>{
        const token = await AsyncStorage.getItem("@TOKEN");
        const email = await AsyncStorage.getItem("@EMAIL");
        
        const data = {
            user: {
                email : email
            },
            posts:  [{
                content : content,
                createdAt: new Date().toJSON(),
                anonymous: isAnonymous,
                numOfLikes: 0,
                isChecked: false,
                activated: false
            }]
        }

        console.log(data);

        await axios.post(BASE_URL + "post/", data, {headers: {"Authorization": `Bearer ${token}`}})
        .then((res)=>{
            setModalVisible(false)
        }).catch((error)=>console.error(error))

    }

    return(
            <KeyboardAvoidingView behavior="padding" enabled style={Style.modalView}>
            <CloseModalButton modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <View style={Style.createNewPost}>
            <View style={{alignItems : 'center'}}>
                <Text  style={{color: 'white'}}>Tarih: {new Date().toLocaleString()}</Text>
            </View>
                <View style={Style.newPostTitle}>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Yeni Gönderi</Text>
                </View>
                <TextInput maxLength={500} value={content} onChangeText={(e) => updateContent(e)} inputMode="text" multiline={true} style={Style.contentInput}/>
                <View style={Style.checkAnonymous}>
                    <BouncyCheckbox fillColor={Colors.BLUE} text="Gizli" 
                    disableBuiltInState isChecked={isAnonymous} 
                    onPress={() => updateAnonymous(!isAnonymous)} 
                    textStyle = {Style.checkAnonymousText}
                    textContainerStyle={Style.checkAnonymousTextContainerStyle}/>

                    <TouchableOpacity onPress={postData} style={{alignItems : 'center'}}>
                        <View style={Style.shareButton}>
                            <Text style={{color: 'white', fontSize: 13}}>PAYLAŞ</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
            </View>
            </KeyboardAvoidingView>
    )
}

const Style = StyleSheet.create({
    modalView: {
        backgroundColor : Colors.BACKGROUND,
        borderRadius:20,
        height: Dimensions.get("screen").height/1.15,
        width: Dimensions.get("screen").width/1,
        alignItems : 'center',
        justifyContent: 'center'
    },
    createNewPost:{
        width: '90%',
    },
    newPostTitle: {
        marginVertical: 10,
        justifyContent : 'center',
        alignItems : 'center'
    },
    contentInput: {
        height: Dimensions.get("screen").height/3,
        backgroundColor : Colors.DARKGREY,
        fontSize :15,
        flexWrap : 'wrap',
        padding : 10,
        borderRadius: 10,
        color : 'white',
        marginBottom: 5
    },
    checkAnonymous: {
        marginTop : 5,
        flexDirection : 'row',

        justifyContent : 'space-between',
        color : 'blue'
    },
    checkAnonymousTextContainerStyle: {
        marginLeft: 5,
    },
    checkAnonymousText: {
        textDecorationLine : 'none',
        color: Colors.BLUE
    },
    shareButton: {
        backgroundColor: Colors.BLUE,
        justifyContent : 'center',
        alignItems: 'center',
        width: 100,
        height : 25, borderRadius: 5
    }
})