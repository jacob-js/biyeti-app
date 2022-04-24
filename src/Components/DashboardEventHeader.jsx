import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import React from 'react'
import IoIcon from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardEventHeader = ({navigation}) => {

  return (
    <View style={styles.headerTop}>
        <TouchableOpacity style={styles.headerTopLeft} onPress={() => navigation.goBack()}>
        <IoIcon name='arrow-back' color='white' size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerTopRight}>
        <MatIcon name='qrcode-scan' color='white' size={24} />
        </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
    headerTop: {
        backgroundColor: 'transparent',
        height: Platform.OS === 'ios' ? 90 : 55,
        width: 300,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default DashboardEventHeader