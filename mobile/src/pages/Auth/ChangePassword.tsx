import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import AlertBox from '../../components/AlertBox';

import { PropsDrawer }  from '../../routes/types';

interface User {
  id: number;
  name: string;
  email: string;
  isTemporaryPassword: boolean;
}

export default function ChangePassword( {navigation} : PropsDrawer) {
  const { user, upadteUser } = useAuth();
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  

  async function handleToChangePassword(){

    if( newPassword !== confirmNewPassword){
      alert("As senhas não conferem!");

      return null;
    }
    try{
      const response = await api.post('changePassword', {
        id: user?.id,
        password: password,
        newPassword: newPassword
      });

      upadteUser(response.data as User);
      alert("Senha alterada com sucesso!"); 
      setPassword('');
      setNewPassword('');
      setConfirmNewPassword('');

      navigation.navigate('OrphanagesRegistered');
    }catch(error){
      if(error.response){
        alert(error.response.data.error);
      } else if (error.request){
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }    
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      { user?.isTemporaryPassword ?
        <AlertBox text="Sua senha é temporária e válida por um curto período de tempo. Por favor troque sua senha para continuar com acesso ao sistema!" />
        :
        null
      }
      <Text style={styles.label}>Senha</Text>
      <TextInput
        secureTextEntry
        style={[styles.input]}
        value={password} 
        onChangeText={setPassword}
      />
      <Text style={styles.label}>Nova senha</Text>
      <TextInput
        secureTextEntry
        style={[styles.input]}
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Text style={styles.label}>Confirme a nova senha</Text>
      <TextInput
        secureTextEntry
        style={[styles.input]}
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
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