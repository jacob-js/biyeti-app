import { View, Text, ScrollView, SafeAreaView, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';
import NewPurchaseNotif from './Components/NewPurchaseNotif';
import PurchaseErrorNotif from './Components/PurchaseErrorNotif';

const NotificationDetails = ({route}) => {
    const id = route.params.id
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const getData = async() =>{
        try {
            const res = await axios.get(`/api/v1/notifications/${id}`);
            setData(res.data.data)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    };

    const markAsRead = async() =>{
        try {
            await axios.put(`/api/v1/notifications/${id}`);
        } catch (error) {
        }
    }

    useFocusEffect(
        useCallback(() =>{
            getData()

            return () =>{}
        }, [id])
    );

    useFocusEffect(
        useCallback(() =>{
            if(data && data.status === 'unread'){
                markAsRead()
            }

            return () =>{}
        }, [data])
    );

  return (
    <SafeAreaView style={{
        flex: 1,
        backgroundColor: 'white'
    }}>
        <ScrollView contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getData} />
            }
        >
            {
                data.notification_type === 'new_purchase' ?
                <NewPurchaseNotif notif={data} /> :
                data.notification_type === 'purchase_error' ?
                <PurchaseErrorNotif notif={data} /> :null
            }
        </ScrollView>
    </SafeAreaView>
  )
}

export default NotificationDetails