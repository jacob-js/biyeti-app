import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { useFormik } from 'formik'
import FIcon from 'react-native-vector-icons/Feather'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CommonInput } from '../Commons/commons'
import { Button, theme as nbTheme } from 'native-base'
import { theme } from '../../assets/theme'
import { useNavigation } from '@react-navigation/native'
import Unorderedlist from 'react-native-unordered-list';
import * as yup from 'yup';
import axios from 'axios'
import { MessageAlert, showToast } from '../Utils/feedbacks'

const schema = yup.object({
    password: yup.string().required('Ce champ est obligatoire')
                .matches(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})"), 'Le mot de passe doit contenir au moins 8 caractères comportant au moins une lettre et un chiffre')
                .notOneOf(['1234', '01234'], 'le mot de passe doit être différent de 1234 ou 01234'),
    confirmPwd: yup.string().when('password', {
        is: (val) => (val && val.length >= 8),
        then: yup.string().required('Ce champ est obligatoire').oneOf([yup.ref('password')], 'Ce champ doit être identique au mot de passe')
    })
})

const PwdForm = ({route}) => {
    const navigation = useNavigation();
    const token = route.params?.token;
    const [visible, setVisible] = useState(false)
    const [visibleConfirm, setVisibleConfirm] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ apiError, setError ] = useState();
    const formik = useFormik({
        initialValues: { password: '', confirmPwd: '' },
        validationSchema: schema,
        onSubmit: async(values) => {
            setLoading(true);
            setError(null);
            await axios.put(`/api/v1/users/reset-password`, { ...values, confirm_password: values.confirmPwd }, {
                headers: {
                    'verificationtoken': token
                },
                timeout: 60000
            }).then(res => {
                navigation.navigate('Login'); 
                showToast("votre mot de passe a été modifié avec succès", "success");
            }).catch(err => { setError("Quelque chose s'est mal passée, veuillez réessayer") });
            setLoading(false);
        }
    });
    const { handleChange, errors, touched, handleSubmit } = formik;


  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Configurer votre nouveau mot de passe</Text>
        <View style={styles.subView}>
            <Text style={styles.subtitle}>Votre mot de passe doit comporter :</Text>
            <Unorderedlist bulletUnicode="0x25E6">
                <Text style={styles.listItem}>Au minimun 8 caractères</Text>
            </Unorderedlist>
            <Unorderedlist bulletUnicode="0x25E6">
                <Text style={styles.listItem}>Au moins une lettre alphabétique</Text>
            </Unorderedlist>
        </View>
        {
          apiError &&
          <MessageAlert msg={apiError} onClose={() =>setError(null)} status='error' />
        }
        <CommonInput required
            error={touched.password && errors.password} 
            onChangeText={handleChange('password')} placeholder='Mot de passe' 
            leftIcon={<MIcon name="key-outline" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} 
            type={!visible && 'password'}
            label='Mot de passe'
            rightIcon={ <TouchableOpacity onPress={() =>{setVisible(!visible)}}>
                <FIcon style={{ fontSize: 15, marginRight: 15 }} name={visible ? 'eye': 'eye-off'} />
            </TouchableOpacity> } />
        <CommonInput required 
            error={touched.confirmPwd && errors.confirmPwd}
            onChangeText={handleChange('confirmPwd')} 
            label='Confirmer le mot de passe' 
            leftIcon={<MIcon name="key-outline" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} 
            type={!visibleConfirm && 'password'}
            rightIcon={ <TouchableOpacity onPress={() =>setVisibleConfirm(!visibleConfirm)}>
                <FIcon style={{ fontSize: 15, marginRight: 15 }} name={visibleConfirm ? 'eye': 'eye-off'} />
            </TouchableOpacity> } />
        <View style={{
                        height: 100,
                        justifyContent: 'center',
                        alignItems: 'center'
            }}
        >
            <Button isLoading={loading} 
                isLoadingText={<Text style={{ color: 'white' }}>Patientez...</Text>}
                style={styles.submitBtn} _text={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                onPress={() =>handleSubmit()}
            >Soumettre
            </Button>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}><FIcon name='arrow-left' /> Annuler</Text>
        </TouchableOpacity>
    </ScrollView>
  )
};

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
        textAlign: 'left',
        marginBottom: 20
    },
    subView: {
        width: '100%',
        marginTop: 10,
        marginBottom: 30,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'Barlow',
        textAlign: 'left',
        color: nbTheme.colors.light[500],
        marginBottom: 10
    },
    listItem: {
        color: nbTheme.colors.warning[500],
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
});

export default PwdForm