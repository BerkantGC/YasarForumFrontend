import React, { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { CommentStyle } from "./CommentStyle";
import CommentComponent from "../../components/CommentComponent";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utilites/BaseURL";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const CommentPage = ({route}) => {
    const {email, postID}= route.params
    const [text, setText] = useState("");
    const [data, setData] = useState(null);

    const token = useSelector(selector => selector.token)

    const fetchComments = async() => {
        await axios.get(`${BASE_URL}comment/${postID}`,{headers: {"Authorization": `Bearer ${token}`}}).then( res =>{
            setData(res.data)
        })
    }

    const makeComment= async() => {

        const comment = {
            post : {
                id : postID
            }, 
            comments: [{
                content: text,
                email: email
            }]
        }

        await axios.post(`${BASE_URL}comment/`, comment, {headers: {"Authorization": `Bearer ${token}`}})
        .then(res => fetchComments())
    }

    useEffect(()=>{
        fetchComments();
    },[])

    return(
        <KeyboardAvoidingView style={CommentStyle.container} behavior="padding" enabled>
            <SafeAreaView style={{flex: 1, alignItems : 'center'}}>
                <View style={CommentStyle.fetchedComments}>
                    <ScrollView>
                        {
                            data !== null && data.map(it => <CommentComponent key={it.comment_id} data={it}/>)
                        }
                    </ScrollView>
                </View>
                <View style={CommentStyle.addComment}>
                    <TextInput value={text} returnKeyType="none" onChangeText={(value)=>setText(value)} 
                    style={CommentStyle.textInput} placeholder="Yorum ekle..."/>

                    <TouchableOpacity onPress={()=>{
                        if(text != "" && text != null)
                        {
                            makeComment();
                            setText("");
                            Keyboard.dismiss()
                        }}}>
                        <Icon name="send" size={25} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default CommentPage;