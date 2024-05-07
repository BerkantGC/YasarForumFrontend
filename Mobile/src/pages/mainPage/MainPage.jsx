import React, { useEffect, useState } from "react";
import {Modal, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";
import { MainPageStyle } from "./MainPageStyle";
import Post from "../../components/Post";

import axios from "axios";
import { BASE_URL } from "../../utilites/BaseURL";

import CreatePost from "../../components/CreatePost";
import OpenModalButton from "../../components/Buttons/OpenModalButton";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainPage = ({navigation}) => {
    const [data, setData] = useState(null);
    const [likes, setLikes] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
 
    const token = useSelector(selector => selector.token)

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchData();
        setTimeout(() => {
        setRefreshing(false);
        }, 2000);
    }, []);

    async function fetchData(){        
        await axios.get(BASE_URL + "post/all-posts", {headers: {"Authorization": `Bearer ${token}`}})
        .then(res => {
            setData(res.data.sort((a,b) => a.createdAt < b.createdAt ? 1 : -1))
        }).catch(err => {
            console.log(err);
            AsyncStorage.removeItem("@TOKEN")
            dispatch({type: NOT_AUTHENTICATED, payload: {token: null, currentUser: null}})
            })
    }

    async function getUserLikes(){
        await axios.get(BASE_URL + "post/like", {headers: {"Authorization": `Bearer ${token}`}})
        .then(res => {
            setLikes(res.data);
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        fetchData();
        getUserLikes();
    }, [])
    useEffect(() => {
        fetchData();
    }, [modalVisible])

    return(
        <SafeAreaView style={MainPageStyle.safeAreaContainer}>
            <OpenModalButton modalVisible={modalVisible} setModalVisible={setModalVisible} />
            <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => {
                setModalVisible(!modalVisible);
            } }>
                <View style={MainPageStyle.centeredView}>
                    <CreatePost modalVisible={modalVisible} setModalVisible={setModalVisible} />
                </View>
            </Modal>
            <View style={MainPageStyle.header}>
                <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}>GÖNDERİLER</Text>
            </View>
            <ScrollView refreshControl={<RefreshControl tintColor="white" refreshing={refreshing} onRefresh={onRefresh} /> }>
                <View style={MainPageStyle.mainContainer}>
                    {data ? data.map(it => {
                        return <Post navigation={navigation} getUserLikes={getUserLikes} item={it} likes={likes} fetchData={fetchData} key={it.post_id} />;
                    }) : null}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


export default MainPage;