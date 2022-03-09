import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import AntIcon from 'react-native-vector-icons/AntDesign'
import logo from '../../assets/logo.png'

export default function Header({DrawerNavigation, options}) {
  return (
    <View
        style={{
            height: 120,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 40,
            paddingTop: 30,
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderBottomStartRadius: 30,
            borderBottomEndRadius: 30
        }}
    >
        <TouchableOpacity onPress={() => DrawerNavigation.toggleDrawer()}>
            <AntIcon name='appstore-o' size={20} />
        </TouchableOpacity>
        <Image source={logo} style={{width: 200, height: 100}} />
    </View>
  )
}