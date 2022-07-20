import { View, Text } from 'react-native'
import React from 'react';
import EntyIcon from 'react-native-vector-icons/Entypo'
import { Avatar, Divider } from 'native-base';
import styles from './styles';

const UsdCard = () => {
  return (
    <View style={styles.container}>
        <Avatar bg="blue.600">
            <EntyIcon name='wallet' size={25} color="white" />
        </Avatar>
        <View style={styles.right}>
            <View>
                <Text style={styles.title}>Balance</Text>
                <Text style={styles.currency}>USD</Text>
            </View>
            <View style={styles.balanceBox}>
                <Text style={styles.balance}>300$</Text>
            </View>
        </View>
    </View>
  )
}

export default UsdCard