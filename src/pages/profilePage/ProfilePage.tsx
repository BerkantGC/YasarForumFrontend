import { Button, SafeAreaView, Text, View } from "react-native";
import Colors from "../../utilites/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function(){
    const navigate = useNavigation();

    const handleLogout = async(Destination: string) => {
        await AsyncStorage.removeItem("@TOKEN").then(res => navigate.navigate("Home")
        ).catch(err => console.log(err))
    }   

    return(
        <SafeAreaView style={{flex: 1,}}>
            <View>
                <Button onPress={()=>handleLogout("Home")} title="Çıkış yap"></Button>
            </View>
        </SafeAreaView>
    )
}