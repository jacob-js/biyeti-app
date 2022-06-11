import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { theme } from 'native-base';
import {theme as ourTheme} from '../../assets/theme';

const VerificationCode = () => {
    const [code, setCode] = useState('');
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Veuillez entrer le code de vérification réçu par mail</Text>
        <Text style={styles.subtitle}>Le code est valide pendant 5 minutes</Text>
        <OTPInputView
            style={styles.input}
            pinCount={5}
            autoFocusOnLoad
            codeInputFieldStyle={styles.codelineStyleBase}
            codeInputHighlightStyle={styles.codelineStyleHighLighted}
            code={code}
            onCodeChanged={code => setCode(code)}
            onCodeFilled={(code) => {
                console.log(`Code is ${code}`);
            }}
        />
        <TouchableOpacity style={styles.button}>
            <Text style={styles.resend}>Renvoyer le code</Text>
            <ActivityIndicator size="small" />
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
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'Barlow',
        textAlign: 'center',
        color: theme.colors.light[500],
        marginTop: 10,
        marginBottom: 20
    },
    resend: {
        color: ourTheme.colors.default,
    },
    input: {
        width: '100%',
        height: 100,
    },
    codelineStyleBase: {
        width: 45,
        height: 45,
        borderWidth: 1,
        color: '#000',
        borderColor: theme.colors.light[300],
        borderRadius: 10,
    },
    codelineStyleHighLighted: {
        borderColor: theme.colors.green[600],
    }
});

export default VerificationCode