import { View, Text, StyleSheet, Dimensions , ToastAndroid } from 'react-native'
import CameraRoll from '@react-native-community/cameraroll';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'native-base'
import logo from '../../assets/logo.png'
import SvgQRCode from 'react-native-qrcode-svg';
import { MessageAlert } from '../Utils/feedbacks';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { theme } from '../../assets/theme';
import { StorageAccessFramework } from 'expo-file-system';
import { useSelector } from 'react-redux';

export default function PurChasedTicket({ isShown, setIsShown, ticket }) {
    const [svg, setSvg] = useState();
    const { data: event } = useSelector(({ events: { event } }) => event);

    const saveQrToDisk = () => {
        svg.toDataURL(async(data) => {
            const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
            if(permissions.granted){
                const dirUri = permissions.directoryUri;
                let dir = StorageAccessFramework.getUriForDirectoryInRoot('Bookit');
                if(!dir){
                    dir = await StorageAccessFramework.makeDirectoryAsync(dirUri, 'Bookit');
                }
                const file = await StorageAccessFramework.createFileAsync(`${dirUri}/${dir}`, `${event.name.split(' ').join('-')}-${'vip'}.png`, 'image/png');
                await StorageAccessFramework.writeAsStringAsync(file, data, { encoding: 'base64' });
                ToastAndroid.show('QR Code enregistré dans votre galerie', ToastAndroid.SHORT);
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
                    <SvgQRCode value="Just some string value" 
                        size={232}
                        getRef={(c) => setSvg(c)}
                    />
                </View>
                <Button isLoading={false} 
                    isLoadingText={<Text style={{ color: 'white' }}>Patientez...</Text>} 
                    style={styles.btn} _text={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                    leftIcon={<AntIcon name='download' style={{ color: 'white' }} />}
                    onPress={saveQrToDisk}
                >Télécharger le code qr</Button>
            </Modal.Body>
        </Modal.Content>
    </Modal>
  )
};

const styles = StyleSheet.create({
    body: {
        padding: 20,
        marginTop: 30,
        paddingBottom: 20
    },
    qrContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        height: 50,
        backgroundColor: theme.colors.default100,
        shadowOpacity: 0.4,
        shadowColor: theme.colors.default, 
        elevation: 15,
        borderRadius: 15,
        marginTop: 10
    }
})