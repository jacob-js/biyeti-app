import { View, Text } from 'react-native'
import React, { useState } from 'react'
import SvgQRCode from 'react-native-qrcode-svg';
import styles from './styles';
import { Button } from 'native-base';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { saveQrToDisk } from '../../../../Utils/helpers';

const NewPurchaseNotif = ({notif}) => {
    const [svg, setSvg] = useState();
  return (
    <View style={styles.container}>
        <View style={styles.qrContainer}>
            <SvgQRCode
                value={notif.data?.purchase?.id}
                size={232}
                getRef={(c) => setSvg(c)}
            />
        </View>
        <Text style={styles.title}>{notif.title}</Text>
        <Text style={styles.body}>{notif.body}</Text>
        <Button isLoading={false} 
            isLoadingText={<Text style={{ color: 'white' }}>Patientez...</Text>} 
            style={styles.btn} _text={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            leftIcon={<AntIcon name='download' style={{ color: 'white' }} />}
            onPress={() => saveQrToDisk(svg, notif.data?.purchase?.ticket?.event, notif.data?.purchase?.ticket)}
        >Télécharger le code qr</Button>
    </View>
  )
}

export default NewPurchaseNotif