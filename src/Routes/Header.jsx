import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import AntIcon from 'react-native-vector-icons/AntDesign'
import logo from '../../assets/logo.png'
import { theme } from '../../assets/theme'

export default function Header({DrawerNavigation, options}) {
  return (
    <View style={{ backgroundColor: 'white' }} >
      <View
        style={{
            height: 120,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 40,
            paddingTop: 30,
            backgroundColor: 'white',
            borderBottomStartRadius: 30,
            borderBottomEndRadius: 30,
            shadowColor: theme.colors.light,
            elevation: 35,
            shadowOpacity: 1,
        }}
      >
        <TouchableOpacity onPress={() => DrawerNavigation.toggleDrawer()}>
            <AntIcon name='appstore-o' size={20} />
        </TouchableOpacity>
        <Image source={logo} style={{width: 200, height: 100}} />
      </View>
    </View>
  )
}