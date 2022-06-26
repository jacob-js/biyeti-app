import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { theme } from '../../assets/theme';
import { useNavigation } from '@react-navigation/native';

const Category = ({category}) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity 
        style={styles.container}
        onPress={() =>navigation.navigate('AllEvents', { title: category.name, categId: category.id })}
    >
        <View style={styles.avatar}>
            <Image 
                source={{uri: category.cover || 'https://cdn-icons-png.flaticon.com/512/6781/6781224.png' }} 
                style={styles.avatarImage} 
            />
        </View>
        <Text>{category.name}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        borderColor: theme.colors.light100,
        borderWidth: 2,
        padding: 5,
        borderRadius: 10,
        margin: 5,
    },
    avatar: {
        marginRight: 10,
        width: 25,
        height: 25,
        borderRadius: 20,
        backgroundColor: theme.colors.light100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarImage: {
        width: 20,
        height: 20,
    }
})

export default Category