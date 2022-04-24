import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { Avatar, Divider } from 'native-base';
import { theme } from '../../assets/theme';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IoIcon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux';
import { getAgentsAction } from '../Redux/actions/agents';
import { getUserTicketsAction } from '../Redux/actions/tickets';
import moment from 'moment';

export default function Dashboard({navigation}) {
    const dispatch = useDispatch();
    const { data: user } = useSelector(({ users: {currentUser} }) =>currentUser); 
    const { count: eventCount } = useSelector(({ agents: { agents }}) => agents);
    const { data: tickets } = useSelector(({ tickets: {userTickets} }) =>userTickets);

    useEffect(() =>{
        getAgentsAction(user.id)(dispatch, navigation);
        getUserTicketsAction(user.id)(dispatch);
    }, [navigation, user]);

  return (
    <ScrollView style={{  backgroundColor: 'white' }}>
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <AntIcon name='arrowleft' style={styles.topIcon} onPress={() => navigation.goBack()} />
                    <Text style={[styles.title]}>Profile</Text>
                    <MatIcon name='account-edit-outline' style={styles.topIcon} onPress={() => navigation.navigate('EditProfile')} />
                </View>
                <View style={styles.user}>
                    <Avatar bg="white" 
                        source={user.avatar &&{
                            uri: user.avatar
                        }}
                        style={styles.avatar}
                        size='24'
                        borderColor='#fff'
                        borderWidth={2}
                    >
                        <SIcon name='user' size={50} color="gray" />
                    </Avatar>
                    <Text style={styles.name}>{user.firstname} {user.lastname}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                </View>
                <View style={styles.userData}>
                    <TouchableOpacity style={styles.userDataItem} onPress={() =>navigation.navigate('UserBookings')}>
                        <MatIcon name='sticker-outline' style={styles.dataIcon} />
                        <View style={styles.dataTitle}>
                            <Text style={styles.dataCount}>{tickets.length}</Text>
                            <Text style={[theme.textDefault, styles.itemText]}>Réservation{tickets.length > 1 ? 's': ''}</Text>
                        </View>
                    </TouchableOpacity>
                    <Divider bg='light.400' orientation="vertical" marginX={2} />
                    <TouchableOpacity style={styles.userDataItem} onPress={() =>navigation.navigate('DashboardEvents')}>
                        <SIcon name='calendar' style={styles.dataIcon} />
                        <View style={styles.dataTitle}>
                            <Text style={styles.dataCount}>{eventCount}</Text>
                            <Text style={[theme.textDefault, styles.itemText]}>Evénement{eventCount > 1 ? 's': ''}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.fields}>
                <View style={styles.field}>
                    <View style={styles.fieldTitle}>
                        <AntIcon name='mobile1' style={styles.fieldIcon} />
                        <Text style={[styles.fieldLabel, theme.textDefault]}>Téléphone</Text>
                    </View>
                    <Text style={[styles.fieldValue, theme.textDefault]}>{user.phone_number || 'Non définie'}</Text>
                </View>
                <Divider my={5} />

                <View style={styles.field}>
                    <View style={styles.fieldTitle}>
                        <FIcon name='user-o' style={styles.fieldIcon} />
                        <Text style={[styles.fieldLabel, theme.textDefault]}>Sexe</Text>
                    </View>
                    <Text style={[styles.fieldValue, theme.textDefault]}>{user.gender || 'Non définie'}</Text>
                </View>
                <Divider my={5} />

                <View style={styles.field}>
                    <View style={styles.fieldTitle}>
                        <SIcon name='location-pin' style={styles.fieldIcon} />
                        <Text style={[styles.fieldLabel, theme.textDefault]}>Ville</Text>
                    </View>
                    <Text style={[styles.fieldValue, theme.textDefault]}>{user.city || 'Non définie'}</Text>
                </View>
                <Divider my={5} />

                <View style={styles.field}>
                    <View style={styles.fieldTitle}>
                        <SIcon name='calendar' style={styles.fieldIcon} />
                        <Text style={[styles.fieldLabel, theme.textDefault]}>Date de naissance</Text>
                    </View>
                    <Text style={[styles.fieldValue, theme.textDefault]}>
                        {user.date_of_birth ? moment(user.date_of_birth).format('DD-MM-YYYY') : 'Non définie'}
                    </Text>
                </View>
            </View>
        </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    header: {
        height: 320,
        position: 'relative',
        backgroundColor: theme.colors.light,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        paddingTop: 10
    },
    headerTop: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    topIcon: {
        fontSize: 23,
        color: 'white'
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Barlow-Bold'
    },
    user: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    name: {
        fontSize: 18,
        fontFamily: 'Barlow-Bold',
        color: 'white',
    },
    email: {
        fontFamily: 'Barlow',
        color: 'white',
        marginBottom: 10
    },
    userData: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    userDataItem: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    dataTitle: {
        flexDirection: 'row',
    },
    itemText: {
        color: 'white',
    },
    dataCount: {
        color: 'white',
        marginRight: 5
    },
    dataIcon: {
        color: 'white',
        fontSize: 16
    },
    divider: {
        color: theme.colors.light100,
    },
    fields: {
        padding: 30
    },
    fieldTitle: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center'
    },
    fieldIcon: {
        marginRight: 10,
        fontSize: 16
    },
    fieldLabel: {
        color: theme.colors.light,
    },
    fieldValue: {
        marginLeft: 25
    }
});