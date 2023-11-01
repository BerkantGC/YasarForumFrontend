import React from "react";
import { StyleSheet, Text, View, Dimensions} from "react-native";

import Colors from "../utilites/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity } from "react-native-gesture-handler";

const Post = ({item}) => {
    console.log(item)

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
                        <Text style={{fontSize: 10}}>{ Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days ago</Text>
                </View>
            </View>
            <View style={Style.info}>
                <View style={Style.likeContainer}>
                    <TouchableOpacity>
                        <View style={Style.likeButton}>
                            <Icon name="heart" color= "white" size={25}></Icon> 
                            <Text style={{color: "white", fontSize: 10,}}>{item.likes}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={Style.likeButton}>
                            <Icon name="comment" color= "white" size={25}></Icon> 
                            <Text style={{color: "white", fontSize: 10}}>{item.likes}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={Style.likeButton}>
                            <Icon name="paper-plane" color= "white" size={25}></Icon> 
                            <Text style={{color: "white", fontSize: 10}}>30</Text>
                        </View>    
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const Style=StyleSheet.create({
    container: {
        width: Dimensions.get("screen").width/1.2,
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