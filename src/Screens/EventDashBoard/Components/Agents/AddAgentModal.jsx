import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'native-base';
import FIcon from 'react-native-vector-icons/Feather'
import { theme } from '../../../../../assets/theme';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { MessageAlert } from '../../../../Utils/feedbacks'
import { Formik } from 'formik';
import { CommonInput } from '../../../../Commons/commons';
import { createAgentAction } from '../../../../Redux/actions/agents';

const validationSchema = yup.object({
    user_id: yup.string().required('Ce champs est obligatoire'),
    role: yup.string().required('Ce champs est obligatoire'),
})

export default function AddAgentModal({setShowModal, showModal, eventId}) {
    const { isLoading, error } = useSelector(({ agents: {createAgent} }) => createAgent);
    const dispatch = useDispatch();
    const [submitError, setSubmitError] = useState(null);

    const onSubmit = (values) =>{
        createAgentAction({ ...values, event_id: eventId })(dispatch, cb =>{
            if(cb) setShowModal(false);
        });
    }

    useEffect(() =>{
        (() =>{
            setSubmitError(error)
        })()
    }, [error]);

  return (
    <Modal isOpen={showModal} onClose={() => { !isLoading && setShowModal(false)}}>
        <Modal.Content paddingX="3" w="full">
            <Modal.CloseButton />
            <Modal.Header fontFamily="Barlow">Nouveau membre</Modal.Header>
        <Formik
            initialValues={{ user_id: '', role: '' }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <>
                <Modal.Body>
                    <Text style={styles.descript}>Ajouter un membre de l'organisation en donnant son email ou son numéro de téléphone et en suite ajouter son role</Text>
                    {
                        typeof(submitError) === 'string' ?
                        <MessageAlert msg={submitError.toString()} onClose={() =>setSubmitError(null)} status='error' />:
                        submitError?.user_id &&
                        <MessageAlert msg={submitError?.user_id?.toString()} onClose={() =>setSubmitError(null)} status='error' />
                    }
                    <CommonInput required error={touched.user_id && errors.user_id} kType='email-address' 
                        onChangeText={handleChange('user_id')} 
                        placeholder="Email ou numéro de téléphone de l'utilisateur"
                        label='Identifiant' 
                        leftIcon={<FIcon name="user" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} 
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
                    <Button onPress={handleSubmit} isLoading={isLoading}
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
    container: {
        paddingHorizontal: 50
    },
    addBtn: {
        backgroundColor: theme.colors.default100,
        shadowOpacity: 0.4,
        shadowColor: theme.colors.default, 
        elevation: 15,
        borderRadius: 10,
        marginTop: 10
    },
    descript: {
        fontFamily: 'Barlow',
        marginVertical: 20
    }
})