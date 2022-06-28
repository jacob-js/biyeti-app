import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Icon, Input } from 'native-base'
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import { theme } from '../../assets/theme';
import { useNavigation } from '@react-navigation/native';

export default function SearchBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.searchView}>
        <Input variant="rounded" style={styles.search} bg='rgba(0,0,0,0.1)' 
          height="40px"
          onFocus={() => navigation.navigate('Search')}
          paddingLeft={5} placeholder="Rechercher un événement" leftElement={
        <Icon as={EvilIcon} name='search' style={{ marginLeft: 10 }} size="6" color='light.400' />
        } _focus={{ borderColor: theme.colors.default100, backgroundColor: 'white' }} />
    </View>
  )
}

const styles = StyleSheet.create({
    searchView: {
        marginBottom: 20
    }
})