import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, TouchableHighlight } from 'react-native'
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { theme } from '../../assets/theme';
import IoIcon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { Divider } from 'native-base';
import moment from 'moment';
import EventCard from '../Components/EventCard';

export default function EventsCarousel({events, navigation}) {
    const ref = useRef();
  const [ currentXOffset, setCurrentXOffset ] = useState(0);
  const [ scrollXOffset, setscrollXOffset ] = useState(0);
  const [ scrollViewWidth, setScrollViewWidth ] = useState(0);
  const [ backDisabled, setBackDisabled ] = useState(true);
  const [ forwardDisabled, setForwardDisabled ] = useState(false);

  const _handleScroll = (e) => {
    setCurrentXOffset(e.nativeEvent.contentOffset.x);
    const eachItemWidth = scrollViewWidth / events.length;
    if(scrollXOffset <= 0){
        setBackDisabled(true);
        setForwardDisabled(false)
    }else if(scrollXOffset >= (scrollViewWidth - eachItemWidth )){
        setForwardDisabled(true);
        setBackDisabled(false)
    }else{
        setBackDisabled(false);
        setForwardDisabled(false)
    }
  };

  const _scrollBack = () => {
    const eachItemWidth = scrollViewWidth / events.length;
    const xOffset = currentXOffset - eachItemWidth;
    ref.current.scrollTo({x: xOffset, y: 0, animated: true})
    setscrollXOffset(xOffset);
  }

  const _scrollForward = () => {
    const eachItemWidth = scrollViewWidth / events.length;
    const xOffset = currentXOffset + eachItemWidth;
    ref.current.scrollTo({x: xOffset, y: 0, animated: true});
    setscrollXOffset(xOffset);
  };

  return (
    <View style={styles.carousel}>
        {
            events.length > 1 ?
            <View style={styles.arrows}>
                <TouchableHighlight disabled={backDisabled} style={[styles.arrowBtn, backDisabled ? styles.disabledArrow: {}]} onPress={_scrollBack}>
                    <IoIcon name='arrow-back' style={[styles.arrow, backDisabled ? styles.disabledArrow: {} ]} />
                </TouchableHighlight>
                <TouchableHighlight disabled={forwardDisabled} style={[styles.arrowBtn, forwardDisabled ? styles.disabledArrow: {}]} onPress={_scrollForward}>
                    <IoIcon name='arrow-forward' style={[styles.arrow, forwardDisabled ? styles.disabledArrow: {}]} />
                </TouchableHighlight>
            </View>: null
        }
        <ScrollView contentContainerStyle={styles.events} showsHorizontalScrollIndicator={false} horizontal
            ref={ref} pagingEnabled onScroll={_handleScroll}
            onContentSizeChange={(width) => setScrollViewWidth(width)}
        >
            {
            events.map((event, index) => (
                <EventCard event={event} key={index} />
            ))
            }
        </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
    carousel: {
        display: 'flex',
        justifyContent: 'center',
    },
    arrows: {
        width: '100%',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 9
    },
    arrow: {
        fontSize: 15,
        color: 'white',
    },
    arrowBtn: {
        width: 30,
        height: 40,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 10
    },
    disabledArrow: {
        backgroundColor: '#ccc',
    },
    events: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    
});