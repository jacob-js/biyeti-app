import { View, Text, StyleSheet, Dimensions , ToastAndroid, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'native-base'
import logo from '../../assets/logo.png'
import SvgQRCode from 'react-native-qrcode-svg';
import { MessageAlert, showToast } from '../Utils/feedbacks';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { theme } from '../../assets/theme';
import { StorageAccessFramework } from 'expo-file-system';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useSelector } from 'react-redux';

export default function PurChasedTicket({ isShown, setIsShown }) {
    const [svg, setSvg] = useState();
    const { data: event } = useSelector(({ events: { event } }) => event);
    const { data: purchased, ticket } = useSelector(({ tickets: { purchase } }) => purchase);

    const saveQrToDisk = () => {
        svg.toDataURL(async(data) => {
            if(Platform.OS === 'android'){
                const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
                if(permissions.granted){
                    const dirUri = permissions.directoryUri;
                    let dir = StorageAccessFramework.getUriForDirectoryInRoot('Bookit');
                    if(!dir){
                        dir = await StorageAccessFramework.makeDirectoryAsync(dirUri, 'Bookit');
                    }
                    const file = await StorageAccessFramework.createFileAsync(`${dirUri}/${dir}`, `${event.name.split(' ').join('-')}-${ticket.name}.png`, 'image/png');
                    await StorageAccessFramework.writeAsStringAsync(file, data, { encoding: 'base64' });
                    showToast('QR Code enregistré dans votre galerie');
                }
            }else{
                const filename = FileSystem.documentDirectory + `${event.name.split(' ').join('-')}-${ticket.name}.png`;
                await FileSystem.writeAsStringAsync(filename, data, { encoding: 'base64' });
                await MediaLibrary.saveToLibraryAsync(filename);
                showToast('QR Code enregistré dans votre librairie');
            }
        });
   }

  return (
    <Modal isOpen={isShown} onClose={() =>setIsShown(false)}>
        <Modal.Content>
            <Modal.CloseButton />
            <Modal.Body style={styles.body}>
                <MessageAlert status='success' msg='Votre avez reservé votre billet avec succès' />
                <View style={styles.qrContainer}>
                    <SvgQRCode 
                        value={purchased.id}
                        size={232}
                        getRef={(c) => setSvg(c)}
                    />
                </View>
                <Button isLoading={false} 
                    isLoadingText={<Text style={{ color: 'white' }}>Patientez...</Text>} 
                    style={styles.btn} _text={{ fontWeight: 'bold', textTransform: 'uppercase', color: theme.colors.default }}
                    leftIcon={<AntIcon name='download' size={16} />}
                    onPress={saveQrToDisk}
                >Sauvegarder</Button>
            </Modal.Body>
        </Modal.Content>
    </Modal>
  )
};

const styles = StyleSheet.create({
    body: {
        padding: 20,
        marginTop: 30,
        paddingBottom: 20,
        alignItems: 'center'
    },
    qrContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        width: 170,
        height: 50,
        backgroundColor: 'white',
        borderColor: theme.colors.default100,
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 10
    }
})