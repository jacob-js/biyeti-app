import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { getCurrentUser } from '../Redux/actions/auth';
import { useDispatch, useSelector } from 'react-redux';

export default function LoadingPage({navigation}) {
    const dispatch = useDispatch();
    const { loading, auth, data } = useSelector(({ users: { currentUser } }) => currentUser);

    useEffect(() => {
        getCurrentUser(dispatch, navigation);
    }, [])
  return (
    <View style={styles.container}>
      <Text>Chargement... {JSON.stringify(data)}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }
})