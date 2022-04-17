import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Divider } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import AntIcon from 'react-native-vector-icons/AntDesign';
import { theme } from '../../assets/theme'

export default function EventCard({event}) {
    const navigation = useNavigation();

  return (
    <View style={styles.eventContainer}>
        <View style={styles.event}>
            <TouchableOpacity style={styles.touchableCover} onPress={() =>navigation.navigate('EventDetail', { eventId: event.id })}>
            <Image source={{ uri: event.cover }} style={styles.eventCover} />
            </TouchableOpacity>
            <View style={styles.eventDetail}>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.eventDescript}>{event.description.substring(0, 100)}{event.description.length > 100 && '...'}</Text>
            <Divider my={2} bg='white' />
            <View style={styles.addressContainer}>
                <Text style={styles.eventLocation}><AntIcon name='enviromento' style={styles.icon} /> {event.location}</Text>
                <Text style={styles.eventDate}><AntIcon name='clockcircleo' style={styles.icon} /> {moment(event.event_date).format('HH:mm')}</Text>
            </View>
            </View>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
    eventContainer: {
        width: Dimensions.get('window').width - 40,
        alignItems: 'center',
    },
    event: {
        backgroundColor: theme.colors.light100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.light100,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        width: '90%',
        marginBottom: 20
    },
    touchableCover: {
        width: '100%'
    },
    eventCover: {
        height: 200,
        width: '100%',
        borderRadius: 10
    },
    eventDetail: {
        width: '100%',
        display: 'flex',
        marginTop: 10,
        alignItems: 'flex-start'
    },
    eventName: {
    fontFamily: 'Barlow-Bold',
    fontSize: 16,
    },
    eventDescript: {
    fontFamily: 'Barlow',
    fontSize: 13,
    },
    addressContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
    },
    icon: {
    fontSize: 18
    },
    eventDate: {
    color: theme.colors.light,
    },
    eventLocation: {
    color: theme.colors.light
    },
})