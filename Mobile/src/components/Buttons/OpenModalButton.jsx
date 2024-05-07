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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.50,
        shadowRadius: 3.84,

        elevation: 5,
        color : 'white'
    }
})