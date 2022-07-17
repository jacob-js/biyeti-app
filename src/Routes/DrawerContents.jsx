import React, { useContext } from "react";
import {
    Drawer,
    Text,
} from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import {theme} from "../../assets/theme";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../Redux/actions/auth";
import { Avatar, Badge, VStack } from "native-base";
import SIcon from 'react-native-vector-icons/SimpleLineIcons'
import context from "./context";

const menus = [
    {
        name: 'Profile',
        path: 'Dashboard',
        icon: 'user'
    },
    {
        name: 'Notifications',
        path: 'Notifications',
        icon: 'bells',
        key: 'notif'
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
    const { navigation: drawerNavigation } = drawer;
    const dispatch = useDispatch();
    const { notifCount } = useContext(context);
    const { data: user } = useSelector(({ users: {currentUser} }) =>currentUser); 
    const userAcronym = user.firstname.charAt(0) + user.lastname.charAt(0);

    return(
        <View style={style.drawer}>
                <View style={style.content}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 20
                    }}>
                        <View style={style.userInfo}>
                            <Avatar bg="light.200" 
                                source={user.avatar &&{
                                    uri: user.avatar
                                }}
                                size='24'
                                borderColor='#fff'
                                borderWidth={2}
                            >
                                <SIcon name='user' size={50} color="gray" />
                            </Avatar>
                        </View>
                        <View style={style.userDetails}>
                            <Text style={{ fontSize: 15, fontFamily: 'Barlow', fontWeight: 'bold' }}> {user.firstname} {user.lastname} </Text>
                            <Text style={{ fontSize: 12, fontFamily: 'Barlow' }}> {user.email} </Text>
                        </View>
                    </View>
                    <View style={style.menus}>
                        {
                            menus.map(menu =>(
                                <TouchableOpacity onPress={() => {stackNavigation.navigate(menu.path); drawerNavigation.closeDrawer()}} key={menu.name} style={style.menu}>
                                    {
                                        menu.key === 'notif' ?
                                        <VStack>
                                            {
                                                notifCount > 0 &&
                                                <Badge colorScheme="danger"
                                                rounded="full" mb={-2} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
                                                    fontSize: 12
                                                }}    
                                            > 
                                            <Text>{notifCount} </Text>
                                            </Badge>}
                                            <AntdIcon name={menu.icon} size={16} />
                                        </VStack>
                                        :
                                        <AntdIcon name={menu.icon} size={16} />
                                    }
                                    <Text style={style.menuName}> {menu.name}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>

            <Drawer.Section style={style.bottomDrawerSecion}>
                <TouchableOpacity style={style.logout} onPress={() =>logoutAction(dispatch, stackNavigation)}>
                    <View><AntdIcon name='logout' color='#be123c' size={16} /></View>
                    <Text style={{ paddingLeft: 20, color: '#be123c' }}>Deconexion</Text>
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
        justifyContent: 'center',
        textAlign: 'center'
    },
    userDetails: {
        display: 'flex',
        fontSize: 14,
        fontWeight: 'normal',
        marginTop: 10,
        marginLeft: 5,
        paddingRight: 15
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