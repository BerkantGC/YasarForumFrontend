import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../utilites/Colors";

const AppStyles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        width: "100%",
        justifyContent: 'center', 
    },
    logo_container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom : 30,
        height: Dimensions.get("screen").height/4,
        marginHorizontal: Dimensions.get("screen").width/9,
    },
    logo: {
        height: '100%',
        width: '100%',
        objectFit: 'contain',
    },
    warning_text: {
        marginHorizontal: 15, marginBottom: 5,
    },
    text_input: {
        backgroundColor: "white",
        minHeight: 50,
        marginHorizontal: 15, marginBottom: 15,
        borderRadius: 10,
        padding: 10,
    },
    button: {
        backgroundColor: Colors.BLUE,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15, marginBottom: 15,
        borderRadius: 10,
        padding: 10,
    },
    button_text: {
        color: "white",
        fontWeight: 'bold'
    },
    not_registered_button_view: {
        alignItems : 'center',
    },
    not_registered_button_text: {
        width: "100%",
        color: Colors.WARNING
    },
    not_registered_button: {
        justifyContent: 'center',
    },
    
});


export default AppStyles;