import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../utilites/Colors";

export const MainPageStyle = StyleSheet.create({
    safeAreaContainer:{
        flex: 1,
        backgroundColor: Colors.DARKGREY,
        justifyContent :'center',
        alignItems: 'center'
    },
    header: {
        justifyContent :'center'
    },
    mainContainer:{
        flex:1,
        alignItems: "center"
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
})