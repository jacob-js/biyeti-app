import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'
import UsdCard from './components/UsdCard'
import CdfCard from './components/Cdfcard'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/Entypo'
import { theme } from '../../../../../assets/theme'

export default function Wallet() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <UsdCard />
        <CdfCard />
      </ScrollView>
      <View style={styles.bottom}>
        <Button style={styles.btn} _text={{
            color: 'green.600',
            fontFamily: 'Barlow-Bold'
        }} leftIcon={
            <Icon name='upload' size={20} color={theme.colors.default} />
        }>RETIRER</Button>
      </View>
    </SafeAreaView>
  )
}