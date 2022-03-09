import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { Formik } from 'formik'
import FIcon from 'react-native-vector-icons/Feather'
import SIcon from 'react-native-vector-icons/SimpleLineIcons'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CommonInput } from '../Commons/commons'
import { Button } from 'native-base'
import { theme } from '../../assets/theme'

export default function Login({ navigation }) {
    const [visible, setVisible] = useState(false)

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Formik
            initialValues={{ username: '', password: '' }}
            // validationSchema={validationSchema}
            // onSubmit={values => submit(values)}
        >
            {({ handleSubmit, errors, handleChange }) =>(
                <>
                    
                    <CommonInput required error={errors.username} label="Nom d'utilisateur" onChangeText={handleChange('username')} 
                        placeholder='Email ou N° de tél' leftIcon={<SIcon name="user" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} />
                    <CommonInput required error={errors.password} onChangeText={handleChange('password')} placeholder='Mot de passe' 
                        label='Mot de passe' leftIcon={<MIcon name="key-outline" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} 
                        type={!visible && 'password'}
                        rightIcon={ <TouchableOpacity onPress={() =>setVisible(!visible)}>
                            <FIcon style={{ fontSize: 15, marginRight: 15 }} name={visible ? 'eye': 'eye-off'} />
                        </TouchableOpacity> } />

                    <View style={{
                        height: 100,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Button isLoading={false} isLoadingText={<Text style={{ color: 'white' }}>Patientez...</Text>} style={styles.loginBtn} _text={{ fontWeight: 'bold', textTransform: 'uppercase' }} onPress={() =>navigation.navigate('Drawer')}>Connexion</Button>
                    </View>
                    <View>
                        <Text style={styles.noAccountText}>N'avez-vous pas de compte? <Text style={styles.noAccountLink}>Inscrivez-vous</Text> </Text>
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
        fontFamily: 'Barlow'
    },
    noAccountLink: {
        color: theme.colors.default100,
    }
})