import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Button, Modal, Select } from 'native-base';
import { Formik } from 'formik';
import { CommonInput, CommonSelect, CommonTextArea } from '../Commons/commons';
import { theme } from '../../assets/theme';

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
]

export default function AddTicketModal({setShowModal, showModal}) {
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Ajouter un billet</Modal.Header>
          <Modal.Body>
            <Formik>
                {({ handleSubmit, handleChange, values, errors, touched }) => (
                    fields.map((field, index) => (
                        field.name === 'price' ?
                        <View style={styles.flexFields} key={field.name}>
                            <CommonInput required={field.required} 
                                label={field.label} name={field.name} 
                                placeholder={field.placeholder} 
                                kType='numeric'
                                style={{
                                    width: '50%'
                                }}
                            />
                            <CommonSelect label="Devise" 
                                required name={field.name}
                                uiType="rounded"
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
                            // error={errors[field.name]} onChangeText={handleChange(field.name)} 
                            placeholder={field.placeholder}
                            label={field.label}
                            uiType='rounded'
                        />:
                        <CommonInput required={field.required} label={field.label}
                            name={field.name} placeholder={field.placeholder}
                            key={index}
                            kType={field.kType}
                        />
                    ))
                )}
            </Formik>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setShowModal(false);
            }}>
                Annuler
              </Button>
              <Button onPress={() => {
                setShowModal(false);
                }}
                style={styles.addBtn}
            >
                Enregistrer
              </Button>
            </Button.Group>
          </Modal.Footer>
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