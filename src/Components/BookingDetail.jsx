import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { Divider, Modal } from 'native-base'
import SvgQRCode from 'react-native-qrcode-svg';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import AntIcon from 'react-native-vector-icons/AntDesign'
import { theme } from '../../assets/theme';
import moment from 'moment';

export default function BookingDetail({showModal, setShowModal, booking}) {
    const ticket = booking.ticket || {};
    const event = ticket?.event || {};

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content 
            w={Dimensions.get('window').width * 90 / 100}
            // minH={Dimensions.get('window').height * 90 / 100}
            style={styles.container}
        >
            <Modal.CloseButton />
            <View style={styles.qrContainer}>
                <SvgQRCode value={booking.id} 
                    size={232}
                />
            </View>
            <View style={styles.event}>
                <Text style={styles.eventName}>{event.name}</Text>
                <View style={styles.addressContainer}>
                    <Text style={styles.eventLocation}> <AntIcon name='enviromento' style={styles.icon} /> {event.location}</Text>
                    <Divider orientation='vertical' marginX={1} bg={theme.colors.light100} />
                    <Text style={styles.eventDate}><AntIcon name='calendar' style={styles.icon} /> {moment(event.event_date).format("DD-MM-YYYY | HH:mm")}</Text>
                </View>
            </View>
            <View style={styles.ticket}>
                <Text style={styles.ticketName}>Billet {ticket.name}</Text>
                <Text style={styles.ticketDesc}>{ticket.caption}</Text>
                <Text style={styles.ticketPrice}>{ticket.price} {ticket.currency?.toLowerCase() === 'usd' ? '$': 'Fc'}</Text>
            </View>
        </Modal.Content>
    </Modal>
  )
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        overflow: 'scroll'
    },
    qrContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    event: {
        alignItems: 'center'
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
    ticket: {
        alignItems: 'center',
        marginTop: 5
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
        color: 'black',
        textAlign: 'center'
    },
    ticketPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.gold
    }
})