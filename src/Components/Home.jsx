import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, TouchableHighlight } from 'react-native'
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

const events = [
  {
    name: 'Lorem Ipsum',
    date: '20/10/2020',
    time: '10:00',
    description: 'lorem ipsum dolor sit amet',
    cover: 'https://picsum.photos/600',
  },
  {
    name: 'Lorem Ipsum',
    date: '20/10/2020',
    time: '10:00',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis cum error repellat odit provident, consectetur repudiandae eveniet? Quisquam repellat, minima voluptas error quam ullam neque repellendus maiores? Commodi, a repellendus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque molestias facilis alias excepturi? Unde, corrupti itaque consequuntur, debitis accusantium ratione qui deleniti molestias, quae quibusdam quisquam asperiores! Dolores, aperiam quas?',
    cover: 'https://picsum.photos/700',
  },
  {
    name: 'Lorem Ipsum',
    date: '20/10/2020',
    time: '10:00',
    description: 'lorem ipsum dolor sit amet',
    cover: 'https://picsum.photos/600',
  }
]

const Home = ({navigation}) => {

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
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
          <EventsCarousel events={events} navigation={navigation} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Humour</Text>
            <TouchableOpacity>
              <Text style={styles.showAll}>Afficher tout</Text>
            </TouchableOpacity>
          </View>
          <Divider mb={3} width='90%' m='auto' />
          <EventsCarousel events={events} navigation={navigation} />
        </View>
      </View>
    </ScrollView>
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
    fontSize: 18,
    fontFamily: 'Barlow-Bold',
    textTransform: 'capitalize',
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
  }
});

export default Home