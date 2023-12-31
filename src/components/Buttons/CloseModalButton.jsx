import React from "react";
import { StyleSheet, Touchable, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Ionicons'
import Colors from "../../utilites/Colors";


const closeModalButton = ({modalVisible, setModalVisible}) => {
    return(
    <View style={Style.close}>
            <TouchableOpacity onPress={()=>setModalVisible(false)}>
                <Icon name="close-circle" size={50} style={Style.iconStyle}/>
            </TouchableOpacity>
        </View>)
}

const Style = StyleSheet.create({
    close: {
        position: 'absolute',
        right: 5,
        top: 5
    },
    iconStyle: {
        textShadowColor: 'red',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        color : 'white'
    }
})
export default closeModalButton;