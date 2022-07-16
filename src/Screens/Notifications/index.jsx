import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import NotificationItem from './Components/NotificationItem';

export default function Notifications() {
    const { data: user } = useSelector(({ users: {currentUser} }) =>currentUser); 
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(true);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const getData = async(page) =>{
        setLoadingMore(true);
        try {
            const res = await axios.get(`/api/v1/notifications?p_size=${pageSize}&p=${page}`);
            setData(data => data.concat(res.data.data?.rows));
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
        setLoadingMore(false);
        setLoading(false)
    }

    useFocusEffect(
        useCallback(() =>{
            getData(page);

            return () => {
            }
        }, [page])
    )

  return (
    <SafeAreaView>
        <FlatList
            renderItem={({ item }) => <NotificationItem item={item} />}
            data={data}
            refreshing={loadingMore}
            onRefresh={() =>{
                getData(page+1)
            }}
        />
    </SafeAreaView>
  )
}