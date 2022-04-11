import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Button, Modal } from 'native-base';
import FIcon from 'react-native-vector-icons/Feather'
import { theme } from '../../assets/theme';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { MessageAlert } from '../Utils/feedbacks'
import { Formik } from 'formik';
import { CommonInput } from '../Commons/commons';

const validationSchema = yup.object({
    email: yup.string().email('Email invalide').required('Ce champs est obligatoire'),
})

export default function AddAgentModal({setShowModal, showModal, eventId}) {
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Ajouter agent</Modal.Header>
        <Formik
            initialValues={{ email: '', role: '' }}
            // onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <>
                <Modal.Body>
                    {/* {
                        typeof(apiError) === 'string' && typeof(error) === 'string'
                        && <MessageAlert msg={error.toString()} onClose={() =>setError({})} status='error' />
                    } */}
                    <CommonInput required error={touched.email && errors.email} kType='email-address' 
                        onChangeText={handleChange('email')} 
                        placeholder="Email de l'agent"
                        label='Email' 
                        leftIcon={<FIcon name="mail" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} 
                    />
                    <CommonInput required error={touched.role && errors.role}
                        onChangeText={handleChange('role')} 
                        placeholder="Role de l'agent"
                        label='Role' 
                    />
                </Modal.Body>
                <Modal.Footer>
                <Button.Group space={2}>
                    <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                    setShowModal(false);
                }}>
                    Annuler
                    </Button>
                    <Button onPress={handleSubmit} isLoading={false}
                    isLoadingText="Enregistrement..."
                    style={styles.addBtn}
                >
                    Ajouter
                    </Button>
                </Button.Group>
                </Modal.Footer>
                </>
            )}
        </Formik>
        </Modal.Content>
    </Modal>
  )
};

const styles = StyleSheet.create({
    flexFields: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addBtn: {
        backgroundColor: theme.colors.default100,
        shadowOpacity: 0.4,
        shadowColor: theme.colors.default, 
        elevation: 15,
        borderRadius: 10,
        marginTop: 10
    }
})