import { View, Text, Image } from 'react-native'
import React from 'react';
import errorIcon from '../../../Notifications/icons/error.png';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Button } from 'native-base';
import styles from '../NewPurchaseNotif/styles';
import notifStyle from '../../styles';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../../../../assets/theme';

const PurchaseErrorNotif = ({notif}) => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <View style={styles.qrContainer}>
            <Image
                source={errorIcon}
                style={{ width: 232, height: 232 }}
            />
        </View>
        <Text style={styles.title}>{notif.title}</Text>
        <Text style={styles.body}>{notif.body}</Text>
        <Button isLoading={false} 
            isLoadingText={<Text style={{ color: 'white' }}>Patientez...</Text>} 
            style={notifStyle.outlineBtn} _text={{ fontWeight: 'bold', textTransform: 'uppercase', color: theme.colors.default }}
            rightIcon={<MatIcon name='arrow-expand' size={18} />}
            onPress={() => navigation.navigate('EventDetail', { eventId: notif.data?.purchase?.ticket?.event.id })}
        >Aller réessayer</Button>
    </View>
  )
}

export default PurchaseErrorNotif