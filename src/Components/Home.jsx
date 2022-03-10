import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { Divider, Icon, Input } from 'native-base';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntyIcon from 'react-native-vector-icons/Entypo';
import { theme } from '../../assets/theme';

const events = [
  {
    name: 'Lorem Ipsum',
    date: '20/10/2020',
    time: '10:00',
    description: 'lorem ipsum dolor sit amet',
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

const Home = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Input variant="rounded" style={styles.search} bg='rgba(0,0,0,0.1)' paddingLeft={5} placeholder="Rechercher un événement" rightElement={
          <Icon as={EvilIcon} name='search' style={{ marginRight: 10 }} size="8" color='light.300' />
        } _focus={{ borderColor: theme.colors.default100 }} />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Evénements récents</Text>
            <TouchableOpacity>
              <Text style={styles.showAll}>Afficher tout</Text>
            </TouchableOpacity>
          </View>
          <Divider mb={3} />
          <ScrollView contentContainerStyle={styles.events}>
            {
              events.map((event, index) => (
                <View style={styles.eventContainer}>
                  <View style={styles.event} key={index}>
                    <TouchableOpacity style={styles.touchableCover}>
                      <Image source={{ uri: event.cover }} style={styles.eventCover} />
                    </TouchableOpacity>
                    <View style={styles.eventDetail}>
                      <Text style={styles.eventName}>{event.name}</Text>
                      <View style={styles.addressContainer}>
                        <Text style={styles.eventLocation}>Goma</Text>
                        <EntyIcon name='dot-single' style={styles.dot} />
                        <Text style={styles.eventDate}>03 Avril 2022</Text>
                      </View>
                      <Divider my={5} bg='white' />
                      <TouchableOpacity style={styles.eventButton}>
                        <Text style={styles.eventButtonText}>Réserver <AntIcon name='arrowright' /></Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            }
          </ScrollView>
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
  search: {
    color: 'black'
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
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
  events: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  event: {
    backgroundColor: theme.colors.light100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.light100,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: Dimensions.get('window').width - 40,
    marginBottom: 20
  },
  touchableCover: {
    width: '100%'
  },
  eventCover: {
    height: 200,
    width: '100%',
    borderRadius: 10
  },
  eventDetail: {
    width: '100%',
    display: 'flex',
    marginTop: 10,
    alignItems: 'flex-start'
  },
  eventName: {
    fontFamily: 'Barlow-Bold',
    fontSize: 16,
  },
  addressContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  eventDate: {
    color: theme.colors.light
  },
  eventLocation: {
    color: theme.colors.light
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