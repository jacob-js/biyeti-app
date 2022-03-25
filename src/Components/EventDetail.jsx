import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react';
import { theme } from '../../assets/theme';
import EntyIcon from 'react-native-vector-icons/Entypo';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { Divider } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../Redux/actions/events';
import ContentLoader from 'react-native-easy-content-loader';
import moment from 'moment';
import { getTicketsAction } from '../Redux/actions/tickets';

const tickets = [
    {
        name: 'vip',
        price: 100,
        currency: 'usd',
        caption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis cum error repellat odit provident, consectetur repudiandae eveniet? Quisquam repellat, minima voluptas error quam ullam neque repellendus maiores? Commodi, a repellendus.',
    },
    {
        name: 'standard',
        price: 50,
        currency: 'usd',
        caption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis cum error repellat odit provident, consectetur repudiandae eveniet? Quisquam repellat, minima voluptas error quam ullam neque repellendus maiores? Commodi, a repellendus.',
    }
]

export default function EventDetail({route, navigation}) {
    const eventId = route?.params?.eventId;
    const { data: event, loading } = useSelector(({ events: { event } }) => event);
    const { data: tickets, loading: loadingTickets } = useSelector(({ tickets: { tickets } }) => tickets);
    const dispatch = useDispatch();

    const refreshTickets = () =>{
        getTicketsAction(eventId)(dispatch);
    };

    useEffect(() =>{
        getEvent(eventId)(dispatch);
    }, [eventId, navigation]);
    useEffect(() =>{
        (() =>{
            if(event.name){
                refreshTickets();
            }
        })
    }, [event, navigation]);
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                            <TouchableOpacity style={styles.ticket} key={index}>
                                <View style={styles.ticketAvatar}>
                                    {ticket.name === 'vip' ? <Image source={{
                                        uri: "https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-vip-music-festival-flaticons-flat-flat-icons.png"
                                    }} style={styles.vipIcon} /> :
                                        <FaIcon name='ticket-alt' style={styles.ticketIcon} />
                                    }
                                </View>
                                <View style={styles.ticketInfo}>
                                    <Text style={styles.ticketName}>{ticket.name}</Text>
                                    <Text style={styles.ticketDesc}>{ticket.caption}</Text>
                                    <Text style={styles.ticketPrice}>{ticket.price} {ticket.currency === 'usd' ? '$': 'Fc'}</Text>
                                </View>
                            </TouchableOpacity>
                            {
                                index + 1 !== tickets.length && <Divider my={2} mb={-3} />
                            }
                        </View>
                    ))
                }
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    scrollContainer: {
        alignItems: 'center',
        backgroundColor: 'white'
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
        width: 80,
        height: 80,
        backgroundColor: theme.colors.light100,
        borderRadius: 100,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    vipIcon: {
        width: 40,
        height: 40
    },
    ticketIcon: {
        fontSize: 40,
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