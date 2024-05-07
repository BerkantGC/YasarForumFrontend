import axios from "axios"
import { Dimensions, Image, StyleSheet, Text, View } from "react-native"
import { BASE_URL } from "../utilites/BaseURL"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Colors from "../utilites/Colors";

const CommentComponent = ({data}) => {
    const [profileImage, setProfileImage] = useState(null);

    const token = useSelector(selector => selector.token)

    const fetchUserInfo = async() => {
        await axios.get(`${BASE_URL}image/${data.userEmail}`,{headers: {"Authorization": `Bearer ${token}`}}).then( res =>{
            setProfileImage(res.config.url)
        })
    }

    useEffect(()=>{
        fetchUserInfo()
    },[])
    return(
        <View style={Style.container}>
            <View id="left-side-proile-picture" style={Style.left_side}>
                <Image source={{uri: profileImage}} style={Style.image}/>
            </View>
            <View id="right-side-user&comment" style={Style.right_side}>
                <View style={Style.user}>
                    <Text style={Style.user_text}>{data.userName}</Text>
                </View>
                <View style={Style.comment_text_container}>
                    <Text style={Style.comment_text}>{data.content}</Text>
                </View>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        width : Dimensions.get("window").width/1,
        maxHeight: Dimensions.get("window").height/5,
        flexDirection: 'row',
        marginVertical: 5
    },
    left_side: {
        width : '20%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    image: {
        marginTop: 5,
        width: 50,
        height: 50,
        borderRadius: 50/2,
        resizeMode: 'cover',
    },
    right_side :{
        width: '80%',
        padding : 5,
        justifyContent : 'center',
    }, 
    user: {marginBottom: 5},
    user_text: {
        fontSize : 12,
        fontWeight: 'bold',
        color: Colors.WHITE
    },
    comment_text_container: {},
    comment_text: {
        fontSize : 15,
        color: Colors.WHITE
    }
})

export default CommentComponent