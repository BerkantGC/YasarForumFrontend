import React from "react";
import { StyleSheet, Touchable, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Ionicons'
import Colors from "../../utilites/Colors";

export default function({modalVisible, setModalVisible})
{
    return(
        <View style={Style.add}>
        <TouchableOpacity onPress={()=>setModalVisible(true)}>
            <Icon name="add-circle" size={50} style={Style.iconStyle}/>
        </TouchableOpacity>
        </View>
    )
}

const Style = StyleSheet.create({
    add: {
        position: 'absolute',
        right: 5,
        bottom: 5,
        zIndex : 100,
    },
    iconStyle: {
        textShadowColor: 'red',
        shadowOpacity: 1,
        shadowRadius: 5,
        textShadowOffset:{width: 5,height: 2},
        color : 'white'
    }
})