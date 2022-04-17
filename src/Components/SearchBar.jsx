import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Icon, Input } from 'native-base'
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import { theme } from '../../assets/theme';

export default function SearchBar() {
  return (
    <View style={styles.searchView}>
        <Input variant="rounded" style={styles.search} bg='rgba(0,0,0,0.1)' paddingLeft={5} placeholder="Rechercher un événement" rightElement={
        <Icon as={EvilIcon} name='search' style={{ marginRight: 10 }} size="8" color='light.300' />
        } _focus={{ borderColor: theme.colors.default100, backgroundColor: 'white' }} />
    </View>
  )
}

const styles = StyleSheet.create({
    searchView: {
        marginBottom: 20
    }
})