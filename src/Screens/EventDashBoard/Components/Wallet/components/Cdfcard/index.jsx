import { View, Text } from 'react-native'
import React, { useContext } from 'react';
import EntyIcon from 'react-native-vector-icons/Entypo'
import { Avatar } from 'native-base';
import styles from './styles';
import context from '../../context';

const CdfCard = () => {
    const { wallet } = useContext(context);

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
                <Text style={styles.balance}>{Number(wallet.cdf_balance || 0).toFixed(0)}FC</Text>
            </View>
        </View>
    </View>
  )
}

export default CdfCard