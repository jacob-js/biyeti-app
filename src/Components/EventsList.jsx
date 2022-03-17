import { View, Text, FlatList, StyleSheet, Image, SafeAreaView } from 'react-native'
import React from 'react';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Divider } from 'native-base';
import { theme } from '../../assets/theme';

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

export default function EventsList({navigation}) {
  return (
      <SafeAreaView style={styles.container}>
          {
              events.length <= 0 ?
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
                    data={events}
                    renderItem={({item}) =>(
                        <View style={styles.item}>
                            <View style={styles.coverContainer}>
                                <Image source={{ uri: item.cover }} style={styles.cover} />
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.descript}>{item.description.substring(0, 80)}{item.description.length > 100 ? '...': ''}</Text>
                                <View style={styles.addressContainer}>
                                    <Text style={styles.eventLocation}> <AntIcon name='enviromento' style={styles.icon} /> Goma</Text>
                                    <Divider orientation='vertical' marginX={1} bg={theme.colors.light100} />
                                    <Text style={styles.eventDate}><AntIcon name='calendar' style={styles.icon} /> 03 Avril 2022</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => Math.random()}
                    refreshing={false}
                    onRefresh={() =>console.log('refreshed')}
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