import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'native-base';
import FIcon from 'react-native-vector-icons/Feather'
import { theme } from '../../assets/theme';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { MessageAlert, showToast } from '../Utils/feedbacks'
import { Formik } from 'formik';
import { CommonInput } from '../Commons/commons';
import useAxios from 'axios-hooks';
import { getAgentsAction } from '../Redux/actions/agents';
import { useNavigation } from '@react-navigation/native';

const validationSchema = yup.object({
    role: yup.string().required('Ce champs est obligatoire')
})

export default function EditAgentModal({setShowModal, showModal, agent}) {
    const [{ loading, data, error }, upateAgent] = useAxios({
        url: `/api/v1/agents/${agent.id}`,
        method: 'PUT',
    }, { manual: true })
    const [submitError, setSubmitError] = useState(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const onSubmit = async(values) =>{
        try {
            const res = await upateAgent({ data: {...values, event_id: agent.event?.id} });
            if(res.status === 200){
                setShowModal(false);
                showToast("Modification effectuée avec succès", "success");
                getAgentsAction(null, agent.event?.id)(dispatch, navigation);
            };
        } catch (error) {
            setSubmitError(error.response?.data?.error || error?.message);
        }
    }

  return (
    <Modal isOpen={showModal} onClose={() => { !loading && setShowModal(false)}}>
        <Modal.Content paddingX="3" w="full">
            <Modal.CloseButton />
            <Modal.Header fontFamily="Barlow">Modifier</Modal.Header>
        <Formik
            initialValues={{ role: agent.role }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <>
                <Modal.Body>
                    <Text style={styles.descript}>Modifier le role du membre de l'organisation</Text>
                    {
                        typeof(submitError) === 'string' ?
                        <MessageAlert msg={submitError.toString()} onClose={() =>setSubmitError(null)} status='error' />:null
                    }
                    <CommonInput required error={touched.role && errors.role}
                        onChangeText={handleChange('role')} 
                        placeholder="Role de l'agent"
                        label='Role'
                        value={values.role}
                    />
                </Modal.Body>
                <Modal.Footer>
                <Button.Group space={2}>
                    <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                    setShowModal(false);
                }}>
                    Annuler
                    </Button>
                    <Button onPress={handleSubmit} isLoading={loading}
                    isLoadingText="Enregistrement..."
                    style={styles.addBtn}
                >
                    Enregistrer
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