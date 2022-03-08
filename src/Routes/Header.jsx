import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import AntIcon from 'react-native-vector-icons/AntDesign'
import logo from '../../assets/Bookit.png'

export default function Header({navigation, options}) {
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
            backgroundColor: 'rgba(0,0,0,0.05)',
        }}
    >
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <AntIcon name='appstore-o' size={20} />
        </TouchableOpacity>
        <Image source={logo} style={{width: 160, height: 80}} />
    </View>
  )
}