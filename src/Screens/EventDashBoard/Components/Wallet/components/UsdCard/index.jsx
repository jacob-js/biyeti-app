import { View, Text } from 'react-native'
import React, { useContext } from 'react';
import EntyIcon from 'react-native-vector-icons/Entypo'
import { Avatar, Divider } from 'native-base';
import styles from './styles';
import context from '../../context';

const UsdCard = () => {
    const { wallet } = useContext(context);

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
                <Text style={styles.balance}>{Number(wallet.usd_balance || 0).toFixed(1)}$</Text>
            </View>
        </View>
    </View>
  )
}

export default UsdCard