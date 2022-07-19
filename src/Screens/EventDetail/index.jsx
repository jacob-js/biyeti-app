import { View, Image, ScrollView, StyleSheet, Dimensions, SafeAreaView, RefreshControl, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react';
import { theme } from '../../../assets/theme';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { Divider } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../../Redux/actions/events';
import ContentLoader from 'react-native-easy-content-loader';
import moment from 'moment';
import { getTicketsAction } from '../../Redux/actions/tickets';
import PurChasedTicket from '../../Components/PurChasedTicket';
import { LoadIndicator } from '../../Commons/loaders';
import { MessageAlert } from '../../Utils/feedbacks';
import { useFocusEffect } from '@react-navigation/native';
import Tickets from './components/Tickets';
import Context from './context';

export default function EventDetail({route, navigation}) {
    const eventId = route?.params?.eventId;
    const { data: event, loading } = useSelector(({ events: { event } }) => event);
    const { data: tickets, loading: loadingTickets } = useSelector(({ tickets: { tickets } }) => tickets);
    const { loading: loadingPurchase, error: purchaseError } = useSelector(({ tickets: { purchase } }) => purchase);
    const dispatch = useDispatch();
    const [ showPurchased, setShowPurchased ] = useState(false);
    const [ isError, setIsError ] = useState(false);

    const refreshTickets = () =>{
        getTicketsAction(eventId)(dispatch);
        getEvent(eventId)(dispatch);
        setIsError(false);
    };

    useEffect(() =>{
        refreshTickets();
    }, [eventId, navigation]);

    useFocusEffect(
        useCallback(() =>{
            refreshTickets();

            return () => null;
        }, [eventId, navigation])
    );

    useFocusEffect(
        useCallback(() =>{
            (() =>{
                if(purchaseError) {setIsError(true)}else{
                    setIsError(false);
                }
            })();

            return () => setIsError(false);
        }, [purchaseError, navigation])
    );

  return (
    <SafeAreaView style={styles.container}>
        <Context.Provider
            value={{
                showPurchased,
                setShowPurchased
            }}
        >
        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            refreshControl={
                <RefreshControl
                    refreshing={loading || loadingTickets}
                    onRefresh={refreshTickets}
                />
            }
            scrollEventThrottle={16}
        >
            {
                loading ?
                <ContentLoader pRows={0} pWidth={320} pHeight={200} 
                active
                tWidth={Dimensions.get('window').width - 80}
                tHeight={250}
                titleStyles={styles.skeleton}
                />:
                <Image source={{ uri: event.cover }} style={styles.cover} />
            }
            <Text style={styles.eventName}>{event.name}</Text>
            <View style={styles.addressContainer}>
                <Text style={styles.eventLocation}> <AntIcon name='enviromento' style={styles.icon} /> {event.location}</Text>
                <Divider orientation='vertical' marginX={1} bg={theme.colors.light100} />
                <Text style={styles.eventDate}><AntIcon name='calendar' style={styles.icon} /> {moment(event.event_date).format("DD-MM-YYYY | HH:mm")}</Text>
            </View>
            <Divider my={2} />
            {
                loading ?
                <ContentLoader pRows={2} pWidth={Dimensions.get('window').width * 80 / 100} pHeight={20} 
                active
                tWidth={Dimensions.get('window').width * 50 / 100}
                tHeight={35}
                titleStyles={styles.skeleton}
                />:
                <>
                <Text style={styles.eventDescription}>{event.description}</Text>
                {
                    isError && 
                    typeof(purchaseError) === 'string' ? <MessageAlert msg={purchaseError} onClose={() =>setIsError(false)} />:
                    isError && purchaseError?.length && <MessageAlert msg={purchaseError[0]} onClose={() =>setIsError(false)} />
                }
                <View style={styles.ticketsTitle}>
                    <Text style={styles.title}>Billets</Text><Divider />
                </View>
                </>
            }
            <View style={styles.tickets}>
                {
                    loadingTickets ?
                    <>
                        <ContentLoader pRows={1} avatar
                            tWidth={Dimensions.get('window').width * 50 / 100}
                            tHeight={35}
                            titleStyles={styles.skeleton}
                        />
                    </>:
                    !tickets || tickets?.length <= 0 ?
                    <View style={styles.empty}>
                        <MatIcon name='flask-empty-off-outline' style={styles.emptyIcon} />
                        <Text style={styles.descript}>Aucun billet disponible pour le moment</Text>
                    </View>:
                    <Tickets tickets={tickets} />
                }
            </View>
        </ScrollView>
        {loadingPurchase ? <LoadIndicator />: null}
        <PurChasedTicket isShown={showPurchased} setIsShown={setShowPurchased} />
        </Context.Provider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20
    },
    cover: {
        width: '100%',
        height: 250,
        borderRadius: 20
    },
    eventName: {
        fontFamily: 'Barlow-Bold',
        fontSize: 25,
        marginTop: 20,
    },
    addressContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    eventDate: {
        width: '40%',
        color: theme.colors.light,
        marginLeft: 10,
    },
    eventLocation: {
        color: theme.colors.light,
        width: '50%',
        textAlign: 'center'
    },
    icon: {
        fontWeight: 'bold',
        fontSize: 16
    },
    eventDescription: {
        fontFamily: 'Barlow',
        textAlign: 'center'
    },
    skeleton: {
        borderRadius: 15
    },
    title: {
        marginRight: 10,
        fontFamily: 'Barlow-Bold',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 18,
        marginBottom: 5
    },
    tickets: {
        width: '100%'
    },
    ticketsTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginTop: 20
    },
    empty: {
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyIcon: {
        fontSize: 30,
        color: theme.colors.light
    },
    descript: {
        fontFamily: 'Barlow',
        fontSize: 12,
        color: theme.colors.light
    }
})