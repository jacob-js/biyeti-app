import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import FIcon from 'react-native-vector-icons/Feather'
import SIcon from 'react-native-vector-icons/SimpleLineIcons'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { CommonInput } from '../Commons/commons'
import { Button, FormControl } from 'native-base'
import { theme } from '../../assets/theme'
import { Title } from 'react-native-paper'
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { signupAction } from '../Redux/actions/auth'
import { MessageAlert } from '../Utils/feedbacks'
import moment from 'moment';
import DatePicker from '@react-native-community/datetimepicker'

const schema = yup.object({
    firstname: yup.string().required('Ce champ est obligatoire'),
    lastname: yup.string().required('Ce champ est obligatoire'),
    email: yup.string().email('Ce champ doit être un email valide').required('Ce champ est obligatoire'),
    password: yup.string().required('Ce champ est obligatoire')
                .length(4, 'Ce champ doit comporter 4 caractères')
                .matches(/^[0-9]+$/, 'Ce champ doit comporter que des chiffres')
                .notOneOf(['1234', '01234'], 'le mot de passe doit être différent de 1234 ou 01234'),
    phone_number: yup.string().required("Ce champ est obligatoire").min(9, 'numéro de téléphone invalid')
                    .matches(/[0-9]+$/, "numéro de téléphone invalid"),
    confirmPwd: yup.string().when('password', {
        is: (val) => (val && val.length === 4),
        then: yup.string().required('Ce champ est obligatoire').oneOf([yup.ref('password')], 'Ce champ doit être identique au mot de passe')
    })
})

export default function Signup({navigation}) {
    const [visible, setVisible] = useState(false)
    const [visibleConfirm, setVisibleConfirm] = useState(false);
    const [ apiError, setError ] = useState({});
    const [shownPicker, setShownPicker] = useState(false);
    const { data, loading, error } = useSelector(({ users: { signup } }) => signup);
    const dispatch = useDispatch();

    const submit = (values) => {
        const date_of_birth = moment(values.date_of_birth).format('YYYY-MM-DD')
        signupAction({...values, date_of_birth})(dispatch, navigation)
    }

    useEffect(() =>{
        (() =>{
            setError(error)
        })()
    }, [error]);

    const getError = (field) =>{
        return apiError[field]
    }

    const onDateChange = (event, date, setField) =>{
        setShownPicker(false);
        if(date){
            setField('date_of_birth', date);
            console.log(date);
        }
    };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Title style={styles.title}>Inscription</Title>
        {
          typeof(apiError) === 'string' && typeof(error) === 'string' &&
          <MessageAlert msg={error.toString()} onClose={() =>setError({})} status='error' />
        }
        <Formik
            initialValues={{ firstname: '', lastname: '', email: '', phone_number: '', password: '', confirmPwd: '', date_of_birth: new Date() }}
            validationSchema={schema}
            onSubmit={values => submit(values)}
        >
            {({ handleSubmit, errors, handleChange, touched, setFieldValue, values }) =>(
                <>
                    
                    <CommonInput required error={touched.firstname && errors.firstname || error?.firstname} onChangeText={handleChange('firstname')} 
                        placeholder='Nom' leftIcon={<SIcon name="user" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} />
                    <CommonInput required error={touched.lastname && errors.lastname} onChangeText={handleChange('lastname')} 
                        placeholder='Post-nom' leftIcon={<SIcon name="user" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} />
                    <CommonInput required error={touched.email && errors.email || getError('email')} kType='email-address' onChangeText={handleChange('email')} 
                        placeholder='Email' leftIcon={<FIcon name="mail" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} />
                    <CommonInput required error={touched.phone_number && errors.phone_number || getError('phone_number')} kType='phone-pad' onChangeText={handleChange('phone_number')} 
                        placeholder='Téléphone' leftIcon={<FIcon name="phone" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} />
                    <CommonInput 
                        onPressIn={setShownPicker}
                        placeholder="Date de naissance" uiType='rounded'
                        leftIcon={<AntIcon name="calendar" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />}
                        value={moment(values.date_of_birth).format('DD/MM/YYYY')}
                        error={touched.date_of_birth && errors.date_of_birth || getError('date_of_birth')}
                    />
                    {
                        shownPicker &&
                        <DatePicker
                            value={values.date_of_birth || new Date()}
                            mode="datetime"
                            format="YYYY-MM-DD"
                            minDate={new Date()}
                            is24Hour={true}
                            onChange={(event, date) =>onDateChange(event, date, setFieldValue)}
                        />
                    }
                    <CommonInput required maxLength={4}
                        error={touched.password && errors.password || getError('password')} 
                        onChangeText={handleChange('password')} placeholder='Mot de passe' 
                        leftIcon={<MIcon name="key-outline" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} 
                        type={!visible && 'password'}
                        rightIcon={ <TouchableOpacity onPress={() =>{setVisible(!visible)}}>
                            <FIcon style={{ fontSize: 15, marginRight: 15 }} name={visible ? 'eye': 'eye-off'} />
                        </TouchableOpacity> } />
                    <CommonInput required error={touched.confirmPwd && errors.confirmPwd} onChangeText={handleChange('confirmPwd')} placeholder='Confirmer le mot de passe' 
                        leftIcon={<MIcon name="key-outline" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} 
                        type={!visibleConfirm && 'password'}
                        rightIcon={ <TouchableOpacity onPress={() =>setVisibleConfirm(!visibleConfirm)}>
                            <FIcon style={{ fontSize: 15, marginRight: 15 }} name={visibleConfirm ? 'eye': 'eye-off'} />
                        </TouchableOpacity> } />

                    <View style={{
                        height: 100,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Button isLoading={loading} isLoadingText={<Text style={{ color: 'white' }}>Patientez...</Text>} style={styles.loginBtn} _text={{ fontWeight: 'bold', textTransform: 'uppercase' }} onPress={() =>handleSubmit()}>M'inscrire</Button>
                    </View>
                    <View>
                        <Text style={styles.noAccountText}>Avez-vous un compte? <Text style={styles.noAccountLink} onPress={() =>navigation.navigate('Login')}>Connectez-vous</Text> </Text>
                    </View>
                </>
            )}
        </Formik>
      </View>
    </ScrollView>
  )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 40
    },
    title: {
        textTransform: 'capitalize',
        fontFamily: 'Barlow-Bold',
        color: theme.colors.default,
        marginBottom: 30,
        fontSize: 30,
        paddingLeft: 10,
        marginTop: 40
    },
    logo: {
        width: 400,
        height: 200
    },
    loginBtn: {
        height: 50,
        width: Dimensions.get('window').width - 80,
        backgroundColor: theme.colors.default100,
        shadowOpacity: 0.4,
        shadowColor: theme.colors.default, 
        elevation: 15
    },
    noAccountText: {
        fontWeight: '100',
        fontFamily: 'Barlow',
        textAlign: 'center',
    },
    noAccountLink: {
        color: theme.colors.default100,
    }
})