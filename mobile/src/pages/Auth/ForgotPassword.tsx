import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';


export default function ForgotPassowrd() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  async function handleToSendTemporaryPassword() {
    await api.post('forgotPassword', {
        email: email
      }); 
  
    navigation.navigate('SignIn');
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.instructions}>Preencha seu e-mail para que possamos lhe enviar uma nova senha temporária válida por 6 horas.</Text>  
      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <RectButton style={styles.sendButton} onPress={handleToSendTemporaryPassword}>
        <Text style={styles.sendButtonText}>Solicitar senha temporária</Text>
      </RectButton>
    </ScrollView>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  instructions: {
    color: '#5c8599',
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
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

  sendButton: {
    backgroundColor: '#37C77F',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  sendButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
})