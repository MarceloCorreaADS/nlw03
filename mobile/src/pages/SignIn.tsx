import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, TextInput, Switch, View } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../contexts/auth';


export default function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  function handleSignIn() {
    signIn(email, password);
  }

  function handleToForgetPassword(){

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
      <View style={styles.aboveSignIn}>
        <View style={styles.switchContainer}>
          <Switch
            thumbColor="#fff"
            trackColor={{ false: '#ccc', true: '#39CC83' }}
            value={rememberMe}
            onValueChange={setRememberMe}
          />
          <Text style={{ color: '#8FA7B2' }}>Lembrar-me</Text>
        </View>
        <BorderlessButton onPress={handleToForgetPassword} style={{ paddingRight: 10 }}>
          <Text style={{ color: '#8FA7B2', alignItems: 'center', justifyContent: 'space-between' }}>Esqueci {"\n"}minha senha</Text>     
        </BorderlessButton>
      </View>
      <RectButton style={styles.SignInButton} onPress={handleSignIn}>
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

  SignInButton: {
    backgroundColor: '#37C77F',
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
  },

  aboveSignIn:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})