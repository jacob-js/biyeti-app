import React from "react";
import { View, StyleSheet, ActivityIndicator, Dimensions } from "react-native";

export const LoadIndicator = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={50} color="white" />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height,
        width: Dimensions.get('window').width,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        zIndex: 99,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})