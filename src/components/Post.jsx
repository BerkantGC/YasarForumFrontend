import React from "react";
import { StyleSheet, Text, View, Dimensions} from "react-native";

import Colors from "../utilites/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utilites/BaseURL";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Post = ({item, navigation, likes, getUserLikes, fetchData}) => {
    const user = useSelector(selector => selector.currentUser)
    const token = useSelector(selector => selector.token)

    let currentTime =  Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / (1000 * 60));
    let currentHour = currentTime/60
    let currentDay = parseInt(currentHour/24)
    if(currentDay > 365)
    {
        currentDay = parseInt(currentDay / 365) + " yıl önce"
    }
    else if(currentDay > 30)
    {
        currentDay = parseInt(currentDay / 30) + " ay önce"
    }
    else if(currentDay > 0) currentDay = parseInt(currentDay) + " gün önce"
    else if(currentDay === 0){
        if(currentHour > 1 )
         currentDay = parseInt(currentHour) + " saat önce" 
         else currentDay = currentTime + " dakika önce"
        }

    async function handleLikePost(){
        const post ={
            id: item.post_id
        }

        await axios.post(BASE_URL + "post/like", post, {headers: {"Authorization": `Bearer ${token}`}})
        .then((res)=>{
            fetchData();
            getUserLikes();
        }).catch((error)=>console.error(error))
    }
    function isLiked(){
        if(likes === null)
            return false;

        for(let i = 0; i < likes.length; i++){
            if(likes[i].post_id === (item.post_id))
                return true;
        }

        return false
    }

    return(
        <View style={Style.container}>
            <View style={Style.content}>
                <View style={Style.content_title}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.anonymous ? "Gizli" : item.userName}</Text>
                </View>
                <View style={Style.content_body}>
                    <Text style={{fontSize: 15}}>
                    {item.content}
                    </Text>
                </View>
                <View style={Style.createdAt}>
                        <Text style={{fontSize: 10}}>{currentDay}</Text>
                </View>
            </View>
            <View style={Style.info}>
                <View style={Style.likeContainer}>
                    <TouchableOpacity onPress={isLiked() ? null : handleLikePost}>
                        <View style={Style.likeButton}>
                            <Icon name={isLiked() ? "heart": "heart-outline"} color= "white" size={30}></Icon>
                            <Text style={{color: "white", fontSize: 10,}}>{item.likes}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("Comment",{email: user.email, postID : item.post_id})}>
                        <View style={Style.likeButton}>
                            <Icon name="chatbubbles-outline" color= "white" size={30}></Icon> 
                            <Text style={{color: "white", fontSize: 10}}>{item.comments}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={Style.likeButton}>
                            <Icon name="paper-plane-outline" color= "white" size={30}></Icon> 
                            <Text style={{color: "white", fontSize: 10}}>Paylaş</Text>
                        </View>    
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const Style=StyleSheet.create({
    container: {
        width: Dimensions.get("screen").width/1.15,
        height: Dimensions.get("screen").height/3,
        marginVertical: 10,
        backgroundColor: "white",
        borderRadius : 15,
    },
    content: {
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    info: {
        height: '20%',
        backgroundColor: Colors.BACKGROUND,
        borderBottomLeftRadius: 15, borderBottomRightRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    userInfo: {
        width: '50%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    likeContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30
    },
    createdAt: {
        position: 'absolute',
        bottom: 5,
        right: 5,
    },
    content_title: {
        height: '10%',
    },
    content_body: {
        height: '90%',
        width: '100%',
        justifyContent :'center',
        alignItems :'center'
    },
    likeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        height : '100%'
    }
})

export default Post;