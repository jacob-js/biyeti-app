import { View, Text, StyleSheet, StatusBar, Platform, RefreshControl, Dimensions, TouchableOpacity } from 'react-native'
import React, { createContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../Redux/actions/events';
import IoIcon from 'react-native-vector-icons/Ionicons';
import Tickets from './Tickets';
import { getTicketsAction } from '../Redux/actions/tickets';
import ScanQr from '../Commons/ScanQr';
import EventAgents from './EventAgents';
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';
import { getAgentsAction } from '../Redux/actions/agents';
import EventBookings from '../Components/EventBookings';

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
];

export const DashboardContext = createContext({});

export default function DashboardEventDetail({route, navigation}) {
    const eventId = route?.params?.eventId;
    const { data: event, loading } = useSelector(({ events: { event } }) => event);
    const dispatch = useDispatch();
    const [activeLink, setActiveLink] = useState(links[0].name)
    const [viewScan, setViewScan] = useState(false);
    const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 70;
    const fixedContentView = useRef(null);

    const getData = () =>{
        getEvent(eventId)(dispatch);
        getTicketsAction(eventId)(dispatch);
        getAgentsAction(null, eventId)(dispatch, navigation);
    };

    useEffect(() =>{
        getData();
    }, [eventId, navigation]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <ImageHeaderScrollView
        maxHeight={250}
        minHeight={MIN_HEIGHT}
        headerImage={{ uri: event.cover }}
        style={styles.container}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        onScroll={(event) => {
          const offsetY = event.nativeEvent.contentOffset.y;
          if (offsetY > 250) {
            fixedContentView.current.fadeInUp(200);
          } else {
            fixedContentView.current.fadeOut(100);
          }
        } }
        refreshControl={
            <RefreshControl refreshing={loading} onRefresh={getData} />
        }
        renderForeground={() => (
          <View style={styles.header}>
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
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View style={styles.fixedView} ref={fixedContentView}>
            <Text style={styles.fixedTitle} numberOfLines={1}>{event.name}</Text>
          </Animatable.View>
        )}
      >
          <TriggeringView onHide={() => {fixedContentView.current.fadeInUp(200); console.log('hidden')}}
            onDisplay={() => {fixedContentView.current.fadeOut(200); console.log('display')}}
            onBeginHidden={() => {console.log('begin hidden')}}
          >
            <DashboardContext.Provider value={{}}>
              {
                activeLink === 'Billets' ? <Tickets navigation={navigation} route={route} />:null
              }
              {
          
                activeLink === 'Membres' ? <EventAgents navigation={navigation} eventId={eventId} route={route} />:
                activeLink === 'Réservations' ? <EventBookings route={route} />:null
              }
              {
                viewScan && <ScanQr setViewScan={setViewScan} />
              }
            </DashboardContext.Provider>
          </TriggeringView>
      </ImageHeaderScrollView>
     </View> 
  )
};

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
    },
    header: {
      width: Dimensions.get('window').width,
      height: 250,
      padding: 20,
      justifyContent: 'space-between',
      marginTop: 60,
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
      marginTop: 20,
      flexWrap: 'wrap'
    },
    link: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: 'white',
      alignItems: 'center',
      padding: 5,
      borderRadius: 20,
      marginVertical: 3,
      marginHorizontal: 5
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
      backgroundColor: 'white',
      color: 'black',
      borderColor: 'white',
      fontWeight: 'bold'
    },
    fixedTitle: {
      color: 'white',
      fontSize: 25,
      fontFamily: 'Barlow',
      fontWeight: 'bold'
    },
    fixedView: {
      marginLeft: 50,
      height: 80 + StatusBar.currentHeight,
      justifyContent: 'center',
      width: '80%',
      opacity: 0
    }
});