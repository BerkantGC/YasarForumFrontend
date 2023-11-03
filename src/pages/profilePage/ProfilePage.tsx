import { Button, FlatList, Image, SafeAreaView, ScrollView, Text, Touchable, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useDispatch, useSelector } from "react-redux";
import { NOT_AUTHENTICATED } from "../../redux/auth/authTypes";
import Style from "./ProfilePageStyle";
import axios from "axios";
import { BASE_URL } from "../../utilites/BaseURL";
import { useEffect, useRef, useState } from "react";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons"

import ProfilePosts from "../../components/ProfilePosts";
import ProfileNote from "../../components/ProfileNote";
import ImageCropPicker from "react-native-image-crop-picker";

export default function({navigation}){
    const dispatch =useDispatch();
    const token = useSelector(selector => selector.token);
    const user = useSelector(selector => selector.currentUser);
    const [data, setData] = useState(null);
    const [userPosts, setUserPosts] = useState(null);
    const [userNotes, setUserNotes] = useState(null);
    const [profileImage, setProfileImage] = useState(null)

    const fetchUserInfo = async() => {
        await axios.get(`${BASE_URL}auth/user-info`, {headers: {"Authorization": `Bearer ${token}`}}).then( res =>{
            setData(res.data)
        })
        await axios.post(`${BASE_URL}post/user-posts`, {"email": user.email}, {headers: {"Authorization": `Bearer ${token}`}}).then( res =>{
            setUserPosts(res.data.filter(it=>!(it.anonymous)))
        })
        await axios.post(`${BASE_URL}note/user-notes`, {"email": user.email}, {headers: {"Authorization": `Bearer ${token}`}}).then( res =>{
            setUserNotes(res.data)
        })
        await axios.get(`${BASE_URL}image/${user.email}`,{headers: {"Authorization": `Bearer ${token}`}}).then( res =>{
            setProfileImage(res.config.url)
        })
    }
    const handleLogout = async(Destination: string) => {
        await AsyncStorage.removeItem("@TOKEN")
        dispatch({type: NOT_AUTHENTICATED, payload: {currentUser: null, token: null}})
    }   

    console.log(profileImage)

    const postProfileImage = async(image) => {
        var photo = {
            uri: image.path,
            type: 'image/jpeg',
            name: image.creationDate + user.email.slice(0, 11) + ".jpeg"
        }
        var formData= new FormData();
        formData.append("image", photo)
        await axios.post(`${BASE_URL}image`, formData, {headers: {'Content-Type': 'multipart/form-data','Accept': 'application/json',"Authorization": `Bearer ${token}`}}).
        then( res =>{
            fetchUserInfo()
        }).catch(err => console.log(err))
    }
    useEffect(()=> {
        fetchUserInfo()
    }, [])

        const flatListRef = useRef();

        const Buttons = ({index}) => { 
            const length = userPosts.length;

            const nextPress = index => {
                if (index < length-1) {
                    flatListRef?.current?.scrollToIndex({
                        animated: true,
                        index: index + 1
                    });
                }
            };
            const backPress = index => {
                if (index >= 1) {
                    flatListRef?.current?.scrollToIndex({
                        animated: true,
                        index: index - 1
                    });
                }
            };
            return(
            <View style={Style.buttons_container}>
                <TouchableOpacity onPress={()=>backPress(index)}>
                    <View>
                        <Icon size={30} style={{ opacity: 0.5 }} name="chevron-back-outline"/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>nextPress(index)}>
                    <View>
                        <Icon size={30} style={{ opacity: 0.5 }} name="chevron-forward-outline"/>
                    </View>
                </TouchableOpacity>
            </View>)
        }
        const renderPosts = ({item,index}) => <View><ProfilePosts item={item}/><Buttons index={index}/></View>
        const renderNotes = ({item}) => <ProfileNote item={item}/>
    return(
        data ? 
        <SafeAreaView style={Style.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={Style.header}>
                    <TouchableOpacity onPress={()=>ImageCropPicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true,
                    }).then(image => {
                    postProfileImage(image);
                    })}>
                    {profileImage!==null ? <Image source={{uri: String(profileImage)}} style={{width : 150, height: 150, resizeMode: 'contain'}}/> : <Icon name="person-circle" size={150} color="white" />}
                    </TouchableOpacity>
                    <Text style={{color : 'white', fontSize : 30}}>{data.firstName + " " + data.lastName}</Text>
                    <Text style={{color : 'white', fontSize : 14}}>{data.email}</Text>
                </View>
                <View style={Style.userPostContainer}>
                    <View>
                        <Text style={{color : 'white', fontSize : 15, fontWeight: 'bold'}}>GÖNDERİLER</Text>
                    </View>
                    <FlatList ref={flatListRef} ItemSeparatorComponent={() => <View style={{ width: 10 }} />} 
                    stickyHeaderIndices={[0]} keyExtractor={item => item.post_id} 
                    data={userPosts} horizontal renderItem={renderPosts}
                    />
                </View>
                <View style={Style.userPostContainer}>
                    <View>
                        <Text style={{color : 'white', fontSize : 15, fontWeight: 'bold'}}>NOTLAR</Text>
                    </View>
                    <FlatList ItemSeparatorComponent={() => <View style={{ width: 10 }} />} 
                    stickyHeaderIndices={[0]} keyExtractor={item => item.note_id} 
                    data={userNotes} horizontal renderItem={renderNotes}
                    />
                </View>
                <View style={Style.logout_btn}>
                    <Button onPress={()=>handleLogout("Home")} title="Çıkış yap"></Button>
                </View>
            </ScrollView>
        </SafeAreaView> : null
    )
}