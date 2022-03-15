import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar } from 'native-base';
import { theme } from '../../assets/theme';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IoIcon from 'react-native-vector-icons/Ionicons';

export default function Dashboard() {
    const options = [
        {
            name: 'Mes evenenements',
            path: 'events',
            icon: <SIcon name='calendar' style={styles.icon} />,
            count: 2
        },
        {
            name: 'Mes billets',
            path: 'Tickets',
            icon: <MatIcon name='ticket' style={styles.icon} />,
            count: 0
        },
        {
            name: 'Mon profile',
            path: 'Profile',
            icon: <SIcon name='user' style={styles.icon} />
        }
    ]
  return (
    <ScrollView style={{  backgroundColor: 'white' }}>
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerBg}>
                </View>
                <View style={styles.user}>
                    <Text style={styles.name}>Merci Jacob</Text>
                    <Text style={styles.email}>mercihabam@gmail.com</Text>
                    <Avatar bg="light.200" 
                        source={{
                            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                        }}
                        style={styles.avatar}
                        size='2xl'
                    >
                        AJ
                    </Avatar>
                </View>
                <Text style={styles.back}><IoIcon name='arrow-back' /></Text>
            </View>
            <View style={styles.content}>
                {
                    options.map((option, index) =>(
                        <TouchableOpacity key={index}>
                            <View style={styles.option}>
                                <View style={styles.iconContainer}>
                                    {option.icon}
                                </View>
                                <Text>{option.name}</Text>
                                {option.count ? <Text style={styles.count}>{option.count}</Text>: null}
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
    container: {
        minHeight: Dimensions.get('window').height,
        backgroundColor: 'white',
        flex: 1
    },
    header: {
        height: 300,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
    },
    headerBg: {
        position: 'absolute',
        bottom: 30,
        width: Dimensions.get('window').width,
        height: 300,
        backgroundColor: theme.colors.default,
        borderBottomStartRadius: 100,
    },
    back: {
        fontSize: 30,
        // color: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 999
    },
    user: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: -20,
    },
    name: {
        fontSize: 25,
        fontFamily: 'Barlow-Bold',
        color: 'white',
    },
    email: {
        fontFamily: 'Barlow',
        color: 'white',
        marginBottom: 10
    },
    content: {
        width: '90%',
        margin: 'auto',
        backgroundColor: 'white',
        padding: 40,
        borderRadius: 20,
        shadowColor: 'gray',
        shadowOpacity: 0.5,
        elevation: 20,
        marginLeft: '5%',
        marginTop: 50
    },
    option: {
        flexDirection: 'row',
        borderColor: theme.colors.light100,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 10,
        borderBottomWidth: 1
    },
    iconContainer: {
        marginRight: 10,
        backgroundColor: theme.colors.light100,
        width: 30,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    count: {
        marginLeft: 5,
        fontFamily: 'Barlow-Bold',
        color: 'white',
        backgroundColor: theme.colors.default,
        fontSize: 12,
        width: 20,
        height: 20,
        borderRadius: 100,
        textAlign: 'center',
    }
});