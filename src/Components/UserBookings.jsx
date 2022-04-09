import { View, Text, StyleSheet, ScrollView, Image, RefreshControl, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserTicketsAction } from '../Redux/actions/tickets'
import { useDispatch, useSelector } from 'react-redux';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import AntIcon from 'react-native-vector-icons/AntDesign'
import { theme } from '../../assets/theme';
import { Divider } from 'native-base';
import moment from 'moment';
import ContentLoader from 'react-native-easy-content-loader';
import BookingDetail from './BookingDetail';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function UserBookings({navigation}) {
    const { data: user } = useSelector(({ users: {currentUser} }) =>currentUser);
    const { data, loading } = useSelector(({ tickets: {userTickets} }) =>userTickets);
    const dispatch = useDispatch();
    const [showDetail, setShowDetail] = useState(false);
    const [toShow, setToshow] = useState({});

    const getData = () =>{
        getUserTicketsAction(user.id)(dispatch);
    }

    useEffect(() =>{
        getData()
    }, [dispatch, user, navigation]);

  return (
    <View style={styles.container}>
        {
            data.length <= 0 && !loading ?
            <View style={styles.empty}>
                <MatIcon name='sticker-outline' style={styles.emptyIcon} />
                <Text style={styles.descript}>Vous n'avez aucune réservation</Text>
            </View>:null
        }
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={getData}
                />
            }
        >
            {
                loading ?
                <>
                    <ContentLoader pRows={1} avatar
                        tWidth={Dimensions.get('window').width * 80 / 100}
                        tHeight={35}
                        titleStyles={{ borderRadius: 10 }}
                        active
                    />
                    <ContentLoader pRows={1} avatar
                        tWidth={Dimensions.get('window').width * 80 / 100}
                        tHeight={35}
                        titleStyles={{ borderRadius: 10 }}
                        active
                    />
                    <ContentLoader pRows={1} avatar
                        tWidth={Dimensions.get('window').width * 80 / 100}
                        tHeight={35}
                        titleStyles={{ borderRadius: 10 }}
                        active
                    />
                </>:
                data.map((reser, index) =>(
                    <TouchableOpacity 
                        key={index} style={styles.ticket}
                        onPress={() =>{setShowDetail(true); setToshow(reser)}}
                    >
                        <View style={styles.ticketAvatar}>
                            {reser.ticket?.name.toLowerCase() === 'vip' ? <Image source={{
                                uri: "https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-vip-music-festival-flaticons-flat-flat-icons.png"
                            }} style={styles.vipIcon} /> :
                                <FaIcon name='ticket-alt' style={styles.ticketIcon} />
                            }
                        </View>
                        <View style={styles.eventInfo}>
                            <Text style={styles.eventName}> {reser?.ticket?.event.name} </Text>
                            <View style={styles.addressContainer}>
                                <Text style={styles.eventLocation}> <AntIcon name='enviromento' style={styles.icon} />
                                    {reser?.ticket?.event.location}
                                </Text>
                                <Divider orientation='vertical' marginX={1} bg={theme.colors.light100} />
                                <Text style={styles.eventDate}><AntIcon name='calendar' style={styles.icon} />
                                    {moment(reser?.ticket?.event.event_date).format("DD-MM-YYYY | HH:mm")}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
        <BookingDetail showModal={showDetail} setShowModal={setShowDetail} booking={toShow} />
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.light100,
        padding: 20
    },
    empty: {
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyIcon: {
        fontSize: 50,
        color: theme.colors.light100
    },
    descript: {
        fontFamily: 'Barlow',
        color: theme.colors.light,
    },
    ticket: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 10
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
    ticketPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.gold
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
})