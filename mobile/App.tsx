import React from 'react';
import Routes from './src/routes/routes';
import { NavigationContainer } from '@react-navigation/native';

import {AuthProvider} from './src/contexts/auth';

import { useFonts } from 'expo-font';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

export default function App() {
  const [fonstLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fonstLoaded){
    return null;
  }

  return (
    <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
    </NavigationContainer>
  );
}