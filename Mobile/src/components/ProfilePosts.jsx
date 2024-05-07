import React from "react";
import { StyleSheet, Text, View, Dimensions} from "react-native";

import Colors from "../utilites/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProfilePosts = ({item}) => {

    
    return(
        <View style={Style.container}>
            <View style={Style.content}>
                <View style={Style.content_body}>
                    <Text style={{fontSize: 15}}>
                    {item.content}
                    </Text>
                </View>
                <View style={Style.likeContainer}>
                        <View style={Style.likeButton}>
                            <Icon name="heart" color={Colors.BACKGROUND} size={25}></Icon> 
                            <Text style={{color:Colors.BACKGROUND, fontSize: 15}}>{item.likes}</Text>
                        </View>
                </View>
            </View>
        </View>
    )
}

const Style=StyleSheet.create({
    container: {
        width: Dimensions.get("window").width/1.15,
        height: Dimensions.get("window").height/3,
        marginVertical: 10,
        backgroundColor: "white",
        borderRadius : 15,
    },
    content: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    content_body: {
        height: '90%',
        width: '90%',
        justifyContent :'center',
        alignItems :'center'
    },
    likeContainer: {
        height: '10%',
        width: '100%',
        alignItems: 'center',
    },
    likeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 3,
    }
})

export default ProfilePosts;