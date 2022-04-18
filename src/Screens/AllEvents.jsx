import { ScrollView, View, Text, SafeAreaView, StyleSheet, Dimensions, RefreshControl, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import SearchBar from '../Components/SearchBar'
import { Divider } from 'native-base'
import { useDispatch, useSelector } from 'react-redux';
import { clearEventsState, getEvents } from '../Redux/actions/events';
import ContentLoader from 'react-native-easy-content-loader';
import EventCard from '../Components/EventCard';
import { theme } from '../../assets/theme';
import { useFocusEffect } from '@react-navigation/native';

export default function AllEvents({ route }) {
    const { data, count, rows, loading, error } = useSelector(({ events: { events } }) =>events);
    const dispatch = useDispatch();
    const { categId, title } = route.params;
    const [ offset, setOffet ] = useState(1);
    const limit = 2;
    const [ events, setEvents ] = useState([]);

    const getData = () =>{
        if(categId){
            getEvents(categId, offset, limit)(dispatch);
        }else{
            getEvents(null, offset, limit)(dispatch);
        }
    }

    useFocusEffect(
        useCallback(() => {
            setEvents([]);
          return () => {
            clearEventsState(dispatch);
            setOffet(1);
          };
        }, [])
    );

    useEffect(() =>{
        getData();
    }, [categId, offset, limit]);

    useEffect(() =>{
        (() =>{
            if(!loading){
                setEvents(rows)
            }
        })()
    }, [rows])

    const onEndReached = () =>{
        const activeSize = offset * limit;
        if(activeSize < count){
            if(!loading){
                setOffet(offset + 1);
                setEvents([...events, ...rows]);
            }
        }
    }

  return (
    <SafeAreaView style={styles.container}>
            
        <FlatList
            contentContainerStyle={styles.scrollViewContainer}
            ListHeaderComponent={
                <>
                    <SearchBar />
                    <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                        <Divider my={2} />
                    </View>
                </>
            }
            onRefresh={getData}
            refreshing={loading}
            data={events}
            renderItem={({ item }) => <EventCard event={item} />}
            onEndReached={onEndReached}
            onEndReachedThreshold={0}
            keyExtractor={(item) => item.id}
        />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center'
    },
    loadingsContainer: {
        paddingLeft: Dimensions.get('window').width * 7 / 100,
    },
    scrollViewContainer: {
        width: Dimensions.get('window').width,
        padding: 20
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 10
    },
    title: {
        fontFamily: 'Barlow',
        fontWeight: 'bold',
        fontSize: 16,
        textTransform: 'uppercase',
        color: theme.colors.light
    },
    skeleton: {
        borderRadius: 15
    }
})