import { View, Text } from 'react-native'
import React from 'react';
import EntyIcon from 'react-native-vector-icons/Entypo'
import { Avatar } from 'native-base';
import styles from './styles';

const CdfCard = () => {
  return (
    <View style={styles.container}>
        <Avatar bg="amber.500">
            <EntyIcon name='wallet' size={25} color="white" />
        </Avatar>
        <View style={styles.right}>
            <View>
                <Text style={styles.title}>Balance</Text>
                <Text style={styles.currency}>CDF</Text>
            </View>
            <View style={styles.balanceBox}>
                <Text style={styles.balance}>300000FC</Text>
            </View>
        </View>
    </View>
  )
}

export default CdfCard