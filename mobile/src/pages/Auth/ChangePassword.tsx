import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  isTemporaryPassword: boolean;
}

export default function ChangePassword() {
  const { user, upadteUser } = useAuth();
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  

  async function handleToChangePassword(){

    const response = await api.post('changePassword', {
      id: user?.id,
      newPassword: newPassword
    });

    upadteUser(response.data as User);

       
    navigation.navigate('Dashboard');
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.label}>Nova senha</Text>
      <TextInput
        secureTextEntry
        style={[styles.input]}
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <RectButton style={styles.changePasswordButton} onPress={handleToChangePassword}>
        <Text style={styles.changePasswordButtonText}>Alterar Senha</Text>
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

  changePasswordButton: {
    backgroundColor: '#37C77F',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  changePasswordButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
})