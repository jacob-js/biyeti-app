import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import AntIcon from 'react-native-vector-icons/AntDesign'
import logo from '../../assets/biyeti512.png'
import { theme } from '../../assets/theme'
import { theme as nbTheme} from 'native-base'
import context from './context'
import { Badge, VStack } from 'native-base'

export default function Header({DrawerNavigation, options, drawerRoute: route}) {
  const { notifCount } = useContext(context);

  return (
    <View style={{ backgroundColor: 'white' }} >
      <View
        style={{
            height: 80,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 40,
            paddingTop: 15,
            backgroundColor: 'white',
            borderBottomStartRadius: 20,
            borderBottomEndRadius: 20,
            shadowColor: theme.colors.light,
            elevation: 5,
            shadowOpacity: 1,
        }}
      >
        {
          route.name === 'Home' ?
          <TouchableOpacity onPress={() => DrawerNavigation.toggleDrawer()}>
            {
              notifCount > 0 ?
              <VStack>
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 100,
                    backgroundColor: nbTheme.colors.danger[600],
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: -5,
                    zIndex: 1,
                    marginRight: -4,
                    alignSelf: 'flex-end'
                  }}
                >
                </View>
                <AntIcon name='appstore-o' size={18} />
              </VStack>:
              <AntIcon name='appstore-o' size={18} />
            }
          </TouchableOpacity>:
          <TouchableOpacity onPress={() => DrawerNavigation.goBack()}>
            <AntIcon name='arrowleft' size={20} />
          </TouchableOpacity>
        }
        <TouchableOpacity onPress={() => DrawerNavigation.navigate('Home')}>
          <Image source={logo} style={{width: 100, height: 100}} />
        </TouchableOpacity>
      </View>
    </View>
  )
}