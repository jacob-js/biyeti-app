import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, SafeAreaView, RefreshControl } from 'react-native'
import React from 'react'
import { Divider, Icon, Input } from 'native-base';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntyIcon from 'react-native-vector-icons/Entypo';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import IoIcon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../assets/theme';
import { useRef } from 'react';
import { useState } from 'react';
import EventsCarousel from '../Commons/EventsCarousel';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCategorys, getEvents } from '../Redux/actions/events';
import ContentLoader from 'react-native-easy-content-loader';
import CategEventCarousel from '../Components/CategEventCarousel';

const Home = ({navigation}) => {
  const { data, count, rows, loading, error } = useSelector(({ events: { events } }) =>events);
  const { data: categorys, loading: loadingCateg } = useSelector(({ events: { categorys } }) =>categorys);
  const dispatch = useDispatch();

  useEffect(() =>{
    getEvents()(dispatch);
    getCategorys(dispatch);
  }, [navigation]);

  const refresh = () =>{
    getEvents()(dispatch);
    getCategorys(dispatch);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading || loadingCateg}
            onRefresh={refresh}
          />
        }
      >
      <View style={styles.container}>
        <View style={styles.searchView}>
          <Input variant="rounded" style={styles.search} bg='rgba(0,0,0,0.1)' paddingLeft={5} placeholder="Rechercher un événement" rightElement={
            <Icon as={EvilIcon} name='search' style={{ marginRight: 10 }} size="8" color='light.300' />
          } _focus={{ borderColor: theme.colors.default100 }} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pour bientôt</Text>
            <TouchableOpacity>
              <Text style={styles.showAll}>Afficher tout</Text>
            </TouchableOpacity>
          </View>
          <Divider mb={3} width='90%' m='auto' />
          {
            loading ?
            <ContentLoader pRows={0} pWidth={320} pHeight={200} 
              active
              tWidth={Dimensions.get('window').width - 80}
              tHeight={250}
              titleStyles={styles.skeleton}
            />:
            <EventsCarousel events={rows} navigation={navigation} />
          }
        </View>
        {
          loadingCateg ?
          <>
            <ContentLoader pRows={0} pWidth={320} pHeight={200} 
              active
              tWidth={Dimensions.get('window').width - 80}
              tHeight={250}
              titleStyles={styles.skeleton}
            />
            <ContentLoader pRows={0} pWidth={320} pHeight={200} 
              active
              tWidth={Dimensions.get('window').width - 80}
              tHeight={250}
              titleStyles={styles.skeleton}
            />
            <ContentLoader pRows={0} pWidth={320} pHeight={200} 
              active
              tWidth={Dimensions.get('window').width - 80}
              tHeight={250}
              titleStyles={styles.skeleton}
            />
          </>:
          categorys.map((category, index) => (
            <CategEventCarousel category={category} key={index} navigation={navigation} />
          ))
        }
      </View>
    </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20
  },
  searchView: {
    marginBottom: 20
  },
  search: {
    color: 'black',
  },
  section: {
    marginBottom: 0,
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Barlow-Bold',
    textTransform: 'uppercase',
    color: theme.colors.light
  },
  showAll: {
    color: theme.colors.default100,
    fontFamily: 'Barlow',
  },
  dot: {
    fontSize: 15,
    marginTop: 3,
    color: theme.colors.light
  },
  eventButtonText: {
    color: theme.colors.default,
    fontFamily: 'Barlow-Bold',
    fontSize: 16,
  },
  skeleton: {
    marginLeft: 10,
    borderRadius: 15
  }
});

export default Home