import { View, Text } from 'react-native'
import React, { useCallback, useContext, useState, useEffect } from 'react'
import { Actionsheet, Button, FormControl, Select } from 'native-base'
import { CommonInput, CommonPhoneInput, CommonSelect } from '../../../../../../Commons/commons'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFormik } from 'formik'
import axios from 'axios'
import { MessageAlert, showToast } from '../../../../../../Utils/feedbacks';
import * as yup from 'yup';
import { useFocusEffect } from '@react-navigation/native'
import SuccessModal from '../../../../../../Components/SuccessModal'
import context from '../../context'
import ConfirmPwdModal from '../../../../../../Components/ConfirmPwdModal'

const validationSchema = yup.object({
    phone_number: yup.string().required('Ce champs est obligatoire'),
    amount: yup.string().required('Ce champs est obligatoire'),
    currency: yup.string().required('Ce champs est obligatoire')
});

const WithdrawForm = ({isOpen, setIsOpen}) => {
    const { wallet, event } = useContext(context);
    const [loading, setLoading] = useState(false);
    const [showSucces, setShowSucess] = useState(false);
    const [apiErrors, setErrors] = useState({});
    const [stringError, setStringError] = useState('');
    const [viewPwdPrompt, setViewPwdPrompt] = useState(false);
    const { setFieldValue, values, handleSubmit, errors, setFieldError, isValid, validateForm } = useFormik({
        initialValues: {
            phone_number: '',
            amount: '',
            currency: '',
            password: ''
        },
        onSubmit: async values =>{
            setLoading(true);
            setErrors({});
            setStringError('');
            const phone = values.phone_number.replace(/\D/g, '');
            try {
                const res = await axios.post(`/api/v1/wallets/request-transfer/${event.id}`, { ...values, phone_number: phone });
                setShowSucess(true);
                setIsOpen(false);
            } catch (error) {
                const response = error.response;
                if(response){
                    if(typeof(response.data.error?.error) === 'object'){
                        const err = response.data?.error?.error[0] || 'Une erreur est survenue';
                        setStringError(err);
                    }else if(typeof(response.data.error) === 'object'){
                        setErrors(response.data.error);
                    }else if(typeof(response.data.error) === 'string'){
                        setStringError(response.data.error);
                    }else{
                        setStringError('Une erreur est survenue');
                    }
                }else{
                    setStringError('Une erreur est survenue');
                }
            }
            setLoading(false)
        },
        validationSchema: validationSchema
    });

    useFocusEffect(
        useCallback(() =>{
            (() =>{
                setFieldValue('amount', Number(wallet.usd_balance).toFixed(0) || 0);
                setFieldValue('currency', 'usd');
            })();
            return () => {
                setFieldValue('phone_number', '');
            }
        }, [wallet])
    );

    useEffect(() =>{
        (() =>{
            if(!isOpen){
                setFieldValue('phone_number', '');
                setFieldValue('password', '');
            }
        })

        return () =>{
            setFieldValue('phone_number', '');
        }
    }, [isOpen]);

    const getMaxAmount = () => {
        if(values.currency === 'usd'){
            return Number(wallet.usd_balance);
        }else{
            return Number(wallet.cdf_balance);
        }
    };

    const onAmountChange = (value) => {
        if(Number(value) > getMaxAmount()){
            setFieldValue('amount', getMaxAmount());
        }else{
            setFieldValue('amount', value);
        }
    };

    const getFieldError = (field) => {
        const err = apiErrors[field];
        if(typeof(err) === 'object'){
            return err[0];
        }else{
            return err;
        }
    }

  return (
    <>
        <SuccessModal showModal={showSucces} onClose={() =>{ setShowSucess(false); setIsOpen(false) }} />
        <Actionsheet zIndex={1} isOpen={isOpen} onClose={() => !loading && setIsOpen(false)}>
            <Actionsheet.Content p={5} bg="white" zIndex={2}>
            <KeyboardAwareScrollView>
                {
                    stringError ?
                    <MessageAlert status='danger' msg={stringError} onClose={() =>setStringError('')} />: null
                }
            <View style={styles.flexFields}>
                <CommonInput 
                    label="Montant"
                    kType='numeric'
                    style={{
                        width: '50%'
                    }}
                    value={values.amount}
                    onChangeText={onAmountChange}
                    required={true}
                    error={errors.amount || getFieldError('amount')}
                />
                <CommonSelect label="Devise" 
                    required
                    uiType="rounded"
                    style={{
                        width: '40%'
                    }}
                    value={values.currency}
                    error={errors.currency || getFieldError('currency')}
                    onValueChange={(value) => setFieldValue('currency', value)}
                >
                    <Select.Item label='$' value='usd' />
                    <Select.Item label='FC' value='cdf' />
                </CommonSelect>
            </View>
            <View style={styles.wallet}>
                <FormControl.Label style={styles.label}>Entrer le numéro mobile-money</FormControl.Label>
                <CommonPhoneInput value={values.phone_number} setFieldValue={setFieldValue} required={true} error={errors.phone_number || getFieldError('phone_number')} />
            </View>
            <Button
                isLoadingText="Patientez..."
                style={styles.btn}
                isLoading={loading}
                onPress={() =>{
                    if(isValid){
                        setViewPwdPrompt(true);
                    }else{
                        validateForm(values);
                    }
                }}
            >
                Valider
            </Button>
            </KeyboardAwareScrollView>
            </Actionsheet.Content>
        </Actionsheet>
        <ConfirmPwdModal isOpen={viewPwdPrompt} setIsOpen={setViewPwdPrompt} cb={handleSubmit} onClose={() =>{
            setViewPwdPrompt(false);
            setIsOpen(false);
        }} handleChange={(value) =>setFieldValue('password', value)} />
    </>
  )
}

export default WithdrawForm