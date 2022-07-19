import { View, Text } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Actionsheet, Button, FormControl, Select } from 'native-base'
import { CommonInput, CommonPhoneInput, CommonSelect } from '../../../../Commons/commons'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFormik } from 'formik'
import axios from 'axios'
import { showToast } from '../../../../Utils/feedbacks';
import * as yup from 'yup';
import { useFocusEffect } from '@react-navigation/native'

const validationSchema = yup.object({
    phone_number: yup.string().required('Ce champs est obligatoire')
});

const Checkout = ({isOpen, setIsOpen, ticket}) => {
    const [loading, setLoading] = useState(false);
    const { setFieldValue, values, handleSubmit, errors } = useFormik({
        initialValues: {
            phone_number: ''
        },
        onSubmit: async values =>{
            setLoading(true)
            const phone = values.phone_number.replace(/\D/g, '');
            try {
                const res = await axios.post(`/api/v1/payments/initiate`, { amount: ticket.price, currency: ticket.currency, phone, ticket: ticket.id, event: ticket.event?.id });
            } catch (error) {
                const response = error.response;
                if(response){
                    if(typeof(response.data.error?.error) === 'object'){
                        const err = response.data?.error?.error[0] || 'Une erreur est survenue';
                        showToast(err, 'danger');
                    }else if(typeof(response.data.error) === 'string'){
                        showToast(response.data.error, 'danger');
                    }else{
                        showToast('Une erreur est survenue', 'danger');
                    }
                }else{
                    showToast('Une erreur est survenue', "error");
                }
            }
            setLoading(false)
        },
        validationSchema: validationSchema
    });

    useFocusEffect(
        useCallback(() =>{

            return () => {}
        }, [])
    )

  return (
    <Actionsheet isOpen={isOpen} onClose={() =>setIsOpen(false)}>
        <Actionsheet.Content p={5} bg="white">
        <KeyboardAwareScrollView>
        <View style={styles.flexFields}>
            <CommonInput 
                label="Prix"
                kType='numeric'
                style={{
                    width: '50%'
                }}
                value={ticket['price']}
                editable={false}
                isDisabled={true}
            />
            <CommonSelect label="Devise" 
                required
                uiType="rounded"
                style={{
                    width: '40%'
                }}
                value={ticket['currency']}
                isDisabled={true}
            >
                <Select.Item label='$' value='usd' />
                <Select.Item label='FC' value='cdf' />
            </CommonSelect>
        </View>
        <View style={styles.wallet}>
            <FormControl.Label style={styles.label}>Entrer le numéro mobile-money</FormControl.Label>
            <CommonPhoneInput value={values.phone_number} setFieldValue={setFieldValue} required={true} error={errors.phone_number} />
        </View>
        <Button
            isLoadingText="Patientez..."
            style={styles.btn}
            isLoading={loading}
            onPress={handleSubmit}
        >
            Payer
        </Button>
        </KeyboardAwareScrollView>
        </Actionsheet.Content>
    </Actionsheet>
  )
}

export default Checkout