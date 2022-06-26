import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MiniEventCard from '../Commons/MiniEventCard'

const GridEvents = ({events}) => {
  return (
    <View style={styles.container}>
      {
        events?.map((event, index) => (
          <MiniEventCard event={event} key={index} />
        ))
      }
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    }
})

export default GridEvents