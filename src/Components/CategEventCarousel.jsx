import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import EventsCarousel from '../Commons/EventsCarousel'
import axios from 'axios';
import ContentLoader from 'react-native-easy-content-loader';
import { theme } from '../../assets/theme';
import { Divider } from 'native-base';

export default function CategEventCarousel({category, navigation}) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() =>{
        (async() =>{
            setLoading(true);
            try {
                const res = await axios.get(`/api/v1/events?category_id=${category.id}&p=${1}&p_size=${5}`);
                if(res.status === 200){
                    setEvents(res.data.data?.rows);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        })()
        return () => {}
    }, [category, navigation])
  return (
      !loading && events.length <= 0 ? null :
    <View style={styles.section}>
        <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{category.name}</Text>
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
            <EventsCarousel events={events} navigation={navigation} />
        }
    </View>
  )
};

const styles = StyleSheet.create({
    sectionHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        paddingHorizontal: 20
      },
      sectionTitle: {
        fontSize: 16,
        fontFamily: 'Barlow',
        textTransform: 'uppercase',
        color: theme.colors.light,
        fontWeight: 'bold'
      },
      showAll: {
        color: theme.colors.default100,
        fontFamily: 'Barlow',
      },
      skeleton: {
        marginLeft: 10,
        borderRadius: 15
      }
})