import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { getCurrentUser } from '../Redux/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import AnimatedLoader from 'react-native-animated-loader';
import spinner from '../../assets/loaders/spinner-loader.json';

export default function LoadingPage({navigation}) {
    const dispatch = useDispatch();
    const { loading, auth, data } = useSelector(({ users: { currentUser } }) => currentUser);

    useEffect(() => {
        getCurrentUser(dispatch, navigation);
    }, [])
  return (
    <View style={styles.container}>
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={styles.lottie}
        source={spinner}
        speed={1}>
      </AnimatedLoader>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottie: {
      width: 300,
      height: 300,
    },
})