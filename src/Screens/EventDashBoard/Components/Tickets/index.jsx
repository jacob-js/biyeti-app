import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Button, Divider } from 'native-base'
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import AddTicketModal from './AddTicketModal';
import { useDispatch, useSelector } from 'react-redux';
import ContentLoader from 'react-native-easy-content-loader';
import { theme } from '../../../../../assets/theme';

export default function Tickets() {
    const [showModal, setShowModal] = useState(false);
    const { data: tickets, loading } = useSelector(({ tickets: { tickets } }) => tickets);

  return (
    <View style={styles.tickets}>
        {
            loading ?
            <>
                <ContentLoader pRows={1} avatar
                    tWidth={Dimensions.get('window').width * 50 / 100}
                    tHeight={35}
                    titleStyles={styles.skeleton}
                />
                <ContentLoader pRows={1} avatar
                    tWidth={Dimensions.get('window').width * 50 / 100}
                    tHeight={35}
                    titleStyles={styles.skeleton}
                />
            </>:
            tickets?.map((ticket, index) =>(
                <View key={index}>
                    <TouchableOpacity style={styles.ticket} key={index}>
                        <View style={styles.ticketAvatar}>
                            {ticket.name.toLowerCase() === 'vip' ? <Image source={{
                                uri: "https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-vip-music-festival-flaticons-flat-flat-icons.png"
                            }} style={styles.vipIcon} /> :
                                <FaIcon name='ticket-alt' style={styles.ticketIcon} />
                            }
                        </View>
                        <View style={styles.ticketInfo}>
                            <Text style={styles.ticketName}>{ticket.name}</Text>
                            {
                                ticket.caption &&
                                <Text style={styles.ticketDesc}>{ticket.caption}</Text>
                            }
                            {
                                ticket.price <= 0 &&
                                <Text style={styles.ticketPrice}>GRATUIT</Text>
                            }
                            {
                                ticket.price > 0 &&
                                <Text style={styles.ticketPrice}>
                                    {ticket.price} {ticket.currency.toLowerCase() === 'usd' ? '$': 'Fc'}
                                </Text>
                            }
                        </View>
                    </TouchableOpacity>
                    {
                        index + 1 !== tickets.length && <Divider my={3} mb={3} />
                    }
                </View>
            ))
        }
        <Button isLoading={false} 
            isLoadingText={<Text style={{ color: 'white' }}>Patientez...</Text>} 
            style={styles.addBtn} _text={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            leftIcon={<FaIcon name='plus' style={{ color: 'white' }} />}
            onPress={() =>setShowModal(true)}
        >Ajouter</Button>
        <AddTicketModal showModal={showModal} setShowModal={setShowModal} />
    </View>
  )
};

const styles = StyleSheet.create({
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
        paddingHorizontal: 20
    },
    ticket: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
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
        width: 40,
        height: 40
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
        marginTop: 5,
        width: Dimensions.get('window').width * 70 / 100
    },
    ticketPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.gold
    },
    addBtn: {
        height: 50,
        backgroundColor: theme.colors.default100,
        shadowOpacity: 0.4,
        shadowColor: theme.colors.default, 
        elevation: 15,
        borderRadius: 15,
        marginTop: 20
    },
    skeleton: {
        borderRadius: 15
    }
})