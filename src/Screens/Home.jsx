import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, SafeAreaView, RefreshControl } from 'react-native'
import React, { useCallback } from 'react'
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
import { clearEventsState, getCategorys, getEvents, getUpcomingEvents } from '../Redux/actions/events';
import ContentLoader from 'react-native-easy-content-loader';
import CategEventCarousel from '../Components/CategEventCarousel';
import SearchBar from '../Components/SearchBar';
import { useFocusEffect } from '@react-navigation/native';
import GridEvents from '../Components/GridEvents';
import Category from '../Components/Category';
import axios from 'axios';

const Home = ({stackProps, navigation: drawerNav}) => {
  const { data, count, rows, loading, error } = useSelector(({ events: { events } }) =>events);
  const { data: categorys, loading: loadingCateg } = useSelector(({ events: { categorys } }) =>categorys);
  const { rows: upcomingRows, count: upcomingCount, isLoading: loadingUpcoming } = useSelector(({ events: { upcomingEvents } }) =>upcomingEvents);
  const dispatch = useDispatch();
  const navigation = stackProps?.navigation;
  const [ others, setOthers ] = useState([]);
  const [ loadingOthers, setLoadingOthers ] = useState(true);

  const getOthers = async() =>{
    setLoadingOthers(true)
    try {
      const res = await axios.get(`/api/v1/events?p_size=${4}$p=${1}&order_by=created_at`);
      setOthers(res.data.data?.rows);
    } catch (error) {
      
    }
    setLoadingOthers(false);
  }

  const refresh = () =>{
    getEvents()(dispatch);
    getCategorys(dispatch);
    getUpcomingEvents()(dispatch);
    getOthers();
  }

  useFocusEffect(
    useCallback(() =>{
      refresh()

      return () =>{
        clearEventsState(dispatch)
      }
    }, [])
  );


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
        <View style={styles.section}><SearchBar /></View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pour bientôt</Text>
            <TouchableOpacity onPress={() =>navigation.navigate('AllEvents', { title: "Qui auront lieu bientôt", upcoming: true })}>
              <Text style={styles.showAll}>
                Tout <AntIcon name='arrowright' />
              </Text>
            </TouchableOpacity>
          </View>
          {
            loadingUpcoming ?
            <ContentLoader pRows={0} pWidth={320} pHeight={200} 
              active
              tWidth={Dimensions.get('window').width - 80}
              tHeight={250}
              titleStyles={styles.skeleton}
            />:
            <EventsCarousel events={upcomingRows} navigation={navigation} />
          }
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ajoutes recemment</Text>
            <TouchableOpacity onPress={() =>navigation.navigate('AllEvents', { title: "Ajoutes recemment", order: "-created_at" })}>
              <Text style={styles.showAll}>
                Tout <AntIcon name='arrowright' />
              </Text>
            </TouchableOpacity>
          </View>

          {
            loading ?
            <View style={styles.loaders}>
              <ContentLoader pRows={0} pWidth={150} pHeight={100} 
                active
                tWidth={(Dimensions.get('window').width - 50) / 2}
                tHeight={150}
                titleStyles={styles.skeleton}
                containerStyles={styles.loader}
              />
              <ContentLoader
                pRows={0}
                containerStyles={styles.loader}
                active
                tWidth={(Dimensions.get('window').width - 50) / 2}
                tHeight={150}
                titleStyles={styles.skeleton}
              />
            </View>:
            <GridEvents events={rows} />
          }
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
          </View>
          {
          loadingCateg ?
          <>
            <ContentLoader pRows={4} 
              pWidth={[100, 260, 230, 150]} pHeight={20} 
              active
              tWidth={0}
              tHeight={0}
              titleStyles={styles.skeleton}
              paragraphStyles={{
                marginHorizontal: 10,
              }}
            />
          </>:
          
          <View style={styles.categs}>
             {
              categorys.map((category, index) => (
                <View style={[styles.categ, index !== 0 && {
                  marginLeft: 5
                }]} key={index} >
                  <Category category={category}/>
                </View>
              ))
             }
          </View>
        }
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Autres suggestions</Text>
            <TouchableOpacity onPress={() =>navigation.navigate('AllEvents', { title: "Suggestions", order: 'created_at' })}>
              <Text style={styles.showAll}>
                Tout <AntIcon name='arrowright' />
              </Text>
            </TouchableOpacity>
          </View>

          {
            loadingOthers ?
            <View style={styles.loaders}>
              <ContentLoader pRows={0} pWidth={150} pHeight={100} 
                active
                tWidth={(Dimensions.get('window').width - 50) / 2}
                tHeight={150}
                titleStyles={styles.skeleton}
                containerStyles={styles.loader}
              />
              <ContentLoader
                pRows={0}
                containerStyles={styles.loader}
                active
                tWidth={(Dimensions.get('window').width - 50) / 2}
                tHeight={150}
                titleStyles={styles.skeleton}
              />
            </View>:
            <GridEvents events={others} />
          }
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 20
  },
  searchView: {
    marginBottom: 20
  },
  search: {
    color: 'black',
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 20
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Barlow-Bold',
    textTransform: 'uppercase',
    color: theme.colors.light,
    marginLeft: 10
  },
  showAll: {
    color: theme.colors.default100,
    fontFamily: 'Barlow',
    fontWeight: 'bold',
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
    borderRadius: 15
  },
  categs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  loaders: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  loader: {
    width: (Dimensions.get('window').width - 50) / 2
  }
});

export default Home