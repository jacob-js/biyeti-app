import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { theme } from '../../assets/theme';

const Empty = ({message}) => {
  return (
    <View style={styles.container}>
        <AntIcon name="folderopen" size={70} color="#ccc" style />
        <Text style={styles.message}> {message || "Aucun contenu"} </Text>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    message: {
        color: theme.colors.light,
        textAlign: 'center',
        fontFamily: 'Barlow'
    }
})

export default Empty