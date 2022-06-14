import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import FIcon from 'react-native-vector-icons/Feather'
import { CommonInput } from '../Commons/commons'
import { Button, theme as nbTheme } from 'native-base'
import { theme } from '../../assets/theme'
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import useAxios from 'axios-hooks'
import axios from 'axios'
import { MessageAlert } from '../Utils/feedbacks'

const schema = Yup.object({
    email: Yup.string().email('Email invalide').required('Email requis'),
});

const EmailOrPhoneInput = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const form = useFormik({
        initialValues: { email: '' },
        validationSchema: schema,
        onSubmit: async values => {
            setLoading(true);
            setError(null);
            await axios.get(`/api/v1/users/verification-code/${values.email}`).then(res => navigation.navigate('Verify', {
                token: res.data.data.token,
                callback: 'reset_pwd',
                email: values.email
            })).catch(() => setError("Veuillez reessayer plus tard"));
            setLoading(false)
        },
    });

    const { touched, errors, values, handleChange, handleBlur } = form;

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Veuillez entrer votre adresse mail</Text>
        <Text style={styles.subtitle}>Un code de vérification vous sera envoyé à cet email</Text>
        {
          error &&
          <MessageAlert msg={error} onClose={() =>setError(null)} status='error' />
        }
        <CommonInput required 
            error={touched.email && errors.email} 
            kType='email-address' 
            onChangeText={handleChange('email')}
            placeholder='Email' leftIcon={<FIcon name="mail" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} />
        <View style={{
                        height: 100,
                        justifyContent: 'center',
                        alignItems: 'center'
            }}
        >
            <Button isLoading={loading} 
                isLoadingText={<Text style={{ color: 'white' }}>Patientez...</Text>}
                style={styles.submitBtn} _text={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                onPress={() =>form.handleSubmit()}
            >Soumettre
            </Button>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.loginLink}><FIcon name='arrow-left' /> Retour à la connexion</Text>
        </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 20,
        fontFamily: 'Barlow-Bold',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'Barlow',
        textAlign: 'left',
        color: nbTheme.colors.light[500],
        marginTop: 15,
        marginBottom: 30,
        width: '100%',
        paddingRight: 70
    },
    submitBtn: {
        height: 50,
        width: Dimensions.get('window').width - 80,
        backgroundColor: theme.colors.default100,
        shadowOpacity: 0.4,
        shadowColor: theme.colors.default, 
        elevation: 15,
        borderRadius: 15
    },
    loginLink: {
        width: Dimensions.get('window').width - 80,
        fontSize: 14,
        color: nbTheme.colors.light[500],
        textAlign: 'left',
    }
})

export default EmailOrPhoneInput