import { View, Text, StyleSheet, ScrollView, Image, RefreshControl, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserTicketsAction } from '../Redux/actions/tickets'
import { useDispatch, useSelector } from 'react-redux';
import AntIcon from 'react-native-vector-icons/AntDesign'
import { theme } from '../../assets/theme';
import { Divider, HStack, VStack } from 'native-base';
import ContentLoader from 'react-native-easy-content-loader';
import BookingDetail from '../Components/BookingDetail';
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
                        <AntIcon name="qrcode" size={35} />
                        <HStack justifyContent="space-between" w="5/6" alignItems="center">
                            <VStack marginLeft="10px">
                                <Text style={styles.name}>{reser?.ticket?.event.name}</Text>
                                <Text style={styles.price}>{reser.ticket?.price}{reser.ticket?.currency?.toLowerCase() === 'usd' ? '$': 'FC'}</Text>
                            </VStack>
                            <Text style={styles.type} numberOfLines={1}>{reser.ticket?.name}</Text>
                        </HStack>
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
        alignItems: 'center',
        padding: 15,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 7
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
    name: {
        color: theme.colors.light,
        fontFamily: 'Barlow',
        textTransform: 'capitalize'
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.gold
    },
    type: {
        fontFamily: 'Barlow',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})