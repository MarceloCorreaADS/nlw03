import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import Header from '../components/Header';
import OrphanagesMap from '../pages/OrphanagesMap';
import HappyOnboarding from '../pages/HappyOnboarding';
import OrphanageDetails from '../pages/OrphanageDetails';
import SelectMapPosition from '../pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from '../pages/CreateOrphanage/OrphanageData';
import ForgotPassword from '../pages/Auth/ForgotPassword';

import SignIn from '../pages/Auth/SignIn';

const AuthStack = createStackNavigator();

export default function AuthRoutes() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  
  }, []);

  if (isFirstLaunch === null) {
    return null; 
  } else if (isFirstLaunch == true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'OrphanagesMap';
  }

  return (
    <AuthStack.Navigator initialRouteName={routeName} >
      <AuthStack.Screen
        name="Onboarding"
        component={HappyOnboarding}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="OrphanagesMap"
        component={OrphanagesMap}
        options={{
          headerShown: true,
          header: () => <Header showCancel={false} title="Mapa de Orfanatos" />
        }}
      />
      <AuthStack.Screen
        name="OrphanageDetails"
        component={OrphanageDetails}
        options={{
          headerShown: true,
          header: () => <Header showCancel={false} title="Orfanato" />
        }}
      />
      <AuthStack.Screen
        name="SelectMapPosition"
        component={SelectMapPosition}
        options={{
          headerShown: true,
          header: () => <Header title="Selecione no mapa" />
        }}
      />
      <AuthStack.Screen
        name="OrphanageData"
        component={OrphanageData}
        options={{
          headerShown: true,
          header: () => <Header title="Informe os dados" />
        }}
      />
      <AuthStack.Screen name="SignIn"
        component={SignIn}
        options={{
          headerShown: true,
          header: () => <Header title="Acesso restrito" />
        }}
      />

      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: true,
          header: () => <Header showCancel={false} title="Esqueci a senha" />
        }}
      />
      

    </AuthStack.Navigator>
  )
};