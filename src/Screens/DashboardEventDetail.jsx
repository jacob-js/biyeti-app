import { View, Text, StyleSheet, StatusBar, SafeAreaView, ScrollView, RefreshControl, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../Redux/actions/events';
import IoIcon from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../assets/theme';
import Tickets from './Tickets';
import { getTicketsAction } from '../Redux/actions/tickets';
import ScanQr from '../Commons/ScanQr';
import EventAgents from './EventAgents';

const links = [
  {
    name: 'Billets',
    icon: 'list-outline' 
  },
  {
    name: 'Membres',
    icon: 'people-outline' 
  },
  {
    name: 'Réservations',
    icon: 'calendar-outline' 
  },
  {
    name: 'Paramètres',
    icon: 'settings-outline' 
  }
]

export default function DashboardEventDetail({route, navigation}) {
    const eventId = route?.params?.eventId;
    const { data: event, loading } = useSelector(({ events: { event } }) => event);
    const dispatch = useDispatch();
    const [activeLink, setActiveLink] = useState(links[0].name)
    const [viewScan, setViewScan] = useState(false);

    const getData = () =>{
        getEvent(eventId)(dispatch);
        getTicketsAction(eventId)(dispatch);
    }

    useEffect(() =>{
        getData();
    }, [eventId, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.header} source={{ uri: event.cover }}>
        <View style={styles.headerBg}></View>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.headerTopLeft} onPress={() => navigation.goBack()}>
            <IoIcon name='arrow-back' color='white' size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerTopRight} onPress={setViewScan}>
            <MatIcon name='qrcode-scan' color='white' size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerBottom}>
          <Text style={styles.title}>{event.name}</Text>
          <Text style={styles.descript}>{event.description?.substring(0, 100)} {event?.description?.length > 100 ? '...': ''} </Text>
          <View style={styles.links}>
            {
              links.map((link, index) => (
                <TouchableOpacity key={index} 
                  style={[styles.link, activeLink === link.name && styles.activeLink]}
                  onPress={() => setActiveLink(link.name)}
                >
                  <IoIcon name={link.icon} style={[styles.linkIcon, activeLink === link.name && styles.activeLink]} /> 
                  <Text style={[styles.linkName, activeLink === link.name && styles.activeLink]}>{link.name}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
      </ImageBackground>
      <ScrollView
        refreshControl={
            <RefreshControl refreshing={loading} onRefresh={getData} />
        }
      >
          {
            activeLink === 'Billets' ? <Tickets navigation={navigation} route={route} />:null
          }
      </ScrollView>
      {
        
        activeLink === 'Membres' ? <EventAgents navigation={navigation} eventId={eventId} route={route} />:null
      }
      {
        viewScan && <ScanQr setViewScan={setViewScan} />
      }
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
    },
    header: {
      width: Dimensions.get('window').width,
      height: 200,
      padding: 20,
      justifyContent: 'space-between',
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerBg: {
      backgroundColor: 'rgba(0,0,0,0.3)',
      position: 'absolute',
      top: 0,
      left: 0,
      width: Dimensions.get('window').width,
      height: 200,
    },
    title: {
      color: 'white',
      fontSize: 30,
      fontFamily: 'Barlow-Bold',
      textTransform: 'capitalize',
    },
    descript: {
      color: 'white',
      fontFamily: 'Barlow'
    },
    links: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10
    },
    link: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: 'gray',
      alignItems: 'center',
      padding: 5,
      borderRadius: 5
    },
    linkName: {
      fontFamily: 'Barlow',
      color: 'white',
      fontSize: 12,
      marginLeft: 5
    },
    linkIcon: {
      color: 'white'
    },
    activeLink: {
      backgroundColor: 'gray',
      color: 'white'
    }
});