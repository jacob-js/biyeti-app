import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import FIcon from 'react-native-vector-icons/Feather'
import { CommonInput } from '../Commons/commons'
import { Button, theme as nbTheme } from 'native-base'
import { theme } from '../../assets/theme'
import { useNavigation } from '@react-navigation/native'

const EmailOrPhoneInput = () => {
    const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Veuillez entrer votre adresse mail</Text>
        <Text style={styles.subtitle}>Un code de vérification vous sera envoyé à cet email</Text>
        <CommonInput required 
            // error={touched.email && errors.email || getError('email')} 
            kType='email-address' 
            // onChangeText={handleChange('email')}
            placeholder='Email' leftIcon={<FIcon name="mail" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} />
        <View style={{
                        height: 100,
                        justifyContent: 'center',
                        alignItems: 'center'
            }}
        >
            <Button isLoading={false} 
                isLoadingText={<Text style={{ color: 'white' }}>Patientez...</Text>}
                style={styles.submitBtn} _text={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                onPress={() =>navigation.navigate('ResetPwdForm')}
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