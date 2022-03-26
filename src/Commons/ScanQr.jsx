import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function ScanQr({setViewScan}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [success, setSuccess] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ user, setUser ] = useState({});

    const requestCameraPermission = async() =>{
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    useEffect(() =>{
        requestCameraPermission()
    });

  return (
    <View style={styles.container}>
      <View style={styles.scannerContainer}>
        <BarCodeScanner
            style={styles.scanner}
            onBarCodeScanned={() =>setViewScan(false)}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(0,0,0,0.5)',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scannerContainer: {
        width: Dimensions.get('window').width * 80 / 100,
        height: 400,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scanner: {
        width: '95%',
        height: '90%',
    }
})