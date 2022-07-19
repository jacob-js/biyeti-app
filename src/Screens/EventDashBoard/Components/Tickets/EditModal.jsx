import { View, StyleSheet } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Button, Modal, Select } from 'native-base';
import { useFormik } from 'formik';
import { CommonInput, CommonSelect, CommonTextArea } from '../../../../Commons/commons';
import { useDispatch, useSelector } from 'react-redux';
import { getTicketsAction } from '../../../../Redux/actions/tickets';
import * as yup from 'yup';
import { MessageAlert, showToast } from '../../../../Utils/feedbacks';
import { theme } from '../../../../../assets/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect } from '@react-navigation/native';
import useAxios from 'axios-hooks';

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
        required: true,
        value: "0"
    },
    {
        name: 'caption',
        label: 'Description',
        placeholder: 'Decrivez votre billet',
        required: false
    },
    {
        name: 'number_of_place',
        label: 'Nombre de places',
        kType: 'numeric',
    }
];

const validationSchema = yup.object({
    name: yup.string().required('Ce champs est obligatoire'),
    price: yup.number().required('Ce champs est obligatoire'),
    caption: yup.string(),
    place_number: yup.number(),
    currency: yup.string().required('Ce champs est obligatoire'),
})

export default function EditTicketModal({setShowModal, showModal, ticket}) {
    const { data: event } = useSelector(({ events: { event } }) => event);
    const [ apiError, setError ] = useState({});
    const dispatch = useDispatch();
    const [{ loading, error, data }, doPut] = useAxios({
        url: `/api/v1/tickets/${ticket.id}/?event_id=${event.id}`,
        method: 'PUT'
    }, { manual: true });

    const onSubmit = async() => {
        doPut({ data: values }).then(res =>{
            setShowModal(false);
            showToast('Billet modifié avec succès');
            getTicketsAction(event.id)(dispatch);
        });
    };

    const { handleChange, handleSubmit, values, errors, touched, setFieldValue } = useFormik({
        initialValues: fields.reduce((acc, field) => ({ ...acc, [field.name]: ticket[field.name] }), { currency: ticket.currency }),
        onSubmit: onSubmit,
        validationSchema: validationSchema
    });

    useFocusEffect(
        useCallback(() =>{
            (() =>{
                fields.forEach(field => {
                    setFieldValue(field.name, ticket[field.name]);
                });
                setFieldValue('currency', ticket.currency);
            })();

            return () => {}
        }, [ticket])
    );

    useEffect(() =>{
        (() =>{
            if(error){
                setError(error.response?.data?.error || error.message);
            }
        })()
    }, [error]);
    
    const getError = (field) =>{
        return apiError[field]
    };

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content w="full">
          <Modal.CloseButton />
          <Modal.Header>Editer un billet</Modal.Header>
            <KeyboardAwareScrollView>
                <Modal.Body>
                    {
                        typeof(apiError) === 'string'
                        && <MessageAlert msg={apiError.toString()} onClose={() =>setError({})} status='error' />
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
                                    value={values[field.name]}
                                />
                                <CommonSelect label="Devise" 
                                    required name={field.name}
                                    uiType="rounded"
                                    error={touched['currency'] && errors['currency'] || getError('currency')}
                                    onValueChange={handleChange('currency')}
                                    style={{
                                        width: '40%'
                                    }}
                                    value={values.currency?.toLowerCase()}
                                >
                                    <Select.Item label='$' value='usd' />
                                    <Select.Item label='FC' value='cdf' />
                                </CommonSelect>
                            </View>:
                            field.name === 'caption' ?
                            <CommonTextArea
                                key={field.name} 
                                error={errors[field.name] || getError(field.name)}
                                onChangeText={handleChange(field.name)} 
                                placeholder={field.placeholder}
                                label={field.label}
                                uiType='rounded'
                                value={values[field.name]}
                            />:
                            <CommonInput required={field.required} label={field.label}
                                name={field.name} placeholder={field.placeholder}
                                error={touched[field.name] && errors[field.name] || getError(field.name)}
                                key={index}
                                kType={field.kType}
                                onChangeText={handleChange(field.name)} 
                                value={values[field.name]?.toString()}
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
            </KeyboardAwareScrollView>
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