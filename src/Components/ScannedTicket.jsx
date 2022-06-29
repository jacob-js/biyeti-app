import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Button, Modal } from 'native-base';
import FIcon from 'react-native-vector-icons/Feather'
import SIcon from 'react-native-vector-icons/SimpleLineIcons'
import { theme } from '../../assets/theme';
import { MessageAlert } from '../Utils/feedbacks'
import { DashboardEventContext } from '../Utils/contexts';

export default function ScannedTicketModal() {
    const {scanned, setShowScanned, showScanned} = useContext(DashboardEventContext);

  return (
    <Modal isOpen={showScanned} onClose={() =>setShowScanned(false)}>
        <Modal.Content paddingX="3" w="85%">
            <Modal.CloseButton />
            <Modal.Header mt="3">
                <MessageAlert msg="Billet validé" status="success" />
            </Modal.Header>
            <Modal.Body>
                <View style={styles.user}>
                    <Avatar bg="light.200" 
                        source={scanned?.user?.avatar &&{
                            uri: scanned?.user?.avatar
                        }}
                        style={styles.avatar}
                        size='2xl'
                        borderColor='#fff'
                        borderWidth={2}
                    >
                        <SIcon name='user' size={50} color="gray" />
                    </Avatar>
                    <Text style={styles.name}>{scanned?.user.firstname} {scanned?.user.lastname}</Text>
                </View>
                <View style={styles.ticket}>
                    <Text>Billet : </Text>
                    <Text style={styles.type}>{scanned?.ticket.name}</Text>
                </View>
            </Modal.Body>
        </Modal.Content>
    </Modal>
  )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 50
    },
    user: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    name: {
        fontSize: 20,
        marginTop: 20,
        fontFamily: 'Barlow-Bold'
    },
    ticket: {
        margin: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 20
    },
    type: {
        fontFamily: 'Barlow-Bold',
        textTransform: 'uppercase',
        color: theme.colors.gold
    }
})