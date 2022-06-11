import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import { Formik } from 'formik'
import FIcon from 'react-native-vector-icons/Feather'
import SIcon from 'react-native-vector-icons/SimpleLineIcons'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CommonInput } from '../Commons/commons'
import { Button, theme as nbTheme } from 'native-base'
import { theme } from '../../assets/theme'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../Redux/actions/auth'
import * as yup from 'yup';
import { MessageAlert } from '../Utils/feedbacks'

const validationSchema = yup.object({
    identifier: yup.string().required('Ce champs est obligatoire'),
    password: yup.string().required('Ce champs est obligatoire')
})

export default function Login({ navigation }) {
    const [visible, setVisible] = useState(false);
    const [ apiError, setError ] = useState({});
    const { data, loading, error } = useSelector(({ users: { login } }) => login);
    const dispatch = useDispatch();

    useEffect(() =>{
        (() =>{
            setError(error)
        })()
    }, [error])

    const getError = (field) =>{
        return apiError[field]
    }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      {
          typeof(apiError) === 'string' && typeof(error) === 'string'
          && <MessageAlert msg={error.toString()} onClose={() =>setError({})} status='error' />
      }
      <Formik
            initialValues={{ identifier: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={values => loginAction(values)(dispatch, navigation)}
        >
            {({ handleSubmit, errors, handleChange, touched }) =>(
                <>
                    
                    <CommonInput required 
                        error={touched.identifier && errors.identifier || getError('identifier')}
                        onChangeText={handleChange('identifier')}
                        placeholder='Email ou N° de tél' leftIcon={<SIcon name="user" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} />
                    <CommonInput required error={touched.password && errors.password} onChangeText={handleChange('password')} placeholder='Mot de passe' 
                        leftIcon={<MIcon name="key-outline" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} 
                        type={!visible && 'password'}
                        rightIcon={ <TouchableOpacity onPress={() =>setVisible(!visible)}>
                            <FIcon style={{ fontSize: 15, marginRight: 15 }} name={visible ? 'eye': 'eye-off'} />
                        </TouchableOpacity> } />

                    <View style={{
                        height: 100,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Button isLoading={loading} 
                            isLoadingText={<Text style={{ color: 'white' }}>Patientez...</Text>}
                            style={styles.loginBtn} _text={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                            onPress={handleSubmit}>Connexion
                        </Button>
                    </View>
                    <View style={styles.bottomLinks}>
                        <Text style={styles.noAccountText}><Text style={styles.noAccountLink} onPress={() =>navigation.navigate('Signup')}>Créer un compte</Text> </Text>
                        <Text style={styles.noAccountLink} onPress={() =>navigation.navigate('ResetPwdEmailForm')}>Mot de passe oublié ?</Text>
                    </View>
                </>
            )}
        </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 40
    },
    logo: {
        width: 200,
        height: 150
    },
    loginBtn: {
        height: 50,
        width: Dimensions.get('window').width - 80,
        backgroundColor: theme.colors.default100,
        shadowOpacity: 0.4,
        shadowColor: theme.colors.default, 
        elevation: 15,
        borderRadius: 15
    },
    bottomLinks: {
        width: '100%',
    },
    noAccountText: {
        fontWeight: '100',
        fontFamily: 'Barlow',
        marginBottom: 15
    },
    noAccountLink: {
        // color: theme.colors.default100,
        // fontFamily: 'Barlow',
        // textAlign: 'center',
        fontSize: 14,
        color: nbTheme.colors.light[500],
        textAlign: 'left',
    }
})