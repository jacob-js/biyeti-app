import { View, Text, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';
import NewPurchaseNotif from './Components/NewPurchaseNotif';

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

    useFocusEffect(
        useCallback(() =>{
            getData()

            return () =>{}
        }, [id])
    );

  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        {
            data.notification_type === 'new_purchase' ?
            <NewPurchaseNotif notif={data} /> :null
        }
    </ScrollView>
  )
}

export default NotificationDetails