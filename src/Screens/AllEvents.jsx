import { View, Text, SafeAreaView, StyleSheet, Dimensions, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import SearchBar from '../Components/SearchBar'
import { Divider } from 'native-base'
import { useDispatch, useSelector } from 'react-redux';
import { clearEventsState, getEvents, getUpcomingEvents } from '../Redux/actions/events';
import ContentLoader from 'react-native-easy-content-loader';
import EventCard from '../Commons/EventCard';
import { theme } from '../../assets/theme';
import { useFocusEffect } from '@react-navigation/native';
import Empty from '../Commons/Empty';

export default function AllEvents({ route }) {
    const { count, rows, loading: loadingEvents, isLoadingMore: loadingMoreEvents } = useSelector(({ events: { events } }) =>events);
    const { rows: upcomingRows, count: upcomingCount, isLoading: loadingUpcoming, isLoadingMore: loadingMoreUpcom } = useSelector(({ events: { upcomingEvents } }) =>upcomingEvents);
    const dispatch = useDispatch();
    const { categId, title, upcoming, order } = route.params;
    const [ offset, setOffet ] = useState(1);
    const limit = 2;
    const [ events, setEvents ] = useState([]);
    const loading = loadingEvents || loadingUpcoming;
    const isLoadingMore = loadingMoreEvents || loadingMoreUpcom;

    const getData = () =>{
        if(categId){
            getEvents(categId, offset, limit)(dispatch);
        }else if(upcoming){
            getUpcomingEvents(offset, limit)(dispatch);
        }else{
            getEvents(null, offset, limit, order)(dispatch);
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

    useFocusEffect(
        useCallback(() =>{
            getData();
        }, [categId, offset, limit])
    );

    useFocusEffect(
        useCallback(() =>{
            (() =>{
                if(!loading){
                    if(upcoming){
                        setEvents(upcomingRows);
                    }else{
                        setEvents(rows)
                    }
                }
            })();

            return () => setEvents([]);
        }, [rows, upcomingRows])
    );

    const onEndReached = () =>{
        const activeSize = offset * limit;
        if(upcoming){
            if(activeSize < upcomingCount){
                if(!loadingUpcoming){
                    setOffet(offset + 1);
                }
            }
        }else{
            if(activeSize < count){
                if(!loading){
                    setOffet(offset + 1);
                }
            }
        }
    };

    const onRefresh = () =>{
        setEvents([]);
        clearEventsState(dispatch);
        if(offset > 1){
            setOffet(1);
        }else{
            getData();
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
            ListFooterComponent={
                isLoadingMore &&
                <ContentLoader pRows={0} pWidth={320} pHeight={200} 
                    active
                    tWidth={Dimensions.get('window').width - 40}
                    tHeight={250}
                    titleStyles={styles.skeleton}
                />  
            }
            onRefresh={onRefresh}
            refreshing={loading}
            data={events}
            renderItem={({ item }) => <EventCard event={item} />}
            onEndReached={onEndReached}
            ListEmptyComponent={<Empty />}
            onEndReachedThreshold={0.2}
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
        marginBottom: 15
    },
    title: {
        fontSize: 16,
        fontFamily: 'Barlow-Bold',
        textTransform: 'uppercase',
        color: theme.colors.light,
    },
    skeleton: {
        borderRadius: 15,
        marginLeft: -10
    }
})