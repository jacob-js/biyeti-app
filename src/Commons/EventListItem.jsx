import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import EntyIcon from 'react-native-vector-icons/Entypo';
import { theme } from '../../assets/theme'
import { theme as nbTheme } from 'native-base'
import { useNavigation } from '@react-navigation/native';

const EventListItem = ({event}) => {
    const navigation = useNavigation();
    
  return (
    <TouchableOpacity style={styles.container}
    onPress={() =>navigation.navigate('EventDetail', { eventId: event.id })}
    >
        <Image source={{ uri: event.cover }} style={styles.cover} />
        <View style={styles.detail}>
            <Text style={styles.name}>{event.name}</Text>
            <Text style={styles.location} numberOfLines={1}>
                <EntyIcon 
                        name='location-pin' 
                        style={styles.icon}
                        color={nbTheme.colors.red[600]}
                />{event.location?.substring(0, 20)}{event.location.length > 20 && '...'}
            </Text>
        </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: theme.colors.light100,
        padding: 5,
        borderRadius: 10,
    },
    cover: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    detail: {
        marginLeft: 10
    },
    name: {
        fontFamily: 'Barlow-Bold',
        fontSize: 14,
    },
    location: {
        color: theme.colors.light,
        fontSize: 12,
        fontFamily: 'Barlow'
    }
});

export default EventListItem