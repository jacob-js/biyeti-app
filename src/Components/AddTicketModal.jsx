import { View, Text, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { Button, Modal, Select } from 'native-base';
import { Formik } from 'formik';
import { CommonInput, CommonSelect, CommonTextArea } from '../Commons/commons';
import { theme } from '../../assets/theme';
import { useDispatch, useSelector } from 'react-redux';
import { createTicketAction } from '../Redux/actions/tickets';
import * as yup from 'yup';
import { MessageAlert } from '../Utils/feedbacks'

const fields = [
    {
        name: 'name',
        label: 'Type de billet',
        placeholder: 'Ex: Standard, Vip, Fille, ...',
        required: true
    },
    {
        name: 'price',
        label: 'Prix',  
        required: true
    },
    {
        name: 'caption',
        label: 'Description',
        placeholder: 'Decrivez votre billet',
        required: true
    },
    {
        name: 'place_number',
        label: 'Nombre de places',
        kType: 'numeric',
    }
];

const validationSchema = yup.object({
    name: yup.string().required('Ce champs est obligatoire'),
    price: yup.number().required('Ce champs est obligatoire'),
    caption: yup.string().required('Ce champs est obligatoire'),
    place_number: yup.number().required('Ce champs est obligatoire'),
    currency: yup.string().required('Ce champs est obligatoire'),
})

export default function AddTicketModal({setShowModal, showModal, eventId}) {
    const { loading, error } = useSelector(({ tickets: { createTicket } }) => createTicket);
    const { data: event } = useSelector(({ events: { event } }) => event);
    const [ apiError, setError ] = useState({});
    const dispatch = useDispatch();
    
    const onSubmit = (values) => {
        createTicketAction({ event: event.id, ...values })(dispatch, cb =>{
            if(cb){
                setShowModal(false);
            }
        });
    };
    const getError = (field) =>{
        return apiError[field]
    }
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Ajouter un billet</Modal.Header>
        <Formik
            initialValues={fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), { currency: '' })}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <>
                <Modal.Body>
                    {
                        typeof(apiError) === 'string' && typeof(error) === 'string'
                        && <MessageAlert msg={error.toString()} onClose={() =>setError({})} status='error' />
                    }
                    {
                        fields.map((field, index) => (
                            field.name === 'price' ?
                            <View style={styles.flexFields} key={field.name}>
                                <CommonInput required={field.required} 
                                    label={field.label} name={field.name} 
                                    placeholder={field.placeholder} 
                                    onChangeText={handleChange(field.name)} 
                                    kType='numeric'
                                    error={touched[field.name] && errors[field.name] || getError(field.name)}
                                    style={{
                                        width: '50%'
                                    }}
                                />
                                <CommonSelect label="Devise" 
                                    required name={field.name}
                                    uiType="rounded"
                                    error={touched['currency'] && errors['currency'] || getError('currency')}
                                    onValueChange={handleChange('currency')}
                                    style={{
                                        width: '40%'
                                    }}
                                >
                                    <Select.Item label='$' value='usd' />
                                    <Select.Item label='Fc' value='fc' />
                                </CommonSelect>
                            </View>:
                            field.name === 'caption' ?
                            <CommonTextArea
                                key={field.name} required 
                                error={touched[field.name] && errors[field.name] || getError(field.name)}
                                onChangeText={handleChange(field.name)} 
                                placeholder={field.placeholder}
                                label={field.label}
                                uiType='rounded'
                            />:
                            <CommonInput required={field.required} label={field.label}
                                name={field.name} placeholder={field.placeholder}
                                error={touched[field.name] && errors[field.name] || getError(field.name)}
                                key={index}
                                kType={field.kType}
                                onChangeText={handleChange(field.name)} 
                            />
                        ))
                    }
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
}

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