import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { showToast } from '../Utils/feedbacks';
import axios from 'axios';
import { LoadIndicator } from './loaders';
import { DashboardEventContext } from '../Utils/contexts';

export default function ScanQr() {
    const [hasPermission, setHasPermission] = useState(null);
    const [loading, setLoading] = useState(false);
    const {setViewScan, setScanned, setShowScanned, event} = useContext(DashboardEventContext);

    const requestCameraPermission = async() =>{
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    useEffect(() =>{
        requestCameraPermission()
    });

    const handleBarCodeScanned = async({ type, data }) => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/tickets/status/${data}?event_id=${event.id}`);
        if(res.status === 200){
            setScanned(res.data.data);
            setViewScan(false);
            setShowScanned(true);
        }
      } catch (error) {
        setViewScan(false);
        showToast("Une erreur est survenue", "error");
      };
      setLoading(false);
    };

  return (
    <View style={styles.container}>
      {
        loading ?
        <LoadIndicator />:
        <View style={styles.scannerContainer}>
          <BarCodeScanner
              style={styles.scanner}
              onBarCodeScanned={handleBarCodeScanned}
          />
        </View>
      }
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