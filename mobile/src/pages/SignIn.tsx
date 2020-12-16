import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AuthContext from '../contexts/auth';
import api from '../services/api';

export default function SignIn() {
    const { signed, user, signIn } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    function handleSignIn(){
      signIn(email, password);
    }
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
                secureTextEntry                
                style={[styles.input]}
                value={password}
                onChangeText={setPassword}
            />

            <RectButton style={styles.nextButton} onPress={handleSignIn}>
                <Text style={styles.nextButtonText}>Entrar</Text>
            </RectButton>
        </ScrollView>
    )

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    title: {
      color: '#5c8599',
      fontSize: 24,
      fontFamily: 'Nunito_700Bold',
      marginBottom: 32,
      paddingBottom: 24,
      borderBottomWidth: 0.8,
      borderBottomColor: '#D3E2E6'
    },
  
    label: {
      color: '#8fa7b3',
      fontFamily: 'Nunito_600SemiBold',
      marginBottom: 8,
    },
  
    comment: {
      fontSize: 11,
      color: '#8fa7b3',
    },
  
    input: {
      backgroundColor: '#fff',
      borderWidth: 1.4,
      borderColor: '#d3e2e6',
      borderRadius: 20,
      height: 56,
      paddingVertical: 18,
      paddingHorizontal: 24,
      marginBottom: 16,
      textAlignVertical: 'top',
    },
    
    nextButton: {
      backgroundColor: '#15c3d6',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      height: 56,
      marginTop: 32,
    },
  
    nextButtonText: {
      fontFamily: 'Nunito_800ExtraBold',
      fontSize: 16,
      color: '#FFF',
    }
  })