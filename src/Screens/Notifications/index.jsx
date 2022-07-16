import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import NotificationItem from './Components/NotificationItem';

export default function Notifications() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(true);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const request = async(p=page) =>{
        return await axios.get(`/api/v1/notifications?p_size=${pageSize}&p=${p}`)
    }

    const getData = async(page) =>{
        setLoadingMore(true);
        try {
            const res = await request();
            setData(res.data.data?.rows);
            setCount(res.data.data?.count)
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
    );

    const onRefresh = () =>{
        setData([]);
        if(page > 1){
            setPage(1);
        }else{
            getData(page);
        }
    };

    const onEndReached = async() =>{
        const activeSize = page * pageSize;
        if(activeSize < count){
            if(!loading){
                setPage(page + 1);
                setLoadingMore(true)
                request(page).then(res =>{
                    setData(d => d.concat(res.data.data?.rows));
                    setCount(res.data.data?.count);
                    setLoadingMore(false)
                })
            }
        }
    }

  return (
    <SafeAreaView>
        <FlatList
            renderItem={({ item }) => <NotificationItem item={item} />}
            data={data}
            refreshing={loadingMore}
            onRefresh={onRefresh}
            onEndReached={onEndReached}
        />
    </SafeAreaView>
  )
}