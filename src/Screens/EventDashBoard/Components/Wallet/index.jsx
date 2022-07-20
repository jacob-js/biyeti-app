import { View, Text, SafeAreaView, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import styles from './styles'
import UsdCard from './components/UsdCard'
import CdfCard from './components/Cdfcard'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/Entypo'
import { theme } from '../../../../../assets/theme'
import WithdrawForm from './components/WithdrawForm'
import Context from './context'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'

export default function Wallet({route}) {
    const [showForm, setShowForm] = useState(false);
    const [wallet, setWallet] = useState({});
    const [loading, setLoading] = useState(true);
    const event = route.params?.event;

    const getData = async () =>{
        setLoading(true);
        try {
            const res = await axios.get(`/api/v1/wallets/${event.id}`);
            setWallet(res.data.data);
        } catch (error) {
        }
        setLoading(false)
    };

    useFocusEffect(
        useCallback(() =>{
            getData();

            return () => {}
        }, [event])
    )

  return (
    <SafeAreaView style={styles.container}>
      <Context.Provider
        value={{
            event,
            wallet
        }}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContainer}
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getData} />
            }
        >
            <UsdCard />
            <CdfCard />
        </ScrollView>
        <View style={styles.bottom}>
            <Button style={styles.btn} _text={{
                color: 'green.600',
                fontFamily: 'Barlow-Bold'
            }} 
            onPress={() => setShowForm(true)}
            leftIcon={
                <Icon name='upload' size={20} color={theme.colors.default} />
            }>RETIRER</Button>
        </View>
        <WithdrawForm isOpen={showForm} setIsOpen={setShowForm} />
      </Context.Provider>
    </SafeAreaView>
  )
}