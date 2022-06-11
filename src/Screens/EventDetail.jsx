import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react';
import { theme } from '../../assets/theme';
import EntyIcon from 'react-native-vector-icons/Entypo';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { Divider } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../Redux/actions/events';
import ContentLoader from 'react-native-easy-content-loader';
import moment from 'moment';
import { getTicketsAction, purchaseAction } from '../Redux/actions/tickets';
import PurChasedTicket from '../Components/PurChasedTicket';
import { LoadIndicator } from '../Commons/loaders';
import { MessageAlert } from '../Utils/feedbacks';
import { useFocusEffect } from '@react-navigation/native';

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

            return () =>{}
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

    const onTicketClick = (ticket) =>{
        purchaseAction(ticket)(dispatch, cb =>{
            if(cb){ setShowPurchased(true) }
        })
    };

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            refreshControl={
                <RefreshControl
                    refreshing={loading || loadingTickets}
                    onRefresh={refreshTickets}
                />
            }
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
                    tickets.map((ticket, index) =>(
                        <View key={index}>
                            <TouchableOpacity style={styles.ticket} key={index} onPress={() =>onTicketClick(ticket)}>
                                <View style={styles.ticketAvatar}>
                                    {ticket.name.toLowerCase() === 'vip' ? <Image source={{
                                        uri: "https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-vip-music-festival-flaticons-flat-flat-icons.png"
                                    }} style={styles.vipIcon} /> :
                                        <FaIcon name='ticket-alt' style={styles.ticketIcon} />
                                    }
                                </View>
                                <View style={styles.ticketInfo}>
                                    <Text style={styles.ticketName}>{ticket.name}</Text>
                                    <Text style={styles.ticketDesc}>{ticket.caption}</Text>
                                    <Text style={styles.ticketPrice}>{ticket.price} {ticket.currency.toLowerCase() === 'usd' ? '$': 'Fc'}</Text>
                                </View>
                            </TouchableOpacity>
                            {
                                index + 1 !== tickets.length && <Divider my={2} mb={0} />
                            }
                        </View>
                    ))
                }
            </View>
        </ScrollView>
        {loadingPurchase ? <LoadIndicator />: null}
        <PurChasedTicket isShown={showPurchased} setIsShown={setShowPurchased} />
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
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    eventDate: {
        color: theme.colors.light
    },
    eventLocation: {
        color: theme.colors.light
    },
    icon: {
        fontWeight: 'bold',
        fontSize: 16
    },
    eventDescription: {
        fontFamily: 'Barlow',
        textAlign: 'center'
    },
    ticketsTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginTop: 20
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
        paddingHorizontal: 10
    },
    ticket: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    ticketAvatar: {
        width: 50,
        height: 50,
        backgroundColor: theme.colors.light100,
        borderRadius: 100,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    vipIcon: {
        width: 30,
        height: 30
    },
    ticketIcon: {
        fontSize: 25,
        color: theme.colors.light
    },
    ticketInfo: {
        marginLeft: 10,
        paddingTop: 10
    },
    ticketName: {
        color: theme.colors.light,
        fontFamily: 'Barlow-Bold',
        fontWeight: 'bold',
        fontSize: 15,
        textTransform: 'uppercase'
    },
    ticketDesc: {
        fontFamily: 'Barlow',
        paddingRight: 20,
        marginTop: 5
    },
    ticketPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.gold
    },
    skeleton: {
        borderRadius: 15
    }
})