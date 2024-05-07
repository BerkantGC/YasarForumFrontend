import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../utilites/Colors";

export const CommentStyle = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor : Colors.DARKGREY
    },
    fetchedComments: {
        height : '90%'
    },
    addComment : {
        height : '10%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    textInput : {
        width: '85%',
        backgroundColor : Colors.WHITE,
        padding : 10,
        marginHorizontal: 5,
        borderRadius: 5
    },
})