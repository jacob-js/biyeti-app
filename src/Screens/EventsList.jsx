import { View, Text, FlatList, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect } from 'react';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Divider } from 'native-base';
import { theme } from '../../assets/theme';
import { useDispatch, useSelector } from 'react-redux';
import { getAgentsAction } from '../Redux/actions/agents';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';

export default function EventsList({navigation}) {
    const dispatch = useDispatch();
    const { data: user } = useSelector(({ users: {currentUser} }) =>currentUser); 
    const { data, loading, count, rows } = useSelector(({ agents: { agents }}) => agents);

    const refresh = () => {
        getAgentsAction(user.id)(dispatch, navigation);
    }

    useFocusEffect(
        useCallback(
            () => {
                refresh();
            },
            [navigation, user],
        )
    )

  return (
      <SafeAreaView style={styles.container}>
          {
              count <= 0 && !loading ?
              <View style={styles.empty}>
                  <MatIcon name='flask-empty-off-outline' style={styles.emptyIcon} />
                  <Text style={styles.descript}>Vous n'avez aucun événement</Text>
                  <Button bg={theme.colors.default} 
                    startIcon={<AntIcon name='pluscircleo' color="white" />}
                    borderRadius="full"
                    height={38}
                    colorScheme={theme.colors.default}
                    w={100}
                    mt={3}
                    onPress={() => navigation.navigate('AddEventForm')}
                >
                    <Text style={{ color: "white" }}>Créer</Text>
                </Button>
              </View>:
              <>
                <View style={styles.header}>
                    <Button bg={theme.colors.default} 
                        startIcon={<AntIcon name='pluscircleo' color="white" />}
                        borderRadius="full"
                        height={38}
                        colorScheme={theme.colors.default}
                        onPress={() => navigation.navigate('AddEventForm')}
                    >
                        <Text style={{ color: "white" }}>Ajouter</Text>
                    </Button>
                </View>
                <FlatList
                    data={rows}
                    renderItem={({item: { event }}) =>(
                        <TouchableOpacity style={styles.item} onPress={() =>navigation.navigate('DashboardEventDetail', {
                            eventId: event.id
                        })}>
                            <View style={styles.coverContainer}>
                                <Image source={{ uri: event.cover }} style={styles.cover} />
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.name}>{event.name}</Text>
                                <Text style={styles.descript}>{event.description.substring(0, 80)}{event.description.length > 100 ? '...': ''}</Text>
                                <View style={styles.addressContainer}>
                                    <Text style={styles.eventLocation}> <AntIcon name='enviromento' style={styles.icon} />{event.location}</Text>
                                    <Divider orientation='vertical' marginX={1} bg={theme.colors.light100} />
                                    <Text style={styles.eventDate}><AntIcon name='calendar' style={styles.icon} /> {moment(event.event_date).format("DD-MM-YYYY")}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => Math.random()}
                    refreshing={loading}
                    onRefresh={refresh}
                />
              </>
          }
      </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    header: {
        marginBottom: 15
    },
    empty: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyIcon: {
        fontSize: 30,
        color: theme.colors.light
    },
    item: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    coverContainer: {
        height: 90,
        width: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cover: {
        width: 80,
        height: '100%',
        borderRadius: 10
    },
    info: {
        marginLeft: 10,
        width: '65%'
    },
    name: {
        fontFamily: 'Barlow-Bold',
        textTransform: 'capitalize'
    },
    descript: {
        fontFamily: 'Barlow',
        fontSize: 13
    },
    addressContainer: {
        flexDirection: 'row',
        marginTop: 5
    },
    eventLocation: {
        fontFamily: 'Barlow',
        color: theme.colors.light
    },
    eventDate: {
        fontFamily: 'Barlow',
        color: theme.colors.light
    }
})