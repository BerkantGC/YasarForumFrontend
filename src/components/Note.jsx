import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions} from "react-native";

import Colors from "../utilites/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity } from "react-native-gesture-handler";

const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };
  
const Note = ({item}) => {

    const [color, setColor] = useState("white");
    useEffect(()=> {
        setColor(generateColor());
    },[])
    return(
        <View style={{...Style.container, backgroundColor : color}}>
            <View style={Style.content}>
                <View style={Style.content_title}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.title}</Text>
                </View>
                <View style={Style.content_body}>
                    <Text style={{fontSize: 15}}>
                    {item.description}
                    </Text>
                </View>
                <View style={Style.likeContainer}>
                    <TouchableOpacity>
                        <View style={Style.likeButton}>
                            <Text style={{color:Colors.BACKGROUND, fontSize: 15}}>{new Date(item.date).toDateString()}</Text>
                        </View>
                    </TouchableOpacity>
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
        borderRadius : 15,
    },
    content: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    content_title: {
        height: '10%',
    },
    content_body: {
        height: '80%',
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

export default Note;