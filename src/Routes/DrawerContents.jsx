import React from "react";
import {
    Avatar,
    Caption,
    Drawer,
    Text,
} from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import {theme} from "../../assets/theme";

const menus = [
    {
        name: 'Tableau de bord',
        path: 'dashboard',
        icon: 'dashboard'
    },
    {
        name: 'Notifications',
        path: 'notifications',
        icon: 'bells'
    },
    {
        name: 'A propos',
        path: 'about',
        icon: 'info'
    },
    {
        name: 'FAQ',
        path: 'faq',
        icon: 'question'
    }
]

export function DrawerContents({drawer, stack}){
    const { navigation: stackNavigation } = stack;

    return(
        <View style={style.drawer}>
                <View style={style.content}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 20
                    }}>
                        <View style={style.userInfo}>
                            <Text style={style.userAvatar}>MJ</Text>
                        </View>
                        <View style={style.userDetails}>
                            <Text style={{ fontSize: 15 }}> Merci Jacob </Text>
                            <Caption style={{ fontSize: 12 }}> mercihabam@gmail.com </Caption>
                        </View>
                    </View>
                    <View style={style.menus}>
                        {
                            menus.map(menu =>(
                                <TouchableOpacity onPress={() => {navigation.navigate(menu.path); navigation.closeDrawer()}} key={menu.name} style={style.menu}>
                                    <AntdIcon name={menu.icon} size={16} />
                                    <Text style={style.menuName}> {menu.name}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>

            <Drawer.Section style={style.bottomDrawerSecion}>
                <TouchableOpacity style={style.logout}>
                    <View><AntdIcon name='logout' color='#be123c' size={16} /></View>
                    <Text style={{ paddingLeft: 20, color: '#be123c' }} onPress={() =>stackNavigation.navigate('Login')}>Deconexion</Text>
                </TouchableOpacity>
            </Drawer.Section>
        </View>
    )
};

const style = StyleSheet.create({
    drawer: {
        flex: 1,
        color: 'white'
    },
    content: {
        flex: 1,
        display: 'flex',
        marginTop: 50
    },
    bottomDrawerSecion: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        paddingLeft: 20,
        paddingVertical: 20,
        marginRight: 20
    },
    userInfo: {
        width: 80,
        height: 80,
        borderRadius: 80,
        backgroundColor: 'black',
        justifyContent: 'center',
        textAlign: 'center'
    },
    userAvatar: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: theme.colors.default
    },
    userDetails: {
        display: 'flex',
        fontSize: 14,
        fontWeight: 'normal',
        marginTop: 10,
        marginLeft: 10
    },
    logout: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 15,
        backgroundColor: '#f4f4f4',
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    menu: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    menus: {
        paddingHorizontal: 20,
        marginTop: 50
    },
    menuName: {
        fontSize: 15,
        marginLeft: 20,
        color: 'rgba(0,0,0,0.5)'
    }
})