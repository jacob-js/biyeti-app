import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Modal } from 'native-base';
import vector from '../../../../../../Assets/vectors/checked.png';

const SuccessModal = ({showModal, onClose}) => {
  return (
    <Modal isOpen={showModal} onClose={onClose}>
        <Modal.Content w="full" h="full">
          <Modal.CloseButton />
            <View style={styles.container}>
                <Image source={vector} alt="sucess" style={{width: 200, height: 200}} />
                <Text style={styles.msg}>
                    Votre demande a été traitée avec succès. Vous allez recevoir une notification avec le résultat.
                </Text>
            </View>
        </Modal.Content>
      </Modal>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        position: 'absolute',
        top: 100,
        left: 50,
        right: 50
    },
    msg: {
        fontFamily: 'Barlow-Bold',
        textAlign: 'center',
        marginTop: 10
    }
})

export default SuccessModal