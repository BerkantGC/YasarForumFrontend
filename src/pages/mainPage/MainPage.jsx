import React, { useEffect, useState } from "react";
import {Modal, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";
import { MainPageStyle } from "./MainPageStyle";
import Post from "../../components/Post";

import axios from "axios";
import { BASE_URL } from "../../utilites/BaseURL";

import CreatePost from "../../components/CreatePost";
import OpenModalButton from "../../components/Buttons/OpenModalButton";
import { useSelector } from "react-redux";

const MainPage = ({navigation}) => {
    const [data, setData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
 
    const [refreshing, setRefreshing] = React.useState(false);

    const token = useSelector(selector => selector.token)

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
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        fetchData();
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
                <Text style={{fontSize: 30, color: 'white'}}>GÖNDERİLER</Text>
            </View>
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