import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Divider } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntyIcon from 'react-native-vector-icons/Entypo';
import { theme } from '../../assets/theme'
import { theme as nbTheme } from 'native-base'

export default function EventCard({event}) {
    const navigation = useNavigation();

  return (
    <View style={styles.eventContainer}>
        <TouchableOpacity style={styles.event} onPress={() =>navigation.navigate('EventDetail', { eventId: event.id })}>
            <TouchableOpacity style={styles.touchableCover}>
            <Image source={{ uri: event.cover }} style={styles.eventCover} />
            </TouchableOpacity>
            <View style={styles.eventDetail}>
            <Text style={styles.eventName}>{event.name}</Text>
            <Divider my={2} bg='white' />
            <View style={styles.addressContainer}>
                <Text style={styles.eventLocation} numberOfLines={1}>
                    <EntyIcon 
                        name='location-pin' 
                        style={styles.icon}
                        color={nbTheme.colors.red[600]}
                    />
                    {event.location?.substring(0, 15)}{event.location.length > 15 && '...'}
                </Text>
                <Text style={styles.eventDate}><AntIcon name='clockcircleo' style={styles.icon} /> {moment(event.event_date).fromNow()}</Text>
            </View>
            </View>
        </TouchableOpacity>
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
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        width: '100%',
        marginBottom: 20
    },
    touchableCover: {
        width: '100%'
    },
    eventCover: {
        height: 150,
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
    fontSize: 12
    },
    eventDate: {
        color: theme.colors.light,
        fontSize: 12
    },
    eventLocation: {
        color: theme.colors.light,
        fontSize: 12
    },
})