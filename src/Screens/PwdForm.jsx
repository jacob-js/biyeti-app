import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { Formik } from 'formik'
import FIcon from 'react-native-vector-icons/Feather'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CommonInput } from '../Commons/commons'
import { Button, theme as nbTheme } from 'native-base'
import { theme } from '../../assets/theme'
import { useNavigation } from '@react-navigation/native'
import Unorderedlist from 'react-native-unordered-list';

const PwdForm = () => {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false)
    const [visibleConfirm, setVisibleConfirm] = useState(false);


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
        <CommonInput required maxLength={4}
            // error={touched.password && errors.password || getError('password')} 
            // onChangeText={handleChange('password')} placeholder='Mot de passe' 
            leftIcon={<MIcon name="key-outline" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} 
            type={!visible && 'password'}
            label='Mot de passe'
            rightIcon={ <TouchableOpacity onPress={() =>{setVisible(!visible)}}>
                <FIcon style={{ fontSize: 15, marginRight: 15 }} name={visible ? 'eye': 'eye-off'} />
            </TouchableOpacity> } />
        <CommonInput required 
            // error={touched.confirmPwd && errors.confirmPwd}
            // onChangeText={handleChange('confirmPwd')} 
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
            <Button isLoading={false} 
                isLoadingText={<Text style={{ color: 'white' }}>Patientez...</Text>}
                style={styles.submitBtn} _text={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                onPress={() =>navigation.navigate('ResetPwdForm')}
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