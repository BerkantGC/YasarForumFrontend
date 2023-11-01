import React, { useEffect, useState } from "react";
import {Modal, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";
import { MainPageStyle } from "./MainPageStyle";
import Post from "../../components/Post";

import axios from "axios";
import { BASE_URL } from "../../utilites/BaseURL";

import AsyncStorage from "@react-native-async-storage/async-storage";
import CreatePost from "../../components/CreatePost";
import OpenModalButton from "../../components/Buttons/OpenModalButton";

const MainPage = () => {
    const [data, setData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
 
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
        setRefreshing(false);
        }, 2000);
    }, []);

    async function fetchData(){
        const token = await AsyncStorage.getItem("@TOKEN");
        
        await axios.get(BASE_URL + "post/all-posts", {headers: {"Authorization": `Bearer ${token}`}})
        .then(res => {
            setData(res.data)
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        fetchData();
    }, [])

    return(
        <SafeAreaView style={MainPageStyle.safeAreaContainer}>
            <OpenModalButton modalVisible={modalVisible} setModalVisible={setModalVisible} />
            <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => {
                setModalVisible(!modalVisible);
            } }>
                <View style={MainPageStyle.centeredView}>
                    <CreatePost  modalVisible={modalVisible} setModalVisible={setModalVisible} />
                </View>
            </Modal>
            <ScrollView refreshControl={<RefreshControl tintColor="white" refreshing={refreshing} onRefresh={onRefresh} /> }>
                <View style={MainPageStyle.mainContainer}>
                    {data ? data.map(it => {
                        return <Post item={it} key={it.post_id} />;
                    }) : null}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


export default MainPage;