import React, { useEffect, useState } from "react";
import { Dimensions, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Colors from "../utilites/Colors";

import CloseModalButton from "./Buttons/CloseModalButton"
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../utilites/BaseURL";
import axios from "axios";

export default function({modalVisible, setModalVisible}){
    const [title, updateTitle] = useState("");
    const [description, updateDescription] = useState("");
    const [isPublic, updatePublic] = useState(false);

    const postData = async() =>{
        const token = await AsyncStorage.getItem("@TOKEN");
        const email = await AsyncStorage.getItem("@EMAIL");
        
        const data = {
            user: {
                email : email
            },
            notes:  [{
                title : title,
                description : description,
                date: new Date().toJSON(),
                isPublic: isPublic,
                likes: 0,
                isChecked: false,
                activated: false
            }]
        }

        await axios.put(BASE_URL + "note/", data, {headers: {"Authorization": `Bearer ${token}`}})
        .then((res)=>{
            setModalVisible(false)
        }).catch((error)=>console.error(error))

    }

    return(
        <KeyboardAvoidingView style={Style.modalView} behavior="padding" enabled>
            <CloseModalButton modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <View style={Style.createNewPost}>
                <View style={{alignItems : 'center'}}>
                    <Text>{new Date().toLocaleString()}</Text>
                </View>
                <View style={Style.newPostTitle}>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>Yeni Not</Text>
                </View>
                <Text>Başlık:</Text>
                <TextInput maxLength={50} value={title} onChangeText={(e) => updateTitle(e)} inputMode="text" style={Style.titleInput}/>
                <Text>Not:</Text>
                <TextInput maxLength={500} value={description} onChangeText={(e) => updateDescription(e)} inputMode="text" multiline={true} style={Style.contentInput}/>
                <View style={Style.checkAnonymous}>
                    <BouncyCheckbox fillColor={Colors.DARKGREY} text="Herkese açık" 
                    disableBuiltInState isChecked={isPublic} 
                    onPress={() => updatePublic(!isPublic)} 
                    textStyle = {Style.checkAnonymousText}
                    textContainerStyle={Style.checkAnonymousTextContainerStyle}/>

                    <TouchableOpacity onPress={postData} style={{alignItems : 'center'}}>
                        <View style={Style.shareButton}>
                            <Text style={{fontSize: 13, color: 'white'}}>PAYLAŞ</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
            </View>
        </KeyboardAvoidingView>
    )
}

const Style = StyleSheet.create({
    modalView: {
        backgroundColor : "lightblue",
        height: Dimensions.get("screen").height/1.15,
        width: Dimensions.get("screen").width/1,
        justifyContent: 'center',
        alignItems : 'center'
    },
    createNewPost:{
        width: '90%',
    },
    newPostTitle: {
        marginVertical: 10,
        alignItems : 'center'
    },
    titleInput: {
        backgroundColor : Colors.DARKGREY,
        fontSize :15,
        flexWrap : 'wrap',
        padding : 10,
        borderRadius: 10,
        color : 'white',
        marginBottom: 5
    },
    contentInput: {
        height: Dimensions.get("screen").height/4,
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
        color : Colors.DARKGREY
    },
    checkAnonymousTextContainerStyle: {
        marginLeft: 5,
    },
    checkAnonymousText: {
        textDecorationLine : 'none',
        color : Colors.DARKGREY
    },
    shareButton: {
        backgroundColor: Colors.DARKGREY,
        justifyContent : 'center',
        alignItems: 'center',
        width: 100,
        height : 25, borderRadius: 5
    }
})