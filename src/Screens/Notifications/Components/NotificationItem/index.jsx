import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar } from 'native-base'
import succesIcon from '../../icons/succes.png';
import styles from './styles';
import moment from 'moment';

const NotificationItem = ({item}) => {
  return (
    <TouchableOpacity style={[styles.container, item.status === 'unread' && styles.unread]}>
      {
        item.notification_type === 'new_purchase' ?
        <Avatar
            source={succesIcon}
        />:
        item.notif_type === 'faillure' ?
        <Avatar></Avatar>:
        <Avatar></Avatar>
      }
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body} numberOfLines={1}>{item.body}</Text>
        <Text style={styles.date}> {moment(item.created_at).add(1, 'day') < moment() ?moment(item.created_at).format('dd-mm HH:mm'): moment(item.created_at).fromNow()} </Text>
      </View>
    </TouchableOpacity>
  )
}

export default NotificationItem