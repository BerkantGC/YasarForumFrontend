import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../utilites/Colors";

const ProfilePageStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DARKGREY,
        alignItems: 'center'
    },
    header: {
        width : '100%',
        justifyContent : 'center',
        alignItems : 'center'
    },
    userPostContainer: {
        width: Dimensions.get("window").width/1.15,
        marginVertical: 20,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    userPosts: {
        flexDirection : 'row',
    },
    logout_btn: {
        width: '100%'
    },
    buttons_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        width: "100%",
        top: '40%'
    }
}
)

export default ProfilePageStyle;